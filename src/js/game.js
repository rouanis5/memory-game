import boardView from './views/board'
import { play, stopAudios, stop as pause } from './helpers/audio'
import { setAdvancedInterval } from './helpers/functions'
import { state as stateNative, params, audio as audioNative } from './config'
import getIcons from './helpers/icons'

let state = { ...stateNative } // create a copy of state
let audio = params.music ? { ...audioNative } : {} // copy audio if music is allowed

let interval = null
const { cardIdAttr: idAttr } = params // id attaribute

const selectors = {
  board: document.getElementById('board'),
  welcom: document.getElementById('welcom'),
  game: document.getElementById('game'),

  sidebar: {
    start: document.getElementById('start'),
    stop: document.getElementById('stop'),
    restart: document.getElementById('restart'),
    music: document.getElementById('music'),
  },

  scores: {
    moves: document.getElementById('moves'),
    matched: document.getElementById('matched'),
    remained: document.getElementById('remained'),
    time: document.getElementById('time'),
  },
}

// if music not  allowed add disabled class
selectors.sidebar.music.classList.toggle('disabled', params.music === false)

function stopGame() {
  // set of actions to run
  state.running = false
  params.timer.stop() // stop the timer
  clearInterval(interval) // stop updating time on the screen
  pause(audio.running) // stop running audio
  selectors.game.classList.add('freeze') // stop all events on the game board
  selectors.sidebar.stop.classList.add('freeze', 'disabled') // freeze btn
}

// check if the game is finished
function isGameOver() {
  // if you win the game
  if (state.matched === params.icons.length) {
    stopGame()
    play(audio.win) //
    state.win = true
    state.time = params.timer.getMilliseconds() // save the game time in state.time
    return
  }

  // if you lose the game
  if (state.wrong === params.maxTries) {
    stopGame()
    play(audio.over, { delay: params.delay })
    state.time = params.timer.getMilliseconds() // save the game time in state.time
  }
}

function analyse(cards) {
  const soundDelay = { delay: params.delay / 2 } // how much he will wait to run the sound

  // get all flipped card
  const flipped = cards.filter((el) => el.classList.contains('flipped'))

  // check if there is two flipped card
  if (flipped.length === 2) {
    state.moves += 1 // increase moves
    selectors.scores.moves.textContent = state.moves // display moves in the screen

    // unflip cards and wait a delay
    setTimeout(() => {
      flipped.map((el) => el.classList.remove('flipped'))
    }, params.delay)

    // check if they've same attr id
    if (flipped[0].getAttribute(idAttr) === flipped[1].getAttribute(idAttr)) {
      // rewards
      flipped.map((el) => el.classList.add('matched')) // add match class (display cards & remove event listner)
      play(audio.reward, soundDelay) // play the reward sound
      state.matched += 1 // increase matched cards
      selectors.scores.matched.textContent = state.matched // display it

      isGameOver() // check if the game finished
      return
    }

    // play sanction sound and inscrease wrong tries
    state.wrong += 1
    selectors.scores.remained.textContent = params.maxTries - state.wrong // display remaind tries
    play(audio.sanction, soundDelay)
    isGameOver() // check if the game finished
  }
}

function run() {
  state.running = true
  // import the icons and create the board html
  const icons = getIcons(params.icons) // dublicate icons and shuffle them
  Array.from(selectors.board.children).map((el) => el.classList.add('d-none'))
  selectors.game.classList.remove('d-none')
  selectors.game.innerHTML = boardView(icons).html // fill board with cards

  // freeze start btn
  selectors.sidebar.start.classList.add('freeze', 'disabled')
  // remove freezing events
  selectors.game.classList.remove('freeze')
  selectors.sidebar.stop.classList.remove('freeze', 'disabled')
  selectors.sidebar.restart.classList.remove('freeze', 'disabled')

  selectors.scores.remained.textContent = params.maxTries - state.wrong // display remaind tries

  play(audio.running, { loop: true }) // start infinite running sound
  params.timer.start() // start the timer

  // document.querySelectorAll('.card') is not working here !
  const cards = Array.from(selectors.game.children) // get all cards DOM

  // watch cards clicking event
  cards.forEach((card) => {
    card.addEventListener('click', async () => {
      card.classList.add('flipped')
      analyse(cards)
    })
  })

  // update the timer every  1000ms
  interval = setAdvancedInterval(() => {
    selectors.scores.time.textContent = Math.trunc(params.timer.getSeconds())
  }, 1000)
}

function resetScreen() {
  selectors.sidebar.start.classList.remove('freeze', 'disabled') // unfreeze start btn
  selectors.sidebar.stop.classList.add('freeze', 'disabled') // freeze stop btn
  selectors.sidebar.restart.classList.add('freeze', 'disabled') // freeze retart btn

  // hide all board childrens
  Array.from(selectors.board.children).map((el) => el.classList.add('d-none'))

  // reset all numbers
  Object.entries(selectors.scores).forEach((el) => {
    // eslint-disable-next-line no-param-reassign
    el[1].textContent = '0'
  })

  state = { ...stateNative } // reset sate
  selectors.game.innerHTML = '' // reset game
}

function stop() {
  stopGame()
  resetScreen()
  selectors.welcom.classList.remove('d-none') // display welecom section
}

function restart() {
  stopGame()
  resetScreen()
  run()
}

// run or stop music ()
function toggleMusic() {
  // delete audio
  if (params.music === true) {
    selectors.sidebar.music.classList.add('disabled')
    audio = stopAudios(audio)
    params.music = false
    return
  }

  selectors.sidebar.music.classList.remove('disabled')
  audio = { ...audioNative }
  params.music = true
  if (state.running) play(audio.running, { loop: true })
}

selectors.sidebar.start.addEventListener('click', run)
selectors.sidebar.stop.addEventListener('click', stop)
selectors.sidebar.restart.addEventListener('click', restart)
selectors.sidebar.music.addEventListener('click', toggleMusic)
