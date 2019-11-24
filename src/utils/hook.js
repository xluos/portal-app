import { useEffect } from 'react'
import stores from '../stores'
import { enquireScreen, unenquireScreen } from 'enquire-js';

export function useMedia () {
  const mediaRule = {
    isMobile: 'screen and (max-width: 599px)',
    isTablet: 'screen and (min-width: 600px) and (max-width: 679px)',
    isDesktop: 'screen and (min-width: 680px)'
  }
  let { setMedia } = stores.useStore('common')
  useEffect(() => {
    let handleMobile = enquireScreen((bool) => { bool && setMedia('isMobile')}, mediaRule.isMobile)
    let handleTablet = enquireScreen((bool) => { bool && setMedia('isTablet')}, mediaRule.isTablet)
    let handleDesktop = enquireScreen((bool) => { bool && setMedia('isDesktop')}, mediaRule.isDesktop)
    return () => {
      unenquireScreen(handleMobile, mediaRule.isMobile)
      unenquireScreen(handleTablet, mediaRule.isTablet)
      unenquireScreen(handleDesktop, mediaRule.isDesktop)
    }
  // eslint-disable-next-line
  }, [])
}