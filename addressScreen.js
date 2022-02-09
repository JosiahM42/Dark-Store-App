//https://github.com/react-native-maps/react-native-maps
import MapView from 'react-native-maps';
import React, { useState } from'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TextInput} from 'react-native';

export const AddressScreen = () => {
    return (
        <View>
            <MapView
                initialRegion={{
                latitude: 51.500986,
                longitude: -2.548292,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            />
        </View>
    )
}

export const styles = StyleSheet.create({
    // screenVerticalLayout: {
    //     flex: 1,
    //     alignItems: 'center',
    //     paddingTop: "25%",
    //     //justifyContent: 'center',
    //     //justifyContent: 'space-evenly',
    //     //flexDirection: 'column',
        
    // },
})