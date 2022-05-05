import React, { useState, Component, useEffect } from'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableHighlight, TextInput, Button, KeyboardAvoidingView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import { getUser } from '../redux/reducers/users';

import { auth, firestore } from '../firebase/firebaseConfig';


const AccountScreen = () => {
    
    const userDetails = useSelector(getUser);

    const dispatchHook = useDispatch();
    const screenNavigate = useNavigation();

    let [updateName, setUpdateName] = useState(userDetails[0].name);
    let [updateEmail, setUpdateEmail] = useState(userDetails[0].email);
    let [updatePhone, setUpdatePhone] = useState(userDetails[0].phone);

    const updateUserData = () => {
        // Make a request to Firebase Auth to obtain the user's account ID
        const userID = auth.currentUser.uid;
        // Checks if any changes to the customer details have been made
        if(updateName !== userDetails[0].name || updatePhone !== userDetails[0].phone)
        {

            if(phoneValidation(updatePhone) == true){


                // Updates the name and phone attributes of the customer's account details
                firestore.collection('users').doc(userID).update({
                    name: updateName,
                    phone: updatePhone
                })
                .then(() => {
                    alert("Your details have been updated.")
                })
                .catch((error) => {
                    alert(error.message)
                })
            }
        }
        // If no changes have been made
        else{
            alert("Please make changes")
        }
    }

    const phoneValidation = (phone) => {
        // Allows for numbers that start with UK country code or 0
        // Then it should be followed by 9 or 10 digits
        if (/^(?:0|\+?44)(?:\d\s?){9,10}$/.test(phone))
        {
            return true;
        }
        else{
            alert("Invalid Phone Number")
        }

    }

    const signOut = () => {
        auth
            // Calls the authentication function and signs the user out
            .signOut()
            .then(() => {
                screenNavigate.reset({
                    index: 0,
                    routes: [{name: 'Address'}]
                })
            })
            .catch(error => alert(error.message))
    }

    const changePassword = () => {
        const userEmail = auth.currentUser.email
        auth
            // Sends customer a reset password email
            .sendPasswordResetEmail(userEmail)
            .then(() => {
                alert("Password reset email has been sent")
            })
    }


    return (
        <KeyboardAvoidingView style={{flex:1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled={false}>

        <Text style={styles.backArrow} onPress={() => screenNavigate.goBack()}>&gt;</Text>
        
        <View style={{flex: 1, paddingTop: "2%"}}>
            <Text style={{marginLeft: "24%", fontSize: 30,}}>
                Account Details
            </Text>
            
            <View style={styles.screenVerticalLayout}>
                <Text style={styles.headingName}>Name</Text>
                <TextInput
                    style={styles.textInputName}
                    value={updateName}
                    onChangeText={(newName) => setUpdateName(newName)}
                />
                <Text style={styles.headingEmail}>Email</Text>
                <TextInput
                    style={styles.textInputEmail}
                    value={userDetails[0].email}
                    onChangeText={(newEmail) => setUpdateEmail(newEmail)}
                />
                <Text style={styles.headingPhone}>Phone Number</Text>
                <TextInput
                    style={styles.textInputPhone}
                    value={updatePhone}
                    onChangeText={(newPhone) => setUpdatePhone(newPhone)}
                />
            <View style={{flex: 1}}>
                <TouchableHighlight
                    onPress={() => {
                        changePassword()
                        setTimeout(signOut(), 500)
                    }}
                    style={styles.resetButton}
                    underlayColor="#DDDDDD"
                    backgroundColor="#99D98C">
                    <Text style={{color: "white"}}>Change Password</Text>
                </TouchableHighlight>
            </View>
            
            <View style={{flex: 1}}>
                <TouchableHighlight
                    onPress={() => {
                        signOut()
                    }}
                    style={styles.signOutButton}
                    underlayColor="#DDDDDD"
                    backgroundColor="#99D98C">
                    <Text style={{color: "white"}}>Log Out</Text>
                </TouchableHighlight>
            </View>

            <View style={{flex: 1}}>
                <TouchableHighlight
                    onPress={() => {
                        updateUserData()
                    }}
                    style={styles.button}
                    underlayColor="#DDDDDD"
                    backgroundColor="#99D98C">
                    <Text style={{color: "white"}}>Save</Text>
                </TouchableHighlight>
            </View>
            </View>
    
            
        </View>
        </KeyboardAvoidingView>
    )
}

export default AccountScreen;

const styles = StyleSheet.create({
    backArrow: {
        fontSize: 40,
        marginTop: "10%",
        marginLeft: "7%",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#119822",
        padding: "5%",
        width: "50%",
        bottom: "25%",
        marginLeft: "25%",
        borderRadius: 10,
    },
    resetButton: {
        alignItems: "center",
        backgroundColor: "#119822",
        padding: "3%",
        width: "50%",
        bottom: "5%",
        marginLeft: "7%",
        
        borderRadius: 10,
    },
    signOutButton: {
        alignItems: "center",
        backgroundColor: "#119822",
        padding: "3%",
        width: "50%",
        bottom: "30%",
        marginLeft: "7%",
        
        borderRadius: 10,
    },
    textInputName: {
        fontSize: 16,
        width: "85%",
        height: "8%",
        bottom: "7.5%",
        marginLeft: "7%",
        borderBottomColor: '#000', 
        borderBottomWidth: 1,     
    },
    textInputEmail: {
        fontSize: 16,
        width: "85%",
        height: "8%",
        bottom: "8%",
        marginLeft: "7%",
        borderBottomColor: '#000', 
        borderBottomWidth: 1,     
    },
    textInputPhone: {
        fontSize: 16,
        width: "85%",
        height: "8%",
        bottom: "7%",
        marginLeft: "7%",
        borderBottomColor: '#000', 
        borderBottomWidth: 1,     

    },
    screenVerticalLayout: {
        flex: 1,
        paddingTop: "10%",
    },
    headingName: {
        bottom: "4%",
        fontSize: 18,
        marginLeft: "7%",
        width: "40%",
        height: "9%",
        
    },
    headingEmail: {
        bottom: "4%",
        fontSize: 18,
        marginLeft: "7%",
        width: "40%",
        height: "9%",
        
    },
    headingPhone: {
        bottom: "4%",
        fontSize: 18,
        marginLeft: "7%",
        width: "40%",
        height: "9%",
        
    },

});