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

// if you want to run the callback at the biginning
function setAdvancedInterval(callBackFunction, interval, runOnStart = true) {
  if (runOnStart) {
    callBackFunction()
  }
  return setInterval(() => {
    callBackFunction()
  }, interval)
}

export { shuffle, setAdvancedInterval }
