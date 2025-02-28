import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import fr from "./fr-FR/fr.json";
import de from "./de-DE/de.json";
import nl from "./nl-NL/nl.json";
import it from "./it-IT/it.json";
import bg from "./bg-BG/bg.json";
import es from "./es-ES/es.json";
import tr from "./tr-TR/tr.json";
import el from "./el-GR/el.json";
import sq from "./sq-AL/sq.json";

// Créez un détecteur personnalisé pour extraire la langue à partir du domaine
const domainDetector = {
  name: "domainDetector",
  lookup() {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    if (hostname.includes("mysadaka.de")) return "de";
    else if (hostname.includes("mysadaka.nl")) return "nl";
    else if (hostname.includes("mysadaka.it")) return "it";
    else if (hostname.includes("mysadaka.ch")) return "ch";
    else if (hostname.includes("mysadaka.es")) return "es";
    else if (pathname.includes("/bg/")) return "bg";
    else if (pathname.includes("/sq/")) return "sq";
    else if (pathname.includes("/el/")) return "el";
    else if (hostname.includes("mysadaka.com")) return "tr";
    else return "fr";
  },
  cacheUserLanguage: () => {},
};

const languageDetector = new LanguageDetector();
languageDetector.addDetector(domainDetector);
// Initialisation de i18n
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: [
        "domainDetector",
        "querystring",
        "cookie",
        "localStorage",
        "navigator",
      ],
      caches: ["cookie"],
      lookupQuerystring: "lang",
    },
    resources: {
      fr: { translation: fr },
      de: { translation: de },
      nl: { translation: nl },
      it: { translation: it },
      bg: { translation: bg },
      es: { translation: es },
      tr: { translation: tr },
      el: { translation: el },
      sq: { translation: sq },
    },
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
