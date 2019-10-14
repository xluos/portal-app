export const MAX_WIDTH = 256
export const MIN_WIDTH = 80

export default {
  media: 'isDesktop',
  setMedia (val) {
    if (!['isDesktop', 'isTablet', 'isMobile'].includes(val)) return
    this.media = val
    this.cptSetAsideWidth(val)
  },
  
  collapsed: false,
  toggleCollapsed (val) {
    this.collapsed = val !== undefined ? val : !this.collapsed
    if (this.collapsed) {
      this.asideWidth = MIN_WIDTH
    } else {
      this.asideWidth = MAX_WIDTH
    }
  },

  asideWidth: MAX_WIDTH,
  setAsideWidth (val) {
    if (typeof val === 'number') {
      this.asideWidth = val
    }
  },
  cptSetAsideWidth (val) {
    switch (val) {
      case 'isDesktop':
        this.asideWidth = MAX_WIDTH
        this.toggleCollapsed(false)
        break;
      case 'isTablet':
        this.asideWidth = MIN_WIDTH
        this.toggleCollapsed(true)
        break;
      case 'isMobile':
        this.asideWidth = 0
        this.toggleCollapsed(true)
        break;
      default:
        break;
    }
  }  
};