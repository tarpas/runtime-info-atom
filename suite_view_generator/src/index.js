import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
require('raf-polyfill');
require('./styles/index.scss');
require('./simulation.js');

// Render Setup
const rootNode = document.getElementById('root');

const render = () => {
  const App = require('./app.jsx').default;
  ReactDOM.render(
    <AppContainer>
        <App />
    </AppContainer>,
    rootNode
  );
};

// Development Tools
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
  if (module.hot) {
    module.hot.accept('./app.jsx', () => { render(); });
  }
}

render();
