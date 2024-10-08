import React from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, Text, TouchableOpacity } from 'react-native';
import { CustomTitleHeader } from './header/titleCustom';
import { Image } from "react-native-expo-image-cache";
//import FastImage from 'react-native-fast-image';

export default function CustomDrawer({ navigation }) {
  const ButtonMenu = ({ ruta, titulo, subtitulo, image,re }) => {
    return (
      <TouchableOpacity style={styles.rowHeader} onPress={() => navigation.navigate(ruta)} activeOpacity={0.8}>
        <Image
          defaultSource={re}
          source={{ uri: `https://metrocali.gov.co/app/assets/${image}` }}
          style={styles.buttons}
        />
        <CustomTitleHeader titleStyle={{ fontSize: 15 }} title={titulo} subTtitle={subtitulo} />
      </TouchableOpacity>
    );
  };


  return (
    <ImageBackground source={{ uri: 'https://metrocali.gov.co/app/assets/fondo_blanco.png' }} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.firstText}>Hola, te damos la bienvenida</Text>
        <Text style={styles.textTwo}>¿A dónde vamos?</Text>
      </View>
      <ScrollView style={styles.buttonsView} showsVerticalScrollIndicator={false}>
        <ButtonMenu ruta='HomeScreen' titulo='Inicio' subtitulo='' image='home.png' re={require('../assets/home.png')}/>
        <ButtonMenu ruta='PlanTrip' titulo='Planea' subtitulo='tu viaje' image='routes.png' re={require('../assets/routes.png')}/>
        <ButtonMenu ruta='RoutesScreen' titulo='Rutas' subtitulo='en tiempo real' image='stations.png' re={require('../assets/stations.png')}/>
        <ButtonMenu ruta='Schedule' titulo='Horarios' subtitulo='de las rutas' image='schedules.png' re={require('../assets/schedules.png')}/>
        <ButtonMenu ruta='Recharges' titulo='Puntos' subtitulo='de recarga' image='myCard.png' re={require('../assets/myCard.png')}/>
        <ButtonMenu ruta='CardScreen' titulo='Consulta' subtitulo='tu saldo' image='otherCard.png' re={require('../assets/otherCard.png')}/>
        <ButtonMenu ruta='Pqr' titulo='PQRSDF' subtitulo='' image='pqr.png' re={require('../assets/pqr.png')}/>
        <ButtonMenu ruta='MapsDocument' titulo='Mapa' subtitulo='general de servicio' image='logoMapPdf.png' re={require('../assets/logoMapPdf.png')}/>
        <ButtonMenu ruta='TuristicPage' titulo='Ruta' subtitulo='Turistica' image='logoMapPdf.png' re={require('../assets/logoMapPdf.png')}/>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingTop: 15,
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  firstText: {
    color: '#5576FA',
    fontSize: 16,
    fontFamily: 'Medium-Montserrat',
    textAlign: 'center'
  },
  textTwo: {
    color: '#5576FA',
    fontSize: 16,
    fontFamily: 'Black-Montserrat',
    textAlign: 'center',
    marginTop: 10
  },
  buttonsView: {
    flex: 2,
    backgroundColor: '#5576FA',
    paddingTop: 30,
    paddingLeft: 15
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 15
  },
  buttons: {
    height: 40,
    width: 40,
    marginRight: 16
  },
});
