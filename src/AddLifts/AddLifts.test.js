import React from 'react';
import ReactDOM from 'react-dom';
import AddLifts from './AddLifts';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddLifts />, div);
  ReactDOM.unmountComponentAtNode(div);
});
