const metinGir = document.getElementById('msg');
const btn = document.querySelector(".btnKopyala")
const btnOku = document.querySelector(".oku")

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  clearTimeout(timeoutID)
  writeMessage(msg);
}

let timeoutID = 0;

function writeMessage(msg) {
    
  metinGir.innerHTML = `
    <h2 class="soyle1">Söylediklerin</h2>
    <span class="box">${msg}</span>
    <div class="bar"></div>
  `;  

  timeoutID = setTimeout(()=>{
    let bir = document.querySelector(".box")
    bir.innerHTML = ""

    let bar = document.querySelector(".bar");
    bar.style.animation = "";
    void bar.offsetWidth;
    bar.style.animation = "progressAnimation 15s linear forwards";
  },15000)
}

recognition.addEventListener('result', onSpeak);

recognition.addEventListener('end', () => recognition.start());

function kopyala(){
    let bir = document.querySelector(".box")
    bir.style.borderColor = "#42b883";

    setTimeout(()=>{
      bir.style.borderColor = "#dcd9d9";
    }, 1000)

    let textToCopy = bir.textContent;
    navigator.clipboard.writeText(textToCopy)
}

btn.addEventListener("click", kopyala)

const message = new SpeechSynthesisUtterance()

function setTextMessage(text){
  message.text = text;
}

function speakText(){
  speechSynthesis.speak(message)
}

btnOku.addEventListener("click", function(){
    let bir = document.querySelector(".box")
    setTextMessage(bir.textContent)
    speakText()
})