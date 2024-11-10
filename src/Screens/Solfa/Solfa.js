import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Header from '../../Components/Header/Header'
import { Colors } from '../../Constants/Constants'
import { useIsFocused } from '@react-navigation/native';
import { getDeviceType } from 'react-native-device-info';
import { useWindowDimensions } from 'react-native';

let deviceType = getDeviceType();

import TrackPlayer from 'react-native-track-player';

const setupAudioPlayer = async () => {
    await TrackPlayer.setupPlayer().catch(console.log);
    await TrackPlayer.setVolume(0.8);
}

const Solfa = ({ navigation }) => {

    const { height, width } = useWindowDimensions();

    const isFocused = useIsFocused();

    const [SolfaItems, SetSolfaItems] = useState([
        {
            id: '0',
            images: require('../../../assets/solfege/images/Flats.png'),
            align: 'left',
            type: 'image',
        },
        {
            id: '1',
            images: require('../../../assets/solfege/images/DoUp.png'),
            song: require('../../../assets/solfege/audio_files/DoUp.mp3'),
            align: 'center',
            type: 'both',
            value: `Do'`,
            class: 'VIII/I',

        },
        {
            id: '2',
            images: require('../../../assets/solfege/images/Sharps.png'),
            align: 'right',
            type: 'image',
        },
        {
            id: '3',
            images: require('../../../assets/solfege/images/Te.png'),
            align: 'left',
            type: 'both',
            value: `Te`,
            class: 'VII',
            symbol: "♭",
            song: require('../../../assets/solfege/audio_files/Te.mp3')
        },
        {
            id: '4',
            images: require('../../../assets/solfege/images/Ti.png'),
            align: 'center',
            value: `Ti`,
            class: 'VII',
            type: 'both',
            song: require('../../../assets/solfege/audio_files/Ti.mp3')
        },
        {
            id: '5',
            images: require('../../../assets/solfege/images/Li.png'),
            align: 'right',
            value: `Li`,
            class: 'VI',
            symbol: "♯",
            type: 'both',
            song: require('../../../assets/solfege/audio_files/Li.mp3')
        },
        {
            id: '6',
            align: 'left',
            images: require('../../../assets/solfege/images/Le.png'),
            type: 'both',
            value: `Le`,
            class: 'VI',
            symbol: "♭",
            song: require('../../../assets/solfege/audio_files/Le.mp3')
        },
        {
            id: '7',
            images: require('../../../assets/solfege/images/La.png'),
            align: 'center',
            value: `La`,
            class: 'VI',
            type: 'both',
            song: require('../../../assets/solfege/audio_files/La.mp3')
        },
        {
            id: '8',
            images: require('../../../assets/solfege/images/Si.png'),
            align: 'right',
            value: `Si`,
            class: 'V',
            symbol: "♯",
            type: 'both',
            song: require('../../../assets/solfege/audio_files/Si.mp3')
        },
        {
            id: '9',
            images: require('../../../assets/solfege/images/Se.png'),
            align: 'left',
            type: 'both',
            value: `Se`,
            class: 'V',
            symbol: "♭",
            song: require('../../../assets/solfege/audio_files/Se.mp3')
        },
        {
            id: '10',
            images: require('../../../assets/solfege/images/So.png'),
            align: 'center',
            value: `So`,
            class: 'V',
            type: 'both',
            song: require('../../../assets/solfege/audio_files/So.mp3')
        },
        {
            id: '11',
            images: require('../../../assets/solfege/images/Fi.png'),
            align: 'right',
            value: `Fi`,
            class: 'IV',
            symbol: "♯",
            type: 'both',
            song: require('../../../assets/solfege/audio_files/Fi.mp3')
        },
        {
            id: '12',
            align: 'left',
            type: 'empty',
        },
        {
            id: '13',
            images: require('../../../assets/solfege/images/Fa.png'),
            align: 'center',
            value: `Fa`,
            class: 'IV',
            type: 'both',
            song: require('../../../assets/solfege/audio_files/Fa.mp3')
        },
        {
            id: '14',
            align: 'right',
            type: 'empty',
        },
        {
            id: '15',
            images: require('../../../assets/solfege/images/Me.png'),
            align: 'left',
            value: `Me`,
            class: 'III',
            symbol: "♭",
            type: 'both',
            song: require('../../../assets/solfege/audio_files/Me.mp3')
        },
        {
            id: '16',
            images: require('../../../assets/solfege/images/Mi.png'),
            align: 'center',
            value: `Mi`,
            class: 'III',
            type: 'both',
            song: require('../../../assets/solfege/audio_files/Mi.mp3')
        },
        {
            id: '17',
            images: require('../../../assets/solfege/images/Ri.png'),
            align: 'right',
            value: `Ri`,
            class: 'II',
            symbol: "♯",
            type: 'both',
            song: require('../../../assets/solfege/audio_files/Ri.mp3')
        },
        {
            id: '18',
            images: require('../../../assets/solfege/images/Ra.png'),
            value: `Ra`,
            class: 'II',
            symbol: "♭",
            align: 'left',
            type: 'both',
            song: require('../../../assets/solfege/audio_files/Ra.mp3')
        },
        {
            id: '19',
            images: require('../../../assets/solfege/images/Re.png'),
            type: 'both',
            value: `Re`,
            class: 'II',
            align: 'center',
            song: require('../../../assets/solfege/audio_files/Re.mp3')
        },
        {
            id: '20',
            images: require('../../../assets/solfege/images/Di.png'),
            value: `Di`,
            class: 'I',
            align: 'right',
            symbol: "♯",
            type: 'both',
            song: require('../../../assets/solfege/audio_files/Di.mp3')
        },
        {
            id: '21',
            align: 'left',
            type: 'empty',
        },
        {
            id: '22',
            images: require('../../../assets/solfege/images/Do.png'),
            value: `Do`,
            class: 'I',
            align: 'center',
            type: 'both',
            song: require('../../../assets/solfege/audio_files/Do.mp3')
        },
    ])

    useEffect(() => {
        setupAudioPlayer()
    }, [])

    useEffect(() => {
        if (!isFocused) {
            TrackPlayer.pause();
            TrackPlayer.destroy && TrackPlayer.destroy();
        }
    }, [isFocused])

    const onPlay = async (item, index) => {
        await TrackPlayer.reset();
        await TrackPlayer.add([{
            id: item.id,
            url: item.song,
            title: 'Track Title',
            artist: 'Track Artist',
            artwork: require('../../../assets/images/logo.png')
        }])
        await TrackPlayer.play();
    }

    const NormalItems = (item, index) => {
        if (item.type === 'image') {
            return (
                <View
                    key={index.toString()}
                    style={{
                        paddingBottom: deviceType == 'Tablet' ? EStyleSheet.value('47rem') : EStyleSheet.value('70rem'),
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: item.align === "left" ? 'flex-start' : 'flex-end',
                        borderBottomWidth: EStyleSheet.value('1rem'),
                        borderBottomColor: '#00000040',
                    }}
                >
                    <View
                        style={{
                            ...styles.image_view,
                            justifyContent: 'flex-start',
                            alignItems: item.align === "left" ? 'flex-start' : 'flex-end'
                        }}

                    >
                        <Image
                            source={item.images}
                            style={{
                                ...styles.image,
                                height: EStyleSheet.value('60rem'),
                                width: EStyleSheet.value('60rem'),
                            }}
                        />
                    </View>
                </View>
            )
        }
        if (item.type === "both") {
            return (
                <TouchableOpacity
                    key={index.toString()}
                    style={styles.normal}
                    onPress={() => onPlay(item, index)}
                >
                    <View style={styles.image_view}>
                        <Image
                            source={item.images}
                            resizeMode={'contain'}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.text_view}>
                        <View style={styles.text_left_view}>
                            <Text style={styles.text_left}>
                                {item.symbol && <Text style={styles.symbol}>{item.symbol}</Text>}{item.class}</Text>
                        </View>
                        <View style={styles.text_right_view}>
                            <Text style={styles.text_center}>{item.value}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        if (item.type === "empty") {
            return (
                <View
                    key={index.toString()}
                    style={{
                        borderBottomWidth: (Number(item.id) > (SolfaItems.length - 3)) ? 0 : EStyleSheet.value('1rem'),
                        borderBottomColor: '#00000040',
                        height: (Number(item.id) > (SolfaItems.length - 3)) ? 0 : EStyleSheet.value('100rem'),
                    }}
                />
            )
        }
    }

    let left = SolfaItems.filter(val => val.align === 'left')
    let center = SolfaItems.filter(val => val.align === 'center')
    let right = SolfaItems.filter(val => val.align === 'right')

    return (
        <>
            <Header title="Solfa (interactive)" navigation={navigation} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={[styles.container, { minHeight: height }]}>
                    <View
                        style={styles.columns}
                    >
                        {
                            left.map((val, index) => {
                                return NormalItems(val, index)
                            })
                        }
                    </View>
                    <View
                        style={styles.columns}
                    >
                        {
                            center.map((val, index) => {
                                return NormalItems(val, index)
                            })
                        }
                    </View>
                    <View
                        style={styles.columns}
                    >
                        {
                            right.map((val, index) => {
                                return NormalItems(val, index)
                            })
                        }

                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default Solfa

const styles = EStyleSheet.create({
    main: {
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        paddingVertical: deviceType == 'Tablet' ? '14rem' : '20rem',
        paddingBottom: 50,
    },
    solfa_view: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    columns: {
        flex: 1,
        marginHorizontal: deviceType == 'Tablet' ? '7rem' : '15rem',
    },
    normal: {
        borderBottomWidth: '1rem',
        borderBottomColor: '#00000040',
        width: '100%',
    },
    image_view: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: deviceType == 'Tablet' ? '50rem' : '60rem',
        height: deviceType == 'Tablet' ? '50rem' : '60rem',
        maxWidth: '90%',
        resizeMode: 'contain',
        marginTop: '5rem',
        marginTop: deviceType == 'Tablet' ? '20rem' : '20rem',
        marginBottom: deviceType == 'Tablet' ? '10rem' : '10rem',
    },
    text_view: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: '3rem'
    },
    text_left_view: {
        position: 'absolute',
        bottom: '3rem',
        left: "4rem"
    },
    text_right_view: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_center: {
        color: '#000',
        fontFamily: 'Dosis-Medium',
        fontSize: deviceType == 'Tablet' ? '11.5rem' : '16rem',
    },
    text_left: {
        fontFamily: 'Dosis-Medium',
        fontSize: deviceType == 'Tablet' ? '11.5rem' : '16rem',
        color: '#a94034'
    },
})