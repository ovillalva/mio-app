import 'intl'
import axios from 'axios'
import 'intl/locale-data/jsonp/es-CO'
import { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput, ActivityIndicator, Platform } from 'react-native'
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from "react-native-expo-image-cache";
import CopCard from '../components/copCard'


export default function CardScreen() {
  const [image, setImage] = useState()
  const [valueCard, setValueCard] = useState('')
  const [numberCard, setNumberCard] = useState('')
  const [isLoad, setIsLoad] = useState(true)
  const [isCop, setIsCop] = useState(true);


  useEffect(() => {
    const init = async () => {
      await getStatusCop();
    }
    init();
  }, [])


  const getStatusCop = async () => {
    try {
      const source = axios.CancelToken.source();
      const timeout = setTimeout(() => {
        source.cancel('Request timed out');
      }, 10000);

      const response = await axios.get('https://metrocali.gov.co/app/views/rutasCOP/api/estamosEnCOP.php', {
        cancelToken: source.token,
      });

      clearTimeout(timeout);

      if (response.status === 200) {
        return setIsCop(response.data.COP);
      } else {
        setIsCop(false);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error('Request cancelled due to timeout');
      } else {
        console.error(error);
      }
      setIsCop(false);
    }
  };


  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  })

  const getTotal = async () => {
    if (numberCard.length === 13) {
      const response = await axios.get(`https://wsmio.siur.com.co:8083/apiMIO/jaxrs/balance2/${numberCard}`)
      if (response.data.balance) {
        setValueCard(formatter.format(response.data.balance))
        await saveNumber(numberCard);
      } else {
        alert('El número de la tarjeta no existe')
      }
    } else {
      alert('Ingresa un número de tarjeta válido')
    }
  }

  const getNumberCard = async () => {
    try {
      const value = await AsyncStorage.getItem('@NumberCard');
      if (value !== null) {
        setNumberCard(value);
      }
    } catch (error) {
      console.error('Failed to save data: ', error);
    }
  }

  useEffect(() => {
    const value = async () => {
      await getNumberCard();
      setIsLoad(false);
    }
    value();
  }, [])

  useEffect(() => {
    const value = async () => {
      await getTotal();
      setIsLoad(false);
    }

    if (numberCard.length == 13) {
      value();
    }
    setIsLoad(false);
  }, [numberCard])


  useEffect(() => {
    const random = getRandomNumber(1, 5)
    switch (random) {
      case 1:
        // setImage(require('../assets/card1.png'))
        setImage({ uri: 'https://metrocali.gov.co/app/assets/card1.png' })
        break;
      case 2:
        //setImage(require('../assets/card2.png'))
        setImage({ uri: 'https://metrocali.gov.co/app/assets/card2.png' })
        break;
      case 3:
        // setImage(require('../assets/card3.png'))
        setImage({ uri: 'https://metrocali.gov.co/app/assets/card3.png' })
        break;
      case 4:
        // setImage(require('../assets/card4.png'))
        setImage({ uri: 'https://metrocali.gov.co/app/assets/card4.png' })
        break;
      default:
        // setImage(require('../assets/card4.png'))
        setImage({ uri: 'https://metrocali.gov.co/app/assets/card4.png' })
        break;
    }

  }, [])

  const saveNumber = async (number) => {
    try {
      await AsyncStorage.setItem('@NumberCard', number);
    } catch (error) {
      console.error('Failed to save data: ', error);
    }
  }

  const onChanged = (text) => {
    let newText = ''
    let numbers = '0123456789'
    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i]
      }
    }
    setNumberCard(newText)
  }

  return (
    <View style={styles.container} >
      <Image
        defaultSource={require('../assets/fondo_azul.png')}
        style={styles.imageBackground}
      //resizeMode='contain'
      />
      {isLoad && (
        <BlurView intensity={99} style={styles.absolute}>
          <ActivityIndicator size="large" style={{ justifyContent: 'center', flex: 1 }} color={'#2950CF'} />
        </BlurView>
      )}
      <Text style={styles.textOther} >
        Aquí podrás consultar el saldo de otra tarjeta*
      </Text>
      <View style={{ height: 250 }} >
        {isCop ?
          <>
            <CopCard />
            <Text style={styles.labelInputCop} >
              Introduce el número aquí
            </Text>
            <TextInput
              maxLength={13}
              value={numberCard}
              style={styles.inputCop}
              placeholder="19.06.00000000-0"
              placeholderTextColor={'#5576FA'}
              onSubmitEditing={() => getTotal()}
              keyboardType={Platform.OS === 'ios' ? 'default' : 'numeric'}
              onChangeText={text => onChanged(text)}
            />
          </>
          :
          <>
            <Image
              defaultSource={require('../assets/copCard.jpg')}
              source={image}
              style={styles.cardImage}
            />
            <Text style={styles.labelInput} >
              Introduce el número aquí
            </Text>
            <TextInput
              maxLength={13}
              value={numberCard}
              style={styles.input}
              placeholder="19.06.00000000-0"
              placeholderTextColor={'#5576FA'}
              onSubmitEditing={() => getTotal()}
              keyboardType={Platform.OS === 'ios' ? 'default' : 'numeric'}
              onChangeText={text => onChanged(text)}
            />
          </>

        }
        <Text style={styles.labelTotal} >
          Saldo
        </Text>
        <View style={styles.viewTotal} >
          <Text style={styles.textValue} >
            {valueCard ? valueCard : '$ ---'}
          </Text>
        </View>
      </View>
      <Text style={styles.textBottom} >
        * Usos o recargas en las últimas 24 horas no se verán reflejadas en esta consulta
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: 60
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'repeat',
    width: '100%',
    position: 'absolute'
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 25
  },
  buttons: {
    height: 50,
    width: 50,
  },
  titleHeader: {
    color: '#F4A947',
    marginLeft: 15,
    fontSize: 18,
    fontFamily: 'Medium-Montserrat'
  },
  textOther: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Medium-Montserrat',
    marginHorizontal: 25,
    marginTop: 200
  },
  textBottom: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Medium-Montserrat',
    textAlign: 'center',
    position: 'absolute',
    bottom: -200,
    alignSelf: 'center',
    width: '80%'
  },
  cardImage: {
    width: '100%',
    alignSelf: 'center',
    height: '100%',
    resizeMode: 'contain'
  },
  labelInput: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Medium-Montserrat',
    position: 'absolute',
    top: 25,
    right: 150
  },
  labelInputCop: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Medium-Montserrat',
    position: 'absolute',
    top: 15,
    right: 150
  },
  input: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 50,
    right: 60,
    width: 225,
    height: 30,
    borderRadius: 25,
    paddingHorizontal: 10,
    fontFamily: 'Medium-Montserrat',
    color: '#5576FA',
    textAlign: 'right',
    letterSpacing: 1
  },
  inputCop: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 40,
    right: 60,
    width: 225,
    height: 30,
    borderColor: '#2950CF',
    borderRadius: 25,
    paddingHorizontal: 10,
    fontFamily: 'Medium-Montserrat',
    color: '#5576FA',
    textAlign: 'right',
    letterSpacing: 1,
    elevation: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
  },
  labelTotal: {
    position: 'absolute',
    bottom: 60,
    right: 60,
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Black-Montserrat'
  },
  viewTotal: {
    position: 'absolute',
    bottom: 30,
    right: 60,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25
  },
  textValue: {
    color: '#5576FA',
    fontSize: 16,
    fontFamily: 'Medium-Montserrat',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
  }
})