import { useState } from 'react';
import { useHeaderHeight } from '@react-navigation/elements'
import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import { TabView, SceneMap, TabBar  } from 'react-native-tab-view';
import Radicar from './radicar'
import Consulta from './consulta'

export default function Pqr() {

  

  const headerHeight = useHeaderHeight()
  const renderScene = SceneMap({
    radicar: Radicar,
    consulta: Consulta
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'radicar', title: 'Radicar' },
    { key: 'consulta', title: 'Consulta' }
  ])

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }} 
      style={{ backgroundColor: '#2950CF' }} 
      labelStyle={{ color: 'white' }} 
    />
  );

  return (
    <ImageBackground
      source={require('./../assets/fondo_azul.png')}
      style={{ flex: 1, paddingTop: headerHeight }}
      imageStyle={{ flex: 1 }}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar} // Usa el TabBar personalizado
      />

    </ImageBackground>
  )
}

const styles = StyleSheet.create({

})