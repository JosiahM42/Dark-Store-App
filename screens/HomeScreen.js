import React, { useState } from'react';
import { LogBox, StyleSheet, Text, View, TouchableHighlight, TextInput, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth,firestore } from '../firebase/firebaseConfig';

import { uploadGroceries } from '../firebase/groceryData';


// https://www.youtube.com/watch?v=ql4J6SpLXZA&t=1268s
//watch this 
//https://www.youtube.com/watch?v=-40TBdSRk6E&list=PL4cUxeGkcC9ixPU-QkScoRBVxtPPzVjrQ&index=22 

//LogBox.ignoreAllLogs();
const HomeScreen = () => {

    const screenNavigate = useNavigation();

    const signOut = () => {
        auth
            .signOut()
            .then(() => {
                screenNavigate.replace("Selector")
            })
            .catch(error => alert(error.message))
    }
    return (
        <View style={styles.screenVerticalLayout}>
            <Text>Home Screen</Text>
            <Button
                title = "log out"
                onPress={signOut}
                style = {styles.button}
            />

            <Button
                title = "upload"
                onPress={uploadGroceries}
                style = {styles.button}
            />

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    button: {
        top: "20%",
    },

    screenVerticalLayout: {
        flex: 1,
        alignItems: 'center',
        paddingTop: "25%",
    },
})