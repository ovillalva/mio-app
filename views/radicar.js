import axios from 'axios'
import { useState } from 'react'
import Checkbox from 'expo-checkbox'
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Linking, Switch, Modal, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import { BlurView } from 'expo-blur';
import { Image } from "react-native-expo-image-cache";


const radicar = () => {

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [typePqr, setTypePqr] = useState(null)
    const [legal, setLegal] = useState(false)
    const [address, setAddress] = useState('')
    const [errors, setErrors] = useState(false)
    const [cellPhone, setCellPhone] = useState('')
    const [description, setDescription] = useState('')
    const [typeDocument, setTypeDocument] = useState(null)
    const [isAnonimo, setIsAnonimo] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [codigo, setCodigo] = useState('')
    const [isLoad, setIsLoad] = useState(false)

    const validateData = () => {
        if (isAnonimo) {
            if (typePqr && legal) {
                setIsLoad(true)
                sendInfo()
                setErrors(false)
            } else {
                setErrors(true)
                alert('Completa todos los campos')
            }
        } else {
            if (typePqr && name && typeDocument && id && email && phone && cellPhone && address && description && legal) {
                setIsLoad(true)
                sendInfo()
                setErrors(false)
            } else {
                setErrors(true)
                alert('Completa todos los campos')
            }
        }

    }
    const valiCodigo = () => {
        if (codigo) {
            setIsLoad(true)
            setErrors(false)
            sendInfo2()
        } else {
            setErrors(true)
            alert('Completa el campo de codigo')
        }
    }

    const sendInfo2 = async () => {
        const formData3 = new FormData()
        formData3.append('correo', email)
        formData3.append('clave', codigo)
        formData3.append('nombreCompleto', name)
        formData3.append('numeroIdentificacion', id)
        formData3.append('tipoIdentificacion', typeDocument)
        formData3.append('tipoSolicitud', typePqr)
        formData3.append('detalleSolicitud', description)
        try {
            const response = await axios.post('https://www.metrocali.gov.co/pqrsf/api/MOV_verify.php', formData3, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                setIsActive(false);
                const ticketNumber = response.data.message;
                Alert.alert('Ticket radicado',
                    `Hemos registrado tu PQRSDF correctamente. Número de ticket: ${ticketNumber}`, [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
                setIsLoad(false)
                setTypePqr(null);
                setDescription('')
                setId('')
                setName('')
                setEmail('');
                setTypeDocument(null)
                setCodigo('')
                setLegal(false);
            } else {
                alert('Ocurrió un error, vuelve a intentarlo más tarde.');
                setIsLoad(false)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const sendInfo = async () => {

        if (isAnonimo) {
            const formData1 = new FormData()
            formData1.append('tipoSolicitud', typePqr)
            formData1.append('detalleSolicitud', description)
            formData1.append('correo', email ? email : "")

            try {
                const response = await axios.post('https://www.metrocali.gov.co/pqrsf/api/AR.php', formData1, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    // La respuesta contiene advertencias en HTML, primero extraemos solo la parte del JSON válido
                    const responseData = response.data.match(/\[{.*}\]/); // Extraer solo el JSON válido de la respuesta

                    if (responseData) {
                        const parsedData = JSON.parse(responseData[0]); // Parsear el JSON extraído

                        const numeroTicket = parsedData[0]?.message?.numeroTicket; // Extraer el número de ticket

                        if (numeroTicket) {
                            //alert(`Hemos registrado tu PQRSDF correctamente. Número de ticket: ${numeroTicket}`);
                            Alert.alert('Ticket radicado',
                                `Hemos registrado tu PQRSDF correctamente. Número de ticket: ${numeroTicket}`, [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ]);
                        } else {
                            //alert('PQRSDF registrada, pero no se pudo obtener el número de ticket.');
                            Alert.alert('Ticket radicado',
                                'PQRSDF registrada, pero no se pudo obtener el número de ticket.', [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ]);
                        }
                        setIsLoad(false)
                        // Limpiar el formulario
                        setTypePqr(null);
                        setDescription('');
                        setEmail('');
                        setIsActive(false);
                        setLegal(false);
                        //console.log(response);
                    } else {
                        setIsLoad(false)
                        alert('Ocurrió un error al procesar la respuesta.');
                    }
                } else {
                    setIsLoad(false)
                    alert('Ocurrió un error, vuelve a intentarlo más tarde.');
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
                alert('Ocurrió un error, vuelve a intentarlo más tarde.');
            }
        } else {
            const formData2 = new FormData()
            formData2.append('nombre', name)
            formData2.append('correo', email)
            try {
                const response = await axios.post('https://www.metrocali.gov.co/pqrsf/api/MOV_prepare.php', formData2, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.status === 200) {
                    setIsActive(true);
                    setIsLoad(false)
                } else {
                    setIsLoad(false)
                    alert('Ocurrió un error, vuelve a intentarlo más tarde.');
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    const Error = () => {
        return (
            <Image
                defaultSource={require('../assets/warnIcon.png')}
                source={{ uri: 'https://metrocali.gov.co/app/assets/warnIcon.png' }}
                resizeMode='contain'
                style={styles.error}
            />
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            {isLoad && (
                <BlurView intensity={99} style={styles.absolute}>
                    <ActivityIndicator size="large" style={{ justifyContent: 'center', flex: 1 }} color={'#2950CF'} />
                </BlurView>
            )}
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' >
                {isActive && (
                    <BlurView intensity={99} style={styles.absolute} />
                )}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isActive}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.tituloModal}>
                                Codigo de verificación
                            </Text>
                            <Text style={styles.textModal}>
                                *Se ha enviado un código de verificación a su correo electrónico. Por favor, ingréselo a continuación.
                            </Text>
                            <View style={styles.viewInputModal} >
                                {/* <Image source={require('../assets/ticket.png')} resizeMode='contain' style={styles.iconInput} /> */}
                                <Image
                                    defaultSource={require('../assets/ticket.png')}
                                    source={{ uri: 'https://metrocali.gov.co/app/assets/ticket.png' }}
                                    resizeMode='contain'
                                    style={styles.iconInput}
                                />
                                <TextInput style={styles.input} value={codigo} onChangeText={setCodigo} keyboardType="default" placeholder="Codigo de verificación*" placeholderTextColor={'#5576FA'} />
                                {errors && !codigo ?
                                    <Image
                                        defaultSource={require('../assets/warnIcon.png')}
                                        source={{ uri: 'https://metrocali.gov.co/app/assets/warnIcon.png' }}
                                        resizeMode='contain'
                                        style={styles.error}
                                    /> : <></>
                                }
                            </View>
                            <TouchableOpacity style={styles.buttonModal} activeOpacity={0.8} onPress={() => valiCodigo()}>
                                {/* <Image source={require('../assets/check.png')} resizeMode='contain' style={styles.iconButton} /> */}
                                <Image
                                    defaultSource={require('../assets/check.png')}
                                    source={{ uri: 'https://metrocali.gov.co/app/assets/check.png' }}
                                    resizeMode='contain'
                                    style={styles.iconButton}
                                />
                                <Text style={styles.textButtonModal}>
                                    Verificar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonModal} activeOpacity={0.8} onPress={() => setIsActive(false)} >
                                <Image
                                    defaultSource={require('../assets/not.png')}
                                    source={{ uri: 'https://metrocali.gov.co/app/assets/not.png' }}
                                    resizeMode='contain'
                                    style={styles.iconButton} />
                                <Text style={styles.textButtonModal}>
                                    Salir
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.viewInput} >
                    <Image
                        defaultSource={require('../assets/typeIcon.png')}
                        source={{ uri: 'https://metrocali.gov.co/app/assets/typeIcon.png' }}
                        resizeMode='contain'
                        style={styles.iconInput}
                    />
                    <RNPickerSelect
                        onValueChange={(value) => setTypePqr(value)}
                        items={[
                            { label: 'Petición', value: 'Petición' },
                            { label: 'Queja', value: 'Queja' },
                            { label: 'Reclamo', value: 'Reclamo' },
                            { label: 'Sugerencia', value: 'Sugerencia' },
                            { label: 'Felicitación', value: 'Felicitación' },
                            { label: 'Información', value: 'Información' },
                        ]}
                        style={{
                            inputIOS: styles.inputIOS,
                            inputAndroid: styles.inputAndroid,
                        }}
                        placeholder={{
                            label: 'Tipo de PQRSDF*',
                            value: null,
                            color: '#5576FA',
                        }}
                        useNativeAndroidPickerStyle={false}
                    />
                    {errors && !typePqr ?
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
                        defaultSource={require('../assets/incognito.png')}
                        source={{ uri: 'https://metrocali.gov.co/app/assets/incognito.png' }}
                        resizeMode='contain'
                        style={styles.iconInput}
                    />
                    <Text style={styles.text} >Anonimo</Text>
                    <Switch value={isAnonimo} onChange={() => setIsAnonimo(!isAnonimo)} style={{ marginLeft: 20 }} />
                </View>
                {isAnonimo == false ? (
                    <>
                        <View style={styles.viewInput} >
                            <Image
                                defaultSource={require('../assets/profileIcon.png')}
                                source={{ uri: `https://metrocali.gov.co/app/assets/profileIcon.png` }}
                                resizeMode='contain'
                                style={styles.iconInput}
                            />
                            <TextInput style={styles.input}
                                value={name}
                                onChangeText={setName}
                                keyboardType={'default'}
                                placeholder={'Nombres y apellidos*'}
                                placeholderTextColor={'#5576FA'} />
                            {errors && !name ?
                                <Error /> : <></>
                            }
                        </View>
                        <View style={styles.viewInput} >
                            <Image
                                defaultSource={require('../assets/idIcon.png')}
                                source={{ uri: 'https://metrocali.gov.co/app/assets/idIcon.png' }}
                                resizeMode='contain'
                                style={styles.iconInput}
                            />
                            <RNPickerSelect
                                onValueChange={(value) => setTypeDocument(value)}
                                items={[
                                    { label: 'Cédula de ciudadania', value: 'Cédula de ciudadania' },
                                    { label: 'Cédula de extranjería', value: 'Cédula de extranjería' },
                                    { label: 'Tarjeta de identidad', value: 'Tarjeta de identidad' },
                                    { label: 'Registro civíl', value: 'Registro civíl' },
                                    { label: 'Número de identificación tributaria', value: 'Número de identificación tributaria' },
                                ]}
                                style={{
                                    inputIOS: styles.inputIOS,
                                    inputAndroid: styles.inputAndroid,
                                }}
                                placeholder={{
                                    label: 'Tipo de identificación*',
                                    value: null,
                                    color: '#5576FA',
                                }}
                                useNativeAndroidPickerStyle={false}
                            />
                            {errors && !typeDocument ?
                                <Error /> : <></>
                            }
                        </View>
                        <View style={styles.viewInput} >
                            <Image
                                defaultSource={require('../assets/idIcon.png')}
                                source={{ uri: 'https://metrocali.gov.co/app/assets/idIcon.png' }}
                                resizeMode='contain'
                                style={styles.iconInput}
                            />
                            <TextInput style={styles.input} value={id} onChangeText={setId} keyboardType="numeric" placeholder="Identificación*" placeholderTextColor={'#5576FA'} />
                            {errors && !id ?
                                <Error /> : <></>
                            }
                        </View>
                        <View style={styles.viewInput} >
                            <Image
                                defaultSource={require('../assets/emailIcon.png')}
                                source={{ url: 'https://metrocali.gov.co/app/assets/emailIcon.png' }}
                                resizeMode='contain'
                                style={styles.iconInput}
                            />
                            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Correo*" placeholderTextColor={'#5576FA'} />
                            {errors && !email ?
                                <Error /> : <></>
                            }
                        </View>
                        <View style={styles.viewInput} >
                            <Image
                                defaultSource={require('../assets/phoneIcon.png')}
                                source={{ uri: 'https://metrocali.gov.co/app/assets/phoneIcon.png' }}
                                resizeMode='contain'
                                style={styles.iconInput}
                            />
                            <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Teléfono fijo" placeholderTextColor={'#5576FA'} />
                            {errors && !phone ?
                                <Error /> : <></>
                            }
                        </View>
                        <View style={styles.viewInput} >
                            <Image
                                defaultSource={require('../assets/phoneIcon.png')}
                                source={{ uri: 'https://metrocali.gov.co/app/assets/phoneIcon.png' }}
                                resizeMode='contain'
                                style={styles.iconInput}
                            />
                            <TextInput style={styles.input} value={cellPhone} onChangeText={setCellPhone} keyboardType="phone-pad" placeholder="Teléfono móvil*" placeholderTextColor={'#5576FA'} />
                            {errors && !cellPhone ?
                                <Error /> : <></>
                            }
                        </View>
                        <View style={styles.viewInput} >
                            <Image
                                defaultSource={require('../assets/addressIcon.png')}
                                source={{ uri: 'https://metrocali.gov.co/app/assets/addressIcon.png' }}
                                resizeMode='contain'
                                style={styles.iconInput}
                            />
                            <TextInput style={styles.input} value={address} onChangeText={setAddress} keyboardType="default" placeholder="Dirección*" placeholderTextColor={'#5576FA'} />
                            {errors && !typePqr ?
                                <Image
                                    defaultSource={require('../assets/warnIcon.png')}
                                    source={{ uri: 'https://metrocali.gov.co/app/assets/warnIcon.png' }}
                                    resizeMode='contain'
                                    style={styles.error}
                                /> : <></>
                            }
                        </View>
                    </>
                ) :
                    (
                        <>
                            <View style={styles.viewInput} >
                                <Image
                                    defaultSource={require('../assets/emailIcon.png')}
                                    source={{ uri: 'https://metrocali.gov.co/app/assets/emailIcon.png' }}
                                    resizeMode='contain'
                                    style={styles.iconInput}
                                />
                                <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Correo opcional" placeholderTextColor={'#5576FA'} />
                            </View>
                        </>
                    )
                }
                <View style={styles.viewInput} >
                    <Image
                        defaultSource={require('../assets/descriptionIcon.png')}
                        source={{ uri: 'https://metrocali.gov.co/app/assets/descriptionIcon.png' }}
                        resizeMode='contain'
                        style={styles.iconInput}
                    />
                    <TextInput style={styles.input} value={description} onChangeText={setDescription} keyboardType="default" placeholder="Contenido del PQRSDF*" placeholderTextColor={'#5576FA'} multiline={true} />
                    {errors && !description ?
                        <Image
                            defaultSource={require('../assets/warnIcon.png')}
                            source={{ uri: 'https://metrocali.gov.co/app/assets/warnIcon.png' }}
                            resizeMode='contain'
                            style={styles.error}
                        /> : <></>
                    }
                </View>
                <View style={styles.viewLegal} >
                    <Checkbox value={legal} onValueChange={setLegal} color='#5576FA' />
                    <TouchableOpacity style={{ width: '85%' }} onPress={() => Linking.openURL('https://www.metrocali.gov.co/wp/wp-content/uploads/2021/03/politica-tratamiento-datos-personales_03012021_063847.pdf')} activeOpacity={0.8}>
                        <Text style={styles.inputLegal} >
                            Manifiesto y acepto que conozco los términos y condiciones de política para el uso y tratamiento de datos personales y autorizo el uso de mis datos personales para recibir notificaciones sobre los trámites relacionados con las actividades misionales adelantadas por la entidad.
                        </Text>
                    </TouchableOpacity>
                    {errors && !legal ?
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
                    defaultSource={require('../assets/sendIcon.png')}
                    source={{ uri: 'https://metrocali.gov.co/app/assets/sendIcon.png' }} 
                    resizeMode='contain' 
                    style={styles.iconButton} 
                    />
                    <Text style={styles.textButton}>
                        Enviar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    rowHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 25,
        marginBottom: 30
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
        flex: 1
    },
    viewInputModal: {
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
    viewLegal: {
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        width: '90%',
        height: 80,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        marginVertical: 7.5
    },
    input: {
        fontSize: 14,
        fontFamily: 'Regular-Montserrat',
        color: '#5576FA',
        marginLeft: 10,
        width: '80%'
    },
    text: {
        fontSize: 14,
        fontFamily: 'Regular-Montserrat',
        color: '#5576FA',
        marginLeft: 10,
    },
    inputLegal: {
        fontSize: 10,
        fontFamily: 'Regular-Montserrat',
        color: '#5576FA',
        marginHorizontal: 10,
        textAlign: 'justify',
        width: '100%'
    },
    iconInput: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
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
    buttonModal: {
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        width: 150,
        height: 35,
        marginVertical: 10,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconButton: {
        height: 35,
        width: 35
    },
    textButton: {
        color: '#5576FA',
        fontFamily: 'Regular-Montserrat',
        fontSize: 14,
        marginLeft: 25
    },
    textButtonModal: {
        color: '#5576FA',
        fontFamily: 'Regular-Montserrat',
        fontSize: 14,
        marginHorizontal: 25
    },
    error: {
        position: 'absolute',
        right: 0,
        marginRight: 10,
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    modalView: {
        margin: 20,
        backgroundColor: '#5576FA',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        flex: 1
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 10,
    },
    tituloModal: {
        fontSize: 16,
        color: '#f4a947',
        fontFamily: 'Black-Montserrat',
        width: '100%',
        marginBottom: 15
    },
    textModal: {
        color: '#FFFFFF',
        fontSize: 13,
        fontFamily: 'Black-Montserrat',
        marginBottom: 10
    },
    pickerItem: {
        height: 30,
    },
    inputIOS: {
        fontFamily: 'Regular-Montserrat',
        fontSize: 14,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: '#5576FA',
        paddingRight: 30,
        width: '100%',
    },
    inputAndroid: {
        fontFamily: 'Regular-Montserrat',
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: '#5576FA',
        paddingRight: 30,
        width: '100%',
    },
})

export default radicar