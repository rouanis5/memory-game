// it returns an object after converting the value (url) to an audio object
function setAudios(audioObject) {
  const audios = audioObject
  if (!audios) return {} // stop if there are no audios

  Object.entries(audios).forEach(([title, url]) => {
    // audios[title] = new Audio(new URL(`../${url}`, import.meta.url).href)
    audios[title] = new Audio(url)
  })
  return audios
}

// stop audios
function stop(sound) {
  const audio = sound
  if (!(audio instanceof Audio)) return // stop if there is no audio
  audio.pause()
}

function stopAudios(audioObject) {
  const audios = audioObject
  if (!audios) return {} // stop if there are no audios

  Object.entries(audios).forEach(([title]) => {
    stop(audios[title])
  })
  return {}
}

// play the sound correctly with parameters of delay and loop
function play(sound, { delay = 0, loop = false } = {}) {
  const audio = sound
  if (!(audio instanceof Audio)) return // stop if there is no audio

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

export { play, setAudios, stopAudios, stop }
