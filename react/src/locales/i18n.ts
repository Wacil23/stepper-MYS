import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import fr from "./fr-FR/fr.json";
import de from "./de-DE/de.json";
import nl from "./nl-NL/nl.json";
import it from "./it-IT/it.json";

// Créez un détecteur personnalisé pour extraire la langue à partir du domaine
const domainDetector = {
  name: 'domainDetector',
  lookup() {
    const hostname = window.location.hostname;
    if (hostname.includes('mysadaka.de')) return 'de';
    if (hostname.includes('mysadaka.nl')) return 'nl';
    if (hostname.includes('mysadaka.it')) return 'it';
    if (hostname.includes('mysadaka.ch')) return 'ch';
    return 'fr'; // Par défaut, français
  },
  cacheUserLanguage: () => {}, // Pas de mise en cache nécessaire
};

const languageDetector = new LanguageDetector();
languageDetector.addDetector(domainDetector);

// Initialisation de i18n
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['domainDetector', 'querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie'], // Si vous voulez mettre en cache la langue dans un cookie
      lookupQuerystring: 'lang', // Utilisez ?lang=xx dans l'URL comme fallback
    },
    resources: {
      fr: { translation: fr },
      de: { translation: de },
      nl: { translation: nl },
      it: { translation: it },
    },
    fallbackLng: 'fr', // Langue par défaut si aucune langue détectée
    interpolation: {
      escapeValue: false,
    },
  });


export default i18n;
