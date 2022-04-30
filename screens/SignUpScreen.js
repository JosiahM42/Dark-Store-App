/*
    Author:  Josiah Murray
    Date Started: 06/08/2021
*/
import React, { useState, useEffect } from'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TextInput, Pressable, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../firebase/firebaseConfig';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clearUserData } from '../redux/reducers/users';
import {setPostcode, getPostcode, setStreetAddress, setCity, getLatitude, getlongitude} from '../redux/reducers/address';

//import auth from 'firebase';

export const SignUpScreen = () => {
    const [getName, setName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getPhone, setPhone] = useState('');

    const screenNavigate = useNavigation()
    const dispatchHook = useDispatch();

    const lat = useSelector(getLatitude)
    const lng = useSelector(getlongitude)

    const userSignUp = () => {
        // Clears the user data redux state if it contains any data
        dispatchHook(clearUserData())
        auth
            // This uses the email and password provided by the user to create a new account 
            .createUserWithEmailAndPassword(getEmail, getPassword)
            .then((userCredential) => {
                // Stores the new user's details
                const user = userCredential.user;
                console.log("Signed up with", user.email);
                // Navigates to the home screen
                //screenNavigate.navigate("Home")
                // Creates a new document in the users collection on Firebase using the new user's details
                return firestore.collection('users').doc(user.uid).set({
                    name: getName,
                    phone: getPhone,
                    email: user.email
                })
            } )
            .catch(error => alert(error.message))
    }

    // useEffect(() => {
    //     const moveOn = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             gMaps()
    //             setTimeout(() => screenNavigate.navigate("AddressEntry"), 500)
    //         }
    //     })
    //     return moveOn
    // })

    function gMaps() {
        const googleMapsKey = "AIzaSyDDRYyy-kCd1dNrRH-eeQ4YHhQ4FoNRYIo";
        
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lng + '&key=' + googleMapsKey)
        .then((response) => response.json())
        .then((responseJson) => {
            dispatchHook(setStreetAddress({streetAddress: JSON.parse(JSON.stringify(responseJson.results[0].address_components[1].long_name))}))
            dispatchHook(setPostcode({postcode: JSON.parse(JSON.stringify(responseJson.results[0].address_components[6].long_name))}))
            dispatchHook(setCity({city: JSON.parse(JSON.stringify(responseJson.results[0].address_components[2].long_name))}))
            //console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson.results[0].address_components[1].long_name));
        })
        .catch(error => alert(error.message))
    }

    const signUpWithGoogle = () => {
        // This creates a new instance of the Google authentication provider class
        var authProvider = new auth.GoogleAuthProvider()
        
        // This will set the authentication popup to be in english
        auth.languageCode = 'en';

        auth
            .signInWithPopup(authProvider)
            .then((signUpResult) => {
                var userCredential = signUpResult.userCredential;
                
                var token = userCredential.accessToken;

                var user = signUpResult.user
            })
            .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
            })
                
    }

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

            <Text style={styles.headings} >Phone</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={phone => {setPhone(phone)
                    gMaps()
                }}
                placeholder="Enter your phone number"
                // underlineColorAndroid= 'black'
            />


            <View style = {styles.buttonLayout}>
                <TouchableHighlight
                    onPress={() => {
                        userSignUp()
                        auth.onAuthStateChanged(user => {
                            if (user) {
                                //gMaps()
                                // setTimeout(() => screenNavigate.navigate("AddressEntry"), 200)
                                screenNavigate.navigate("AddressEntry")
                            }
                        })
                        }}
                    //onPress={() => screenNavigate.navigate('SignUp')}
                    style={styles.button}
                    underlayColor="#DDDDDD"
                    backgroundColor="#99D98C"
                >
                    <Text style={styles.textButton}>Sign Up</Text>
                </TouchableHighlight>
                
            </View>
            
            {/*The following View container contains the line*/}
            {/* <View style={styles.signUpWithContainer}>
                <View style={styles.signUpWithGoogleLine} />
                    <View>
                        <Text style={styles.signUpWithGoogleText}>Or sign up with Google</Text>
                    </View>
                <View style={styles.signUpWithGoogleLine} />
            </View> */}
            
            {/* <View style={styles.signInWithGoogleButtonLayout}>
                <TouchableOpacity
                    onPress={() => signUpWithGoogle}
                >
                    <Image style={{}}> 
                    source={require('./assets/btn-google-signin.png')} 
                    </Image>
                </TouchableOpacity>
            </View> */}

            <View style = {styles.pageSwitch}>
                <Pressable onPress={() => screenNavigate.navigate('SignIn')}>
                    <Text>Already have an account? Login</Text>
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
        marginRight: "40%",
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
        //backgroundColor: "#d3d3d3",
        backgroundColor: "#119822",
        padding: "5%",
        width: "50%",
        top: "15%",
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

    // signUpWithContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center', 
    //     bottom: '50%',
    // },

    // signUpWithGoogleLine: {
    //     flex: 1, 
    //     height: 1, 
    //     backgroundColor: 'black', 
    //     margin: "5%",
    // },
    
    // signUpWithGoogleText: {
    //     width: "100%", 
    //     textAlign: 'center',
    // },
    
    // signInWithGoogleButtonLayout: {
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: "center",
    // },
    
    pageSwitch: {
        fontSize: 18,
        bottom: "8%",
    },
})

{/* <View style={{flexDirection: 'row', alignItems: 'center', bottom: '45%'}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black', margin: "5%"}} />
                    <View>
                        <Text style={{width: "100%", textAlign: 'center'}}>Or sign up with Google</Text>
                    </View>
                <View style={{flex: 1, height: 1, width: 2, backgroundColor: 'black', margin: "5%"}} />
    </View> */}