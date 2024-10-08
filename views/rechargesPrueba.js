import { Text, View, ImageBackground, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import axios from 'axios'

export const RechargesPrueba = () => {
    const headerHeight = useHeaderHeight()

    const initialRegion = {
        latitude: 3.43722,
        longitude: -76.5225,
        latitudeDelta: 0.25,
        longitudeDelta: 0.15
    };

    return (
        <ImageBackground
            source={require('../assets/fondo_azul.png')}
            style={{ ...styles.imageBackground, paddingTop: (headerHeight) }}
            imageStyle={styles.imageBackground}
        >
            <MapView
                initialRegion={initialRegion}
                style={styles.map}
                showsUserLocation={true}
                showsMyLocationButton={true}
                clusterColor={'#32588D'}
                provider={PROVIDER_GOOGLE}
            />
        </ImageBackground>
    )

}
const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "95%"
    },
})

export default RechargesPrueba