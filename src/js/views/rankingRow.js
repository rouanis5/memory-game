import ViewBuilder from '../helpers/viewBuilder'
import { formatTime, formatDate } from '../helpers/functions'

export default function rankingRow(id, win, moves, wrong, time, date) {
  const view = new ViewBuilder()
  view.setHtml(`
  <tr>
    <td>${id}</td>
    <td class="${win === true ? 'winner' : 'loser'}"</td>
    <td>${moves}</td>
    <td>${wrong}</td>
    <td>${time ? formatTime(time) : ''}</td>
    <td>${date ? formatDate(date) : ''}</td>
  </tr>
  `)

  return view.build()
}
