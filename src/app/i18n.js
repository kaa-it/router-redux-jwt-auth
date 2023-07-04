import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const detection = {
  // order and from where user language should be detected
  order: ['querystring', 'localStorage'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupLocalStorage: 'i18nextLng',

  // cache user language on
  caches: ['localStorage'],
};

const backend = {
  loadPath: '/locales/{{lng}}/translation.json',
};

const supportedLngs = ['en', 'ru'];

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  debug: false,
  supportedLngs,
  fallbackLng: 'en',
  detection,
  backend,
});

export default i18n;
