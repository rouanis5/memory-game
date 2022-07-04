import ViewBuilder from '../helpers/viewBuilder'
import { params as p } from '../config'

export default function card(id, icon) {
  const CurrIcon = icon
  const CurrId = id
  const view = new ViewBuilder()
  view.setTitle('card')
  view.setHtml(`
  <div class="card" ${p.cardIdAttr}="${CurrId}">
      <div class="card-front"></div>
      <div class="card-back">${CurrIcon}</div>
  </div>
  `)
  return view.build()
}
