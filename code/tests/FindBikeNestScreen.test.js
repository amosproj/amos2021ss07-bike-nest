import React from 'react';
import renderer from 'react-test-renderer';
import FindBikeNestScreen from '../screens/FindBikeNestScreen';

it('renders correctly', () => {
  const tree = renderer
    .create(<FindBikeNestScreen />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});