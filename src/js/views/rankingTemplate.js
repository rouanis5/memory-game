import ViewBuilder from '../helpers/viewBuilder'

export default function rankingTemplate(rowsHtml) {
  // html like:
  // <tr>
  //   <td>1</td>
  //   <td>15</td>
  //   <td>3</td>
  //   <td>00:00:02:385</td>
  //   <td></td>
  // </tr>
  const view = new ViewBuilder()
  view.setHtml(`
  <table>
    <thead>
      <th>id</th>
      <th>win</th>
      <th>moves</th>
      <th>accuracy</th>
      <th>time</th>
      <th>date</th>
    </thead>
    <tbody>${rowsHtml}</tbody>
  </table>
  `)

  return view.build()
}
