import boardView from './views/board'
import { play, stopAudios, stop as pause } from './helpers/audio'
import { setAdvancedInterval } from './helpers/functions'
import { state as stateNative, params, audio as audioNative } from './config'
import getIcons from './helpers/icons'
import ranking from './views/ranking'

let state = { ...stateNative } // create a copy of state
let audio = params.music ? { ...audioNative } : {} // copy audio if music is allowed

// local storage variables
const localStateKey = params.localStorageKey
const localState = localStorage.getItem(localStateKey)
let data = localState ? JSON.parse(localState) : []

let interval = null
const { cardIdAttr: idAttr } = params // id attaribute

const selectors = {
  board: document.getElementById('board'),
  welcom: document.getElementById('welcom'),
  game: document.getElementById('game'),
  ranking: document.getElementById('rankingView'),

  sidebar: {
    start: document.getElementById('start'),
    stop: document.getElementById('stop'),
    restart: document.getElementById('restart'),
    music: document.getElementById('music'),
    ranking: document.getElementById('rankingBtn'),
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

// hide all board children and chose which one to display
function resetBoardChildren(childToDisplay = null) {
  const child = childToDisplay
  Array.from(selectors.board.children).map((el) => el.classList.add('d-none'))
  if (child) child.classList.remove('d-none')
}

function stopGame() {
  // set of actions to run
  state.running = false
  params.timer.stop() // stop the timer
  clearInterval(interval) // stop updating time on the screen
  pause(audio.running) // stop running audio
  selectors.game.classList.add('freeze') // stop all events on the game board
  selectors.sidebar.stop.classList.add('freeze', 'disabled') // freeze btn
}

// save data to localstorage
function saveGame(isWin = false) {
  state.win = isWin
  state.time = params.timer.getMilliseconds() // save the game time in state.time
  state.running = undefined
  data = [{ ...state }, ...data]
  localStorage.setItem(localStateKey, JSON.stringify(data))
  state = { ...stateNative } // reset state
  state.running = false
}

// check if the game is finished
function isGameOver() {
  // if you win the game
  if (state.matched === params.icons.length) {
    stopGame()
    saveGame(true)
    play(audio.win) //
    return
  }

  // if you lose the game
  if (state.wrong === params.maxTries) {
    stopGame()
    saveGame()
    play(audio.over, { delay: params.delay })
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
  // save new state
  state.running = true
  state.date = new Date().getTime() // save the current day

  // import the icons and create the board html
  const icons = getIcons(params.icons) // dublicate icons and shuffle them
  resetBoardChildren(selectors.game) // hide all board children and display game
  selectors.game.innerHTML = boardView(icons).html // fill board with cards

  // freeze start btn
  selectors.sidebar.start.classList.add('freeze', 'disabled')
  selectors.sidebar.ranking.classList.add('freeze', 'disabled')
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

function resetScreen(childToDisplay = null) {
  selectors.sidebar.start.classList.remove('freeze', 'disabled') // unfreeze start btn
  selectors.sidebar.ranking.classList.remove('freeze', 'disabled') // unfreeze
  selectors.sidebar.stop.classList.add('freeze', 'disabled') // freeze stop btn
  selectors.sidebar.restart.classList.add('freeze', 'disabled') // freeze retart btn

  // hide all board childrens
  resetBoardChildren(childToDisplay)

  // reset all numbers
  Object.entries(selectors.scores).forEach((el) => {
    // eslint-disable-next-line no-param-reassign
    el[1].textContent = '0'
  })

  selectors.game.innerHTML = '' // reset game
}

function stop() {
  stopGame()
  resetScreen(selectors.welcom) // display welecom section
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

function displayRanking() {
  selectors.ranking.innerHTML = ranking(data)
  resetBoardChildren(selectors.ranking) // display ranking table
}

selectors.sidebar.start.addEventListener('click', run)
selectors.sidebar.stop.addEventListener('click', stop)
selectors.sidebar.restart.addEventListener('click', restart)
selectors.sidebar.music.addEventListener('click', toggleMusic)
selectors.sidebar.ranking.addEventListener('click', displayRanking)
