import React from 'react';
import renderer from 'react-test-renderer';
import ReservationSuccessScreen from '../screens/ReservationSuccessScreen';

it('renders correctly', () => {
    const params = { state: jest.fn(), name: jest.fn() };
    const tree = renderer
        .create(<ReservationSuccessScreen route={{params}}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});