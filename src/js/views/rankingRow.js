import ViewBuilder from '../helpers/viewBuilder'
import { formatTime, formatDate } from '../helpers/functions'

export default function rankRow(id, win, moves, accuracy, time, date) {
  const view = new ViewBuilder()
  view.setHtml(`
  <tr>
    <td>${id || '#'}</td>
    <td class="${win === true ? 'winner' : 'loser'}"</td>
    <td>${moves || '#'}</td>
    <td>${accuracy || 0}%</td>
    <td>${time ? formatTime(time) : 'HH:mm:SS'}</td>
    <td>${date ? formatDate(date) : 'YYYY-MM-DD'}</td>
  </tr>
  `)

  return view.build()
}
