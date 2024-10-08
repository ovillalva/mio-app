import { View, TextInput, StyleSheet, TouchableOpacity, Text, ActivityIndicator, ScrollView } from 'react-native'
import { useState } from 'react'
import { BlurView } from 'expo-blur';
import axios from 'axios'
import { Image } from "react-native-expo-image-cache";

export default function consulta() {

    const [id, setId] = useState('')
    const [ticket, setTicket] = useState('')
    const [errors, setErrors] = useState(false)
    const [isView, setIsView] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [datos, setDatos] = useState()

    const validateData = async () => {
        setIsView(false)
        if (id && ticket) {
            setIsActive(true)
            setErrors(false)
            await consultarPqr()
        } else {
            setErrors(true)
        }
    }

    const consultarPqr = async () => {
        try {
            const response = await axios.get(`https://www.metrocali.gov.co/pqrsf/api/hgi_pqrsGet.php?numeroTicket=${ticket}&numeroIdentificacion=${id}`)
            if (response.status === 200) {
                setIsActive(false)
                setIsView(true)
                setDatos(response.data)
            } else {
                setIsActive(false)
                alert('Ocurrió un error, verifica la informacion suministrada.');
            }
        } catch (error) {
            console.error(error)
        }
    }

    const fixEncoding = (text) => {
        const bytes = new TextEncoder().encode(text); // Convierte la cadena en bytes
        const decodedText = new TextDecoder('utf-8').decode(bytes); // Decodifica como UTF-8
        return decodedText;
    };

    const closeInfo = () => {
        setDatos();
        setIsView(false);
        setId('')
        setTicket('')
        console.log(datos)
    }

    return (
        <View style={{ height: '100%' }}>
            {isActive && (
                <BlurView intensity={99} style={styles.absolute}>
                    <ActivityIndicator size="large" style={{ justifyContent: 'center', flex: 1 }} color={'#2950CF'} />
                </BlurView>
            )}
            <View style={{ marginTop: 30 }}>
                <View style={styles.viewInput} >
                    {/* <Image source={require('../assets/hashtag.png')} resizeMode='contain' style={styles.iconButton} /> */}
                    <Image
                        defaultSource={require('../assets/hashtag.png')}
                        source={{ uri: 'https://metrocali.gov.co/app/assets/hashtag.png' }}
                        resizeMode='contain'
                        style={styles.iconButton}
                    />
                    <TextInput style={styles.input} value={ticket} onChangeText={setTicket} keyboardType="numeric" placeholder="Numero de ticket*" placeholderTextColor={'#5576FA'} />
                    {errors && !ticket ?
                        <Image
                            defaultSource={require('../assets/warnIcon.png')}
                            source={{ uri: 'https://metrocali.gov.co/app/assets/warnIcon.png' }}
                            resizeMode='contain'
                            style={styles.error}
                        /> : <></>
                    }
                </View>
                <View style={styles.viewInput} >
                    <Image
                        defaultSource={require('../assets/idIcon.png')}
                        source={{ uri: 'https://metrocali.gov.co/app/assets/idIcon.png' }}
                        resizeMode='contain'
                        style={styles.iconButton}
                    />
                    <TextInput style={styles.input} value={id} onChangeText={setId} keyboardType="numeric" placeholder="Identificación*" placeholderTextColor={'#5576FA'} />
                    {errors && !id ?
                        <Image
                            defaultSource={require('../assets/warnIcon.png')}
                            source={{ uri: 'https://metrocali.gov.co/app/assets/warnIcon.png' }}
                            resizeMode='contain'
                            style={styles.error}
                        /> : <></>
                    }
                </View>
                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => validateData()} >
                    <Image
                        defaultSource={require('../assets/search.png')}
                        source={{ uri: 'https://metrocali.gov.co/app/assets/search.png' }}
                        resizeMode='contain'
                        style={styles.iconButton}
                    />
                    <Text style={styles.textButton}>
                        Consultar
                    </Text>
                </TouchableOpacity>
                {isView && datos ? (
                    <ScrollView contentContainerStyle={styles.scroll}>
                        <View style={styles.whiteBackground}>
                            <Text style={styles.tituloModal}>Estado de PQRSDF</Text>
                            <View style={styles.line} />

                            <View style={styles.viewCampo}>
                                <Text style={styles.titulo2}>Título:</Text>
                                <Text style={styles.textinfo}>{datos.titulo}</Text>
                            </View>

                            <View style={styles.viewCampo}>
                                <Text style={styles.titulo2}>Número de ticket:</Text>
                                <Text style={styles.textinfo}>{datos.numeroTicket}</Text>
                            </View>

                            <View style={styles.viewCampo}>
                                <Text style={styles.titulo2}>Fecha de radicación:</Text>
                                <Text style={styles.textinfo}>{datos.fechaCreacion}</Text>
                            </View>

                            <View style={styles.viewCampo}>
                                <Text style={styles.titulo2}>Servicio:</Text>
                                <Text style={styles.textinfo}>{datos.servicio}</Text>
                            </View>

                            <View style={styles.viewCampo}>
                                <Text style={styles.titulo2}>Estado:</Text>
                                <Text style={styles.textinfo}>{datos.estado}</Text>
                            </View>

                            {datos.notaSolucion && (
                                <View style={styles.viewCampo}>
                                    <Text style={styles.titulo2}>Nota Solución:</Text>
                                    <Text style={styles.textinfo}>{datos.notaSolucion}</Text>
                                </View>
                            )}

                            <TouchableOpacity style={styles.button2} activeOpacity={0.8} onPress={() => closeInfo()}>
                                <Image
                                    defaultSource={require('../assets/check.png')}
                                    source={{ uri: 'https://metrocali.gov.co/app/assets/check.png' }}
                                    resizeMode='contain'
                                    style={styles.iconButton}
                                />
                                <Text style={styles.textButton2}>Aceptar</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                ) : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewInput: {
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        width: '90%',
        height: 40,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        marginVertical: 7.5,
    },
    iconButton: {
        height: 35,
        width: 35
    },
    input: {
        fontSize: 14,
        fontFamily: 'Regular-Montserrat',
        color: '#5576FA',
        marginLeft: 10,
        width: '100%',
    },
    buttons: {
        height: 50,
        width: 50,
    },
    textButton: {
        color: '#5576FA',
        fontFamily: 'Regular-Montserrat',
        fontSize: 14,
        marginLeft: 25,
    },
    textButton2: {
        color: '#FFFFFF',
        fontFamily: 'Regular-Montserrat',
        fontSize: 14,
        marginLeft: 25,
    },
    iconButton: {
        height: 35,
        width: 35
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        width: '50%',
        height: 35,
        marginVertical: 25,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    button2: {
        alignSelf: 'center',
        backgroundColor: '#5576FA',
        width: '50%',
        height: 35,
        marginVertical: 25,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    scroll: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    line: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        marginVertical: 5,
        width: '90%',
    },
    whiteBackground: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        width: '90%',
        height: 'auto',
        borderRadius: 10,
        alignItems: 'center'
    },
    tituloModal: {
        fontSize: 14,
        fontFamily: 'Black-Montserrat',
        marginVertical: 15
    },
    viewCampo: {
        flexDirection: 'row',
        width: '90%',
        marginVertical: 5
    },
    titulo2: {
        fontSize: 14,
        fontFamily: 'Regular-Montserrat',
        width: 80,
        marginRight: 10,
        fontWeight: 'bold'
    },
    textinfo: {
        fontSize: 14,
        fontFamily: 'Regular-Montserrat',
        color: '#000000',
        width: '75%',
    },
    containerActivity: {
        flex: 1,
        justifyContent: 'center',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 10,
    },
})