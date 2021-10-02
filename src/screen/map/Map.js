
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';

// import all the components we are going to use
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    PermissionsAndroid,
    Platform,
    Button,
    Dimensions,
} from 'react-native';

//import all the components we are going to use.
import Geolocation from '@react-native-community/geolocation';

const Map = () => {
    const [
        currentLongitude,
        setCurrentLongitude
    ] = useState(73.156583);
    const [
        currentLatitude,
        setCurrentLatitude
    ] = useState(33.652041);
    const [
        locationStatus,
        setLocationStatus
    ] = useState('');

    useEffect(() => {
        // setCurrentLatitude(1000)
        Geolocation.getCurrentPosition(

            (position) => {
                // alert(JSON.stringify(position))
                const currentLongitude =
                    (position.coords.longitude);


                const currentLatitude =
                    (position.coords.latitude);

                //Setting Longitude state
                setCurrentLongitude(currentLongitude);

                //Setting Longitude state
                setCurrentLatitude(currentLatitude);
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    }, []);



    return (
        <>
            {/* <Text>{(currentLatitude)}</Text>
            <Text>{(currentLongitude)}</Text> */}
            <MapView
                region={{
                    latitude: currentLatitude,
                    longitude: currentLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}
                initialRegion={{
                    latitude: currentLatitude,
                    longitude: currentLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker

                    coordinate={{ latitude: currentLatitude ? currentLatitude : 0, longitude: currentLongitude ? currentLongitude : 0 }}
                    title="Current Locatino"
                // description={marker.description}
                />
            </MapView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boldText: {
        fontSize: 25,
        color: 'red',
        marginVertical: 16,
    },
});

export default Map;
