import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from './components/Context/Context';
import MainRouter from './MainRouter';
import { BlogProvider } from './components/Context/BlogContext';

function App() {
  return (
    <Provider>
      <BlogProvider>
        <Router>
          <MainRouter />
        </Router>
      </BlogProvider>
    </Provider>
  );
}

export default App;
