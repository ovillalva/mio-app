import axios from 'axios'
import { Marker } from 'react-native-maps'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { accesibles, duals, electrics } from '../../utils/arrayBuses'

export const RenderBuses = ({ routeSelected, showAdviseModal, assetsTypeRoutes }) => {
  const [buses, setBuses] = useState([])

  useEffect(() => {
    let interval
    if (routeSelected.name) {
      clearInterval(interval)
      _getBuses()
      interval = setInterval(async () => {
        _getBuses()
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [routeSelected])

  const _getBuses = async () => {
    const busesResponse = await axios.get(`https://wsmio.siur.com.co:8083/apiMIO/jaxrs/operations/${routeSelected.name}`)
    for (const data of busesResponse.data) {
      const returnData = data.gpsx.toString().slice(0, 3)
      const returnData2 = data.gpsx.toString().slice(3)
      const returnDataY = data.gpsy.toString().slice(0, 1)
      const returnDataY2 = data.gpsy.toString().slice(1)
      const x = returnData + '.' + returnData2
      const y = returnDataY + '.' + returnDataY2
      data.gpsx = parseFloat(x)
      data.gpsy = parseFloat(y)
    }
    setBuses(busesResponse.data)
  }

  const validateIconBuses = (data) => {
    const { urlImageBusSuccess, urlImageBusError } = assetsTypeRoutes[routeSelected.name[0]]
    if (duals.includes(data.busNumber.toString())) {
      return urlImageBusSuccess
    } else {
      return urlImageBusError
    }
  }

  const validateEcoBuses = (data) => {
    if (electrics.includes(data.busNumber.toString())) {
      return require('../../assets/bus_eco.png')
    } else {
      return null
    }
  }

  const validateInclusivesBuses = (data) => {
    if (accesibles.includes(data.busNumber.toString())) {
      return require('../../assets/bus_inclusivo.png')
    } else {
      return null
    }
  }

  return buses.map((x, i) => (
    <View key={x.busNumber.toString()}>
      <Marker
        coordinate={{
          latitude: x.gpsy,
          longitude: x.gpsx
        }}
        onPress={() => showAdviseModal(x, 'bus')}
      >
        <Text style={styles.textBus} >{routeSelected.name}</Text>
        <View style={styles.columnIcons} >
          <View style={{ flexDirection: 'row', display: 'flex' }} >
            <Image source={validateInclusivesBuses(x)} resizeMode='contain' style={{ height: 15, width: 15, marginBottom: -7, marginLeft: 10 }} />
            <Image source={validateEcoBuses(x)} resizeMode='contain' style={{ height: 15, width: 15, marginBottom: -7 }} />
          </View>
          <Image source={validateIconBuses(x)} resizeMode='contain' style={{ height: 35, width: 35, zIndex: -9999 }} />
        </View>
      </Marker>
    </View>
  ))
}

const styles = StyleSheet.create({
  columnIcons: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBus: {
    color: '#000000',
    fontSize: 8,
    fontFamily: 'Black-Montserrat',
    alignSelf: 'center',
    right: 8,
    bottom: 12,
    position: 'absolute',
    zIndex: 9999
  },
})