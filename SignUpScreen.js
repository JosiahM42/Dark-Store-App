/*
    Author:  Josiah Murray
    Date Started: 06/08/2021
*/

import React, { useState } from'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput} from 'react-native';
// import { useNavigation } from '@react-navigation/native';


export const SignUpScreen = () => {

    //const screenNavigate = useNavigation();

    
    const [getName, setName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getPhone, setPhone] = useState('');

    const [getError, setError] = useState(false);

    // const [nameError, setNameError] = useState(false);
    // const [emailError, setEmailError] = useState(false);
    // const [passwordError, setPasswordError] = useState(false);
    // const [PhoneError, setPhoneError] = useState(false);

    const ErrorHandler = () => {
        if(!getName){
            alert('Please enter your name');
        }
        else if(!getEmail){
            alert('Please enter an email');
        }
        else if(!getPassword){
            alert('Please enter a password');
        }
        else if(!getPhone){
            alert('Please enter a phone number');
        }
        else{
            screenNavigate.navigate('Home');
        }
                
    }

    // const ErrorHandler = (userInput) => {
    //     switch(userInput){
    //         case(getName):
    //             if(!getName){
    //                 alert('Please enter your name');
    //             }
    //             break;
                
    //         case(getEmail):
    //             if(!getEmail){
    //                 alert('Please enter an email');
    //             }
    //             break;
            

                
    //     }

    // }

    return (

        <View style={styles.screenVerticalLayout}>
            <Text style={styles.title}> Sign Up </Text>
            
            <Text style={styles.headings}>Name</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={name => setName(name)}
                placeholder="Enter your name"
                //underlineColorAndroid= 'black'
            />

            <Text style={styles.headings}>Email</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={email => setEmail(email)}
                placeholder="Enter your email"
                //underlineColorAndroid= 'black'
            />
            
            <Text style={styles.headings}>Password</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={password => setPassword(password)}
                placeholder="Enter your password"
                //underlineColorAndroid= 'black'
            />

            <Text style={styles.headings} >Phone</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={phone => setPhone(phone)}
                placeholder="Enter your phone number"
                // underlineColorAndroid= 'black'
            />

            {/* <TouchableHighlight
                onPress={() => screenNavigate.navigate('Home')}
                style={styles.button}
                underlayColor="#DDDDDD"
                backgroundColor="#99D98C"
            >
                <Text style={styles.textButton}>Sign Up</Text>
            </TouchableHighlight> */}

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
    title: {
        top: "0.005%",
        //padding: "20%",
        fontSize: 25,
        //textAlign: 'center',
        width: "25%"
    },

    headings: {
        paddingTop: "2%",
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

    button: {
        alignItems: "center",
        // backgroundColor: "#d3d3d3",
        //backgroundColor: "#119822",
        padding: "5%",
        width: "45%",
        top: "29%",
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
})