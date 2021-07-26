import React, { useState } from 'react'
import {
    Linking,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import Icon from 'react-native-vector-icons/FontAwesome'

const App = () => {

    const [modoScan, setModoScan] = useState<boolean>(true)
    const [modoResult, setModoResult] = useState<boolean>(false)
    const [result, setResult] = useState<any>(null)

    const onSuccess = (e: any) => {
        setResult(e.data)
        setModoScan(false)
        setModoResult(true)
    }

    const activeQR = () => {
        setModoScan(true)
        setModoResult(false)
        setResult(null)
    }

    const closeScan = () => {
        setModoScan(false)
        setModoResult(true)
    }

    const openLink = () => {
        const isLink = result.substring(0, 4)

        if (isLink === 'http') {
            Linking.openURL(result)
                .catch((err) => console.log(err))
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Leitor QRCode</Text>
            </View>

            {modoResult &&
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.containerResult}>
                        <View style={{ alignItems: 'center' }}>
                            <Icon name='qrcode' size={150} color={'#6b705c'} />
                            <Text style={styles.textResult}>{result}</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                disabled={!result}
                                style={!result ? styles.buttonTouchableDisabled : styles.buttonTouchable}
                                onPress={openLink}
                            >
                                <Icon style={{ marginRight: 5 }} name='external-link' size={26} color={'#ffe8d6'} />
                                <Text style={styles.buttonText} >Abrir Link</Text>
                            </TouchableOpacity>
                            <View style={styles.containerButtons}>
                                <TouchableOpacity style={styles.buttonCopy} onPress={() => console.log('copiar')}>
                                    <Icon name='copy' size={30} color={'#6b705c'} />
                                    <Text style={styles.buttonTextCopy}>Copiar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonCopy} onPress={() => console.log('compartilhar')}>
                                    <Icon name='share-alt' size={30} color={'#6b705c'} />
                                    <Text style={styles.buttonTextCopy}>Compartilhar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonTouchable} onPress={activeQR}>
                        <Text style={styles.buttonText}>Clique para Escanear</Text>
                    </TouchableOpacity>
                </View>
            }

            {modoScan &&
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.subTitulo}>
                        Aponte e Leia
                    </Text>

                    <QRCodeScanner
                        onRead={onSuccess}
                        showMarker={true}
                    />
                    <View>
                        <TouchableOpacity style={styles.buttonTouchable} onPress={closeScan}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a5a58d',
    },
    header: {
        backgroundColor: '#6b705c',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 28,
        fontFamily: 'Righteous',
        color: '#ffe8d6',
        margin: 16,
    },
    subTitulo: {
        fontSize: 36,
        fontFamily: 'Lato-Light',
        color: '#ffe8d6',
        margin: 28,
    },
    buttonText: {
        fontSize: 30,
        fontFamily: 'Lato-Light',
        color: '#ffe8d6',
    },
    buttonTouchable: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        backgroundColor: '#6b705c',
        marginTop: 20,
        marginBottom: 38,
        padding: 14,
    },
    buttonTouchableDisabled: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        backgroundColor: '#B7B7A4',
        marginTop: 20,
        marginBottom: 38,
        padding: 14,
    },
    containerResult: {
        flex: 1,
        backgroundColor: '#ffe8d6',
        elevation: 5,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        marginVertical: 22,
        padding: 30,
    },
    labelResult: {
        marginVertical: 12,
        fontSize: 32,
        fontFamily: 'Lato-Light',
    },
    textResult: {
        fontSize: 24,
        color: 'blue',
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
        marginVertical: 10,
    },
    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonCopy: {
        alignItems: 'center',
        marginHorizontal: 20,
    },
    buttonTextCopy: {
        fontSize: 20,
        fontFamily: 'Lato-Light',
        color: '#6b705c',
        marginTop: 10
    }
})

export default App;