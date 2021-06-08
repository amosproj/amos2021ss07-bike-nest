import React from 'react';
import renderer from 'react-test-renderer';
import PaymentConfirmationScreen from '../screens/PaymentConfirmationScreen';

it('renders correctly', () => {
    const tree = renderer
        .create(<PaymentConfirmationScreen />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});