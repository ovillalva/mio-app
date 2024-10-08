import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export const CopBar = ({ navigation }) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('RoutesScreenCop')}
        >
            <Image
                source={require('../assets/rtcop2.jpg')}
                resizeMode='contain'
                style={styles.img}
            />
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    img: {
        marginTop: 10,
        width: '100%',
        height: 65
    }
})

export default CopBar