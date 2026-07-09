const fs = require('fs');

function updateDashboardLayout() {
  let content = fs.readFileSync('src/app/en/dashboard/layout.tsx', 'utf8');

  // Change checkSession to onAuthStateChange
  content = content.replace(
    /const checkSession = async \(\) => \{[\s\S]*?checkSession\(\);\s*\}, \[router\]\);/m,
    `const supabase = createClient();
    
    // Initial fetch of profile
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name, avatar_url, wallet_balance")
          .eq("id", session.user.id)
          .single();
        if (profile) setUserProfile(profile);
        setIsReady(true);
      } else {
        router.replace("/en/login");
      }
    };
    
    fetchProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.replace("/en/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);`
  );

  // Logo fix for Desktop Sidebar
  content = content.replace(
    /<div className="relative w-12 h-12 flex items-center justify-center">\s*<img src="\/logo-without-b\.png" alt="Safi Academy" className="w-full h-full object-contain" \/>\s*<\/div>/g,
    `<div className="w-16 h-16 flex items-center justify-center">
             <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain drop-shadow-2xl" />
           </div>`
  );

  // Update layout structure
  // First remove the old mobile header
  content = content.replace(
    /\{\/\* Mobile Header \*\/\}\s*<div className="lg:hidden w-full flex items-center justify-between p-4 bg-black\/40 border-b border-white\/5 relative z-50">[\s\S]*?<\/div>/m,
    `{/* Mobile Top Header (Just Logo) */}
      <div className="lg:hidden w-full flex items-center p-4 bg-black/40 border-b border-white/5 relative z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white uppercase">Safi Academy</span>
        </div>
      </div>`
  );

  // Replace desktop sidebar hide class
  content = content.replace(
    /className={`fixed lg:relative inset-y-0 left-0 transform \$\{isMobileMenuOpen \? "translate-x-0" : "-translate-x-full"\} lg:translate-x-0 transition-transform duration-300 ease-in-out w-72 bg-black\/90 lg:bg-black\/40 border-r border-white\/5 backdrop-blur-3xl flex flex-col z-50 h-screen shrink-0`}/g,
    `className="hidden lg:flex w-72 bg-black/40 border-r border-white/5 backdrop-blur-3xl flex-col relative z-10 h-screen shrink-0"`
  );

  // Insert Bottom Navigation and Mobile Menu Modal before </main>
  const mobileNav = `
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-white/10 z-50 px-2 py-2 flex justify-between items-center backdrop-blur-xl">
        <Link href="/en/dashboard" className={\`flex flex-col items-center p-2 rounded-xl transition-colors \${pathname === "/en/dashboard" ? "text-yellow-400" : "text-neutral-500"}\`}>
          <span className="text-xl mb-1">📊</span>
          <span className="text-[10px] font-bold">Overview</span>
        </Link>
        <Link href="/en/dashboard/courses" className={\`flex flex-col items-center p-2 rounded-xl transition-colors \${pathname === "/en/dashboard/courses" ? "text-yellow-400" : "text-neutral-500"}\`}>
          <span className="text-xl mb-1">📚</span>
          <span className="text-[10px] font-bold">Courses</span>
        </Link>
        <Link href="/en/dashboard/live-classes" className={\`flex flex-col items-center p-2 rounded-xl transition-colors \${pathname === "/en/dashboard/live-classes" ? "text-yellow-400" : "text-neutral-500"}\`}>
          <span className="text-xl mb-1">🔴</span>
          <span className="text-[10px] font-bold">Live</span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(true)} className="flex flex-col items-center p-2 rounded-xl transition-colors text-neutral-500">
          <span className="text-xl mb-1">⚙️</span>
          <span className="text-[10px] font-bold">Menu</span>
        </button>
      </div>

      {/* Mobile Menu Modal (Full Screen) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#050505] z-[100] flex flex-col animate-[fadeIn_0.2s_ease-out] lg:hidden">
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8">
                <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-white uppercase text-sm">Menu</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white bg-white/5 rounded-full">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={\`flex items-center gap-4 px-4 py-4 rounded-xl font-bold transition-all \${
                    isActive 
                      ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" 
                      : "text-neutral-300 bg-white/5"
                  }\`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
            
            <div className="mt-8 pt-4 border-t border-white/10">
               {userProfile && (
                <div className="flex items-center gap-3 mb-6 bg-white/5 p-4 rounded-2xl">
                  <img src={userProfile.avatar_url || "https://i.pravatar.cc/150"} alt="User" className="w-12 h-12 rounded-full border border-yellow-500 object-cover" />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">{userProfile.first_name} {userProfile.last_name}</p>
                    <p className="text-xs text-green-400 font-bold">\${userProfile.wallet_balance || "0.00"}</p>
                  </div>
                </div>
              )}
              <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-4 text-red-400 bg-red-500/10 rounded-xl font-bold transition-all w-full border border-red-500/20">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
`;
  content = content.replace('</main>', `</main>\n${mobileNav}`);

  // Fix padding for main content so it doesn't get hidden behind bottom nav
  content = content.replace('<main className="flex-1 relative z-10 h-screen overflow-y-auto">', '<main className="flex-1 relative z-10 h-screen overflow-y-auto pb-20 lg:pb-0">');
  
  fs.writeFileSync('src/app/en/dashboard/layout.tsx', content);
}

function updateTeacherLayout() {
  let content = fs.readFileSync('src/app/en/teacher/layout.tsx', 'utf8');

  // Change fetchUser to onAuthStateChange and persist session correctly
  content = content.replace(
    /const fetchUser = async \(\) => \{[\s\S]*?fetchUser\(\);\s*\}, \[\]\);/m,
    `const supabase = createClient();
    
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, avatar_url")
          .eq("id", session.user.id)
          .single();
        if (profile) {
          setInstructor({
            first_name: profile.first_name || "Instructor",
            avatar: profile.avatar_url || ""
          });
        }
      } else {
        router.replace("/en/login");
      }
    };
    
    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.replace("/en/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);`
  );

  // Fix Logo for Desktop
  content = content.replace(
    /<div className="w-8 h-8 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-xl flex items-center justify-center">[\s\S]*?<\/div>/g,
    `<div className="w-12 h-12 flex items-center justify-center">
            <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>`
  );

  // Fix Mobile Header
  content = content.replace(
    /\{\/\* Mobile Header \*\/\}\s*<div className="lg:hidden flex items-center justify-between p-4 bg-\[#080808\] border-b border-white\/5">[\s\S]*?<\/div>/m,
    `{/* Mobile Top Header (Just Logo) */}
      <div className="lg:hidden w-full flex items-center p-4 bg-[#080808] border-b border-white/5 relative z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain" />
          </div>
          <span className="font-extrabold text-sm tracking-widest text-white uppercase">Safi Academy</span>
        </div>
      </div>`
  );

  // Desktop sidebar class fix
  content = content.replace(
    /className={`fixed lg:relative inset-y-0 left-0 transform \$\{isMobileMenuOpen \? "translate-x-0" : "-translate-x-full"\} lg:translate-x-0 transition-transform duration-300 ease-in-out w-\[260px\] bg-\\[#080808\\] border-r border-white\/5 flex flex-col shrink-0 z-50`}/g,
    `className="hidden lg:flex w-[260px] bg-[#080808] border-r border-white/5 flex-col shrink-0 relative z-50 h-screen"`
  );

  // Insert Bottom Nav and Fullscreen Menu
  const mobileNav = `
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#080808] border-t border-white/10 z-50 px-2 py-2 flex justify-between items-center backdrop-blur-xl">
        <Link href="/en/teacher" className={\`flex flex-col items-center p-2 rounded-xl transition-colors \${pathname === "/en/teacher" ? "text-fuchsia-400" : "text-neutral-500"}\`}>
          <span className="text-xl mb-1">📊</span>
          <span className="text-[10px] font-bold">Overview</span>
        </Link>
        <Link href="/en/teacher/courses" className={\`flex flex-col items-center p-2 rounded-xl transition-colors \${pathname === "/en/teacher/courses" ? "text-fuchsia-400" : "text-neutral-500"}\`}>
          <span className="text-xl mb-1">📚</span>
          <span className="text-[10px] font-bold">Courses</span>
        </Link>
        <Link href="/en/teacher/live-classes" className={\`flex flex-col items-center p-2 rounded-xl transition-colors \${pathname === "/en/teacher/live-classes" ? "text-fuchsia-400" : "text-neutral-500"}\`}>
          <span className="text-xl mb-1">🔴</span>
          <span className="text-[10px] font-bold">Live</span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(true)} className="flex flex-col items-center p-2 rounded-xl transition-colors text-neutral-500">
          <span className="text-xl mb-1">⚙️</span>
          <span className="text-[10px] font-bold">Menu</span>
        </button>
      </div>

      {/* Mobile Menu Modal (Full Screen) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#020202] z-[100] flex flex-col animate-[fadeIn_0.2s_ease-out] lg:hidden">
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8">
                <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-white uppercase text-sm tracking-widest">Menu</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white bg-white/5 rounded-full">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
            {menuGroups.map((group, index) => (
              <div key={index}>
                <p className="px-2 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.15em] mb-2">
                  {group.title}
                </p>
                <ul className="space-y-2">
                  {group.items.map((item) => {
                    const isActive = item.path === "/en/teacher" 
                      ? pathname === "/en/teacher" 
                      : pathname.startsWith(item.path);
                    return (
                      <li key={item.path}>
                        <Link 
                          href={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={\`flex items-center gap-4 px-4 py-4 rounded-xl font-bold transition-all \${
                            isActive 
                              ? "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20" 
                              : "text-neutral-300 bg-white/5"
                          }\`}
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <span className="text-sm">{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            
            <div className="mt-8 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 mb-6 bg-white/5 p-4 rounded-2xl">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-fuchsia-500/30 bg-neutral-900 flex items-center justify-center">
                  {instructor.avatar ? (
                    <img src={instructor.avatar} alt="Instructor" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-fuchsia-400 text-lg">{instructor.first_name.charAt(0) || "I"}</span>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">{instructor.first_name}</p>
                  <p className="text-[10px] text-fuchsia-400 font-bold uppercase tracking-widest">Instructor</p>
                </div>
              </div>
              <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-4 text-red-400 bg-red-500/10 rounded-xl font-bold transition-all w-full border border-red-500/20">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
`;
  
  content = content.replace('</main>', `</main>\n${mobileNav}`);
  content = content.replace('<main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative bg-[#020202]">', '<main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative bg-[#020202] pb-20 lg:pb-0">');

  fs.writeFileSync('src/app/en/teacher/layout.tsx', content);
}

updateDashboardLayout();
updateTeacherLayout();
