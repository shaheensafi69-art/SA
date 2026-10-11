import fs from 'fs';
import path from 'path';

const outPath = path.resolve('src/utils/founderTranslations.ts');

const locales = ['en', 'fa', 'ps', 'ru', 'tr', 'de', 'fr', 'ar', 'ur', 'es', 'zh', 'hi', 'it', 'pt', 'ja', 'ko', 'nl', 'uz', 'id'];

console.log("Generating modular founder translations...");
