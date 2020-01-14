import React from 'react';
import ReactDOM from 'react-dom';
import CompetitionScreen from './CompetitionScreen';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CompetitionScreen />, div);
  ReactDOM.unmountComponentAtNode(div);
});
