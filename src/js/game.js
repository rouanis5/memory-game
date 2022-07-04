import boardView from './views/board'
import { play } from './helpers/audio'
import { setAdvancedInterval } from './helpers/functions'
import { state, params, audio } from './config'
import getIcons from './helpers/icons'

let interval = null
const { cardIdAttr: idAttr } = params // id attaribute

const selectors = {
  moves: document.getElementById('moves'),
  board: document.getElementById('board'),
  game: document.getElementById('game'),
  time: document.getElementById('time'),
  start: document.getElementById('start'),
  matched: document.getElementById('matched'),
  remained: document.getElementById('remained'),
}

// check if the game is finished
function isGameOver() {
  function actions() {
    // set of actions to run
    params.timer.stop() // stop the timer
    clearInterval(interval) // stop updating time on the screen
    audio.running.pause() // stop running audio
    selectors.board.classList.add('freeze') // stop all events on the game board

    state.time = params.timer.getMilliseconds() // save the game time in state.time
  }

  // if you win the game
  if (state.matched === params.icons.length) {
    state.win = true
    actions()
    return
  }

  // if you lose the game
  if (state.wrong === params.maxTries) {
    play(audio.over, { delay: params.delay })
    actions()
  }
}

function analyse(cards) {
  const soundDelay = { delay: params.delay / 2 } // how much he will wait to run the sound

  // get all flipped card
  const flipped = cards.filter((el) => el.classList.contains('flipped'))

  // check if there is two flipped card
  if (flipped.length === 2) {
    state.moves += 1 // increase moves
    selectors.moves.textContent = state.moves // display moves in the screen

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
      selectors.matched.textContent = state.matched // display it

      isGameOver() // check if the game finished
      return
    }

    // play sanction sound and inscrease wrong tries
    state.wrong += 1
    selectors.remained.textContent = params.maxTries - state.wrong // display remaind tries
    play(audio.sanction, soundDelay)
    isGameOver() // check if the game finished
  }
}

function run() {
  // import the icons and create the board html
  const icons = getIcons(params.icons) // dublicate icons and shuffle them
  Array.from(selectors.board.children).map((el) => el.classList.add('d-none'))
  selectors.game.classList.remove('d-none')
  selectors.game.innerHTML = boardView(icons).html // fill board with cards

  selectors.remained.textContent = params.maxTries - state.wrong // display remaind tries

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
    selectors.time.textContent = Math.trunc(params.timer.getSeconds())
  }, 1000)
}

selectors.start.addEventListener('click', run)
