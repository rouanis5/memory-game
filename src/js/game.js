import getIcons from './helpers/icons'
import boardView from './views/board'
import { setAudios, play } from './helpers/audio'
import { realpath } from './helpers/functions'

const audio = setAudios({
  reward: realpath('../audio/game_reward.mp3'),
  sanction: realpath('../audio/game_sanction.mp3'),
  over: realpath('../audio/game_over.mp3'),
  running: realpath('../audio/game_running.wav'),
})

// set default delay (the same with sass transition delay)
const delay = 600

const icons = ['🤑', '🔥', '🤖', '🐸', '🦜', '🦋', '⚽', '💎']
const copy = getIcons(icons)
const { html } = boardView(copy)

const board = document.getElementById('board')
board.innerHTML = html

// document.querySelectorAll('.card') is not working here !
const btns = Array.from(board.children)

btns.forEach((btn) => {
  btn.getAttribute('data-card-id')
  btn.addEventListener('click', async () => {
    btn.classList.toggle('flipped')
    const flipped = btns.filter((el) => el.classList.contains('flipped'))
    if (flipped.length === 2) {
      if (
        flipped[0].getAttribute('data-card-id') ===
        flipped[1].getAttribute('data-card-id')
      ) {
        flipped.map((el) => el.classList.add('matched'))
        play(audio.reward, {
          delay: delay / 2,
        })
      } else {
        play(audio.sanction, {
          delay: delay / 2,
        })
      }
      setTimeout(() => {
        flipped.map((el) => el.classList.remove('flipped'))
      }, delay)
    }
  })
})
