import template from './rankingTemplate'
import row from './rankingRow'

export default function ranking(data) {
  let html = ''
  data.forEach((el, index) => {
    const { moves, win, maxTries, wrong, time, date } = el
    const accuracy = Math.trunc(100 * (1 - wrong / maxTries))
    html += row(index + 1, win, moves, accuracy, time, date).html
  })
  if (!html) {
    html += row('', '', '', '', '').html.repeat(8)
  }
  return template(html).html
}
