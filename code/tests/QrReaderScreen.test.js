import React from 'react';
import renderer from 'react-test-renderer';
import QrReaderScreen from '../screens/QrReaderScreen';

it('renders correctly', () => {
    const tree = renderer
        .create(<QrReaderScreen />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});