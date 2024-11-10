/**React import */
import { Text, View } from 'react-native'
import React from 'react'

/**Library */
import Slider from '@react-native-community/slider'

const ProgressBar = ({
    styles,
    currentTime,
    duration,
    handleSeek,
}) => {

    /**
     * Time format video 
     * @param  time 
     * @returns 
     */
    const getMinutesFromSeconds = time => {
        const minutes = time >= 60 ? Math.floor(time / 60) : 0;
        const seconds = Math.floor(time - minutes * 60);

        return `${minutes >= 10 ? minutes : '0' + minutes}:${seconds >= 10 ? seconds : '0' + seconds
            }`;
    };

    const position = getMinutesFromSeconds(currentTime);
    const fullDuration = getMinutesFromSeconds(duration);

    return (
        <View >
            <View style={styles.vo_time_box}>
                <Text style={styles.vo_time}>{position}</Text>
                <Text style={styles.vo_time}>{fullDuration}</Text>
            </View>
            <Slider
                style={{ width: "100%", height: "20%" }}
                minimumValue={0}
                maximumValue={duration}
                value={currentTime}
                onValueChange={handleSeek}
                minimumTrackTintColor="#a8402f"
                maximumTrackTintColor="white"
                thumbTintColor="white"
            />
        </View>
    )
}

export default ProgressBar

