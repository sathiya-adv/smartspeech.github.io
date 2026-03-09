let recognition;
let transcript = "";

if ('webkitSpeechRecognition' in window) {

recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-US";

recognition.onresult = function(event) {

transcript = "";

for (let i = 0; i < event.results.length; i++) {
transcript += event.results[i][0].transcript;
}

document.getElementById("speechText").value = transcript;

}

}

document.getElementById("startBtn").onclick = () =>{
recognition.start();
}

document.getElementById("stopBtn").onclick = () =>{
recognition.stop();
}

document.getElementById("analyzeBtn").onclick = async () =>{

let text = document.getElementById("speechText").value;

let response = await fetch("/analyze",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({text:text})
})

let data = await response.json();

document.getElementById("feedback").innerText = data.feedback;

}
