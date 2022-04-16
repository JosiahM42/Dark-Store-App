//https://github.com/react-native-maps/react-native-maps
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import React, { useState, useEffect } from'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TextInput, Image} from 'react-native';

//import Geocoder from 'react-native-geocoder';
import Geocoder from 'react-native-geocoding';
import { auth } from '../firebase/firebaseConfig';
import * as Location from 'expo-location';

import { useSelector } from 'react-redux';
import { setUserAddress, setLocation, getlongitude, getLatitude, getLocation, setError, getError} from '../redux/reducers/address';
import { useDispatch } from 'react-redux';


import * as geolib from 'geolib';


export const AddressScreen = () => {

    // Google Maps API key
    const googleMapsKey = "AIzaSyDDRYyy-kCd1dNrRH-eeQ4YHhQ4FoNRYIo";

    const screenNavigate = useNavigation();

    const dispatchHook = useDispatch()

    const location = useSelector(getLocation);
    const error = useSelector(getError);
    
    const [getLocate, setLocate] = useState('');

    

    // This will allow the user to move to the next screen if they are logged in
    useEffect(() => {
        const moveOn = auth.onAuthStateChanged(user => {
            if (user) {
                screenNavigate.navigate("Home")
            }
        })
        return moveOn
    })



    const darkStoreRegion = {
        latitude: 51.500986,
        longitude: -2.548292,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
    };


    function displayMap(){
        return(
            <View style={styles.bottomScreenLayout}>
                <MapView
                    style={styles.displayMapStyle}
                    // Tells the JavaScript package which maps service to use
                    provider={PROVIDER_GOOGLE}
                    // States the inital coordinates
                    initialRegion={darkStoreRegion}
                >
                    <Marker 
                        // Sets the marker to the center of the map
                        coordinate={darkStoreRegion}
                    >   
                        {/* Sets a customer marker on map */}
                        <Image 
                            source={require('../assets/icons8-warehouse.png')} 
                            style={styles.marker} 
                        />
                    </Marker> 
                
                </MapView>
            </View>
        )
    }

    // When the application runs, the user will be prompted to accept location permissions
    // useEffect(() => {
    //     (async () => {
    //         // Requests customer to allow location permissions
    //         let {status} = await Location.requestForegroundPermissionsAsync();
    //         // Denial critera
    //         if (status !== 'granted') {
    //             alert('Location Permissions Denied')
    //             return;
    //         }
    //         alert('Location Permissions Granted')
    //     }) ();
    // }, []);

    // if (error === false){
    //     alert('Location Permissions Denied')
    // }
    // else{
    //     alert('Location Permissions Granted')
    //     console.log(location)
    // }   
    

    // https://instamobile.io/react-native-tutorials/react-native-location/
    // https://docs.expo.dev/versions/latest/sdk/location/#locationgeocodedlocation
    //Uses Location based services
    async function getLocationPermissions() {
        const locationPermission =  await Location.requestForegroundPermissionsAsync()
        if (!locationPermission === 'granted')
        {
            alert('Location Permissions Denied')
            return;
        }
        else
        {
            let location = await Location.getCurrentPositionAsync({});
            dispatchHook(setLocation({location: location}))
            //checkAddressFromLocation()
        }
    };


    function getUserAddress(){
        return (
            <View style={styles.topScreenLayout}>
                <Text style={styles.headings}>What's your address?</Text>
                <TextInput
                    style={styles.textInput}
                    //value={location.toString()}
                    value={getLocate}
                    onChangeText={(locate) => {setLocate(locate)}}
                    placeholder="Enter your address e.g. 000 avenue, BS16 1QY"
                    //underlineColorAndroid= 'black'
                />

                <View style = {styles.locationButtonLayout}>
                    <TouchableHighlight
                        onPress={() => getLocationPermissions()}
                        style={styles.locationButton}
                        underlayColor="#DDDDDD"
                        backgroundColor="#99D98C"
                    >
                    <Text style={styles.locationText}>Use My Location</Text>
                    </TouchableHighlight>
                </View>


                <View style = {styles.buttonlayout}>
                    <TouchableHighlight
                        onPress={() => checkAddressFromLocation()}
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

    function checkAddressFromLocation() {
        // Provides API with a Google Maps Key
        Geocoder.init(googleMapsKey);
        // Provides function with the customers address
        // Then returns its longitude and latitude 
        Geocoder.from(getLocate)
		.then(json => {
            // Stores the result of the geocoder function
			var location = json.results[0].geometry.location;
            // Returns the distance between the fulfilment centre and the customer in metres
            var distance = geolib.getPreciseDistance(
                {latitude: darkStoreRegion.latitude, longitude: darkStoreRegion.longitude},
                {latitude: location.lat, longitude: location.lng}
            );
            // Converts the distance to miles
            var miles = geolib.convertDistance(distance, 'mi');
            // Checks if the address is within 5 miles of the fulfilment centre
            if (Math.round(miles* 100)/100 <= 5.00) {
                console.log("Customer is in range");
                // Navigates to the sign in/sign up screen
                screenNavigate.navigate("Selector");
            }
            else {
                console.log("Customer is out of range");
                // Navigates to the address denial screen
                screenNavigate.navigate("Decline");
            }
		})
		.catch(error => alert(error.message));
    }

    // function checkAddressFromLocation()
    // {
    //     var distance = geolib.getPreciseDistance(
    //         {latitude: darkStoreRegion.latitude, longitude: darkStoreRegion.longitude},
    //         {latitude: location.latitude, longitude: location.longitude}
    //     );

    //     var miles = geolib.convertDistance(distance, 'mi');
    //     console.log(miles)

    //     if (Math.round(miles* 100)/100 <= 5.00)
    //     {

    //         console.log("Customer is in range");
    //         screenNavigate.navigate("Selector");

    //     }
    //     else {
    //         console.log("Customer is out of range");
    //         screenNavigate.navigate("Decline");
    //     }
    // }


    
    return (

        <View style={{flex: 1}}>
            {displayMap()}
            {getUserAddress()}
            {/* {userButton()} */}
        </View>
        
    );
}

export const styles = StyleSheet.create({
    bottomScreenLayout: {
        flex: 1,
        paddingTop: "60%",
        justifyContent: 'center',
        
    },
    topScreenLayout: {
        position: 'absolute',
        //top: "%",
        bottom: "46%",
        height: "80%",
        width: "100%",
        alignItems:'center',
        justifyContent:'center',
        
        // paddingTop: "50%",
    },

    // bLayout:{
    //     position: 'absolute',
    //     flex: 1,
    //     bottom: "40%",
    //     height: "80%",
    //     width: "100%",
    //     //paddingTop: "60%",
    //     justifyContent: 'center',
    // },

    headings: {
        //paddingTop: "1%",
        fontSize: 22,
        textAlign: 'left',
        marginLeft: "15%",
        width: "100%",
        top: "15%",
        //height: "10%",
        
    },

    textInput: {
        fontSize: 16,
        width: "85%",
        height: "8%",
        top: "16%",
        borderBottomColor: '#000', // Add this to specify bottom border color
        borderBottomWidth: 1,     // Add this to specify bottom border thickness

    },

    locationButtonLayout: {
        //position: 'absolute',
        alignItems: "center",
        padding: "5%",
        //paddingLeft: "10%",
        width: "100%",
        top: "15%",
    },

    locationButton: {
        //alignItems: "center",
        //backgroundColor: "#d3d3d3",
        //marginBottom: "20%",
        //width: "200%",
        //marginLeft: "%",
        height: "25%",
        //top: "50%",
        borderRadius: 10,
        
        borderColor: 'black',
        borderWidth: 1,
    },

    locationText: {
        fontSize: 20,
        //textAlign: 'center',
        //color: "black",
        //top: '25%',
        //height: '130%'
        paddingLeft: "25%",
        paddingRight: "25%",
    },

    buttonlayout: {
        position: 'absolute',
        alignItems: "center",
        // padding: "5%",
        width: "50%",
        top: "132%",
    },

    button: {
        alignItems: "center",
        //backgroundColor: "#d3d3d3",
        backgroundColor: "#119822",
        padding: "8%",
        width: "70%",
        //top: "80%",
        borderRadius: 10,
        
        //borderColor: 'black',
        //borderWidth: 1,
    },

    textButton: {
        fontSize: 20,
        textAlign: 'center',
        color: "#ffffff",
        
    },

    // topHalf: {
    //     alignItems:'center',
    //     justifyContent:'center',
    //     height:'5%',
    // },

    // bottomHalf: {
    //     width:'100%',
    //     height:'90%',
    //     top: "10%",
    //     backgroundColor:'#E0DEDE',
    //     borderTopLeftRadius:30,
    //     borderTopRightRadius:30,
    // },

    // map: {
    //     StyleSheet.absoluteFill,
    // },

    marker: {
        height: 35, 
        width:35,
    },

    displayMapStyle: {
        flex: 1,
    },
})