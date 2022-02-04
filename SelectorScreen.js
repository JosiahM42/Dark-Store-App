/*
    Author:  Josiah Murray
    Date Started: 06/08/2021
*/

import React, { useEffect } from'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from './firebase/config';
/*
    Function Name: SelectorScreen
    Function Description: Defines the contents of the Sign In/ Sign Up screen
    Arguments: N/A
*/

export const SelectorScreen = () => {
    
    // 
    const screenNavigate = useNavigation();

    useEffect(() => {
        const moveOn = auth.onAuthStateChanged(user => {
            if (user) {
                screenNavigate.navigate("Home")
            }
        })
        return moveOn
    })
    
    return (
        <View style={styles.screenVerticalLayout}>
            <View style={styles.imagePlaceholder}></View>
            <View>
                <Text style={styles.mainText}>The food you want, when you want and in whatever quantity you want.</Text>
            </View>

            <View>
                <Text style={styles.secondaryText}>Sign up today for a stress-free grocery shopping experience or if you are a returning customer, welcome back.</Text>
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
        //justifyContent: 'center',
    },
    mainText: {
        padding: "20%",
        fontSize: 24,
        textAlign: 'center',
    },
    secondaryText: {
        bottom: "50%",
        padding: "16%",
        fontSize: 18,
        textAlign: 'center',
    },
    imagePlaceholder: {
        top: "7%",
        width: "70%", 
        height: "30%", 
        backgroundColor: 'grey'
    },
    screenHorizontalLayout: {
        flexDirection:"row",
        justifyContent: 'space-around',
        width: '90%',
        height: "8.5%",
    },
    button: {
        alignItems: "center",
        // backgroundColor: "#d3d3d3",
        backgroundColor: "#119822",
        padding: "5%",
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

// Colours I like
// #38b000
// #55a630 Or #529e30 // They are similar
// #119822
// #ED8F4E