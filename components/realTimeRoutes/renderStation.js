import axios from 'axios'
import { Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Marker, Polyline } from 'react-native-maps'

export const RenderStation = ({ routeSelected, assetsTypeRoutes, showAdviseModal }) => {
  const [route, setRoute] = useState([])
  const [stations, setStations] = useState([])
  const [coordinatesStations, setCoordinatesStations] = useState([])

  useEffect(() => {
    if (routeSelected.name) {
      _getStations()
    }
  }, [routeSelected])

  const _getStations = async () => {
    let finalArray = []
    const stations = await axios.get(`https://wsmio.siur.com.co:8083/apiMIO/jaxrs/linestops/${routeSelected.name}`)
    const route = await axios.get(`https://metrocali.gov.co/path/getRoute.php?ruta=${routeSelected.name}`)
    const arrayRoute = route?.data[0]?.trazado?.split(',0')
    for (const iterator of arrayRoute) {
      const coordinates = iterator?.split(',')
      if (coordinates[0] && coordinates[1]) {
        finalArray.push({ longitude: parseFloat(coordinates[0]), latitude: parseFloat(coordinates[1]) })
      }
    }
    const newArray = stations.data.map((data) => ({
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude)
    }))
    setRoute(finalArray)
    setCoordinatesStations(newArray)
    setStations(stations.data)
  }

  return (
    <>
      {stations.map((x, i) => (
        <Marker
          key={i}
          onPress={() => showAdviseModal(x, 'station')}
          coordinate={{ latitude: x.latitude, longitude: x.longitude }}
        >
          <Image source={assetsTypeRoutes[routeSelected?.name[0]]?.urlImageTroncal} resizeMode='contain' style={{ height: 35, width: 35 }} />
        </Marker>
      ))
      }
      {coordinatesStations.map((x, i) => (
        <Polyline
          key={i}
          strokeWidth={5}
          geodesic={true}
          coordinates={route}
          strokeColor={assetsTypeRoutes[routeSelected?.name[0]]?.color}
        />
      ))}
    </>
  )
}
