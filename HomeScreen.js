import React, { useState } from'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from './firebase/config';


// https://www.youtube.com/watch?v=ql4J6SpLXZA&t=1268s
//watch this 
//https://www.youtube.com/watch?v=-40TBdSRk6E&list=PL4cUxeGkcC9ixPU-QkScoRBVxtPPzVjrQ&index=22 
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