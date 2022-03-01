//https://github.com/react-native-maps/react-native-maps
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import React, { useState, useEffect } from'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TextInput, Image} from 'react-native';
import Geocoder from 'react-native-geocoding';
import { auth } from '../firebase/firebaseConfig';

//import getDistance from 'geolib/es/getDistance';
import * as geolib from 'geolib';

export const AddressScreen = () => {

    // Google Maps API key
    const googleMapsKey = "AIzaSyDDRYyy-kCd1dNrRH-eeQ4YHhQ4FoNRYIo";

    const screenNavigate = useNavigation();
    
    const [getLocation, setLocation] = useState('');

    const [getLat, setLat] = useState(0);
    const [getLong, setLong] = useState(0);


    // Geocoder.from("BS16 1QY")
	// 	    .then(json => {
	// 		var location = json.results[0].geometry.location;
	// 		console.log(location);
	// 	    })
	// 	    .catch(error => 
    //             alert(error.message)
    //         );



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

    let userCoordinate = 
    {
        // latitude: 51.500986,
        // longitude: -2.548292,
        latitude: getLat,
        longitude: getLong,
    };
    


    function displayMap(){
        return(
        

            <View style={styles.bottomScreenLayout}>
                <MapView
                    style={styles.displayMapStyle}
                    provider={PROVIDER_GOOGLE}
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
                    
                    <Marker
                        coordinate={userCoordinate}
                    >

                    </Marker>
                
                </MapView>
            </View>
        )
    }

    function getUserAddress(){
        return (
            <View style={styles.topScreenLayout}>
                <Text style={styles.headings}>What's your address?</Text>
                <TextInput
                    style={styles.textInput}
                    value={getLocation}
                    onChangeText={location => setLocation(location)}
                    placeholder="Enter your address e.g. 000 avenue, BS16 1QY"
                    //underlineColorAndroid= 'black'
                />

                <View style = {styles.buttonlayout}>
                     <TouchableHighlight
                    onPress={() => getAddressDistance()}
                    //onPress={() => screenNavigate.navigate('SignUp')}
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

    function geocodingUserAddress(){
        //geocoding Google API Key
        Geocoder.init(googleMapsKey);

        Geocoder.from(getLocation)
        .then(json => {
            var location = json.results[0].geometry.location;
            setLat(location.lat);
            setLong(location.lng);
            console.log(location.lat);
        })
        .catch(error => 
            alert(error.message)
        )

        // console.log(getLat);
        // console.log(getLong);
        
        //getAddressDistance();
        
    }

    function getAddressDistance(){
        geocodingUserAddress();

        var distance = geolib.getPreciseDistance(
            {latitude: darkStoreRegion.latitude, longitude: darkStoreRegion.longitude},
            {latitude: userCoordinate.latitude, longitude: userCoordinate.longitude}
        );

        //var miles = Math.round(geolib.convertDistance(distance, 'mi') * 100)/100;
        var miles = geolib.convertDistance(distance, 'mi');

        // setLat(getLat => getLat = 0);
        // setLong(getLong => getLong = 0);
        setLocation('');
        
        if (Math.round(miles* 100)/100 <= 5.00)
        {

            console.log("Customer is in range");
            screenNavigate.navigate("Selector");

        }
        else {
            console.log("Customer is out of range");
            screenNavigate.navigate("Decline");
        }

        //return `User is ${Math.round(miles * 100)/100} miles away.`
    
    }

    // useEffect(() => {
    //     if(getLat != 0){
    //         setLat(1.22)
    //     }
    //   }, [getLat])
      
    //   useEffect(() => {
    //       if(getLong != 0){
    //           setLong(1.22)
    //       }
    //   }, [getLong])

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
        bottom: "40%",
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
        //height: "10%",
        
    },

    textInput: {
        fontSize: 16,
        width: "85%",
        height: "8%",
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