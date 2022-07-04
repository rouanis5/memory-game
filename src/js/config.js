import { setAudios } from './helpers/audio'
import { realpath } from './helpers/functions'
import Timer from './helpers/timer'
import getIcons from './helpers/icons'

const state = {
  moves: 0,
  matched: 0,
  wrong: 0,
  time: undefined,
  win: false,
}

const params = {
  // dublicate icons and shuffle them
  icons: getIcons(['🤑', '🔥', '🤖', '🐸', '🦜', '🦋', '⚽', '💎']),
  delay: 600, // set default delay (= sass delay)
  maxTries: 8, // max tries
  timer: new Timer(),
  cardIdAttr: 'data-card-id',
}

const audio = setAudios({
  reward: realpath('../audio/game_reward.mp3'),
  sanction: realpath('../audio/game_sanction.mp3'),
  over: realpath('../audio/game_over.mp3'),
  running: realpath('../audio/game_running.wav'),
})

export { state, params, audio }
