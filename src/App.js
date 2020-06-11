import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from './components/Context/Context';
import MainRouter from './MainRouter';

function App() {
  return (
    <Provider>
      <Router>
        <MainRouter />
      </Router>
    </Provider>
  );
}

export default App;
