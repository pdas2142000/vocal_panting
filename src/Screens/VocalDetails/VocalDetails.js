import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Platform, ActivityIndicator } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Colors } from '../../Constants/Constants'
import Header from '../../Components/Header/Header'
import HtmlParser from '../../Components/Html/Html'
import IosPlayer from '../../Components/IosPlayer/IosPlayer'
import { getDeviceType } from 'react-native-device-info';

let deviceType = getDeviceType();

const VocalDetails = ({ navigation, route }) => {

    const { data, video_url } = route.params
    var htmlContent = decodeURIComponent(data.desc);
    const [IosUrl, SetIosUrl] = useState(null)
    const [Loading, SetLoading] = useState(false)
    const [Load, SetLoad] = useState(false)

    const PlayVideo = async (navigation, url) => {

        SetLoad(true)

        const requestOptions = {
            method: "GET",
            headers: { "Accept": "application/vnd.vimeo.*+json;version=3.4", "Authorization": "bearer a7f4729b93884407951c9a696b34fe8c" }
        };

        url = url.split('/')[url.split('/').length - 1];


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
            <Header title={data.name} navigation={navigation} />
            {
                Load ? <View style={styles.va_pageLoader}>
                    <ActivityIndicator
                        size="large"
                    />
                    <Text style={styles.va_loader_text}>Loading video...</Text>
                </View> : null
            }
            <ScrollView contentContainerStyle={styles.main} showsVerticalScrollIndicator={false}>
                <View style={styles.mainviewStyle}>
                    <View style={styles.viewStyle}>
                        {
                            data &&
                            <Image
                                source={{ uri: data.image }}
                                style={{
                                    width: EStyleSheet.value("120rem"),
                                    height: EStyleSheet.value("120rem"),
                                    alignSelf: 'center'
                                }}
                            />
                        }
                    </View>
                    <View style={{ marginTop: EStyleSheet.value("40rem") }}>
                        <HtmlParser html={htmlContent} />
                    </View>
                    <TouchableOpacity
                        onPress={() => PlayVideo(navigation, video_url)}
                        style={styles.playbuttonview}
                    >
                        {
                            Loading ?
                                <ActivityIndicator
                                    size="small"
                                    color={Colors.cyan}
                                /> :
                                <Image
                                    source={require('../../../assets/images/play.png')}
                                    style={{
                                        width: EStyleSheet.value("20rem"),
                                        height: EStyleSheet.value("20rem"),
                                    }}
                                />
                        }
                        <Text
                            style={{
                                color: Colors.cyan,
                                paddingHorizontal: EStyleSheet.value("5rem"),
                                fontSize: EStyleSheet.value("16rem"),
                                fontWeight: '600',
                            }}
                        >
                            Play Video
                        </Text>
                    </TouchableOpacity>
                </View>
                {
                    IosUrl?.show &&
                    <IosPlayer IosUrl={IosUrl} SetLoading={SetLoading} exitPlayer={exitPlayer} SetLoad={SetLoad} />
                }
            </ScrollView>
        </>
    )
}

export default VocalDetails

const styles = EStyleSheet.create({
    main: {
        flexGrow: 1,
        backgroundColor: Colors.white,
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
    mainviewStyle: {
        padding: deviceType == 'Tablet' ? '14rem' : '20rem',
    },
    viewStyle: {
        width: "100%",
        height: deviceType == 'Tablet' ? '98rem' : '140rem',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    playbuttonview: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: deviceType == 'Tablet' ? '21rem' : '30rem',
        marginBottom: deviceType == 'Tablet' ? '21rem' : '30rem',
        padding: deviceType == 'Tablet' ? '7rem' : '10rem',
    },
})