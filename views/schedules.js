import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { routesSchedules } from '../utils/arraySchedules'
import { useHeaderHeight } from '@react-navigation/elements'
import { StyleSheet, ScrollView, ImageBackground, View, Text, TouchableOpacity } from 'react-native'

export default function Schedules() {
  const navigation = useNavigation()
  const headerHeight = useHeaderHeight()

  const [routes, setRoutes] = useState([])
  const [stations, setStations] = useState([])
  const [actualDay, setActualDay] = useState('')
  const [routeSelected, setRouteSelected] = useState()

  const assetsTypeRoutes = {
    'E': { color: '#FAAB00' },
    'T': { color: '#DF0101' },
    'P': { color: '#013ADF' },
    'M': { color: '#FAAB00' },
    'A': { color: '#80FF00' },
    'C': { color: '#D3049B' },
  }

  useEffect(() => {
    const date = new Date()
    setKeyDayForSchedule(date.getDay())
    loadRoutesWithSchedule()

    return () => {
      loadRoutesWithSchedule()
    }
  }, [])

  const setKeyDayForSchedule = (date) => {
    if (date > 0 && date < 6) {
      setActualDay('normal')
    } else if (date === 0) {
      setActualDay('weekend')
    } else {
      setActualDay('saturday')
    }
  }

  const loadRoutesWithSchedule = async () => {
    const response = await axios.get('https://wsmio.siur.com.co:8083/apiMIO/jaxrs/linesOperation')
    setRoutes(response.data)
  }

  const setTimeHour = (hour, value) => {
    const hourSeparator = hour.split(':')
    if (+hourSeparator[0] < 12) {
      return 'am'
    } else {
      return 'pm'
    }
  }

  const loadStations = async (lineId) => {
    if (stations.length > 0 && (lineId === routeSelected)) {
      setStations([])
      setRouteSelected(lineId)
    } else {
      setStations([])
      setRouteSelected(lineId)
      const response = await axios.get(`https://wsmio.siur.com.co:8083/apiMIO/jaxrs/linestops/${lineId}`)
      let arrayStations = []
      for (const iterator of response.data) {
        arrayStations.push({ name: iterator.stopNam })
      }
      setStations(arrayStations)
    }
  }

  const navigateRoute = (route) => {
    navigation.navigate('RoutesScreen', { idRoute: route })
  }

  const setSchedule = (valueLine) => {
    const response = routesSchedules.filter(value => {
      if (value.route === valueLine) {
        return value.schedules
      }
    })
    if (response && response?.length > 0) {
      const getHour = response[0].schedules.filter(value => value.typeDay === actualDay)
      if (getHour && getHour.length > 0) {
        return getHour[0].schedule
      } else {
        return ''
      }
    } else {
      return ''
    }
  }

  return (
    <ImageBackground
      source={require('./../assets/fondo_azul.png')}
      style={{ flex: 1, paddingTop: headerHeight }}
      imageStyle={{ flex: 1 }}
    >
      <View style={styles.whiteBackground} >
        <ScrollView showsVerticalScrollIndicator={false}>
          {routes?.map((value, i) => (
            <View key={i} >
              <View style={styles.viewCard} >
                <View style={styles.firstRow} >
                  <View style={styles.columnLine} >
                    <Text style={styles.textLine} >
                      {value?.line}
                    </Text>
                    <View style={{ width: '100%', height: 7, backgroundColor: assetsTypeRoutes[value?.line[0]]?.color, marginTop: 2, borderRadius: 5 }} />
                  </View>
                  <Text style={styles.textHours} >
                    {setSchedule(value?.line)}
                  </Text>
                </View>
                <View style={styles.columnButtons} >
                  <TouchableOpacity onPress={() => loadStations(value?.line)} activeOpacity={0.5} >
                    <Text style={styles.iconArrow} >
                      {(routeSelected === value?.line) && stations?.length > 0 ? 'Ocultar listado de paradas' : 'Ver listado de paradas'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigateRoute(value?.line)} activeOpacity={0.5} >
                    <Text style={styles.iconArrow} >
                      Ver ruta en el mapa
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {(routeSelected === value?.line) && stations?.length > 0 ?
                <>
                  <Text style={styles.textStationsTitle}>
                    Resumen de recorrido por estaciones:
                  </Text>
                  {stations?.map((value, i) => (
                    <Text key={i} style={styles.textStations} >
                      {i + 1}. {value?.name}
                    </Text>
                  ))}
                </> : <></>
              }
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  whiteBackground: {
    flex: 1,
    padding: 20,
    width: '100%',
    marginTop: 25,
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  viewCard: {
    width: '100%',
    marginVertical: 15,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 3,
    zIndex: 999,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20
  },
  firstRow: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnButtons: {
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textLine: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Black-Montserrat',
  },
  textHours: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Regular-Montserrat'
  },
  columnLine: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  iconArrow: {
    fontSize: 16,
    marginTop: 10,
    color: '#000000',
    textDecorationLine: 'underline',
    fontFamily: 'Regular-Montserrat',
  },
  textStations: {
    fontSize: 16,
    color: '#000000',
    marginVertical: 5,
    fontFamily: 'Regular-Montserrat',
  },
  textStationsTitle: {
    fontSize: 16,
    color: '#000000',
    marginVertical: 5,
    fontFamily: 'Medium-Montserrat',
  }
})