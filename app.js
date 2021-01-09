// https://www.youtube.com/watch?v=lq7tFgvdf4k

const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const speechSynthesis = window.speechSynthesis;

// speech recognize array
const greetings = ['I\'m doing good', 'Doing good, mo fo', 'leave me alone'];
// const weather

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
        // const voices = [
        //     "Google UK English Female",
        //     'Microsoft Zira Desktop - English (United States)'
        //   ];

        // const voice = 'Google UK English Female';
        
        // const foundVoice = speechSynthesis.getVoices().find(({ voice }) => voices.includes(voice));
        const maleVoices = [
            'Google US English Male',
            'Microsoft David Desktop - English (United States)',
          ];
          const foundVoice = speechSynthesis.getVoices()
            .find(({ name }) => maleVoices.includes(name));
          console.log('speaking');
          speechSynthesis.cancel(); // sometimes needed due to Chrome's buggy implementation
        console.log(foundVoice);
        console.log(speechSynthesis.getVoices());

        const speech = new SpeechSynthesisUtterance();
       // speech.voice = foundVoice;
        speech.voiceGene
        speech.text = message;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;

        speechSynthesis.speak(speech);
    }

} catch (error) {
   console.error(error);
}