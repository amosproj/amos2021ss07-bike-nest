import React from 'react';
import renderer from 'react-test-renderer';
import BookingScreen from '../screens/BookingScreen';

it('renders correctly', () => {
    const params = { state: jest.fn(), nestID: jest.fn() };
    const tree = renderer
        .create(<BookingScreen route={{params}}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});