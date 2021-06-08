import React from 'react';
import renderer from 'react-test-renderer';
import { CreateAccountScreen } from '../screens/CreateAccountScreen';

it('renders correctly', () => {
  const tree = renderer
    .create(<CreateAccountScreen />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});