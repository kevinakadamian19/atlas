import React from 'react';
import ReactDOM from 'react-dom';
import EventScreen from './EventScreen';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EventScreen />, div);
  ReactDOM.unmountComponentAtNode(div);
});
