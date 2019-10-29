export const MAX_WIDTH = 256
export const MIN_WIDTH = 80

export default {
  media: 'isDesktop',
  setMedia (val) {
    // 为了避免多次渲染 暂时先用拷贝写法
    function cptSetAsideWidth (val) {
      function toggleCollapsed (val) {
        this.collapsed = val !== undefined ? val : !this.collapsed
        if (this.collapsed) {
          this.asideWidth = MIN_WIDTH
        } else {
          this.asideWidth = MAX_WIDTH
        }
      }
      switch (val) {
        case 'isDesktop':
          this.asideWidth = MAX_WIDTH
          toggleCollapsed.call(this, false)
          break;
        case 'isTablet':
          this.asideWidth = MIN_WIDTH
          toggleCollapsed.call(this, true)
          break;
        case 'isMobile':
          this.asideWidth = 0
          toggleCollapsed.call(this, true)
          break;
        default:
          break;
      }
    } 
    if (!['isDesktop', 'isTablet', 'isMobile'].includes(val)) return
    this.media = val
    cptSetAsideWidth.call(this, val)
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