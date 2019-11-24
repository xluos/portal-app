import React from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import RouterContainer from './router'
import ScrollToTop from './components/ScrollToTop'
import { subAppConfig } from './stores'
import { useMedia } from './utils/hook'
import './App.less'



function App({subAppConfig: config}) {
  console.log('App subconfig', config)
  useMedia()
  return (
    <Router className="App">
      <ScrollToTop>
        <subAppConfig.Provider value={config}>
          <RouterContainer />
        </subAppConfig.Provider>
      </ScrollToTop>
    </Router>
  );
}

export default App;
