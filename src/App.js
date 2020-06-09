import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Landing from './components/Landing/Landing';
import {Provider} from './components/Context/Context';
import MainRouter from './MainRouter';


function App() {
  return (
    <Provider>
      <Router>
      <div className="App">
        <MainRouter />
      </div>
      </Router>
    </Provider>
  );
}

export default App;
