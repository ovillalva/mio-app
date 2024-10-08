import axios from 'axios'
import XMLParser from 'react-xml-parser'
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const AlertFloating = () => {
  const [message, setMessage] = useState('')
  const [hideAlert, setHideAlert] = useState(true)

  useEffect(() => {
    _getMessage()
  }, [])

  const _getMessage = async () => {
    const { data } = await axios.get("https://servicios.siur.com.co//buscarutas/js/info/clientetexto.php");
    if (data) {
      const xml = new XMLParser().parseFromString(data);
      const content = xml.getElementsByTagName('Content').shift()
      const filterContent = content?.children?.filter((element) => (element.name === 'Text'))
      if (filterContent) {
        setMessage(filterContent?.shift()?.value?.replace(/[<>]/gi, ''))
        setHideAlert(false)
        setTimeout(() => {
          setHideAlert(true)
        }, 10000)
      }
    }
  }

  if (hideAlert) return (<></>)

  return (
    <View style={{ alignItems: 'flex-start', ...StyleSheet.absoluteFill }}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {message}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#5576FA',
    padding: 15,
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Medium-Montserrat',
    textAlign: 'justify'
  }
})