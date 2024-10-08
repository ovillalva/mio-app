import Pqr from './views/pqr'
import Splash from './views/splash'
import { useFonts } from 'expo-font'
import Culture from './views/culture'
import HomeScreen from './views/home'
import CardScreen from './views/card'
import 'react-native-gesture-handler'
import PlanTrip from './views/planTrip'
import Schedule from './views/schedules'
import RoutesScreen from './views/routes'
import RoutesScreenCop from './views/routesCop'
import Recharges from './views/recharges'
import RechargesPrueba from './views/rechargesPrueba'
import TuristicPage from './views/turistic'
import CustomDrawer from './components/drawer'
import MapsDocument from './views/mapsDocument'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { TitleHeader } from './components/header/titleCustomHeader'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [fontsLoaded] = useFonts({
    'Thin-Montserrat': require('./assets/fonts/thinmonstserrat.ttf'),
    'Black-Montserrat': require('./assets/fonts/blackmontserrat.ttf'),
    'Light-Montserrat': require('./assets/fonts/lightmontserrat.ttf'),
    'Medium-Montserrat': require('./assets/fonts/mediummonstserrat.ttf'),
    'Regular-Montserrat': require('./assets/fonts/regularmonstserrat.ttf'),
  })

  const Drawer = createDrawerNavigator()

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
    clearTimeout()
  }, [])

  const Root = () => {
    return (
      <Drawer.Navigator
        initialRouteName='HomeScreen'
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerTintColor: '#ffffff',
        }}
      >
        <Drawer.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{
            headerTitle: '',
            headerTransparent: true,
            headerTitleAlign: 'center',
          }}
        />
        <Drawer.Screen name="PlanTrip"
          component={PlanTrip}
          options={{
            headerTransparent: true,
            headerTitle: (_) => <TitleHeader title='Planea' subTtitle='tu viaje' />,
          }}
        />
        <Drawer.Screen name="Schedule"
          component={Schedule}
          options={{
            headerTransparent: true,
            headerTitle: (_) => <TitleHeader title='Horarios' subTtitle='de las rutas' />,
          }}
        />
        <Drawer.Screen name="RoutesScreen"
          component={RoutesScreen}
          options={{
            unmountOnBlur: true,
            headerTransparent: true,
            headerTitle: (_) => <TitleHeader title='Rutas' subTtitle='en tiempo real' />,
          }}
        />
        <Drawer.Screen name="RoutesScreenCop"
          component={RoutesScreenCop}
          options={{
            unmountOnBlur: true,
            headerTransparent: true,
            headerTitle: (_) => <TitleHeader title='Rutas' subTtitle='en tiempo real' />,
          }}
        />
        <Drawer.Screen name="Recharges" component={Recharges}
          options={{
            unmountOnBlur: true,
            headerTransparent: true,
            headerTitle: (_) => <TitleHeader title='Puntos' subTtitle='de recarga' />,
          }} />
        <Drawer.Screen name="CardScreen" component={CardScreen}
          options={{
            unmountOnBlur: true,
            headerTransparent: true,
            headerTitle: (_) => <TitleHeader title='Consulta' subTtitle='tu saldo' />,
          }} />
        <Drawer.Screen name="Culture" component={Culture}
          options={{
            unmountOnBlur: true,
            headerTransparent: true,
            headerTitle: (_) => <TitleHeader title='Cultura' subTtitle='mío' />,
          }} />
        <Drawer.Screen name="Pqr" component={Pqr}
          options={{
            unmountOnBlur: true,
            headerTransparent: true,
            headerTitle: (_) => <TitleHeader title='PQRSDF' subTtitle='' />,
          }} />
        <Drawer.Screen name="TuristicPage" component={TuristicPage}
          options={{
            unmountOnBlur: true,
            headerTransparent: true,
            headerTitle: (_) => <TitleHeader title='Ruta' subTtitle='turística' />,
          }} />
        <Drawer.Screen name="MapsDocument" component={MapsDocument}
          options={{
            unmountOnBlur: true,
            headerTransparent: true,
            headerTitle: (_) => <TitleHeader title='Mapa' subTtitle='general de servicio' />,
          }} />
      </Drawer.Navigator>
      
    )
  }

  if (fontsLoaded) {
    if (isLoading) {
      return <Splash />
    } else {
      return (
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      )
    }
  }
  return null
}
