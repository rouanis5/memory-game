import Data from '../classes/LocalStorageData'

export default class LocalStorageDataBuilder {
  constructor() {
    this.data = new Data()
  }

  setMusic(musicBool) {
    if (!(typeof musicBool === 'boolean')) {
      throw new Error('Whoops data.music is not a boolean')
    }
    this.data.music = musicBool
    return this
  }

  setStats(statsArray) {
    if (!(typeof statsArray === 'object')) {
      throw new Error('Whoops data.stats is not an array')
    }
    this.data.stats = statsArray
    return this
  }

  build() {
    return this.data
  }
}
