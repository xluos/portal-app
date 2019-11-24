import { require } from './modules'

window.app = {
  require,
  routes: [],
  pushRoute (route) {
    if (this.routes.indexOf(route) === -1) {
      this.routes.push(route)
      return true
    }
    return false
  },
  render () {},
  start () {
    this.render()
  }
}

export default window.app