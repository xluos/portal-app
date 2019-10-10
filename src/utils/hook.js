import { useState, useEffect } from 'react';
import { enquireScreen, unenquireScreen } from 'enquire-js';

const media = {
  isMobile: 'screen and (max-width: 720px)',
  isTablet: 'screen and (min-width: 721px) and (max-width: 1199px)',
  isDesktop: 'screen and (min-width: 1200px)'
}

export function useMedia(defaultMedia = 'isDesktop') {
  let [mediaType, setMediaType] = useState(defaultMedia)
  useEffect(() => {
    let handleMobile = enquireScreen(() => setMediaType('isMobile'), media.isMobile)
    let handleTablet = enquireScreen(() => setMediaType('isTablet'), media.isTablet)
    let handleDesktop = enquireScreen(() => setMediaType('isDesktop'), media.isDesktop)
    return () => {
      unenquireScreen(handleMobile)
      unenquireScreen(handleTablet)
      unenquireScreen(handleDesktop)
    }
  })
  return mediaType
}