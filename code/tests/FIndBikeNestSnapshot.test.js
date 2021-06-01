import React from 'react';
import renderer from 'react-test-renderer';
import FindBikeNestScreen from '../screens/FindBikeNestScreen';

describe('<App />', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<FindBikeNestScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});