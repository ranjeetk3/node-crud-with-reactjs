import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
       <div>
          <div className="callout primary">
            <div className="row column" id="Header">
              <h2>{this.props.name}</h2>
             
            </div>
          </div>
      </div>
    
    );
  }
}

export default Header;
