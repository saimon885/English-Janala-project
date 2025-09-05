// ass data
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promice of respons
    .then((res) => res.json()) //promice of json data
    .then((json) => displayLessons(json.data));
};
const removeActive = () => {
  const lessonbtn = document.querySelectorAll(".lesson-btn");
  lessonbtn.forEach((btn) => btn.classList.remove("active"));
};
// words level
const loadlevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  // console.log(url);
  fetch(url)
    .then((respon) => respon.json())
    .then((data) => {
      removeActive(); //remove all active class
      const clickBtn = document.getElementById(`lesson-level-${id}`);
      // console.log(clickBtn);
      clickBtn.classList.add("active"); //1 ti kore add korbe
      displayLevelWord(data.data);
    });
};
// circle info show // ei jaegae valo kore boji nai
const loadwordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displaywordDetails(details.data);
};
// {
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস",
//     "level": 2,
//     "sentence": "Be cautious while crossing the road.",
//     "points": 2,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "careful",
//         "alert",
//         "watchful"
//     ],
//     "id": 3
// }
// speak vocabularies
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
const displaywordDetails = (data) => {
  console.log(data);
  const detaisCont = document.getElementById("details-container");
  detaisCont.innerHTML = `<div class="space-y-3">
            <h2 class="text-2xl font-semibold">${data.word} (<i class="fa-solid fa-microphone-lines"></i>:${data.pronunciation})</h2>
            <div>
              <h2 class="font-semibold">Meaning</h2>
              <h2 class="font-semibold">${data.meaning}</h2>
            </div>
            <div>
              <h2 class="font-bold">Example</h2>
              <p>${data.sentence}</p>
            </div>
            <div class="space-y-2">
              <h2 class="font-semibold">সমার্থক শব্দ গুলো</h2>
              <div>
              <button class="btn btn-soft bg-[#EDF6FF]">${data.synonyms[0]}</button>
              <button class="btn btn-soft bg-[#EDF6FF]">${data.synonyms[1]}</button>
              <button class="btn btn-soft bg-[#EDF6FF]">${data.synonyms[2]}</button>
              </div>
            </div>
             <button class="btn btn-soft bg-[#3193f5] text-white">Complete Learning</button>
          </div>`;
  // data.append(detaisCont)
  document.getElementById("my_modal_5").showModal();
};
// ei jaegae valo kore boji nai...^^^^

// words level
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length === 0) {
    wordContainer.innerHTML = ` <div class="div col-span-full mx-auto text-center space-y-5 py-8">
    <img class="mx-auto" src="./assets/alert-error.png" alt="">
    <p class="text-[#79716B] font-semibold bangla-font">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <h1 class="text-4xl font-bold text-[#292524] bangla-font">নেক্সট Lesson এ যান</h1>
  </div>`;
    return;
  }

  words.forEach((word) => {
    const cardCreate = document.createElement("div");
    cardCreate.innerHTML = `  <div class="py-10 px-8 bg-white mt-5 text-center shadow-sm rounded-2xl h-full">
    <h1 class="text-3xl font-bold">${
      word.word ? word.word : "শব্দ পাওয়া যায় নি"
    }</h1>
    <p class="my-3 font-semibold">Meaning /Pronounciation</p>
    <div class="text-2xl font-semibold">" ${
      word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"
    } / ${
      word.pronunciation ? word.pronunciation : "pronuncitation পাওয়া যায় নি"
    } "</div>
    <div class="flex justify-between items-center mt-10">
      <button onclick="loadwordDetail(${
        word.id
      })" class="btn bg-[#ECF6FE] hover:bg-[#59b3fd] p-4 py-6 rounded-2xl"><i class="fa-solid fa-circle-info text-2xl "></i></button>
      <button onclick="pronounceWord('${
        word.word
      }')" class="btn bg-[#ECF6FE] hover:bg-[#59b3fd] p-4 py-6 rounded-2xl"><i class="fa-solid fa-volume-high text-2xl "></i></button>
    </div>
  </div>`;
    wordContainer.appendChild(cardCreate);
  });
};

// all data button
const displayLessons = (lessons) => {
  // get the container
  const lavelContainer = document.getElementById("Lavel-Container");
  lavelContainer.innerHTML = "";
  // sobgola lesson get
  for (let lesson of lessons) {
    // element create
    const btndiv = document.createElement("div");
    btndiv.innerHTML = `
                 <button id="lesson-level-${lesson.level_no}" onclick="loadlevelWord(${lesson.level_no})" class="btn btn-outline lesson-btn">
                 <img src="assets/fa-book-open.png" alt=""/>Lesson - ${lesson.level_no}
                 </button>`;
    lavelContainer.appendChild(btndiv);
  }
};
loadLessons();

// search option
document.getElementById("input-Btn").addEventListener("click", () => {
  removeActive();
  const inputfield = document.getElementById("input-field");
  const searValue = inputfield.value.trim().toLowerCase();

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      let filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searValue)
      );
      displayLevelWord(filterWords);
    });
});
