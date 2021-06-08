import React from 'react';
import renderer from 'react-test-renderer';
import PersonalInformationScreen from '../screens/PersonalInformationScreen';

it('renders correctly', () => {
    const tree = renderer
        .create(<PersonalInformationScreen />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});