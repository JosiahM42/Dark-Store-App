/*
    Author:  Josiah Murray
    Date Started: 06/08/2021
*/

import React, { useState, useEffect } from'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/firebaseConfig';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clearUserData } from '../redux/reducers/users';

export const SignInScreen = () => {

    const screenNavigate = useNavigation();
    const dispatchHook = useDispatch();

    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');

    const userSignIn = () => {
        // Clears the user data redux state if it contains any data
        dispatchHook(clearUserData())
        auth
            // This uses the email and password provided by the user to login into the app
            .signInWithEmailAndPassword(getEmail, getPassword)
            .then((userCredential) => {
                // Stores the new user's details
                const user = userCredential.user;
                console.log("logged in with", user.email);
                // Resets the navigational stack and makes it start 
                // from Home instead of the address screen
                screenNavigate.reset({
                    index: 0,
                    routes: [{name: 'Home'}]
                })
            })
            .catch(error => alert(error.message))
    } 

    const resetPassword = () => {
        auth
            // This uses the entered email to send a password reset email to the user
            .sendPasswordResetEmail(getEmail)
            .then(() => {
                alert("Password reset email has been sent")
            })
            .catch((error) => alert(error.message))
    }

    return (

        <View style={styles.screenVerticalLayout}>
            <Text style={styles.title}> Sign In </Text>
            <Text style={styles.headings}>Email</Text>
            <TextInput
                style={styles.textInput}
                value={getEmail}
                onChangeText={email => setEmail(email)}
                placeholder="Enter your email"
            />
            
            <Text style={styles.headings}>Password</Text>
            <TextInput
                style={styles.textInput}
                value={getPassword}
                onChangeText={password => setPassword(password)}
                placeholder="Enter your password"
                secureTextEntry
            />

            <View style = {styles.forgotPassword}>
                <Pressable onPress={resetPassword}>
                    <Text>Forgotten Password?</Text>
                </Pressable>
            </View>

            <View style = {styles.buttonLayout}>
                <TouchableHighlight
                    onPress={() => {userSignIn()}}
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
        </View>
    )
}

export const styles = StyleSheet.create({
    screenVerticalLayout: {
        flex: 1,
        alignItems: 'center',
        paddingTop: "25%",
        
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
        fontSize: 25,
        width: "25%"
    },

    headings: {
        paddingTop: "4%",
        fontSize: 18,
        textAlign: 'left',
        marginRight: "55%",
        width: "30%",
        height: "9%",
        
    },
    
    textInput: {
        fontSize: 16,
        width: "85%",
        height: "8%",
        borderBottomColor: '#000', 
        borderBottomWidth: 1,     

    },

    forgotPassword: {
        fontSize: 20,
        top: "3%",
        paddingLeft: "55%"
    },

    button: {
        alignItems: "center",
        backgroundColor: "#119822",
        padding: "5%",
        width: "50%",
        top: "20%",
        borderRadius: 10,
    },

    textButton: {
        fontSize: 24,
        textAlign: 'center',
        color: "#ffffff",
        top: "2%",
    },

    pageSwitch: {
        fontSize: 18,
        bottom: "8%",
    },

})