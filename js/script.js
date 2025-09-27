/* تحديث الساعة */
function updateClock() {
  const clock = document.getElementById("desktop-clock-display");
  if (!clock) return;
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  clock.textContent = now.toLocaleDateString('ar-EG', options);
}
setInterval(updateClock, 1000);
updateClock();

/* أحاديث عشوائية */
const hadiths = [
  { text: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ", source: "البخاري ومسلم" },
  { text: "الدِّينُ النَّصِيحَةُ", source: "مسلم" },
  { text: "الطُّهُورُ شَطْرُ الإِيمَانِ", source: "مسلم" }
];
function displayRandomHadith(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const random = hadiths[Math.floor(Math.random() * hadiths.length)];
  container.innerHTML = `<p class="hadith-text">${random.text}</p><p class="hadith-source">${random.source}</p>`;
}
displayRandomHadith("hadith-display-start");

/* أصوات عشوائية */
const audio = [
  { text: "تفسير ســورة الــكوثــر", source: "الاية الأولى" },
  { text: "تفسير ســورة الــكوثــر", source: "الاية الثانية" },
  { text: "تفسير ســورة الــكوثــر", source: "الاية الثالثة" }
];
function displayRandomaudio(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const random = audio[Math.floor(Math.random() * audio.length)];
  container.innerHTML = `<p class="audio-text">${random.text}</p><p class="audio-source">${random.source}</p>`;
}
displayRandomaudio("audio-display-start");

/* بنك الأسئلة */
let questions = [
  { type: "true-false", text: "البخاري صاحب كتاب الصحيح؟", correct: true },
  { type: "multiple-choice", text: "من هو إمام دار الهجرة؟", options: ["أبو حنيفة", "مالك", "الشافعي"], correct: 1 },
  { type: "true-false", text: "الحديث الضعيف يُحتج به في العقيدة؟", correct: false }
];
let currentIndex = 0, score = 0;

/* بدء الاختبار */
function startQuiz() {
  document.getElementById("quiz-start-section").style.display = "none";
  renderQuestion();
}

/* عرض السؤال */
function renderQuestion() {
  const container = document.getElementById("quiz-container");
  if (!container) return;
  if (currentIndex >= questions.length) { showFinalScore(); return; }

  const q = questions[currentIndex];
  let html = `<div class="question-card">
                <div class="question-number">س ${currentIndex + 1}</div>
                <div class="question-text">${q.text}</div>`;

  if (q.type === "true-false") {
    html += `<div class="card-actions">
               <button class="action-btn" onclick="checkAnswer(true)">صح</button>
               <button class="action-btn" onclick="checkAnswer(false)">خطأ</button>
             </div>`;
  } else if (q.type === "multiple-choice") {
    html += `<div class="mc-options-grid">`;
    q.options.forEach((opt,i)=>{ html += `<button class="action-btn" onclick="checkAnswer(${i})">${opt}</button>`; });
    html += `</div>`;
  }
  html += `</div>`;
  container.innerHTML = html;
}

/* فحص الإجابة */
function checkAnswer(ans) {
  const q = questions[currentIndex];
  let correct = false;
  if (q.type === "true-false" && ans === q.correct) correct = true;
  if (q.type === "multiple-choice" && ans === q.correct) correct = true;

  if (correct) { score++; notify("إجابة صحيحة", "success"); }
  else {
    let correctAnswer = q.type === "true-false" ? (q.correct ? "صح" : "خطأ") : q.options[q.correct];
    notify(`إجابة خاطئة | الصحيح: ${correctAnswer}`, "error");
  }
  currentIndex++;
  setTimeout(renderQuestion, 600);
}

/* النتيجة النهائية */
function showFinalScore() {
  document.getElementById("quiz-container").innerHTML = `
    <div class="hadith-display">
      <h2>النتيجة النهائية</h2>
      <p>حصلت على <strong>${score}</strong> من <strong>${questions.length}</strong></p>
      <button class="action-btn" onclick="restartQuiz()">🔄 إعادة المحاولة</button>
    </div>`;
}
function restartQuiz(){
  currentIndex=0;
  score=0;
  document.getElementById("quiz-start-section").style.display = "block";
  document.getElementById("quiz-container").innerHTML = "";
}

/* إشعارات */
function notify(msg,type="info"){
  let c=document.getElementById("notification-container");
  if(!c){c=document.createElement("div");c.id="notification-container";document.body.appendChild(c);}
  const d=document.createElement("div");
  d.className=`notification ${type}`;
  d.innerHTML=msg;
  c.appendChild(d);
  setTimeout(()=>d.remove(),2000);
}
