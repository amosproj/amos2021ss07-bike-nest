import React from 'react';
import renderer from 'react-test-renderer';
import PaymentScreen from '../screens/PaymentScreen';

it('renders correctly', () => {
    const params = { state: jest.fn(), name: jest.fn(), slots: jest.fn(), time: jest.fn() };
    const tree = renderer
        .create(<PaymentScreen route={{ params }} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});