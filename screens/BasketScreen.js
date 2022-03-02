import React from'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Button} from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';


const BasketScreen = () => {
    const screenNavigate = useNavigation();
    // const tabs = createBottomTabNavigator();

    

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
            <Text>Basket Screen</Text>
            <Button
                title = "log out"
                onPress={signOut}
                style = {styles.button}
            />

        </View>
    )
}

export default BasketScreen

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