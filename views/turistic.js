import { useState, useEffect } from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import { View, Image, StyleSheet, Text, Animated, TouchableOpacity, Linking, ScrollView, ImageBackground } from 'react-native'

export default function PlanTrip() {
  const headerHeight = useHeaderHeight()

  const [opacityRef] = useState(new Animated.Value(1))
  const [opacityRefLogo] = useState(new Animated.Value(0))
  const [valueAnimatedY] = useState(new Animated.Value(0))
  const [valueAnimated] = useState(new Animated.Value(-355))

  const mooveRLDiagonal = () => {
    Animated.timing(
      valueAnimated,
      {
        toValue: 50,
        duration: 2000,
        useNativeDriver: false,
      }
    ).start()
    Animated.timing(
      valueAnimatedY,
      {
        toValue: -75,
        duration: 2000,
        useNativeDriver: false,
      }
    ).start()
  }

  const opacity = () => {
    Animated.timing(
      opacityRef,
      {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false
      }
    ).start()
    Animated.timing(
      opacityRefLogo,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false
      }
    ).start()
  }

  useEffect(() => {
    mooveRLDiagonal()
    setTimeout(() => {
      opacity()
    }, 1000)
  }, [])

  return (
    <ImageBackground
      source={require('./../assets/fondo_azul.png')}
      style={{ flex: 1, paddingTop: headerHeight }}
      imageStyle={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: 'https://metrocali.gov.co/app/assets/cloud.png' }} style={styles.cloud1} />
        <Image source={{ uri: 'https://metrocali.gov.co/app/assets/cloud.png' }} style={styles.cloud2} />
        <Image source={{ uri: 'https://metrocali.gov.co/app/assets/cloud.png' }} style={styles.cloud3} />
        <Animated.Image source={{ uri: 'https://metrocali.gov.co/app/assets/lineTuristic.png' }} style={{ opacity: opacityRef, alignSelf: 'center', height: 100, width: '100%' }} />
        <Animated.Image
          source={{ uri: 'https://metrocali.gov.co/app/assets/cartTuristic.png' }}
          style={{ right: valueAnimated, bottom: valueAnimatedY, opacity: opacityRef, resizeMode: 'contain', height: 50, width: 50, marginTop: -84 }}
        />
        <Animated.Image
          source={{ uri: 'https://metrocali.gov.co/app/assets/logoTurist.png' }}
          style={{ opacity: opacityRefLogo, width: '50%', alignSelf: 'center', height: 100, resizeMode: 'contain', marginTop: -50 }}
        />
        <View style={styles.whiteBackground} >
          <Text style={styles.titleView} >
            Diversión y cultura desde las alturas
          </Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => Linking.openURL('https://www.metrocali.gov.co/ruta-turistica-mio-cable/')} >
            <Image source={require('../assets/rutas.png')} style={styles.routes} />
          </TouchableOpacity>
          <Image source={{ uri: 'https://metrocali.gov.co/app/assets/mapa.png' }} style={styles.map} />
          <Image source={{ uri: 'https://metrocali.gov.co/app/assets/enjoy.png' }} style={styles.enjoy} />
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'repeat',
    width: '100%',
    position: 'absolute'
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 25
  },
  buttons: {
    height: 50,
    width: 50,
  },
  titleHeader: {
    color: '#F4A947',
    marginLeft: 15,
    fontSize: 18,
    fontFamily: 'Medium-Montserrat'
  },
  cloud1: {
    width: '15%',
    resizeMode: 'contain',
    position: 'absolute',
    left: 25
  },
  cloud2: {
    width: '15%',
    height: 80,
    resizeMode: 'contain',
    position: 'absolute',
    right: 25
  },
  cloud3: {
    width: '25%',
    height: 80,
    resizeMode: 'contain',
    position: 'absolute',
    top: 60,
    left: 60
  },
  whiteBackground: {
    backgroundColor: '#FFFFFF',
    marginTop: 25,
  },
  titleView: {
    color: '#F4A947',
    marginTop: 15,
    fontSize: 16,
    fontFamily: 'Black-Montserrat',
    alignSelf: 'center'
  },
  routes: {
    alignSelf: 'center',
    width: '90%',
    height: 150,
    resizeMode: 'contain'
  },
  map: {
    resizeMode: 'contain',
    width: '90%',
    height: 300,
    alignSelf: 'center'
  },
  enjoy: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: '90%',
    height: 100,
    marginTop: -25
  }
})