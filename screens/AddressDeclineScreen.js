import React from'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const DeclineScreen = () => {
    
    const screenNavigate = useNavigation();
    
    return (
        <View style={styles.screenVerticalLayout}>
            <View style={styles.imagePlaceholder}>
                <Image style={styles.tick} source={require('../assets/circle-cross.png')}/>
            </View>
            <View>
                <Text style={styles.mainText}>Sorry our service does not deliver to your area.</Text>
            </View>

            <View style={styles.screenHorizontalLayout}>
                <TouchableHighlight
                    onPress={() => screenNavigate.navigate('Address')}
                    style={styles.button}
                    underlayColor="#DDDDDD"
                    backgroundColor="#99D98C"
                >
                    <Text style={styles.textButton}>Try new address</Text>
                </TouchableHighlight>
            </View>

        </View>
        
    );
};

export const styles = StyleSheet.create({
    screenVerticalLayout: {
        flex: 1,
        alignItems: 'center', 
    },
    mainText: {
        padding: "20%",
        top: "40%",
        paddingBottom: "16%",
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
        top: "20%",
        width: "30%", 
        height: "15%", 
        borderRadius: 100,
        backgroundColor: 'white',
        borderColor: "black",
        borderWidth: 2
        
    },
    tick:{
        top: "10%",
        left: "10%",
        width: "80%",
        height: "80%",
         
    },
    screenHorizontalLayout: {
        flexDirection:"row",
        justifyContent: 'space-around',
        width: '120%',
        height: "10%",
        top: "100%",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#119822",
        padding: "5%",
        width: "45%",
        bottom: "29%",
        borderRadius: 10,

    },
    textButton: {
        fontSize: 20,
        textAlign: 'center',
        color: "#ffffff"
        
    }

});
