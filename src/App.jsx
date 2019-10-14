import React, { useEffect } from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import RouterContainer from './router';
import stores from './stores'
import { enquireScreen, unenquireScreen } from 'enquire-js';
import './App.less'

const mediaRule = {
  isMobile: 'screen and (max-width: 599px)',
  isTablet: 'screen and (min-width: 600px) and (max-width: 679px)',
  isDesktop: 'screen and (min-width: 680px)'
}

function ScrollToTop({children, location}) {
  useEffect(() => {
    window &&
    window.scrollTo &&
    window.scrollTo(0, 0);
  }, [location])
  return children;
}
function App() {
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
  return (
    <Router className="App">
      <ScrollToTop>
        <RouterContainer />
      </ScrollToTop>
    </Router>
  );
}

export default App;
