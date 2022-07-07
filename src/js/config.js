import { setAudios } from './helpers/audio'
import Timer from './helpers/timer'

const state = {
  moves: 0,
  matched: 0,
  wrong: 0,
  time: undefined,
  date: undefined,
  running: false,
  win: false,
}

const params = {
  icons: ['🤑', '🔥', '🤖', '🐸', '🦜', '🦋', '⚽', '💎'],
  delay: 600, // set default delay (= sass delay)
  maxTries: 8, // max tries
  timer: new Timer(),
  cardIdAttr: 'data-card-id',
  music: true,
  localStorageKey: 'memory-game-state-date-2022-07-06',
}

const audio = setAudios({
  reward: new URL('../audio/game_reward.mp3', import.meta.url).href,
  sanction: new URL('../audio/game_sanction.mp3', import.meta.url).href,
  over: new URL('../audio/game_over.mp3', import.meta.url).href,
  running: new URL('../audio/game_running.mp3', import.meta.url).href,
  win: new URL('../audio/game_win.mp3', import.meta.url).href,
})

export { state, params, audio }
