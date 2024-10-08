import axios from 'axios'
import Feather from '@expo/vector-icons/Feather'
import React, { useEffect, useState } from 'react'
import { TextInput, View, StyleSheet, FlatList, Text, TouchableOpacity, Keyboard } from 'react-native'

export const Input = ({ pick }) => {
  const [value, setValue] = useState('')
  const [routes, setRoutes] = useState([])
  const [result, setResult] = useState([])

  useEffect(() => {
    _getAllRoutes()
  }, [])

  const _getAllRoutes = async () => {
    const response = await axios.get('https://servicios.siur.com.co/buscarutas/name.php')
    let newArray = []
    for (const iterator of response.data) {
      newArray.push({ name: iterator, lineId: iterator })
    }
    setRoutes(newArray)
  }

  const search = (letter) => {
    setValue(letter)
    if (letter?.length >= 1) {
      const finalResult = routes.filter(route => {
        return route.name.includes(letter.toUpperCase())
      })
      setResult(finalResult)
      return
    }
    setResult([])
  }

  const selectedRoute = (item) => {
    setValue('')
    setResult([])
    pick(item)
    Keyboard.dismiss()
  }

  return (
    <>
      {result?.length > 0 ?
        <View style={styles.resultView} >
          <FlatList
            scrollEnabled
            data={result}
            keyboardShouldPersistTaps='handled'
            renderItem={(item, index) => {
              return (
                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => selectedRoute(item.item)} >
                  <Text key={index} style={styles.textResult} >
                    {item.item.name}
                  </Text>
                </TouchableOpacity>
              )
            }}
            ListEmptyComponent={() => {
              return (
                <Text style={styles.empty} >
                  No hay rutas disponibles
                </Text>
              )
            }}
          />
        </View> : <></>
      }
      <View style={styles.sectionStyle}>
        <Feather name="search" size={28} color="#5576FA" />
        <TextInput
          value={value}
          style={styles.input}
          onChangeText={search}
          placeholder="Busca tu ruta"
          placeholderTextColor="#5576FA"
          underlineColorAndroid="transparent"
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  sectionStyle: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 60,
    paddingHorizontal: 8
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: '#5576FA',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Medium-Montserrat'
  },
  resultView: {
    backgroundColor: '#FFFFFF',
    height: 150,
    width: '60%',
    position: 'absolute',
    top: -175,
    elevation: 5,
    left: 15
  },
  textResult: {
    color: '#5576FA',
    fontSize: 14,
    fontFamily: 'Medium-Montserrat'
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  empty: {
    alignSelf: 'center',
    paddingTop: 65,
    color: '#5576FA',
    fontFamily: 'Medium-Montserrat'
  }
})