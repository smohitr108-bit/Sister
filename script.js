/*
  THE SECRET GIFT — Nandu Edition
  Customize SECRET_CODE, HINT, and LETTER_PARAGRAPHS below.
  Note: this is a front-end demo lock, not secure authentication.
*/
const SECRET_CODE = "nandu"; // Change this to your own secret code.
const HINT = "the name of this special person";
const LETTER_PARAGRAPHS = [
  "I wanted to make you something a little different — not something you can keep on a shelf, but a small place on the internet that is yours.",
  "Thank you for being the kind of person who can make an ordinary day feel a little brighter. I hope you always remember that you deserve kindness, peace, laughter, and people who genuinely care about you.",
  "No matter how busy life gets, keep being curious, keep growing at your own pace, and never forget how much your presence can mean to someone.",
  "Nandani, this little universe is a reminder that you matter, and I’m so glad you’re my sis. Nandani is the best sister 💜✨"
];

const $ = (selector) => document.querySelector(selector);
const lockScreen = $("#lockScreen");
const giftContent = $("#giftContent");
const passcodeInput = $("#passcode");
const errorMessage = $("#errorMessage");
const soundToggle = $("#soundToggle");
const soundLabel = $("#soundLabel");
const soundIcon = $("#soundIcon");
let audioContext = null;
let musicTimer = null;
let musicOn = false;
let noteIndex = 0;
let currentLetter = LETTER_PARAGRAPHS.join("\n\n");

$("#hintText").textContent = HINT;

function renderLetter(text) {
  currentLetter = text;
  const container = $("#letterCopy");
  container.replaceChildren();
  text.split(/\n\s*\n/).filter(Boolean).forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    container.appendChild(p);
  });
}
renderLetter(currentLetter);

// Decorative starfield, created locally with no image or library downloads.
const starContainer = $("#stars");
for (let i = 0; i < 95; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 3}s`;
  star.style.opacity = `${0.2 + Math.random() * 0.65}`;
  const size = Math.random() > 0.88 ? 3 : 2;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  starContainer.appendChild(star);
}

$("#unlockForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (passcodeInput.value.trim().toLowerCase() === SECRET_CODE.toLowerCase()) {
    errorMessage.textContent = "";
    lockScreen.classList.add("hidden");
    giftContent.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("Gift unlocked. This little universe is yours ✦");
  } else {
    errorMessage.textContent = "That code didn't work. Try again, you’ve got this.";
    passcodeInput.select();
  }
});

const surprises = [
  ["A little reminder ✨", "You don't need to be perfect to make a difference. Being your own kind of wonderful is more than enough."],
  ["A wish for you 🌙", "May you find reasons to smile on ordinary days, courage when things feel difficult, and people who make you feel understood."],
  ["Your own kind of magic ✦", "Never shrink your curiosity or your kindness to fit into someone else's idea of who you should be."],
  ["One more thing 💜", "You deserve the same patience and encouragement that you so freely give to other people."]
];
let surpriseIndex = 0;
$("#surpriseButton").addEventListener("click", () => {
  surpriseIndex = (surpriseIndex + 1) % surprises.length;
  $("#surpriseTitle").textContent = surprises[surpriseIndex][0];
  $("#surpriseMessage").textContent = surprises[surpriseIndex][1];
  $("#surpriseMessage").animate(
    [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
    { duration: 380, easing: "ease-out" }
  );
});

const modal = $("#letterModal");
$("#editLetter").addEventListener("click", () => {
  $("#letterEditor").value = currentLetter;
  modal.classList.remove("hidden");
  $("#letterEditor").focus();
});
function closeModal() { modal.classList.add("hidden"); }
$("#closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });
$("#saveLetter").addEventListener("click", () => {
  const edited = $("#letterEditor").value.trim();
  if (!edited) { showToast("Write a little note before saving."); return; }
  renderLetter(edited);
  closeModal();
  showToast("Your letter has been updated for this visit.");
});
$("#relockButton").addEventListener("click", () => {
  giftContent.classList.add("hidden");
  lockScreen.classList.remove("hidden");
  passcodeInput.value = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Original ambient music made with the Web Audio API; no copyrighted audio file is used.
// Browsers require a tap/click before sound can start.
const melody = [261.63, 329.63, 392.00, 329.63, 293.66, 349.23, 440.00, 349.23];
function playNote() {
  if (!audioContext || !musicOn) return;
  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  osc.type = "sine";
  osc.frequency.value = melody[noteIndex % melody.length];
  filter.type = "lowpass";
  filter.frequency.value = 900;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.035, now + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + 0.7);
  noteIndex++;
}
async function toggleMusic() {
  if (!musicOn) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) { showToast("This browser does not support background audio."); return; }
    audioContext = audioContext || new AudioCtx();
    if (audioContext.state === "suspended") await audioContext.resume();
    musicOn = true;
    playNote();
    musicTimer = window.setInterval(playNote, 720);
    soundToggle.setAttribute("aria-pressed", "true");
    soundLabel.textContent = "Sound on";
    soundIcon.textContent = "♫";
    showToast("Ambient music on ♫");
  } else {
    musicOn = false;
    window.clearInterval(musicTimer);
    musicTimer = null;
    soundToggle.setAttribute("aria-pressed", "false");
    soundLabel.textContent = "Sound off";
    soundIcon.textContent = "♪";
    showToast("Sound off");
  }
}
soundToggle.addEventListener("click", toggleMusic);

let toastTimeout;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 2400);
}
