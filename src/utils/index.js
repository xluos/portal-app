
/**
 * 通用过滤router函数
 *
 * @param {*} routerData 原始数据
 * @param {*} filterfunc 判断是否过滤的函数
 * @param {*} params 剩余参数
 * @returns
 */
function filterRouteData (routerData, filterfunc, params) {
  // 判断是否是分组的子菜单，单独处理
  if (routerData[0] && routerData[0].items) {
    return routerData.map(item => {
      return {
        ...item,
        items: filterRouteData(item.items, filterfunc, params)
      }
    })
  }
  // 正常处理其他的
  return routerData.reduce((accumulator, currentValue, currentIndex, array) => {
    let current = {
      value: currentValue,
      index: currentIndex,
      array: array
    }
    if (filterfunc(current, params)) {
      if (currentValue.children) {
        accumulator.push({
          ...currentValue,
          children: filterRouteData(currentValue.children, filterfunc, params)
        })
      } else {
        accumulator.push(currentValue)
      }
    }
    return accumulator
  }, [])
}


/**
 * 获取对应布局的路由
 *
 * @export
 * @param {*} routerData 总的路由数据
 * @param {string} [layout='admin'] 需要的布局
 * @returns 过滤布局后的路由数据
 */
export function getLayoutRoute (routerData, layout = 'admin') {
  return filterRouteData(routerData, (current, params) => {
    console.log(current, params, (current.value.layout === params.layout || (!current.value.layout && params.layout === 'admin')))
    return current.value.layout === params.layout || (!current.value.layout && params.layout === 'admin')
  }, {layout})
}


/**
 * 获取菜单的重定向地址
 *
 * @param {*} routerData 路由数据
 * @returns 重定向数据
 */
export function getRedirectData (routerData) {
  const redirectData = [];
  const getRedirect = (item) => {
    // 判断是否需要生成重定向数据 存在子项且没有对应组件的时候生成
    if (item && item.children && !item.component) {
      // 重定向到子菜单的第一个
      if (item.children[0] && item.children[0].path) {
        redirectData.push({
          from: `${item.path}`,
          to: `${item.children[0].path}`,
        });
        // 继续处理子菜单
        // 判断是否是分组的子菜单，单独处理
        if (item.children[0] && item.children[0].items) {
          item.children.forEach((subItem) => {
            subItem.items.forEach(getRedirect)
          });
        } else {
          item.children.forEach(getRedirect)
        }
      }
    }
  };
  routerData.forEach(getRedirect);

  routerData = redirectData.filter((item, index, arr) => {
    return arr.findIndex(_ => item.to === _.to) === index
  })
  return redirectData;
};


/**
 * 获取渲染路由的数据
 *
 * @export
 * @param {*} routerData
 * @returns
 */
export function getRanderRouteData (routerData) {
  const randerRouteData = [];
  const PathMap = new Map()
  const getRanderRoute = (item) => {
    // 
    if (item && item.path && item.component) {
      if (PathMap.has(item.path)) {
        console.warn(`path: ${item.path} repetition`)
      } else {
        PathMap.set(item.path, true)
        randerRouteData.push({
          path: item.path,
          component: item.component,
        });
      }
    }
    if (item.children && item.children.length) {
      // 继续处理子菜单
      // 判断是否是分组的子菜单，单独处理
      if (item.children[0] && item.children[0].items) {
        item.children.forEach((subItem) => {
          subItem.items.forEach(getRanderRoute)
        });
      } else {
        item.children.forEach(getRanderRoute)
      }
    }
  };
  
  routerData.forEach(getRanderRoute);

  return randerRouteData;
}

export function getAsideMenu (routerData, type = 'aside') {
  return filterRouteData(routerData, (current, params) => {
    // console.log(current, params)
    if (params.type === 'aside') {
      console.log(current, !current.disableAsideMenu)
      return !current.value.disableAsideMenu
    } else if (params.type === 'head') {
      return !current.value.disableHeaderMenu
    }
    return true
  }, {type})
}