import React from 'react';
import ReactDOM from 'react-dom';
import AthleteInfo from './AthleteInfo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AthleteInfo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
