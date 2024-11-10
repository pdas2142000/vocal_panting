/**React import */
import {
    View,
    TouchableOpacity
} from 'react-native'
import React from 'react'

/**Icons */
import PlayIcon from "../../../../assets/svgs/play.svg"
import PauseIcon from "../../../../assets/svgs/pause.svg"

/**Local import */
import { IconProps } from '../../../helpers/Iconprops'
import { ms } from '../../../helpers/Metrics'

const PlayPause = ({
    styles,
    Play,
    showOverlay,
    HandlePause,
    HandlePlay
}) => {
    return (
        <>
            {
                (Play || showOverlay) && (
                    <View style={styles.vo_overlay}>
                        <TouchableOpacity
                            style={styles.vo_control_box}
                            onPress={Play ? HandlePause : HandlePlay}
                        >
                            {
                                Play ? (
                                    <PlayIcon {...IconProps(ms(22))} fill={"white"} />
                                ) : (
                                    <PauseIcon {...IconProps(ms(22))} fill={"white"} />
                                )
                            }
                        </TouchableOpacity>
                    </View>
                )
            }
        </>
    )
}

export default PlayPause