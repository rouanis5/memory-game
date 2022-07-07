import template from './rankingTemplate'
import row from './rankingRow'

export default function ranking(data) {
  let html = ''
  data.forEach((el, index) => {
    const { moves, win, wrong, time, date } = el
    html += row(index + 1, win, moves, wrong, time, date).html
  })
  if (!html) {
    html += row('', '', '', '', '').html.repeat(8)
  }
  return template(html).html
}
