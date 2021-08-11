import React from'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export const SelectorScreen = () => {
    const screenNavigate = useNavigation();
    
    return (
        <View style={styles.screenVerticalLayout}>
            <View style={styles.imagePlaceholder}></View>
            <View>
                <Text style={styles.mainText}>The food you want, when you want and in whatever quantity you want.</Text>
            </View>

            <View>
                <Text style={styles.secondaryText}>Sign up today for a stress-free grocery shopping experience or if you are a returning customer, welcome back.</Text>
            </View>

            <View style={styles.screenHorizontalLayout}>
                <TouchableHighlight
                    onPress={() => screenNavigate.navigate('Sign Up')}
                    style={styles.button}
                    underlayColor="#DDDDDD"
                >
                    <Text style={styles.textButton}>Sign Up</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => screenNavigate.navigate('Sign In')}
                    style={styles.button}
                    underlayColor="#DDDDDD"
                >
                    <Text style={styles.textButton}>Sign In</Text>
                </TouchableHighlight>
                {/* <TouchableOpacity
                    onPress={() => screenNavigate.navigate('Sign Up')}
                    style={styles.button}
                >
                    <Text style={{fontSize: 20}}>Sign Up</Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity
                    onPress={() => screenNavigate.navigate('Sign In')}
                    style={styles.button}
                    activeOpacity = "1.6"
                >
                    <Text style={{fontSize: 20}}>Sign In</Text>
                </TouchableOpacity> */}
            </View>


        </View>
        
    );
};

export const styles = StyleSheet.create({
    screenVerticalLayout: {
        flex: 1,
        alignItems: 'center', 
        //justifyContent: 'center',
    },
    mainText: {
        padding: "20%",
        fontSize: 24,
        textAlign: 'center',
    },
    secondaryText: {
        bottom: "50%",
        padding: "16%",
        fontSize: 18,
        textAlign: 'center',
    },
    imagePlaceholder: {
        top: "7%",
        width: "70%", 
        height: "30%", 
        backgroundColor: 'grey'
    },
    screenHorizontalLayout: {
        flexDirection:"row",
        justifyContent: 'space-around',
        width: '90%',
        height: "8.5%",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#d3d3d3",
        padding: "5%",
        width: "45%",
        bottom: "29%",
        borderRadius: 10,

    },
    textButton: {
        fontSize: 20,
        textAlign: 'center',
        
    }

});