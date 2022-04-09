import "lodash-es";
import "core-js";

let data, dataReciter, dataLang, htmlName;
let suras = document.querySelector(".input_sura");
const reciter = document.querySelector(".input_reciter");
const language = document.querySelector(".input_translate");
await fetch("https://api.quran.sutanlab.id/surah")
  .then((response) => response.json())
  .then((res) => {
    data = res.data;
  });
await fetch("https://api.alquran.cloud/v1/edition?format=audio")
  .then((response) => response.json())
  .then((res) => {
    dataReciter = res.data;
  });
await fetch("https://api.alquran.cloud/v1/edition/language")
  .then((response) => response.json())
  .then((res) => {
    dataLang = res.data;
  });
// console.log(data[0].name.transliteration["en"]);
suras.innerHTML = "";
reciter.innerHTML = "";
language.innerHTML = "";
data.forEach((element, key) => {
  htmlName = `<option value="${key}">${element.name.transliteration["en"]}</option>`;
  suras.insertAdjacentHTML("beforeend", htmlName);
});
dataReciter.forEach((element, key) => {
  htmlName = `<option value="${key}">${element.identifier}</option>`;
  reciter.insertAdjacentHTML("beforeend", htmlName);
});
dataLang.forEach((element, key) => {
  htmlName = `<option value="${key}">${element}</option>`;
  language.insertAdjacentHTML("beforeend", htmlName);
});
console.log(dataLang);
