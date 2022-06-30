import ViewBuilder from '../helpers/viewBuilder'
import card from './card'

export default function board(preparedIcons) {
  const icons = preparedIcons
  const view = new ViewBuilder()
  let html = ''
  icons.forEach((icon) => {
    html += card(icon.id, icon.content).html
  })
  return view.setHtml(html).build()
}
