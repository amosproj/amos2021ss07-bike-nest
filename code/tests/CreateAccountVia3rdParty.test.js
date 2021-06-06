import React from 'react';
import renderer from 'react-test-renderer';
import { CreateAccountVia3rdParty } from '../components/CreateAccountVia3rdParty';

it('renders correctly', () => {
  const tree = renderer
    .create(<CreateAccountVia3rdParty />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});