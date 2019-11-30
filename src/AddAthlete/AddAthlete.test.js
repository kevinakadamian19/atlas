import React from 'react';
import ReactDOM from 'react-dom';
import AddAthlete from './AddAthlete';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddAthlete />, div);
  ReactDOM.unmountComponentAtNode(div);
});
