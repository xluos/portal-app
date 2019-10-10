import React, { useEffect } from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import RouterContainer from './router';
import './App.less'

function ScrollToTop({children, location}) {
  
  useEffect(() => {
    window &&
    window.scrollTo &&
    window.scrollTo(0, 0);
  }, [location])
  return children;
}

function App() {
  return (
    <Router className="App">
      <ScrollToTop>
        <RouterContainer />
      </ScrollToTop>
    </Router>
  );
}

export default App;
