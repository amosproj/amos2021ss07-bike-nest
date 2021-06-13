import React from 'react';
import renderer from 'react-test-renderer';
import UnlockScreen from '../screens/UnlockScreen';

it('renders correctly', () => {
    const tree = renderer
        .create(<UnlockScreen />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
