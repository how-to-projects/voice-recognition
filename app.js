// https://www.youtube.com/watch?v=lq7tFgvdf4k

const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const speechSynthesis = window.speechSynthesis;
let changeBackground;
let newBackgroundColor;

// speech recognize array
const greetings = [
    'Im doing good', 
    'Doing good, mo fo', 
    'leave me alone'
];

try {

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
        console.log('voice is activated, you can test microphone');
    }    

    // when talking stops, this executes
    recognition.onresult = (event) =>{
        
        const currentText = event.resultIndex;
        const transcript = event.results[currentText][0].transcript;

        content.textContent = transcript;
        readOutLoud(transcript);
    }

    btn.addEventListener('click', () => {
        recognition.start();
    });

    readOutLoud = (message) => {
        const speech = new SpeechSynthesisUtterance();

        const voices = [
            'Microsoft Zira Desktop - English (United States)',
          ];

        const foundVoice = speechSynthesis.getVoices()
            .find(({ name }) => voices.includes(name));
   
            // speech.text = 'I dont know what you said';

            // respond to a specific thing
          if (message.includes('how are you')) {
              const finalText = greetings[Math.floor(Math.random() * greetings.length)];
              speech.text = finalText;
          }

          const bg = document.querySelector('.main');

          if (message.includes('background black')) {
            changeBackground = true;
            newBackgroundColor = 'black';
            speech.text = 'OK, changing background to black';
          }

          if (message.includes('background white')) {
            changeBackground = true;
            newBackgroundColor = 'white';
            speech.text = 'OK, changing background to white';
          }

        speech.voice = foundVoice;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        speech.onend = () => {
          console.log('end');
          if (changeBackground) {
            bg.style.backgroundColor = newBackgroundColor;
            content.style.color = invertColor('#000', true);
            changeBackground = false;
          }
          
        };
        speechSynthesis.speak(speech);
    }

} catch (error) {
   console.error(error);
}

invertColor = (hex, bw) => {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
  }
  var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
      // http://stackoverflow.com/a/3943023/112731
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186
          ? '#000000'
          : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
}