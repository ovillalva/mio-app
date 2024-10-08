import React, { useState, useEffect } from 'react';
import { Carousel } from '../components/home/carousel'
import { useHeaderHeight } from '@react-navigation/elements'
import { ImageHeaderHome } from '../components/home/icon_header'
import { View, StyleSheet, TouchableOpacity, Linking, ScrollView, ImageBackground, Text } from 'react-native'
import { FloatingButton } from '../components/FloatingButton'
import axios from 'axios'
import { Image } from "react-native-expo-image-cache";
import { CopBar } from '../components/CopBar';

export default function HomeScreen({ navigation }) {
  const headerHeight = useHeaderHeight()
  const [isCop, setIsCop] = useState(false);

  useEffect(() => {
    const init = async () => {
      await getStatusCop();
    }
    init();
  }, [])


  const getStatusCop = async () => {
    try {
      const source = axios.CancelToken.source();
      const timeout = setTimeout(() => {
        source.cancel('Request timed out');
      }, 10000);

      const response = await axios.get('https://metrocali.gov.co/app/views/rutasCOP/api/estamosEnCOP.php', {
        cancelToken: source.token,
      });

      clearTimeout(timeout);

      if (response.status === 200) {
        return setIsCop(response.data.COP);
      } else {
        setIsCop(false);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error('Request cancelled due to timeout');
      } else {
        console.error(error);
      }
      setIsCop(false);
    }
  };


  return (
    <ImageBackground
      source={require('../assets/fondo_azul.png')}
      style={{ ...styles.imageBackground, paddingTop: (headerHeight) }}
      imageStyle={styles.imageBackground}
    >
      <View style={styles.container}>
        {/* <ScrollView style={styles.container} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} > */}
        <ImageHeaderHome />

        <View style={styles.rowMenu} >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.containerButton} >
            <View style={styles.columnOptions} >
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('PlanTrip')} >
                <Image
                  defaultSource={require('../assets/routes.png')}
                  source={{ uri: 'https://metrocali.gov.co/app/assets/routes.png' }}
                  resizeMode="contain"
                  style={styles.buttons}
                />
              </TouchableOpacity>
              <Text style={styles.textColumn} >
                Planea
              </Text>
            </View>
            <View style={styles.columnOptions}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('RoutesScreen')}  >
                {/* <Image source={require('../assets/stations.png')} resizeMode='contain' style={styles.buttons} /> */}
                <Image
                  defaultSource={require('../assets/stations.png')}
                  source={{ uri: 'https://metrocali.gov.co/app/assets/stations.png' }}
                  resizeMode='contain'
                  style={styles.buttons}
                />
              </TouchableOpacity>
              <Text style={styles.textColumn} >
                Rutas
              </Text>
            </View>
            <View style={styles.columnOptions}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Schedule')}  >
                {/* <Image source={require('../assets/schedules.png')} resizeMode='contain' style={styles.buttons} /> */}
                <Image
                  defaultSource={require('../assets/schedules.png')}
                  source={{ uri: 'https://metrocali.gov.co/app/assets/schedules.png' }}
                  resizeMode='contain'
                  style={styles.buttons}
                />
              </TouchableOpacity>
              <Text style={styles.textColumn} >
                Horarios
              </Text>
            </View>
            <View style={styles.columnOptions}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Recharges')} >
                {/* <Image source={require('../assets/myCard.png')} resizeMode='contain' style={styles.buttons} /> */}
                <Image
                  defaultSource={require('../assets/myCard.png')}
                  source={{ uri: 'https://metrocali.gov.co/app/assets/myCard.png' }}
                  resizeMode='contain'
                  style={styles.buttons}
                />
              </TouchableOpacity>
              <Text style={styles.textColumn} >
                Recargas
              </Text>
            </View>
            <View style={styles.columnOptions}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('CardScreen')} >
                {/* <Image source={require('../assets/otherCard.png')} resizeMode='contain' style={styles.buttons} /> */}
                <Image
                  defaultSource={require('../assets/otherCard.png')}
                  source={{ uri: 'https://metrocali.gov.co/app/assets/otherCard.png' }}
                  resizeMode='contain'
                  style={styles.buttons}
                />
              </TouchableOpacity>
              <Text style={styles.textColumn} >
                Tarjeta
              </Text>
            </View>
            <View style={styles.columnOptions}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Pqr')} >
                {/* <Image source={require('../assets/pqr.png')} resizeMode='contain' style={styles.buttons} /> */}
                <Image
                  defaultSource={require('../assets/pqr.png')}
                  source={{ uri: 'https://metrocali.gov.co/app/assets/pqr.png' }}
                  resizeMode='contain'
                  style={styles.buttons}
                />
              </TouchableOpacity>
              <Text style={styles.textColumn} >
                PQR
              </Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.whiteBackground} >
          <View style={{ flex: 1, width: '100%' }}>
            {isCop ? (
              <CopBar navigation={navigation} />
            ) : (
              <></>
            )}
            <Carousel />
          </View>
          <View style={styles.rowHelp} >
            <TouchableOpacity activeOpacity={0.8} onPress={() => Linking.openURL('https://twitter.com/METROCALI')} >
              <Image
                defaultSource={require('../assets/twitterx.png')}
                source={{ uri: 'https://metrocali.gov.co/app/assets/twitterx.png' }}
                resizeMode='contain'
                style={styles.buttonSocial}
              />
              {/* <Image source={require('../assets/twitterx.png')} resizeMode='contain' style={styles.buttonSocial} /> */}
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => Linking.openURL('https://www.facebook.com/MetrocaliMIO/')} >
              <Image
                defaultSource={require('../assets/facebook.png')}
                source={{ uri: 'https://metrocali.gov.co/app/assets/facebook.png' }}
                resizeMode='contain'
                style={styles.buttonSocial}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => Linking.openURL('https://www.instagram.com/metrocali_mio/')} >
              <Image
                defaultSource={require('../assets/instagram.png')}
                source={{ uri: 'https://metrocali.gov.co/app/assets/instagram.png' }}
                resizeMode='contain'
                style={styles.buttonSocial}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => Linking.openURL('https://youtube.com/@MetrocaliMIO')} >
              <Image
                defaultSource={require('../assets/youtube.png')}
                source={{ uri: 'https://metrocali.gov.co/app/assets/youtube.png' }}
                resizeMode='contain'
                style={styles.buttonSocial}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => Linking.openURL('whatsapp://send?phone=573113086000')} >
              <Image
                defaultSource={require('../assets/wp.png')}
                source={{ uri: 'https://metrocali.gov.co/app/assets/wp.png' }}
                resizeMode='contain'
                style={styles.buttonSocial}
              />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.line} />
          </View>
          <View style={styles.containerButtonMs}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('TuristicPage')} style={styles.buttonsTochMs}>
              <Image
                defaultSource={require('../assets/logoTurist.png')}
                source={{ uri: 'https://metrocali.gov.co/app/assets/logoTurist.png' }}
                resizeMode='contain'
                style={styles.buttonsMs}
              />
              <Image
                defaultSource={require('../assets/cloud.png')}
                source={{ uri: 'https://metrocali.gov.co/app/assets/cloud.png' }}
                resizeMode='contain'
                style={styles.cloud1}
              />
              <Image
                defaultSource={require('../assets/cloud.png')}
                source={{ uri: 'https://metrocali.gov.co/app/assets/cloud.png' }}
                style={styles.cloud2}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        </View>
        {isCop ? (
          <FloatingButton navigation={navigation} />
        ) : (
          <></>
        )}
        {/* </ScrollView > */}
      </View>
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  rowMenu: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2950CF',
    borderRadius: 30,
    padding: 6,
    marginHorizontal: 5,
    overflow: 'hidden'
  },
  buttons: {
    height: 45,
    width: 45
  },
  buttonSocial: {
    height: 35,
    width: 35
  },
  buttonsMs: {
    alignSelf: 'center',
    height: 80,
    width: 70,
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    width: '100%',
    height: 'auto'
  },
  imageLogoTwo: {
    //resizeMode: 'contain',
    // width: '10%',
    // height: 10,
    // marginTop: 10
  },
  rowHelp: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10
  },
  columnOptions: {
    marginHorizontal: 2,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  columnOptionsMs: {
    marginHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  textColumn: {
    marginTop: 2,
    color: '#FFFFFF',
    fontSize: 10
  },
  containerButton: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  line: {
    borderBottomColor: '#2950CF',
    borderBottomWidth: 1,
    marginVertical: 5,
    width: '90%',
  },
  containerButtonMs: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10
  },
  rowMoreServices: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10
  },
  buttonsTochMs: {
    backgroundColor: '#5576fa',
    height: 70,
    width: '90%',
    borderRadius: 15,
  },
  cloud1: {
    width: '15%',
    height: 80,
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
  }
})