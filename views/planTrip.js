import * as Network from 'expo-network'
import { ImageBackground } from 'react-native'
import { WebView } from 'react-native-webview'
import React, { useEffect, useState } from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import { ErrorConnection } from '../components/errorConnectionNetwork'

export default function PlanTrip() {
  const headerHeight = useHeaderHeight()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    validateNetworkConnection()
  }, [])

  const validateNetworkConnection = async () => {
    const connectionState = await Network.getNetworkStateAsync()
    setIsConnected(connectionState?.isConnected ?? false)
  }

  return (
    <ImageBackground source={require('./../assets/fondo_azul.png')} style={{ flex: 1, paddingTop: headerHeight }} imageStyle={{ flex: 1 }}>
      {isConnected ?
        <WebView originWhitelist={['*']} source={{ uri: "https://metrocali.gov.co/app/views/planea/index.html" }} /> :
        <ErrorConnection text='Sin conexión a internet' />
      }
    </ImageBackground>
  )
}
