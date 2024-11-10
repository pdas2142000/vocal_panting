import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, ActivityIndicator, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../Components/Header/Header'
import IosPlayer from '../../Components/IosPlayer/IosPlayer'
import { Colors } from '../../Constants/Constants'
import FastImage from '@d11/react-native-fast-image'
import { getDeviceType } from 'react-native-device-info';

let deviceType = getDeviceType();

const { width } = Dimensions.get('window')

const Learn = ({ navigation }) => {

    const [Data, SetData] = useState(null)
    const [IosUrl, SetIosUrl] = useState(null)
    const [Loading, SetLoading] = useState(false)
    const [Load, SetLoad] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('localData')
            SetData(jsonValue != null ? JSON.parse(jsonValue) : null)
        } catch (e) {
            // read error
        }
    }

    const registerApp = async () => {

    }
    const PlayVideo = async (navigation, url) => {
        SetLoad(true)
        const requestOptions = {
            method: "GET",
            headers: { "Accept": "application/vnd.vimeo.*+json;version=3.4", "Authorization": "bearer a7f4729b93884407951c9a696b34fe8c" }
        };

        url = url.split('/')[url.split('/').length - 1];
        console.log(url);


        fetch(`https://api.vimeo.com/videos/${url}?fields=play.hls.link`, requestOptions).then(response => response.json()).then(data => {
            Platform.OS === 'ios' ?
                SetIosUrl({
                    url: data.play.hls.link,
                    show: true
                }) :
                navigation.navigate("PlayVideo", { video_url: data.play.hls.link })
            if (Platform.OS === 'android') {
                SetLoading(false)
                SetLoad(false)
            }
        }).catch((error) => console.log(error))
    }

    // useEffect(() => {
    //     if (IosUrl?.show) {
    //         SetLoading(false)
    //         SetLoad(false)
    //     }
    // }, [IosUrl])

    const exitPlayer = () => {
        SetLoading(false)
        SetLoad(false)
        SetIosUrl({
            ...IosUrl,
            show: false
        })
    }

    return (
        <>
            <Header title="Learn VOPA" navigation={navigation} />
            {
                Load ? <View style={styles.va_pageLoader}>
                    <ActivityIndicator
                        size="large"
                    />
                    <Text style={styles.va_loader_text}>Loading video...</Text>
                </View> : null
            }
            <ScrollView contentContainerStyle={[styles.main, Load ? styles.vp_active : null]} showsVerticalScrollIndicator={false}>
                {
                    Data ?
                        <View style={styles.mainviewStyle}>
                            {
                                Data.map((val, i) => {
                                    return (
                                        <View key={i.toString()} style={styles.viewStyle}>
                                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                                {
                                                    val.sign.map((item, j) => (
                                                        <TouchableOpacity
                                                            key={j.toString()}
                                                            onPress={() => navigation.navigate("VocalDetails", { data: item, video_url: val.video })}
                                                            style={{
                                                                flex: 1,
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                                minHeight: deviceType == 'Tablet' ? EStyleSheet.value('38.5rem') : EStyleSheet.value('55rem')
                                                            }}
                                                        >
                                                            <Image source={require('../../../assets/images/ph_icon.png')} style={styles.learnicon_abs} />
                                                            <FastImage source={{ uri: item.image, priority: FastImage.priority.high }} style={styles.learnicon} />
                                                        </TouchableOpacity>
                                                    ))
                                                }
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    PlayVideo(navigation, val.video)
                                                    SetLoading(i)
                                                }}
                                                style={styles.playbuttonview}
                                            >
                                                {
                                                    Loading === i ?
                                                        <ActivityIndicator
                                                            size="small"
                                                            color={Colors.cyan}
                                                        /> :
                                                        <Image
                                                            source={require('../../../assets/images/play.png')}
                                                            style={{
                                                                width: deviceType === 'Tablet' ? EStyleSheet.value("11rem") : EStyleSheet.value("15rem"),
                                                                height: deviceType === 'Tablet' ? EStyleSheet.value("11rem") : EStyleSheet.value("15rem")
                                                            }}
                                                        />
                                                }
                                                <Text
                                                    style={{
                                                        color: Colors.cyan,
                                                        paddingHorizontal: EStyleSheet.value("5rem"),
                                                        fontSize: deviceType === 'Tablet' ? EStyleSheet.value("11rem") : EStyleSheet.value("15rem"),
                                                        fontFamily: 'SourceSansPro-Bold'
                                                    }}
                                                >
                                                    Play Video
                                                </Text>
                                            </TouchableOpacity>

                                        </View>
                                    )
                                })

                            }
                        </View>
                        :
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 250 }}>
                            <ActivityIndicator size='large' color={Colors.cyan} />
                        </View>
                }
                {
                    IosUrl?.show &&
                    <IosPlayer IosUrl={IosUrl} SetLoading={SetLoading} exitPlayer={exitPlayer} SetLoad={SetLoad} />
                }
            </ScrollView>
        </>
    )
}

export default Learn

const styles = EStyleSheet.create({
    main: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: Colors.white
    },
    vp_active: {

    },
    mainviewStyle: {
        width: width,
        marginTop: deviceType == 'Tablet' ? '14rem' : '20rem',
        paddingHorizontal: deviceType == 'Tablet' ? '7rem' : '10rem',
        alignItems: 'center',
        paddingBottom: deviceType == 'Tablet' ? '56rem' : '80rem',
    },
    va_pageLoader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.75)"
    },
    va_loader_text: {
        color: "#ffffff",
        marginTop: deviceType == 'Tablet' ? '3.5rem' : '5rem'
    },
    viewStyle: {
        width: "100%",
        height: deviceType == 'Tablet' ? '84rem' : '120rem',
        padding: deviceType == 'Tablet' ? '7rem' : '10rem',
        flexDirection: 'column',
        borderTopWidth: "1rem",
        borderTopColor: '#00000040',
        overflow: 'hidden'

    },
    learnicon: {
        width: deviceType == 'Tablet' ? '38.5rem' : '55rem',
        height: deviceType == 'Tablet' ? '38.5rem' : '55rem',
        alignSelf: 'center',
        zIndex: 2,
        backgroundColor: 'transparent'
    },
    learnicon_abs: {
        width: deviceType == 'Tablet' ? '38.5rem' : '55rem',
        height: deviceType == 'Tablet' ? '38.5rem' : '55rem',
        alignSelf: 'center',
        zIndex: 1,
        position: 'absolute',
        opacity: 0.5,
    },
    titleview: {
        borderWidth: 1,
        height: deviceType == 'Tablet' ? '14rem' : '20rem',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    playbuttonview: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: deviceType == 'Tablet' ? '7rem' : '10rem',
        padding: deviceType == 'Tablet' ? '7rem' : '10rem',
    }
})