import React from 'react';
import ReactDOM from 'react-dom';
import MobileHeader from './MobileHeader';

it('Footer renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MobileHeader />, div);
});
