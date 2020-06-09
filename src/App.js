import React from 'react';
import Landing from './components/Landing/Landing';
import {Provider} from './components/Context/Context';

function App() {
  return (
    <Provider>
      <div className="App">
        <Landing />
      </div>
    </Provider>
  );
}

export default App;
