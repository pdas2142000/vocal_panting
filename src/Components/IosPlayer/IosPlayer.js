import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import Video from 'react-native-video';

const IosPlayer = ({ IosUrl, SetLoading, exitPlayer, SetLoad }) => {

    const player = useRef()

    return (
        <Video source={{ uri: IosUrl.url }}
            ref={player}
            onError={exitPlayer}
            onFullscreenPlayerDidDismiss={exitPlayer}
            onFullscreenPlayerDidPresent={() => {
                SetLoading(false)
                SetLoad(false)
            }}
            fullscreen={true}
            onLoad={() => {
                console.log('onLoad')
                player.current.presentFullscreenPlayer()
            }}
            volume={0.75}
            ignoreSilentSwitch='ignore'
            style={styles.backgroundVideo}
        />
    )
}

export default IosPlayer

var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        height: 0,
        width: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
        opacity: 0
    },
});