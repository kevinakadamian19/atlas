import React from 'react';
import ReactDOM from 'react-dom';
import SubmitFormError from './SubmitFormError';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SubmitFormError />, div);
  ReactDOM.unmountComponentAtNode(div);
});
