import React, { useState } from'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../firebase/firebaseConfig';

import { useSelector } from 'react-redux';
import { getPostcode, getStreetAddress, getCity, getLatitude, getlongitude } from '../redux/reducers/address';


export const AddressEntryScreen = () => {

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
        // Adds the customer's address to their account
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
                placeholder="Enter your street or flat number"
            />

            <Text style={styles.headings}>Street Address</Text>
            <TextInput
                style={styles.textInput}
                value={getStreet}
                onChangeText={street => setStreet(street)}
            />
            
            <Text style={styles.headings}>Postcode</Text>
            <TextInput
                style={styles.textInput}
                value={getPostal}
                onChangeText={postal => setPostal(postal)}
            />

            <Text style={styles.headings}>City</Text>
            <TextInput
                style={styles.textInput}
                value={getUserCity}
                onChangeText={userCity => setUserCity(userCity)}
            />


            <View style = {styles.buttonLayout}>
                <TouchableHighlight
                    onPress={() => {
                        addressSubmission()
                        setTimeout(() => screenNavigate.reset({
                            index: 0,
                            routes: [{name: 'Home'}]
                        }))
                    }}
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
        marginRight: "40%",
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

    button: {
        alignItems: "center",
        backgroundColor: "#119822",
        padding: "5%",
        width: "50%",
        top: "15%",
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