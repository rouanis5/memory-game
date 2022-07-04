function shuffle(array) {
  const arr = array
  const tmp = []
  while (arr.length > 0) {
    const random = Math.floor(Math.random() * arr.length)
    tmp.push(arr[random])
    arr.splice(random, 1)
  }
  return tmp
}

// return the realpath (full url)
function realpath(stingURL) {
  const url = stingURL
  // the current folder is gonna be the js folder
  return new URL(`../${url}`, import.meta.url).href
}

// if you want to run the callback at the biginning
function setAdvancedInterval(callBackFunction, interval, runOnStart = true) {
  if (runOnStart) {
    callBackFunction()
  }
  return setInterval(() => {
    callBackFunction()
  }, interval)
}

export { shuffle, realpath, setAdvancedInterval }
