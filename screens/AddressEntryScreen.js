import React, { useState } from'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TextInput, Pressable, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../firebase/firebaseConfig';

import { useSelector } from 'react-redux';
import {getPostcode, getStreetAddress, getCity, setAddress, getAddress, getLatitude, getlongitude, setStreetAddress} from '../redux/reducers/address';
import { useDispatch } from 'react-redux';


export const AddressEntryScreen = () => {

    // const fullAddress = useSelector(getAddress)
    const lat = useSelector(getLatitude)
    const lng = useSelector(getlongitude)
    
    const postcode = useSelector(getPostcode)
    const streetAddress = useSelector(getStreetAddress)
    const city = useSelector(getCity)

    const [getStreetNumber, setStreetNumber] = useState('');
    const [getStreet, setStreet] = useState(streetAddress);
    const [getPostal, setPostal] = useState(postcode);
    const [getUserCity, setUserCity] = useState(city)

    const screenNavigate = useNavigation()

    const addressSubmission = () => {
        const customerAddress = getStreetNumber + ' ' + getStreet + ', ' + getUserCity + ' ' + getPostal

        const userID = auth.currentUser.uid;

        firestore.collection('users').doc(userID).update({
            address: customerAddress
        })
        .then(() => {
            console.log("New Address added")
        } )
        .catch(error => alert(error.message))
    }

    return (

        <View style={styles.screenVerticalLayout}>
            <Text style={styles.title}> Address </Text>

            <Text style={styles.headings}>Street Number/Flat Number</Text>
            <TextInput
                style={styles.textInput}
                value={getStreetNumber}
                onChangeText={streetNumber => setStreetNumber(streetNumber)}
                //onChangeText={name => setName(name)}
                placeholder="Enter your street or flat number"
                //underlineColorAndroid= 'black'
            />

            <Text style={styles.headings}>Street Address</Text>
            <TextInput
                style={styles.textInput}
                value={getStreet}
                onChangeText={street => setStreet(street)}
                //placeholder="Enter your email"
                //underlineColorAndroid= 'black'
            />
            
            <Text style={styles.headings}>Postcode</Text>
            <TextInput
                style={styles.textInput}
                value={getPostal}
                onChangeText={postal => setPostal(postal)}
                //placeholder="Enter your Postcode"
                //underlineColorAndroid= 'black'
            />

            <Text style={styles.headings}>City</Text>
            <TextInput
                style={styles.textInput}
                value={getUserCity}
                onChangeText={userCity => setUserCity(userCity)}
                //onChangeText={phone => setPhone(phone)}
                //placeholder="Enter your phone number"
                // underlineColorAndroid= 'black'
            />


            <View style = {styles.buttonLayout}>
                <TouchableHighlight
                    onPress={() => {
                        addressSubmission()
                        //userAddress()
                        //setTimeout(() => screenNavigate.navigate('Home'), 500)
                        //setTimeout(() => screenNavigate.replace('Home'), 500)
                        setTimeout(() => screenNavigate.reset({
                            index: 0,
                            routes: [{name: 'Home'}]
                        }))
                    }}
                    //onPress={() => screenNavigate.navigate('SignUp')}
                    style={styles.button}
                    underlayColor="#DDDDDD"
                    backgroundColor="#99D98C"
                >
                    <Text style={styles.textButton}>Continue</Text>
                </TouchableHighlight>
                
            </View>
            
        </View>
    )
}

export default AddressEntryScreen;

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