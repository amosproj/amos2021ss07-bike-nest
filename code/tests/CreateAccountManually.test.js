import React from 'react';
import renderer from 'react-test-renderer';
import { CreateAccountManually } from '../components/CreateAccountManually';

it('renders correctly', () => {
  const tree = renderer
    .create(<CreateAccountManually />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});