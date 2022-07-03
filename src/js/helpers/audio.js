// it returns an object after converting the value (url) to an audio object
function setAudios(audioObject) {
  const audios = audioObject
  Object.entries(audios).forEach(([title, url]) => {
    // audios[title] = new Audio(new URL(`../${url}`, import.meta.url).href)
    audios[title] = new Audio(url)
  })
  return audios
}

// play the sound correctly with parameters of delay and loop
function play(sound, { delay = 0, loop = false }) {
  const audio = sound
  function runSound() {
    // take sure to start the sound from the begining
    audio.pause()
    audio.currentTime = 0
    audio.play()
  }

  // run the sound in infinite loop
  if (loop === true) {
    // take sure if the browser support loop
    if (typeof audio.loop === 'boolean') {
      audio.loop = true
    } else {
      audio.addEventListener('ended', runSound, false)
    }
  }

  // wait some time
  setTimeout(runSound, delay)
}

export { play, setAudios }
