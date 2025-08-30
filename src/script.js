import { config } from "/config.js";
import { LanguageManager } from "./class/languagesManager.js";

const languageManager = new LanguageManager();

document.addEventListener("DOMContentLoaded", () => {
  languageManager.setLanguage(languageManager.currentLang);
  document.getElementById("selectLanguage").value = languageManager.currentLang;
})

const elementForm = document.getElementById("searchForm");
elementForm.addEventListener("submit", async (event) => {
  const valueInput = document.getElementById("searchInput").value.trim();
  event.preventDefault();

  if(!valueInput){
    alert(languageManager.msgError.emptyField)
    return
  }

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${config.TMDB_API_KEY}&query=${encodeURIComponent(valueInput)}&language=${languageManager.currentLang}`, {
      method: "GET",
      headers: {
        'Content-Type':'application/json'
      },
    });

    if (!response.ok){
      throw new Error(`${response.status} - ${(await response.json()).status_message}`);
    }

    const data = await response.json();
    if(!data.results.length){
      alert(languageManager.msgError.noFound)
      return
    }

    const fragment = document.createDocumentFragment();
    const cardsSection = document.getElementById("cardsSection");
    cardsSection.innerHTML = "";

    data.results.forEach((item) => {
      const newArticle = document.createElement("article");
      newArticle.className = "cardMovie";
      newArticle.innerHTML = `<h3>${item.title}</h3>`;
      newArticle.style.background = `linear-gradient(360deg, rgba(0, 0, 0, 0.8) 10%, rgba(0, 0, 0, 0) 40%), url('${item.poster_path?config.IMAGE_URL+item.poster_path:"./images/noimage.png"}') center/cover no-repeat`;
      fragment.appendChild(newArticle);
    })

    cardsSection.appendChild(fragment);

  } catch (error) {
    alert(error);
  }
})

const selectField = document.getElementById("selectLanguage");
selectField.addEventListener("change", () => {
  languageManager.setLanguage(selectField.value);
})