/*
    Author:  Josiah Murray
    Date Started: 06/08/2021
*/

import React, { useState } from'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput} from 'react-native';
// import { useNavigation } from '@react-navigation/native';

export const SignInScreen = () => {

    //const screenNavigate = useNavigation();

    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    return (

        <View style={styles.screenVerticalLayout}>
            <TextInput
                style={{ padding: 8, backgroundColor: '#f5f5f5' }}
                onChangeText={name => setUsername(name)}
                placeholder="Name"
            />

            <TextInput
                style={{ padding: 8, backgroundColor: '#f5f5f5' }}
                onChangeText={email => setUserEmail(email)}
                placeholder="Hi"
            />
        </View>
    )
}

export const styles = StyleSheet.create({
    screenVerticalLayout: {
        flex: 1,
        alignItems: 'center', 
        //justifyContent: 'center',
    },

})