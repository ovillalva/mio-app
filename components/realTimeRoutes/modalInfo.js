import { StyleSheet, Modal, View, Pressable, Text, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export const ModalInfo = (props) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={props.modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={styles.buttonClose}
            onPress={() => props.setModalVisible(!props.modalVisible)}>
            <Text style={styles.textButtonClose} >x</Text>
          </Pressable>
          <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false} >
            <Text style={styles.textDescription} >
              Por medio de este aplicativo usted podrá encontrar las rutas y buses del Sistema determinando la ruta y ubicando los busesen tiempo real en que la circulan
            </Text>
            <Text style={styles.firstText}>
              Búsqueda:
              <Text style={styles.description} >
                en la caja de búsqueda escriba la ruta o número del bus que desea localizar y presione búsqueda.
              </Text>
            </Text>
            <Image source={require('../../assets/example1.png')} style={styles.images} resizeMode='contain' />
            <Text style={styles.firstText}>
              Buses:
              <Text style={styles.description} >
                las rutas están definidas por color (alimentadoras: verdes y Padronas: azules).
              </Text>
            </Text>
            <Image source={require('../../assets/example2.png')} style={styles.images2} resizeMode='contain' />
            <Text style={styles.firstText}>
              Direcciones:
              <Text style={styles.description} >
                el aplicativo cuenta con un buscador de direcciones, para ubicarse dentro del mapa, simplemente escriba la dirección que necesita.
              </Text>
            </Text>
            <Image source={require('../../assets/example3.png')} style={styles.images3} resizeMode='contain' />
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: 'auto',
  },
  buttonClose: {
    backgroundColor: '#5576FA',
    width: 35,
    height: 35,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -15,
    right: -10
  },
  textButtonClose: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Black-Montserrat',
  },
  textDescription: {
    color: '#5576FA',
    fontSize: 14,
    fontFamily: 'Black-Montserrat',
    textAlign: 'justify',
    marginBottom: 10
  },
  firstText: {
    color: '#5576FA',
    fontSize: 14,
    fontFamily: 'Black-Montserrat',
    textAlign: 'justify',
  },
  description: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Black-Montserrat',
    textAlign: 'justify',
  },
  images: {
    width: '100%',
    height: '20%',
  },
  images2: {
    width: '100%',
    height: '30%',
  },
  images3: {
    width: '100%',
    height: '15%',
  }
})