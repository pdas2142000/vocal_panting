import React from 'react';
import { Colors } from '../../Constants/Constants';
import EStyleSheet from 'react-native-extended-stylesheet'
import { useWindowDimensions } from 'react-native'
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import { getDeviceType } from 'react-native-device-info';

let deviceType = getDeviceType();

const systemFonts = ["SourceSansPro-Italic", "SourceSansPro-Bold", "SourceSansPro-SemiBold", ...defaultSystemFonts];

const HtmlParser = React.memo(function HtmlParser({html}) {

    const {width: contentWidth} = useWindowDimensions();

    const tagsStyles = {
        div: styles.textBlock,
        p: styles.textStyle,
        li: {
            ...styles.textStyle,
            paddingLeft: 5
        },
        a: styles.textStyle,
        h1: styles.textStyle,
        h2: styles.textStyle,
        ul: styles.textStyle,
        ol: styles.textStyle,
        em: {
            fontFamily: 'SourceSansPro-Italic'
        },
        strong: {
            fontFamily: 'SourceSansPro-Bold'
        }
    }

    return (
        <RenderHtml
            contentWidth={contentWidth}
            source={{html}}
            tagsStyles={tagsStyles}
            systemFonts={systemFonts}
        />
    );
});


export default HtmlParser

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: deviceType == 'Tablet' ? '14rem' : '20rem',
    },
    textBlock: {
        paddingBottom: deviceType == 'Tablet' ? '7rem' : '10rem',
        fontFamily: 'SourceSansPro-SemiBold',
        fontSize: deviceType == 'Tablet' ? '12rem' : '18rem',
        lineHeight: deviceType == 'Tablet' ? '18rem' : '27rem',
        color: '#000',
    },
    textStyle: {
        fontFamily: 'SourceSansPro-SemiBold',
        color: '#000',
        fontSize: deviceType == 'Tablet' ? '12rem' : '18rem',
        lineHeight: deviceType == 'Tablet' ? '18rem' : '27rem',
        paddingBottom: deviceType == 'Tablet' ? '7rem' : '10rem',
    }
})