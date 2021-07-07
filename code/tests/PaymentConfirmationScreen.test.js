import React from 'react';
import renderer from 'react-test-renderer';
import PaymentConfirmationScreen from '../screens/PaymentConfirmationScreen';

it('renders correctly', () => {
    const params = { bookingData: jest.fn() };
    const tree = renderer
        .create(<PaymentConfirmationScreen route={{ params }} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});