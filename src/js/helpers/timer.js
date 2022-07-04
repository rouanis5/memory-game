export default class Timer {
  constructor() {
    this.time = 0
    this.current = 0
    this.timer = null
  }

  start() {
    this.time = new Date()
  }

  stop() {
    clearInterval(this.timer)
  }

  #calcDifference() {
    this.current = new Date()
    return new Date(this.current - this.time)
  }

  getMilliseconds() {
    return this.#calcDifference().getTime()
  }

  getSeconds() {
    return this.#calcDifference().getTime() / 1000
  }

  // return HH:MM:SS:mm
  getFormated() {
    const d = this.#calcDifference()
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
}
