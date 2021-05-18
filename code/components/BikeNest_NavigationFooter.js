import React from 'react';
import { View } from 'react-native';
import { mainStyles } from "../styles/MainStyles";
import BikeNest_Button, { ButtonStyle } from './BikeNest_Button';
import { useNavigation } from '@react-navigation/native';

export default function BikeNest_NavigationFooter() {
    const navigation = useNavigation();

    return (
        <View style={mainStyles.navigationBar}>
            <BikeNest_Button
                type={ButtonStyle.navigationBar}
                iconPath={require("../assets/icons/user.png")}
                text="Profil"
                onPress={() => navigation.navigate("Profile")}
            />
            <BikeNest_Button
                type={ButtonStyle.navigationBar}
                iconPath={require("../assets/icons/unlock.png")}
                text="(un)lock"
                onPress={() => navigation.navigate("LockManagement")}
            />
            <BikeNest_Button
                type={ButtonStyle.navigationBar}
                iconPath={require("../assets/icons/PlusCircle.png")}
                onPress={() => navigation.navigate("EditPersonalInformation")}
            />
            <BikeNest_Button
                type={ButtonStyle.navigationBar}
                iconPath={require("../assets/icons/map-pin.png")}
                text="Navigation"
                onPress={() => navigation.navigate("FindBikeNest")}
            />
            <BikeNest_Button
                type={ButtonStyle.navigationBar}
                iconPath={require("../assets/icons/clock.png")}
                text="Verlauf"
                onPress={() => navigation.navigate("History")}
            />
        </View>
    );
}


