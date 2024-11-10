import React from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, StatusBar } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Colors } from '../../Constants/Constants'
import { getDeviceType } from 'react-native-device-info';

let deviceType = getDeviceType();

const Home = ({navigation}) => {
    
    return (
        <SafeAreaView style={styles.main}>
            <StatusBar barStyle='dark-content' />
            <View style={styles.container}>
                <View style={styles.logo_wrp}>
                    <Image 
                        source={require('../../../assets/images/logo.png')} 
                        style={styles.logo}
                    />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.heading}>
                        The Intelligent Choir
                    </Text>
                    <View style={{flexDirection: 'row',}}>
                        <Text style={styles.boldheading}>
                            Vo
                            <Text style={styles.normalheading}>
                                cal{' '}
                            </Text>
                        </Text>
                        <Text style={styles.boldheading}>
                            Pa
                            <Text style={styles.normalheading}>
                                inting
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonview}>
                    <TouchableOpacity
                        onPress={()=>navigation.navigate("Intro")}
                        activeOpacity={0.8} 
                        style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Vocal Painting Intro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("Learn")}
                        activeOpacity={0.8}
                        style={[styles.buttonStyle,{backgroundColor:Colors.orange}]}>
                        <Text style={styles.buttonText}>Learn VOPA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>navigation.navigate("Solfa")}
                        activeOpacity={0.8} 
                        style={[styles.buttonStyle,{backgroundColor:Colors.red}]}>
                        <Text style={styles.buttonText}>Solfa</Text>
                    </TouchableOpacity>
                </View>   
            </View>
        </SafeAreaView>
    )
}


export default Home

const styles = EStyleSheet.create({
    main:{
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center'
    },
    container: {
        paddingVertical: deviceType == 'Tablet' ? '14rem' : '20rem',
    },
    logo_wrp:{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    logo:{
        height: deviceType == 'Tablet' ? '105rem' : '150rem',
        width: deviceType == 'Tablet' ? '105rem' : '150rem',
        resizeMode: 'contain'
    },
    textView:{
        paddingHorizontal: deviceType == 'Tablet' ? '14rem' : '20rem',
        marginTop: deviceType == 'Tablet' ? '28rem' : '40rem',
        alignItems: 'center'
    },
    heading:{
        color: "#000",
        fontSize: deviceType == 'Tablet' ? '17.5rem' : '25rem',
        fontFamily: 'SourceSansPro-Regular'
    },
    boldheading:{
        fontSize: deviceType == 'Tablet' ? '21rem' : '30rem',
        color: Colors.red,
        fontFamily: 'SourceSansPro-Bold',
        letterSpacing: 1.2
    },
    normalheading:{
        color: Colors.black
    },
    buttonview:{
        marginTop: deviceType == 'Tablet' ? '21rem' : '30rem',
        paddingHorizontal: deviceType == 'Tablet' ? '14rem' : '20rem',
        maxWidth: deviceType == 'Tablet' ? '60%' : '90%',
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent:'center',
    },
    buttonStyle:{
        width: "100%",
        height: deviceType == 'Tablet' ? '45.5rem' : '65rem',
        backgroundColor: Colors.blue,
        alignSelf: 'center',
        justifyContent:'center',
        alignItems: 'center',
        marginVertical: deviceType == 'Tablet' ? '14rem' : '20rem',
        borderRadius: '0rem'
    },
    buttonText:{
        color: Colors.white,
        fontSize: deviceType == 'Tablet' ? '16rem' : '24rem',
        fontFamily: 'SourceSansPro-Bold'
    }, 
})