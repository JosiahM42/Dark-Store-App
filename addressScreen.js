//https://github.com/react-native-maps/react-native-maps
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import React, { useState } from'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, TextInput, Image} from 'react-native';
import Geocoder from 'react-native-geocoding';

export const AddressScreen = () => {
    
    const [getLocation, setLocation] = useState('');

    const [getLat, setLat] = useState(0.0);
    const [getLong, setLong] = useState(0.0);


    // let userAddress = getUserAddress()
    // let long = userAddress.results[0].geometry.location.lng;
    // let lat = userAddress.results[0].geometry.location.lat;


    // Geocoder.from("BS16 1QY")
	// 	    .then(json => {
	// 		var location = json.results[0].geometry.location;
	// 		console.log(location);
	// 	    })
	// 	    .catch(error => 
    //             alert(error.message)
    //         );


    const darkStoreRegion = {
        latitude: 51.500986,
        longitude: -2.548292,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421,
    };

    // let userCoordinate = [
    //     {
    //         latitude: getLat,
    //         longitude: getLong,
    //     },
    //     {
    //         latitude: 51.500986,
    //         longitude: -2.548292,
    //     },
    // ]

    let userCoordinate = 
    {
        // latitude: 51.500986,
        // longitude: -2.548292,
        latitude: getLat,
        longitude: getLong,
    };
    
    function calculateDistance(){
        
    }

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
                            source={require('./assets/icons8-warehouse.png')} 
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
                <View style = {styles.buttonLayout}>
                <TouchableHighlight
                    onPress={() => geocodingUserAddress()}
                    //onPress={() => screenNavigate.navigate('SignUp')}
                    style={styles.button}
                    underlayColor="#DDDDDD"
                    backgroundColor="#99D98C"
                >
                    <Text style={styles.textButton}>Sign Up</Text>
                </TouchableHighlight>
                
            </View>
                
            </View>
        )
    }

    function geocodingUserAddress(){
        //var location;
        //geocoding Google API Key
        Geocoder.init("AIzaSyDDRYyy-kCd1dNrRH-eeQ4YHhQ4FoNRYIo");

        Geocoder.from(getLocation)
        .then(json => {
            var location = json.results[0].geometry.location;
            setLat(location.lat);
            setLong(location.lng);
            console.log(location);
        })
        .catch(error => 
            alert(error.message)
        )
        
    }

    return (

        <View style={{flex: 1}}>
            {displayMap()}
            {getUserAddress()}
            {/* {geocodingUserAddress()} */}
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