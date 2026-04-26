import i18next from 'i18next';
import ICU from 'i18next-icu';
import Backend from 'i18next-fs-backend';
import path from 'path';
import fs from 'fs';

export const i18n = i18next.createInstance();

export const initI18next = async () => {
   // Auto-discover namespaces from file names
  const getNamespaces = (lang: string) => {
    const langPath = path.join(__dirname, `../i18n/${lang}`);
    if (!fs.existsSync(langPath)) return ['common'];

    
    
    const files = fs.readdirSync(langPath);
     console.log({ langPath, files });
    const ls =  files.map(file => path.basename(file, '.json'));

     console.log({ langPath, files, ls });
    return ls
  };
  
  const enNamespaces = getNamespaces('en');


  await i18n
    .use(ICU)
    .use(Backend)
    .init({
      fallbackLng: 'en',
      preload: ['en', 'ar'],
      backend: {
         //loadPath: path.join(__dirname, '../i18n/{{lng}}/test.json'),
        //loadPath: path.join(__dirname, '../i18n/{{lng}}/*.json'),
         loadPath: path.join(__dirname, '../i18n/{{lng}}/{{ns}}.json'),
      },
      ns: enNamespaces, // Use discovered namespaces
      defaultNS: enNamespaces[0] || 'common',
      interpolation: {
        escapeValue: false,
      },
    });
  
  return i18n;
};