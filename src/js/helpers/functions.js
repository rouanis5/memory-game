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

function formatTime(milliseconds) {
  const d = new Date(milliseconds)
  const hours = `${d.getHours()}`
  const minutes = `${d.getMinutes()}`
  const seconds = `${d.getSeconds()}`
  let milis = `${d.getMilliseconds()}`
  if (milis.length < 2) {
    milis = `00${milis}`
  } else if (milis.length < 3) {
    milis = `0${milis}`
  }
  const time = [hours, minutes, seconds]
  time.forEach((el, i) => {
    // eslint-disable-next-line no-param-reassign
    if (el.length < 2) time[i] = `0${el}`
  })

  return [...time, milis].join(':')
}

// format date YYYY-MM-DD
function formatDate(date) {
  const d = new Date(date)
  let month = `${d.getMonth() + 1}`
  let day = `${d.getDate()}`
  const year = d.getFullYear()

  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`

  return [year, month, day].join('-')
}

export { shuffle, setAdvancedInterval, formatTime, formatDate }
