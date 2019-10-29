import md5 from 'md5'

/**
 * 通用过滤router函数
 *
 * @param {*} routerData 原始数据
 * @param {*} filterfunc 判断是否过滤的函数
 * @param {*} params 剩余参数
 * @param {*} filterData 重写需要过滤的数据的
 * @param {*} parent 不同层级递归向下传递的数据
 * @returns
 */
function filterRouteData ({routerData, filterfunc, params, filterData, isHashMap = false}) {
  let routeHashMap = {}
  function pushValue(value, filterData, parentData) {
    if (typeof filterData === 'function') {
      return this.push(filterData(value, parentData))
    }
    return this.push(value)
  }
  function filterRoute ({routerData, filterfunc, params, filterData , parentData = [], isHashMap = false}) {
    // console.log('parentData', parentData)
    // 判断是否是分组的子菜单，单独处理
    if (routerData[0] && routerData[0].items) {
      return routerData.map(item => {
        return {
          ...item,
          key: md5(item.groupTitle + Math.random()),
          items: filterRoute({routerData: item.items, filterfunc, params, parentData, isHashMap})
        }
      })
    }
    // 正常处理其他的
    return routerData.reduce((accumulator, currentValue, currentIndex, array) => {
      if (!currentValue.key) {
        currentValue.key = currentValue.name + '--' + md5(currentValue.name + currentValue.path)
      }
      if (isHashMap) {
        // console.log('currentValue.path', currentValue.path, 'parentData', parentData)
        if (routeHashMap[currentValue.path]) {
          console.warn(`path: ${currentValue.path} 重复`)
        }
        routeHashMap[currentValue.path] = {
          menu: parentData,
          key: currentValue.key
        }
      }
      let current = {
        value: currentValue,
        index: currentIndex,
        array: array
      }
      if (filterfunc(current, params)) {
        if (currentValue.children) {
          pushValue.call(accumulator, {
            ...currentValue,
            children: filterRoute({routerData: currentValue.children, params, filterfunc, parentData: [...parentData, currentValue.key], isHashMap})
          }, filterData, parentData)
        } else {
          pushValue.call(accumulator, currentValue, filterData, parentData)
        }
      }
      return accumulator
    }, [])
  }
  const data = filterRoute({routerData, filterfunc, params, filterData , isHashMap})

  if (isHashMap) {
    return {
      data,
      hashMap: routeHashMap
    }
  }
  return data
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
  return filterRouteData({
    routerData, 
    filterfunc: (current, params) => {
      return current.value.layout === params.layout || (!current.value.layout && params.layout === 'admin')
    }, 
    params: {layout}
  })
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

/**
 * 获取菜单数据
 *
 * @export
 * @param {*} routerData
 * @param {string} [type='aside']
 * @returns
 */
export function getAsideMenu (routerData, type = 'aside') {
  // debugger
  // eslint-disable-next-line
  let menuRoute = filterRouteData({
    routerData, 
    filterfunc: (current, params) => {
      // console.log(current, params)
      if (params.type === 'aside') {
        return !current.value.disableAsideMenu
      } else if (params.type === 'head') {
        return !current.value.disableHeaderMenu
      }
      return true
    },
    filterData: (value, parent) => {
      return value
    },
    isHashMap: true,
    params: {type}
  })
  return menuRoute
}