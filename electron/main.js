const { app, BrowserWindow, shell, session, Menu, ipcMain } = require('electron');
const path = require('path');

const BASE_URL = 'https://safiacademy.org';
const INITIAL_URL = `${BASE_URL}/login`;

// بخش‌های مجاز اپلیکیشن طبق درخواست
const ALLOWED_PATTERNS = [
  /\/login(\/|$)/i,
  /\/register(\/|$)/i,
  /\/dashboard(\/|$)/i,
  /\/teacher(\/|$)/i,
  /\/admin(\/|$)/i,
  /\/feed(\/|$)/i,
  /\/forgot-password(\/|$)/i,
  /\/reset-password(\/|$)/i,
  /\/verify-email(\/|$)/i,
  /\/auth(\/|$)/i,
  /\/api(\/|$)/i,
];

let mainWindow = null;

function isAllowedRoute(urlString) {
  try {
    const url = new URL(urlString);
    if (url.hostname !== 'safiacademy.org' && !url.hostname.endsWith('.safiacademy.org')) {
      // برای احراز هویت گوگل یا سوپابیس
      return (
        url.hostname.includes('supabase.co') ||
        url.hostname.includes('google.com') ||
        url.hostname.includes('accounts.google.com') ||
        url.hostname.includes('stripe.com')
      );
    }

    const pathname = url.pathname;

    // روت اصلی یا زبان‌ها بدون مسیر را اجازه نده تا لندینگ پیج باز نشود
    if (pathname === '/' || pathname === '/fa' || pathname === '/en' || pathname === '/ps') {
      return false;
    }

    return ALLOWED_PATTERNS.some((pattern) => pattern.test(pathname));
  } catch {
    return false;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 850,
    minWidth: 1024,
    minHeight: 650,
    title: 'Safi Academy Portal',
    icon: path.join(__dirname, '../public/icon-512x512.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      spellcheck: true,
    },
    show: false,
    backgroundColor: '#0f172a',
  });

  // حذف نام الکترون از User-Agent جهت جلوگیری از خطای ورود با گوگل
  const currentUserAgent = mainWindow.webContents.getUserAgent();
  mainWindow.webContents.setUserAgent(
    currentUserAgent.replace(/Electron\/\S+\s?/, '')
  );

  // بارگذاری اولیه مستقیماً در صفحه لاگین
  mainWindow.loadURL(INITIAL_URL);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // فیلتر کردن تغییر مسیرها (Navigation Guard)
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!isAllowedRoute(url)) {
      event.preventDefault();
      try {
        const parsed = new URL(url);
        // اگر کاربر روی لوگو یا خانه کلیک کرد که به لندینگ نرود
        if (
          parsed.hostname.includes('safiacademy.org') &&
          (parsed.pathname === '/' || parsed.pathname === '/fa' || parsed.pathname === '/en' || parsed.pathname === '/ps')
        ) {
          mainWindow.loadURL(`${BASE_URL}/dashboard`);
          return;
        }
      } catch { }

      // سایر لینک‌های عمومی سایت در مرورگر خارجی باز شوند
      shell.openExternal(url);
    }
  });

  // مدیریت لینک‌هایی که در پنجره جدید (target="_blank") باز می‌شوند
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (isAllowedRoute(url)) {
      return { action: 'allow' };
    }
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // مدیریت خطای قطع اینترنت
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    if (errorCode === -3) return; // ERR_ABORTED

    if (errorCode <= -100) {
      mainWindow.loadFile(path.join(__dirname, 'offline.html'));
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// تنظیم مجوزهای وبکم و میکروفون برای کلاس‌های آنلاین
function setupPermissions() {
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allowed = ['media', 'mediaKeySystem', 'notifications', 'fullscreen', 'pointerLock'];
    callback(allowed.includes(permission));
  });

  session.defaultSession.setPermissionCheckHandler((webContents, permission) => {
    const allowed = ['media', 'mediaKeySystem', 'notifications', 'fullscreen', 'pointerLock'];
    return allowed.includes(permission);
  });
}

// منوی برنامه شامل دسترسی سریع به بخش‌های پرتال
function setupMenu() {
  const isMac = process.platform === 'darwin';

  const template = [
    ...(isMac
      ? [
        {
          label: 'Safi Academy',
          submenu: [
            { role: 'about', label: 'درباره برنامه' },
            { type: 'separator' },
            { role: 'hide', label: 'مخفی کردن' },
            { role: 'hideOthers', label: 'مخفی کردن سایر پنجره‌ها' },
            { role: 'unhide', label: 'نمایش همه' },
            { type: 'separator' },
            { role: 'quit', label: 'خروج' },
          ],
        },
      ]
      : []),
    {
      label: 'بخش‌های پرتال (Sections)',
      submenu: [
        {
          label: 'داشبورد شاگرد (Student Dashboard)',
          accelerator: 'CmdOrCtrl+1',
          click: () => mainWindow && mainWindow.loadURL(`${BASE_URL}/dashboard`),
        },
        {
          label: 'فید جامعه علمی (Feed)',
          accelerator: 'CmdOrCtrl+2',
          click: () => mainWindow && mainWindow.loadURL(`${BASE_URL}/feed`),
        },
        {
          label: 'پنل اساتید (Teacher)',
          accelerator: 'CmdOrCtrl+3',
          click: () => mainWindow && mainWindow.loadURL(`${BASE_URL}/teacher`),
        },
        {
          label: 'پنل ادمین (Admin)',
          accelerator: 'CmdOrCtrl+4',
          click: () => mainWindow && mainWindow.loadURL(`${BASE_URL}/admin`),
        },
        { type: 'separator' },
        {
          label: 'ورود (Login)',
          accelerator: 'CmdOrCtrl+L',
          click: () => mainWindow && mainWindow.loadURL(`${BASE_URL}/login`),
        },
        {
          label: 'ثبت‌نام (Register)',
          click: () => mainWindow && mainWindow.loadURL(`${BASE_URL}/register`),
        },
      ],
    },
    {
      label: 'ویرایش (Edit)',
      submenu: [
        { role: 'undo', label: 'Undo' },
        { role: 'redo', label: 'Redo' },
        { type: 'separator' },
        { role: 'cut', label: 'Cut' },
        { role: 'copy', label: 'Copy' },
        { role: 'paste', label: 'Paste' },
        { role: 'selectAll', label: 'Select All' },
      ],
    },
    {
      label: 'نما (View)',
      submenu: [
        { role: 'reload', label: 'بارگذاری مجدد' },
        { role: 'forceReload', label: 'بارگذاری مجدد بدون کش' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'اندازه معمولی' },
        { role: 'zoomIn', label: 'بزرگ‌نمایی' },
        { role: 'zoomOut', label: 'کوچک‌نمایی' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'تمام صفحه' },
      ],
    },
    {
      label: 'پنجره (Window)',
      submenu: [
        { role: 'minimize', label: 'کوچک کردن' },
        { role: 'zoom', label: 'بزرگ کردن' },
        ...(isMac ? [{ type: 'separator' }, { role: 'front', label: 'آوردن به جلو' }] : []),
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

ipcMain.on('retry-connect', () => {
  if (mainWindow) {
    mainWindow.loadURL(INITIAL_URL);
  }
});

app.whenReady().then(() => {
  setupPermissions();
  setupMenu();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
