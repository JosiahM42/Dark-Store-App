/*
    Author:  Josiah Murray
    Date Started: 06/08/2021
*/

import React, { useState, useEffect } from'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/firebaseConfig';

export const SignInScreen = () => {

    const screenNavigate = useNavigation();

    const [getName, setName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getPhone, setPhone] = useState('');

    const userSignIn = () => {
        auth
            .signInWithEmailAndPassword(getEmail, getPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("logged in with", user.email);
                
            } )
            .catch(error => alert(error.message))
    } 

    const resetPassword = () => {
        auth
            .sendPasswordResetEmail(getEmail)
            .then(() => {
                alert("Password reset email has been sent")
            })
    }

    // This will allow the user to move to the next screen if they are logged in
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
            <Text style={styles.title}> Sign In </Text>
            <Text style={styles.headings}>Email</Text>
            <TextInput
                style={styles.textInput}
                value={getEmail}
                onChangeText={email => setEmail(email)}
                placeholder="Enter your email"
                //underlineColorAndroid= 'black'
            />
            
            <Text style={styles.headings}>Password</Text>
            <TextInput
                style={styles.textInput}
                value={getPassword}
                onChangeText={password => setPassword(password)}
                placeholder="Enter your password"
                secureTextEntry
                //underlineColorAndroid= 'black'
            />

            <View style = {styles.forgotPassword}>
                <Pressable onPress={resetPassword}>
                    <Text>Forgotten Password?</Text>
                </Pressable>
            </View>

            <View style = {styles.buttonLayout}>
                <TouchableHighlight
                    onPress={() => userSignIn()}
                    //onPress={() => screenNavigate.navigate('SignUp')}
                    style={styles.button}
                    underlayColor="#DDDDDD"
                    backgroundColor="#99D98C"
                >
                    <Text style={styles.textButton}>Sign In</Text>
                </TouchableHighlight>

            </View>

            <View style = {styles.pageSwitch}>
                <Pressable onPress={() => screenNavigate.navigate('SignUp')}>
                    <Text>Don't have an account? Sign Up</Text>
                </Pressable>
            </View>

            {/* <TouchableHighlight
                onPress={() => screenNavigate.navigate('Home')}
                style={styles.button}
                underlayColor="#DDDDDD"
                backgroundColor="#99D98C"
            >
                <Text style={styles.textButton}>Sign Up</Text>
            </TouchableHighlight> */}
        </View>
    )
}

export const styles = StyleSheet.create({
    screenVerticalLayout: {
        flex: 1,
        alignItems: 'center',
        paddingTop: "25%",
        //justifyContent: 'center',
        //justifyContent: 'space-evenly',
        //flexDirection: 'column',
        
    },

    buttonLayout: {
        flex: 1,
        alignItems: 'center',
        paddingTop: "2%",
        width: '90%',
        height: "8.5%",
        
    },

    title: {
        top: "0.005%",
        //padding: "20%",
        fontSize: 25,
        //textAlign: 'center',
        width: "25%"
    },

    headings: {
        paddingTop: "4%",
        //paddingBottom: "1%",
        fontSize: 18,
        textAlign: 'left',
        marginRight: "55%",
        width: "30%",
        height: "9%",
        
    },
    
    textInput: {
        //top: "20%",
        //padding: "2%", 
        // borderColor: 'black',
        // borderWidth: 1,
        fontSize: 16,
        width: "85%",
        height: "8%",
        // justifyContent: 'space-between',
        borderBottomColor: '#000', // Add this to specify bottom border color
        borderBottomWidth: 1,     // Add this to specify bottom border thickness

    },

    forgotPassword: {
        fontSize: 20,
        top: "3%",
        paddingLeft: "55%"
    },

    button: {
        alignItems: "center",
        //backgroundColor: "#d3d3d3",
        backgroundColor: "#119822",
        padding: "5%",
        width: "50%",
        top: "20%",
        borderRadius: 10,
        //borderColor: 'black',
        //borderWidth: 1,
    },

    textButton: {
        fontSize: 24,
        textAlign: 'center',
        color: "#ffffff",
        //padding: "4%",
        top: "2%",
    },

    pageSwitch: {
        fontSize: 18,
        bottom: "8%",
    },

})