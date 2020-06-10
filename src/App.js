import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import Landing from './components/Landing/Landing';
import { Provider } from './components/Context/Context';
import MainRouter from './MainRouter';

const App = ({location}) => {
  return (
    <Provider>
      <Consumer>
        {({ dispatch }) => {
      
        <MainRouter />
     
       }}
      </Consumer>
    </Provider>
  );
}

export default withRouter(App);
