import { Image } from 'react-native'
import { Marker } from 'react-native-maps'
import { Polyline } from 'react-native-maps'
import React, { useEffect, useState } from 'react'
import { station } from '../../utils/arrayStationsMiocable'

export const RenderMiocable = () => {
  const [stations, setStations] = useState([])
  const [coordinatesStations, setCoordinatesStations] = useState([])

  useEffect(() => {
    _getStations()
  }, [])

  const _getStations = async () => {
    const newArray = station.map((data) => ({
      latitude: parseFloat(data.coordinates.latitude),
      longitude: parseFloat(data.coordinates.longitude)
    }))
    setCoordinatesStations(newArray)
    setStations(station)
  }

  return (
    <>
      {stations.map((x, i) => (
        <Marker
          key={i}
          description={x.name}
          coordinate={{ latitude: x.coordinates.latitude, longitude: x.coordinates.longitude }}
        >
          <Image source={require('../../assets/miocableStation.png')} resizeMode='contain' style={{ height: 35, width: 35 }} />
        </Marker>
      ))
      }
      <Polyline
        strokeWidth={6}
        strokeColor="#A61B49"
        coordinates={coordinatesStations}
      />
    </>
  )
}
