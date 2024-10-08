import 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated'
import { Image } from "react-native-expo-image-cache";

export default function Splash() {
  const offset = useSharedValue(-450)
  const [image, setImage] = useState()

  const defaultSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(offset.value * 400), }],
    };
  });

  const mooveLR = () => {
    offset.value = withTiming(1, {
      duration: 3000,
      easing: Easing.out(Easing.exp),
    });
  }

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  useEffect(() => {
    const random = getRandomNumber(1, 3)
    switch (random) {
      case 1:
        setImage({ uri: 'https://metrocali.gov.co/app/assets/padron.png' })
        mooveLR()
        break
      case 2:
        setImage({ uri: 'https://metrocali.gov.co/app/assets/gas_natural.png' })
        mooveLR()
        break
      case 3:
        setImage({ uri: 'https://metrocali.gov.co/app/assets/alimentador_bus.png' })
        mooveLR()
        break
    }
  }, [])

  return (
    <ImageBackground
      source={require('../assets/fondo_azul.png')}
      style={{ ...styles.imageBackground, paddingTop: 120 }}
      imageStyle={styles.imageBackground}
    >
      <View style={styles.viewText} >
        <Image
          defaultSource={require('../assets/LOGO_MIO.png')}
          source={{ uri: 'https://metrocali.gov.co/app/assets/LOGO_MIO.png' }}
          style={styles.imageLogo}
          resizeMode='contain'
        />
        <Text style={styles.textSecond} >App</Text>
        <Animated.Image source={image} style={[defaultSpringStyles, styles.busAnimated]} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewText: {
    top: 250,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 70,
    color: '#FFFFFF',
    fontFamily: 'Medium-Montserrat'
  },
  textSecond: {
    fontSize: 70,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Regular-Montserrat'
  },
  busAnimated: {
    height: 150,
    width: '100%',
    marginTop: 100,
    resizeMode: 'contain',
  },
  imageLogo: {
    resizeMode: 'contain',
    width: '100%',
    height: 100,
    marginTop: -5
  },
})