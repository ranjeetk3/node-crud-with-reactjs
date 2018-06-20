import React, { Component } from 'react';

import Header from './components/Header/Header';
import MobileHeader from './components/MobileHeader/MobileHeader';

import { Provider } from 'react-redux';
import store from './store';

import './style/foundation.min.css';
import './style/custom.css';

import Routes from './routes';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      appName: 'Node CRUD via ReactJS'
    }
  }


  render() {
    return (
      <Provider store={store}>
        <div className="off-canvas-wrapper">
          <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>



            <div className="off-canvas-content" data-off-canvas-content>
              <MobileHeader name={this.state.appName} />
              <Header name={this.state.appName} />


              <Routes />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
