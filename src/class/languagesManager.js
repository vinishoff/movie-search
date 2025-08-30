import { translations } from "./languages.js";

export class LanguageManager {
  constructor(){
    this.currentLang = localStorage.getItem("language") || "en";
    this.msgError = {
      "emptyField":"",
      "noFound":"",
    }
  }

  setLanguage(lang){
    if (translations[lang]){
      this.currentLang = lang;
      localStorage.setItem("language",lang);
      this.updatePageLanguage();
      return true;
    } else {
      return false;
    }
  }

  updatePageLanguage(){
    const text = translations[this.currentLang];
    document.documentElement.lang = this.currentLang;

    // Fields and Titles - Campos e Títulos
    document.getElementById("pageTitle").textContent          = text.pageTitle;
    document.getElementById("title").textContent              = text.title;
    document.getElementById("titleLangNav").textContent       = text.titleLangNav;
    document.getElementById("titleSearchSection").textContent = text.titleSearchSection;
    document.getElementById("titleSearch").textContent        = text.titleSearch;
    document.getElementById("searchInput").placeholder        = text.placeholderSearchInput;
    document.getElementById("searchBttn").textContent         = text.buttonSearch;
    document.getElementById("titleCardsSection").textContent  = text.titleCardsSection;

    // Messages - Mensagens
    this.msgError.emptyField  = text.emptyField;
    this.msgError.noFound     = text.noFound;
  }
}