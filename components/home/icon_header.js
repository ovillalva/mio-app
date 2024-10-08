import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Image } from "react-native-expo-image-cache";

export const ImageHeaderHome = () => {
  return (
    <View>
      <Image
        defaultSource={require('../../assets/LOGO_MIO.png')}
        source={{ uri: 'https://metrocali.gov.co/app/assets/LOGO_MIO.png' }}
        style={styles.imageLogo}
        resizeMode='contain'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imageLogo: {
    resizeMode: 'contain',
    width: '100%',
    height: 70,
    marginTop: -5
  },
})