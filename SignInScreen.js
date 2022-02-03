/*
    Author:  Josiah Murray
    Date Started: 06/08/2021
*/

import React, { useState } from'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { auth } from './firebase/config';

export const SignInScreen = () => {

    //const screenNavigate = useNavigation();

    const [getName, setName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getPhone, setPhone] = useState('');

    const userSignIn = () => {
        auth
            .signInWithEmailAndPassword(getEmail, getPassword)
            .then((Usercredential) => {
                const user = Usercredential.user;
                console.log('Logged in with', user.getEmail);
            } )
            .catch(error => alert(error.message))
    } 

    return (

        <View style={styles.screenVerticalLayout}>
            <TextInput
                style={{ padding: 8, backgroundColor: '#f5f5f5' }}
                value={getEmail}
                onChangeText={email => setEmail(email)}
                placeholder="Enter your email"
            />

            <TextInput
                style={{ padding: 8, backgroundColor: '#f5f5f5' }}
                value={getPassword}
                onChangeText={password => setPassword(password)}
                placeholder="Enter your password"
                secureTextEntry
            />

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
        //justifyContent: 'center',
    },
    // button: {
    //     alignItems: "center",
    //     backgroundColor: "#d3d3d3",
    //     //backgroundColor: "#119822",
    //     padding: "5%",
    //     width: "45%",
    //     top: "29%",
    //     borderRadius: 10,
    //     borderColor: 'black',
    //     borderWidth: 1,
    // },

    // textButton: {
    //     fontSize: 20,
    //     textAlign: 'center',
    //     color: "#ffffff"
        
    // },


})