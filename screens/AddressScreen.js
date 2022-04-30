//https://github.com/react-native-maps/react-native-maps
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import React, { useState, useEffect } from'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TextInput, Image} from 'react-native';

//import Geocoder from 'react-native-geocoder';
import Geocoder from 'react-native-geocoding';
import { auth } from '../firebase/firebaseConfig';
import * as Location from 'expo-location';

import { setCoordinates } from '../redux/reducers/address';
import { checkUser, getExistingUser } from '../redux/reducers/selected';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import * as geolib from 'geolib';


export const AddressScreen = () => {

    // Google Maps API key
    const googleMapsKey = "AIzaSyDDRYyy-kCd1dNrRH-eeQ4YHhQ4FoNRYIo";

    const screenNavigate = useNavigation();

    const dispatchHook = useDispatch()

    const authCheck = useSelector(getExistingUser)
    
    const [getLocate, setLocate] = useState('');

    const [hasRun, setHasRun] = useState(false)

    

    // This will allow the user to move to the next screen if they are logged in
    useEffect(() => {
        if (authCheck == false){
            const moveOn = auth.onAuthStateChanged(user => {
                if (user) {
                    screenNavigate.reset({
                        index: 0,
                        routes: [{name: 'Home'}]
                    })
                }
            })
            return moveOn
        }
        else
        {
            dispatchHook(checkUser({check: true}))

        }
    }, [])

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
    useEffect(() => {
        (async () => {
            // Requests customer to allow location permissions
            let {status} = await Location.requestForegroundPermissionsAsync();
            // Denial critera
            if (status !== 'granted') {
                alert('Location Permissions Denied')
                return;
            }
            alert('Location Permissions Granted')
        }) ();
    }, []);

    function getUserAddress(){
        return (
            <View style={styles.topScreenLayout}>
                <Text style={styles.headings}>What's your postcode?</Text>
                <TextInput
                    style={styles.textInput}
                    value={getLocate}
                    onChangeText={(locate) => {
                        setLocate(locate)
                    }}
                    placeholder="Enter your postcode e.g. BS16 1QY"
                />


                <View style = {styles.buttonlayout}>
                    <TouchableHighlight
                        onPress={() => {
                            checkAddressFromLocation()
                        }}
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
            // Stores the customer's latitude and longitude values for google maps services
            dispatchHook(setCoordinates({longitude: location.lng, latitude: location.lat}))
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

    // function gMaps() {
        
    //     const googleMapsKey = "AIzaSyDDRYyy-kCd1dNrRH-eeQ4YHhQ4FoNRYIo";
        
    //     fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lng + '&key=' + googleMapsKey)
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         //var add = responseJson.results
    //         //dispatchHook(setMapsAddresses({label:responseJson.results[1].formatted_address, value: responseJson.results[1].formatted_address}))
    //         for(let i = 0; i <= 4; i+=1) {
    //             //dispatchHook(setMapsAddresses({label:responseJson.results[i].formatted_address, value: responseJson.results[i].formatted_address}))

    //             console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson.results[i].formatted_address));
    //         }
    //     })

    // }


    return (

        <View style={{flex: 1}}>
            {/* {alreadyAuthenticated()} */}
            {displayMap()}
            {getUserAddress()}
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
    headings: {
        //paddingTop: "1%",
        fontSize: 22,
        textAlign: 'left',
        marginLeft: "15%",
        width: "100%",
        top: "6%",
        //height: "10%",
        
    },

    textInput: {
        fontSize: 16,
        width: "85%",
        height: "8%",
        top: "7%",
        borderBottomColor: '#000', // Add this to specify bottom border color
        borderBottomWidth: 1,     // Add this to specify bottom border thickness

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
    marker: {
        height: 35, 
        width:35,
    },

    displayMapStyle: {
        flex: 1,
    },
})