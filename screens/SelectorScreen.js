/*
    Author:  Josiah Murray
    Date Started: 06/08/2021
*/

import React, { useEffect } from'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/firebaseConfig';
/*
    Function Name: SelectorScreen
    Function Description: Defines the contents of the Sign In/ Sign Up screen
    Arguments: N/A
*/

export const SelectorScreen = () => {
     
    const screenNavigate = useNavigation();

    return (
        <View style={{flex:1}}>

            <View style={styles.screenVerticalLayout}>
                <View style={styles.imagePlaceholder}>
                    <Image source={require('../assets/circle-tick.png')}/>
                </View>
                <Text style={styles.mainText}>Congrats, we deliver to your area.{"\n\n"} Now you can {"\n"}order the food you want, when you want and in whatever quantity you want.</Text>
            </View>

            <View style={styles.screenHorizontalLayout}>
                <TouchableHighlight
                    onPress={() => screenNavigate.navigate('SignUp')}
                    style={styles.button}
                    underlayColor="#DDDDDD"
                    backgroundColor="#99D98C"
                >
                    <Text style={styles.textButton}>Sign Up</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => screenNavigate.navigate('SignIn')}
                    style={styles.button}
                    underlayColor="#DDDDDD"
                >
                    <Text style={styles.textButton}>Sign In</Text>
                </TouchableHighlight>
            </View>
        </View>

        
    );
};

export const styles = StyleSheet.create({
    screenVerticalLayout: {
        flex: 1,
        alignItems: 'center', 
    },
    mainText: {
        position:'absolute',
        padding: "16%",
        top: "25%",
        fontSize: 26,
        textAlign: 'center',
    },
    secondaryText: {
        bottom: "50%",
        padding: "16%",
        fontSize: 18,
        textAlign: 'center',
    },
    imagePlaceholder: {
        alignItems: "center",
        top: "14%",
        width: "30%",
        padding: "1.5%", 
        borderRadius: 100,
        backgroundColor: 'white',
        borderColor: "black",
        borderWidth: 2
        
    },
   
    screenHorizontalLayout: {
        flexDirection:"row",
        justifyContent: 'space-around',
        width: '90%',
        top: "8%",
        marginLeft: "5%"
    },
    button: {
        alignItems: "center",
        backgroundColor: "#119822",
        padding: "6.5%",
        width: "45%",
        bottom: "29%",
        borderRadius: 10,

    },
    textButton: {
        fontSize: 20,
        textAlign: 'center',
        color: "#ffffff"
        
    }

});