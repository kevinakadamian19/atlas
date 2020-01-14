import React from 'react';
import ReactDOM from 'react-dom';
import Athletes from './Athletes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Athletes />, div);
  ReactDOM.unmountComponentAtNode(div);
});
