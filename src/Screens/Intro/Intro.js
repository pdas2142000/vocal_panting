import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Linking, TouchableOpacity, Dimensions, ActivityIndicator, SafeAreaView } from 'react-native'
import HTML, { defaultSystemFonts } from 'react-native-render-html';
import { getDeviceType, getVersion } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage'
import EStyleSheet from 'react-native-extended-stylesheet'
import Header from '../../Components/Header/Header'
import { Colors } from '../../Constants/Constants'

let deviceType = getDeviceType();
let version = getVersion()

const Intro = ({ navigation, route }) => {

    const [Data, SetData] = useState(null)
    const [Loading, SetLoading] = useState(false)
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            SetLoading(true)
            let response = await fetch("https://api.theintelligentchoir.com/api/groups")
            let responseData = await response.json()
            await AsyncStorage.setItem('intro', JSON.stringify(responseData.introduction))
            SetData(responseData.introduction)
            SetLoading(false)
        } catch (e) {
            let data = await AsyncStorage.getItem('intro')
            SetData(data)
            console.error(e)
        }
    };

    console.log(version)

    return (
        <>
            <Header title="Vocal Painting Intro" navigation={navigation} />
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <>
                    {
                        Loading ? <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
                            <ActivityIndicator  size="large"  color="black" /> 
                        </View>: 
                        <>
                            {
                                Data ? <HTML
                                    source={{ html: Data || 'Loading' }}
                                    tagsStyles={tagsStyles}
                                    contentWidth={Dimensions.get('window').width - 40}
                                    classesStyles={classesStyles}
                                    baseFontStyle={baseFontStyle}
                                    systemFonts={[...defaultSystemFonts, 'SourceSansPro-BoldItalic', 'SourceSansPro-Bold', 'SourceSansPro-SemiBold', 'SourceSansPro-Black', 'SourceSansPro-Italic']}
                                /> : null
                            }
                        </>
                    }
                    <Text style={[styles.textStyle, {textAlign: 'center', marginBottom: 10}]}>Version: <Text style={{fontFamily: "SourceSansPro-Bold"}}>{version}</Text></Text>
                </>

            </ScrollView>
        </>
    )
}


export default Intro

const classesStyles = {
    bold_italic: {
        fontFamily: 'SourceSansPro-BoldItalic',
    },
};


const styles = EStyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.white,
        color: "#000",
        padding: deviceType == 'Tablet' ? '14rem' : '20rem',
    },
    textBlock: {
        marginBottom: deviceType == 'Tablet' ? '7rem' : '10rem',
    },
    textBlockBg: {
        paddingLeft: deviceType == 'Tablet' ? '7rem' : '20rem',
    },
    textStyle: {
        fontFamily: 'SourceSansPro-Regular',
        color: "black",
        fontSize: deviceType == 'Tablet' ? '12rem' : '18rem',
        lineHeight: deviceType == 'Tablet' ? '18rem' : '27rem',
        marginBottom: deviceType == 'Tablet' ? '7rem' : '10rem',
    },
})

const baseFontStyle = {
    fontFamily: 'SourceSansPro-Regular',
};

const tagsStyles = {
    p: {
        fontFamily: 'SourceSansPro-Regular',
        fontSize: deviceType == 'Tablet' ? "24px" : "18px",
        color: "black",
        padding: 0,
        marginBottom: 0
    },

    a: {
        fontFamily: 'SourceSansPro-SemiBold',
        color: Colors.red,
    },

    img: {
        width: Dimensions.get('window').width - 40,
        height: 250,
    },
    strong: {
        ...styles.textStyle,
        fontFamily: 'SourceSansPro-Bold',
    },
    em: {
        ...styles.textStyle,
        fontFamily: 'SourceSansPro-Italic',
    }
};


                {/* <View style={{ paddingBottom: 100 }}>
                    <View style={styles.textBlock}>
                        <Text style={styles.textStyle}>
                            Welcome to the Vocal Painting App
                        </Text>
                    </View>
                    <View style={styles.textBlock}>
                        <Text style={styles.textStyle}>
                            The app serves as reference work for the current official 75 Vocal Painting signs (VOPA), a music sign language developed for any curious jazz/pop vocal ensemble to the highest professional level of vocal arts.
                        </Text>
                    </View>
                    <View style={styles.textBlock}>
                        <Text style={styles.textStyle}>
                            Why VOPA?
                        </Text>
                    </View>
                    <View style={styles.textBlock}>
                        <Text style={styles.textStyle}>
                            VOPA is a headliner in The Intelligent Choir (TIC) concept that refers to professor Jim Daus Hjernøe's musical philosophy of letting every singer feel "I am music!". VOPA is a vocal evolution of Soundpainting by Walter Thompson, a universal multidisciplinary sign language to create and direct improvised live performances with musicians, actors, dancers, and visual artists. In VOPA, it has become a new language for vocal art, used to complement conventional conducting techniques of choir music. VOPA currently consists of 75 signs, and more are in the making. The VOPA technique makes it possible to spontaneously adjust musical details on form and content (dynamics, harmonization, metric, transposition, text, sound colours, etc.). It is also possible to implement pre-rehearsed modules on the fly and be creative with re-composing, re-arranging, etc. You can also extend musical details within the traditional repertoire.
                        </Text>
                    </View>
                    <View style={styles.textBlock}>
                        <Text style={[styles.textStyle]}>
                            Still, the five beginner VOPA signs (the first video from "Learn VOPA") are enough to achieve significant musical results with any vocal band or choir:
                        </Text>
                        <View style={styles.textBlockBg}>
                            <Text style={[styles.textStyle]}>
                                * Energize
                            </Text>
                            <Text style={[styles.textStyle]}>
                                * Externalize
                            </Text>
                            <Text style={[styles.textStyle]}>
                                * Long notes
                            </Text>
                            <Text style={[styles.textStyle]}>
                                * Short notes
                            </Text>
                            <Text style={[styles.textStyle]}>
                                * Audible subdivisions
                            </Text>
                        </View>
                    </View>
                    <View style={styles.textBlock}>
                        <TouchableOpacity onPress={() => Linking.openURL('https://theintelligentchoir.com/')}>
                            <Text style={[styles.textStyle]}>
                                More information about The Intelligent Choir concept and education for Innovative Jazz/Pop Choir Directing on <Text style={[styles.textStyle, { color: Colors.orange }]}>www.theintelligentchoir.com</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textBlock}>
                        <Text style={styles.textStyle}>
                            App Credits:
                        </Text>
                        <View style={styles.textBlockBg}>
                            <Text style={styles.textStyle}>
                                Kristian Skårhøj - Video Design
                                {'\n'}
                                John Kjøller, Popweb - App Development
                                {'\n'}
                                Sven Ratzel - Solfa Graphics
                                {'\n'}
                                RAMA Vocal Center Students, Aalborg (Denmark)
                            </Text>
                        </View>
                    </View>
                </View> */}