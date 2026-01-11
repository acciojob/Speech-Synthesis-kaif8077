// Your script here.
<script>
  const msg = new SpeechSynthesisUtterance();
  let voices = [];

  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');
  const textArea = document.querySelector('[name="text"]');

  msg.text = textArea.value;

  function populateVoices() {
    voices = window.speechSynthesis.getVoices();

    if (!voices.length) {
      voicesDropdown.innerHTML = `<option>No voices available</option>`;
      return;
    }

    voicesDropdown.innerHTML = voices
      .map(
        voice =>
          `<option value="${voice.name}">
            ${voice.name} (${voice.lang})
          </option>`
      )
      .join('');
  }

  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    restartSpeech();
  }

  function restartSpeech() {
    speechSynthesis.cancel();
    if (msg.text.trim() !== '') {
      speechSynthesis.speak(msg);
    }
  }

  function speak() {
    if (textArea.value.trim() === '') return;
    msg.text = textArea.value;
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
  }

  function stop() {
    speechSynthesis.cancel();
  }

  function setOption() {
    msg[this.name] = this.value;
    restartSpeech();
  }

  speechSynthesis.addEventListener('voiceschanged', populateVoices);

  voicesDropdown.addEventListener('change', setVoice);
  speakButton.addEventListener('click', speak);
  stopButton.addEventListener('click', stop);
  options.forEach(option => option.addEventListener('change', setOption));
</script>
