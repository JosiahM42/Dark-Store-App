import React from'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const DeclineScreen = () => {
    
    const screenNavigate = useNavigation();
    
    return (
        <View style={styles.screenVerticalLayout}>
            <View style={styles.imagePlaceholder}>
                <Image style={styles.tick} source={require('../assets/circle-cross.png')}/>
                {/* <Image style={styles.tick} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Apples-matheus-cenali.jpg?alt=media&token=6b0d5a03-2c9f-4272-8db2-dcebb1de3c68'}}/> */}
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
        //justifyContent: 'center',
    },
    mainText: {
        padding: "20%",
        top: "40%",
        //bottom: "50%",
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
        // backgroundColor: "#d3d3d3",
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
