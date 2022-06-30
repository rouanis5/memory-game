import View from './view'

export default class ViewBuilder {
  constructor() {
    this.view = new View()
  }

  setTitle(title) {
    this.view.title = title
    return this
  }

  setHtml(html) {
    this.view.html = html
    return this
  }

  build() {
    return this.view
  }
}
