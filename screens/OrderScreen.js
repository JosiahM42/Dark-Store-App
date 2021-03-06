
import React, {useState, useEffect} from'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight, TextInput, Button, ToastAndroid} from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { auth, firestore} from '../firebase/firebaseConfig';
import firebase from 'firebase';
import { Platform } from 'expo-modules-core';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/reducers/users';
import { setEstimatedDeliveryTime, getEstimatedDeliveryTime } from '../redux/reducers/order';

import StepIndicator from 'react-native-step-indicator';

const OrderScreen = () => {

    const dispatchHook = useDispatch();
    const accountDetails = useSelector(getUser)
    const estimatedDeliveryTime = useSelector(getEstimatedDeliveryTime)

    const screenNavigate = useNavigation()

    const labels = ["Order Confirmation", "Packing Groceries", "Out For Delivery", "Delivered"];

    // Styling required by step indicator package
    const customStyles = {
        stepIndicatorSize: 45,
        currentStepIndicatorSize:50,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#119822',
        stepStrokeWidth: 4,
        stepStrokeFinishedColor: '#119822',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#119822',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#119822',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#119822',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 20,
        currentStepLabelColor: '#000000'
    }

    const [phase, setPhase] = useState(0)
    const [visibility, setVisibility] = useState(false)

    const getDeliveryTimeFrame = () => {
        // Split the estimated delivery time string
        var separateEstimate = estimatedDeliveryTime.split(" ")
        var date = new Date();
        // Calculating a delivery time from the current time and the estimated time
        var estimatedTimeFrame = new Date(date.getTime() + parseInt(separateEstimate[0])*60000);
        // Calculating 10 minutes extra delivery time
        var extraTime = new Date(estimatedTimeFrame.getTime() + 10*60000);
        // Returning the estimated delivery time and the delivery net time
        return estimatedTimeFrame.getHours() + ":" + (("0" + estimatedTimeFrame.getMinutes()).slice(-2)) 
            +  " - " + extraTime.getHours() + ":" + (("0" + extraTime.getMinutes()).slice(-2))
    }



    useEffect(() => {
        if (phase != 4) {
            setTimeout(() => setPhase(phase + 1), 3000)
        } 
        else {
            setVisibility(true)
        }
    }, [phase])

    return(
        <View style={{flex:1}}>
            <Text style={styles.title}>Order Confirmation</Text>

            <View style={styles.screenVerticalLayout}>
                <View style={{flex:1, marginLeft: "10%"}}>
                    <StepIndicator
                        customStyles={customStyles}
                        currentPosition={phase}
                        stepCount={4}
                        labels={labels}
                        direction={'vertical'}
                    />
                </View>

                <View style={styles.rectangle}>
                    <Text style={styles.deliveryText}>Estimated Delivery Between</Text>
                    <Text style={styles.deliveryTimeText}>{getDeliveryTimeFrame()}</Text>
                </View>

                <TouchableHighlight
                    onPress={() => {
                        setTimeout(() => screenNavigate.navigate('OrderSummary'), 500)
                    }}
                    style={ visibility == false ? styles.hiddenButton : styles.button}
                    underlayColor="#DDDDDD"
                    backgroundColor="#99D98C">
                    <Text style={{color: "white"}}>Delivered</Text>
                </TouchableHighlight>

            </View>
        </View>
    )
}

export default OrderScreen;

const styles = StyleSheet.create({
    screenVerticalLayout: {
        flex: 1,
        paddingTop: "24%",
    },

    title: {
        marginLeft: 30,
        fontSize: 30,
        top: "10%",
    },

    rectangle: {
        width: "80%",
        height: "20%",
        marginTop: "40%",
        bottom: "20%",
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: "10%",
        textAlign: 'center'
    },

    deliveryText: {
        top: "20%",
        textAlign: 'center',
        fontSize: 20,
    },
    deliveryTimeText: {
        top: "25%",
        textAlign: 'center',
        fontSize: 30,
    },

    button: {
        alignItems: "center",
        backgroundColor: "#119822",
        padding: "6%",
        width: "45%",
        bottom: "13%",
        marginLeft: "28%",
        borderRadius: 10,
    },

    hiddenButton: {
        opacity: 0,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: "6%",
        width: "45%",
        bottom: "13%",
        marginLeft: "28%",
        borderRadius: 10,
    }
})