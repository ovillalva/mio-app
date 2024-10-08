// import axios from 'axios'
// import * as Location from 'expo-location'
// import MapView from 'react-native-map-clustering'
// import { useEffect, useState, useRef } from 'react'
// import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
// import { useHeaderHeight } from '@react-navigation/elements'
// import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Keyboard, TextInput, FlatList, KeyboardAvoidingView } from 'react-native'

import * as Network from 'expo-network'
import { ImageBackground } from 'react-native'
import { WebView } from 'react-native-webview'
import React, { useEffect, useState } from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import { ErrorConnection } from '../components/errorConnectionNetwork'

export default function Recharges() {
  const headerHeight = useHeaderHeight()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    validateNetworkConnection()
  }, [])

  const validateNetworkConnection = async () => {
    const connectionState = await Network.getNetworkStateAsync()
    setIsConnected(connectionState?.isConnected ?? false)
  }
  // const mapRef = useRef(null)
  // const headerHeight = useHeaderHeight()
  // const [result, setResult] = useState([])
  // const [markers, setMarkers] = useState([])
  // const [advice, setAdvice] = useState(false)
  // const [stations, setStations] = useState([])
  // const [dataModel, setDataModel] = useState()
  // const [location, setLocation] = useState(null)
  // const [searchValue, setSearchValue] = useState('')
  // const [valueFilter, setValueFilter] = useState('all')

  // const initialRegion = {
  //   latitude: 3.43722,
  //   longitude: -76.5225,
  //   latitudeDelta: 0.25,
  //   longitudeDelta: 0.15
  // };

  // useEffect(() => {
  //   (async () => {
  //     loadRecharges()
  //     _getAllStations()
  //     let { status } = await Location.requestForegroundPermissionsAsync()
  //     if (status !== 'granted') {
  //       return
  //     }
  //     let location = await Location.getCurrentPositionAsync({})
  //     setLocation(location)
  //   })();
  // }, [])

  // const loadRecharges = async () => {
  //   let finalArray = []
  //   const response = await axios.get('https://wsmio.siur.com.co:8083/apiMIO/jaxrs/pevrs/')
  //   for (const data of response.data) {
  //     data.type = 'recharge'
  //     finalArray.push(data)
  //   }
  //   const responseStations = await axios.get('https://www.metrocali.gov.co/IOSapp/Estaciones_SITM-MIO.json')
  //   for (const data of responseStations.data.features) {
  //     let object = {
  //       address: data.properties.DIRECCION,
  //       commune: '',
  //       id: data.properties.Field_1,
  //       latitude: parseFloat(data.properties.LATITUD),
  //       longitude: parseFloat(data.properties.LONGITUD),
  //       name: data.properties.Name,
  //       neighborhood: '',
  //       state: true,
  //       type: 'station'
  //     }
  //     finalArray.push(object)
  //   }
  //   mapRef.current.animateCamera({ center: initialRegion, zoom: 12 })
  //   setMarkers(finalArray)
  // }

  // const loadRechargesNear = async () => {
  //   let finalArray = []
  //   const latitude = location.coords.latitude ? location.coords.latitude : initialRegion.latitude
  //   const longitude = location.coords.longitude ? location.coords.longitude : initialRegion.longitude
  //   const response = await axios.get(`https://wsmio.siur.com.co:8083/apiMIO/jaxrs/pevrs/${latitude}/${longitude}/2000/`)
  //   for (const data of response.data) {
  //     data.type = 'recharge'
  //     finalArray.push(data)
  //   }
  //   const responseStations = await axios.get('https://www.metrocali.gov.co/IOSapp/Estaciones_SITM-MIO.json')
  //   for (const data of responseStations.data.features) {
  //     let object = {
  //       address: data.properties.DIRECCION,
  //       commune: '',
  //       id: data.properties.Field_1,
  //       latitude: parseFloat(data.properties.LATITUD),
  //       longitude: parseFloat(data.properties.LONGITUD),
  //       name: data.properties.Name,
  //       neighborhood: '',
  //       state: true,
  //       type: 'station'
  //     }
  //     finalArray.push(object)
  //   }
  //   const myRegion = {
  //     latitude,
  //     longitude,
  //     latitudeDelta: 0.25,
  //     longitudeDelta: 0.15
  //   }
  //   mapRef.current.animateCamera({ center: myRegion, zoom: 15 })
  //   setMarkers(finalArray)
  // }

  // const showAdviseModal = (data) => {
  //   setDataModel(data)
  //   setAdvice(true)
  // }

  // const hideAdviseModal = () => {
  //   setDataModel(null)
  //   setAdvice(false)
  // }

  // const goToMaps = (data) => {
  //   const latitude = location.coords.latitude ? location.coords.latitude : initialRegion.latitude
  //   const longitude = location.coords.longitude ? location.coords.longitude : initialRegion.longitude
  //   Linking.openURL(`https://www.google.com/maps/dir/${latitude},${longitude}/${data.latitude},${data.longitude}/`)
  // }

  // const changeFilter = () => {
  //   if (valueFilter === 'all') {
  //     loadRechargesNear()
  //     setValueFilter('near')
  //   } else {
  //     loadRecharges()
  //     setValueFilter('all')
  //   }
  // }

  // const _getAllStations = async () => {
  //   const response = await axios.get('https://www.metrocali.gov.co/IOSapp/Estaciones_SITM-MIO.json')
  //   setStations(response.data.features)
  // }

  // const findStation = (value) => {
  //   setSearchValue(value)
  //   if (value?.length >= 1) {
  //     const finalResult = stations.filter(route => {
  //       return route.properties.NOMBRE.includes(value)
  //     })
  //     setResult(finalResult)
  //     return
  //   }
  //   setResult([])
  // }

  // const selectedStation = (valueStation) => {
  //   setSearchValue('')
  //   setResult([])
  //   Keyboard.dismiss()
  //   const coordsStation = { latitude: valueStation.LATITUD, longitude: valueStation.LONGITUD, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
  //   mapRef.current.animateCamera({ center: coordsStation, zoom: 24 })
  // }

  // function renderRandomMarkers() {
  //   return markers.map((x, i) => (
  //     <Marker
  //       key={i}
  //       coordinate={{
  //         latitude: x.latitude,
  //         longitude: x.longitude
  //       }}
  //       onPress={() => showAdviseModal(x)}
  //     >
  //       <Image source={x.type === 'station' ? require('../assets/stationMio.png') : require('../assets/rechargeMio.png')} style={{ height: 35, width: 35, resizeMode: 'contain' }} />
  //     </Marker>
  //   ));
  // }

  // function showInfo() {
  //   return (
  //     <View style={styles.backgroundAdvise} >
  //       <TouchableOpacity activeOpacity={0.8} onPress={() => hideAdviseModal()} style={styles.absoluteButton} >
  //         <Image source={require('../assets/closeIcon.png')} style={styles.closeIcon} />
  //       </TouchableOpacity>
  //       {dataModel.type === 'recharge' ?
  //         <>
  //           <Text style={styles.nameRecharge} >
  //             {dataModel.name}
  //           </Text>
  //           <View style={styles.rowText} >
  //             <Text style={styles.nameRecharge} >
  //               Barrio:
  //             </Text>
  //             <Text style={styles.description} >
  //               {dataModel.neighborhood}
  //             </Text>
  //           </View>
  //           {dataModel.commune ?
  //             <View style={styles.rowText} >
  //               <Text style={styles.nameRecharge} >
  //                 Comuna:
  //               </Text>
  //               <Text style={styles.description} >
  //                 {dataModel.commune}
  //               </Text>
  //             </View> : <></>
  //           }
  //           <View style={styles.rowText} >
  //             <Text style={styles.nameRecharge} >
  //               Dirección:
  //             </Text>
  //             <Text style={styles.description} >
  //               {dataModel.address}
  //             </Text>
  //           </View>
  //           <View style={styles.rowText} >
  //             <Text style={styles.nameRecharge} >
  //               Estado:
  //             </Text>
  //             <Text style={styles.description} >
  //               {dataModel.state ? 'Abierto' : 'Cerrado'}
  //             </Text>
  //           </View>
  //           <TouchableOpacity style={styles.buttonGo} activeOpacity={0.8} onPress={() => goToMaps(dataModel)} >
  //             <Text style={styles.textGo} >
  //               IR
  //             </Text>
  //           </TouchableOpacity>
  //         </> :
  //         <>
  //           <Text style={styles.nameRecharge} >
  //             {dataModel.name}
  //           </Text>
  //           <View style={styles.rowText} >
  //             <Text style={styles.nameRecharge} >
  //               Dirección:
  //             </Text>
  //             <Text style={styles.description} >
  //               {dataModel.address}
  //             </Text>
  //           </View>
  //           <View style={styles.rowText} >
  //             <Text style={styles.nameRecharge} >
  //               Estado:
  //             </Text>
  //             <Text style={styles.description} >
  //               {dataModel.state ? 'Abierto' : 'Cerrado'}
  //             </Text>
  //           </View>
  //           <TouchableOpacity style={styles.buttonGo} activeOpacity={0.8} onPress={() => goToMaps(dataModel)} >
  //             <Text style={styles.textGo} >
  //               IR
  //             </Text>
  //           </TouchableOpacity>
  //         </>
  //       }
  //     </View>
  //   )
  // }

  return (
    <ImageBackground source={require('./../assets/fondo_azul.png')} style={{ flex: 1, paddingTop: headerHeight }} imageStyle={{ flex: 1 }}>
      {isConnected ?
        <WebView originWhitelist={['*']} source={{ uri: "https://metrocali.gov.co/app/views/pve/index.html" }} /> :
        <ErrorConnection text='Sin conexión a internet' />
      }
    </ImageBackground>
    // <View style={{ flex: 1 }} >
    //   <Image source={require('../assets/fondo_azul.png')} style={styles.imageBackground} />
    //   <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
    //     <View style={{ marginTop: headerHeight, ...styles.containerMap }}>
    //       <MapView
    //         ref={mapRef}
    //         style={styles.map}
    //         loadingEnabled={true}
    //         clusterColor={'#32588D'}
    //         showsUserLocation={true}
    //         provider={PROVIDER_GOOGLE}
    //         showsMyLocationButton={true}
    //         initialRegion={initialRegion}
    //       >
    //         {renderRandomMarkers()}
    //       </MapView>
    //       {advice ? showInfo() : <></>}
    //     </View>
    //     {result?.length > 0 ?
    //       <View style={styles.resultView} >
    //         <FlatList
    //           scrollEnabled
    //           data={result}
    //           keyboardShouldPersistTaps='handled'
    //           renderItem={(item) => {
    //             return (
    //               <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => selectedStation(item.item.properties)} >
    //                 <Text key={item.index} style={styles.textResult} >
    //                   {item.item.properties.NOMBRE}
    //                 </Text>
    //               </TouchableOpacity>
    //             )
    //           }}
    //           ListEmptyComponent={() => {
    //             return (
    //               <Text style={styles.empty} >
    //                 No hay estaciones que concuerden con tu busqueda
    //               </Text>
    //             )
    //           }}
    //         />
    //       </View> : <></>
    //     }
    //     <View style={styles.rowOptions} >
    //       <View style={styles.searcher} >
    //         <Image source={require('../assets/searchIcon.png')} style={styles.rowIcons} />
    //         <TextInput style={styles.input} value={searchValue} onChangeText={findStation} keyboardType="default" placeholder="Busca tu punto" placeholderTextColor={'#5576FA'} />
    //       </View>
    //       <TouchableOpacity style={styles.places} activeOpacity={0.8} onPress={() => changeFilter()} >
    //         <Image source={valueFilter === 'all' ? require('../assets/allIcon.png') : require('../assets/nearIcon.png')} style={styles.rowIcons} />
    //         <Text style={styles.textPlaces} >
    //           {valueFilter === 'all' ? 'Todos' : 'Cerca'}
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </KeyboardAvoidingView>
    // </View>
  )
}

// const styles = StyleSheet.create({
//   resultView: {
//     backgroundColor: '#FFFFFF',
//     height: 150,
//     width: '60%',
//     position: 'absolute',
//     bottom: 75,
//     elevation: 5,
//     left: 15
//   },
//   textResult: {
//     color: '#5576FA',
//     fontSize: 14,
//     fontFamily: 'Medium-Montserrat'
//   },
//   button: {
//     width: '100%',
//     paddingVertical: 10,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   empty: {
//     alignSelf: 'center',
//     paddingTop: 65,
//     color: '#5576FA',
//     fontFamily: 'Medium-Montserrat'
//   },
//   container: {
//     display: 'flex',
//     paddingTop: 60
//   },
//   imageBackground: {
//     flex: 1,
//     resizeMode: 'repeat',
//     width: '100%',
//     position: 'absolute'
//   },
//   rowHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     paddingLeft: 25,
//     marginTop: 50,
//     marginBottom: 25
//   },
//   buttons: {
//     height: 50,
//     width: 50,
//   },
//   titleHeader: {
//     color: '#F4A947',
//     marginLeft: 15,
//     fontSize: 18,
//     fontFamily: 'Medium-Montserrat'
//   },
//   containerMap: {
//     flex: 2
//   },
//   map: {
//     width: "100%",
//     height: "95%"
//   },
//   backgroundAdvise: {
//     position: 'absolute',
//     bottom: 50,
//     alignSelf: 'center',
//     backgroundColor: '#FFFFFF',
//     width: '90%',
//     borderRadius: 25,
//     padding: 15,
//   },
//   absoluteButton: {
//     position: 'absolute',
//     top: -15,
//     right: -10
//   },
//   closeIcon: {
//     resizeMode: 'contain',
//     height: 35,
//     width: 35,
//   },
//   nameRecharge: {
//     color: '#F4A947',
//     fontSize: 14,
//     fontFamily: 'Medium-Montserrat',
//     alignSelf: 'center',
//     textAlign: 'center'
//   },
//   rowText: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 3,
//   },
//   description: {
//     color: '#5576FA',
//     fontSize: 14,
//     fontFamily: 'Regular-Montserrat',
//     alignSelf: 'center',
//     marginLeft: 1
//   },
//   buttonGo: {
//     backgroundColor: '#5576FA',
//     padding: 5,
//     borderRadius: 10,
//     width: '15%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'flex-end'
//   },
//   textGo: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontFamily: 'Black-Montserrat',
//     alignSelf: 'center',
//   },
//   rowOptions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '95%',
//     top: -15,
//     alignSelf: 'center'
//   },
//   searcher: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '60%',
//     height: 30,
//     borderRadius: 30,
//     backgroundColor: '#FFFFFF'
//   },
//   places: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '30%',
//     height: 30,
//     borderRadius: 30,
//     backgroundColor: '#FFFFFF'
//   },
//   rowIcons: {
//     height: 30,
//     width: 30,
//     resizeMode: 'contain'
//   },
//   input: {
//     color: '#5576FA',
//     fontFamily: 'Regular-Montserrat',
//     fontSize: 14,
//     width: '80%',
//     marginLeft: 10
//   },
//   textPlaces: {
//     color: '#5576FA',
//     fontFamily: 'Regular-Montserrat',
//     fontSize: 14,
//     width: '80%',
//     marginLeft: 10
//   }
// })