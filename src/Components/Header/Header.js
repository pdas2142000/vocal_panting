import React from 'react'
import { View, Text,TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Colors, dimensions } from '../../Constants/Constants'
import Icon from 'react-native-vector-icons/Entypo'
import { getDeviceType } from 'react-native-device-info';

let deviceType = getDeviceType();

const Header = ({title, navigation}) => {
    return (
        <SafeAreaView style={{backgroundColor: Colors.red}}>
            <StatusBar barStyle='light-content' />
            <View style={styles.header_main}>
                <TouchableOpacity 
                    onPress={()=>navigation.goBack()} 
                    style={styles.icon_view}
                >
                    <Icon name='chevron-left' color={"#fff"} size={EStyleSheet.value(dimensions.iconsSize)} />
                </TouchableOpacity>
                <View style={styles.heading_text_view}>
                    <Text style={styles.header_text}>{title}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Header

const styles = EStyleSheet.create({
    header_main:{
        height: deviceType == 'Tablet' ? '35rem' : '50rem',
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.3)',
        position: 'relative'
    },
    heading_text_view:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: deviceType == 'Tablet' ? '35rem' : '50rem',
        paddingBottom: deviceType == 'Tablet' ? '7rem' : '10rem',
    },
    icon_view:{
        position: 'absolute',
        bottom: deviceType == 'Tablet' ? '7rem' : '10rem',
        left: '5rem',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: deviceType == 'Tablet' ? '28rem' : '40rem',
        zIndex: 1
    },
    header_text:{
        fontSize: deviceType == 'Tablet' ? '14rem' : '20rem',
        fontFamily: 'SourceSansPro-Bold',
        color: '#fff'
    }
})