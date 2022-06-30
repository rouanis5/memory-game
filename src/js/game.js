import getIcons from './helpers/icons'
import boardView from './views/board'

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
      }
      setTimeout(() => {
        flipped.map((el) => el.classList.remove('flipped'))
      }, delay)
    }
  })
})
