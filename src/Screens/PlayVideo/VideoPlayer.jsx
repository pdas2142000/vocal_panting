/**React imports */
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'
import React,
{
    useEffect,
    useRef,
    useState
} from 'react'

/**Local imports */
import { IconProps } from '../../helpers/Iconprops'
import { ms } from '../../helpers/Metrics'

/**Library */
import Video from 'react-native-video'

/**Icons */
import LeftIcon from "../../../assets/svgs/left.svg"
import PlayPause from './PlayPauseButton'

/**Components */
import ProgressBar from './progressbar'

const screenWidth = Dimensions.get('window').width;

const aspectRatio = 16 / 9;

const videoWidth = screenWidth;
const videoHeight = videoWidth / aspectRatio;


const VideoPlayer = ({ route, navigation }) => {
    const { video_url, } = route.params

    const VideoRef = useRef()

    const [Play, setPlay] = useState(false)
    const [showOverlay, setShowOverlay] = useState(false);
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    /**
     * After 3 seconds, the overlay disappear
     */
    useEffect(() => {
        let timer;
        if (showOverlay) {
            timer = setTimeout(() => {
                setShowOverlay(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showOverlay]);

    /**
     * video play function
     */
    const HandlePlay = () => {
        setPlay(true);
        setShowOverlay(false);
    };

    /**
    * video pause function
    */
    const HandlePause = () => {
        setPlay(false);
        setShowOverlay(true);
    };

    /**
     * on click overlay show
     */
    const handleOverlayPress = () => {
        setShowOverlay(true);
    };

    /**
     * Video current Time function 
     * @param data 
     */
    const onProgress = data => {
        setCurrentTime(data.currentTime);
    };

    /**
     * Video duration function
     * @param data 
     */
    const onLoad = (data) => {
        setDuration(data.duration);
        console.log(data.duration)
    };

    /**
     * auto play function
     */
    const onEnd = () => {
        setPlay(true);
        VideoRef.current.seek(0);
    };

    /**
     * Progressbar function 
     * @param value 
     */
    const handleSeek = (value) => {
        if (VideoRef.current) {
            VideoRef.current.seek(value);
            setCurrentTime(value);
        }
    };

    return (
        <View style={styles.vo_container}>
            <View style={styles.vo_header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    {
                        (Play || showOverlay) &&
                        <LeftIcon {...IconProps(ms(27))} fill={"white"} />
                    }
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flexGrow: 0.8,
                    justifyContent: "flex-end",
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={handleOverlayPress}
                >
                    <Video
                        ref={VideoRef}
                        source={{
                            uri: video_url
                        }}
                        style={{ width: videoWidth, height: videoHeight }}
                        paused={Play}
                        onProgress={onProgress}
                        onEnd={onEnd}
                        onLoad={onLoad}
                        resizeMode="cover"
                    />
                    <PlayPause
                        {...{
                            styles,
                            Play,
                            showOverlay,
                            HandlePause,
                            HandlePlay
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center"
                }}
            >
                {
                    (Play || showOverlay) &&
                    <ProgressBar
                        {...{
                            styles,
                            currentTime,
                            duration,
                            handleSeek,
                        }}
                    />
                }
            </View>
        </View>
    )
}

export default VideoPlayer

const styles = StyleSheet.create({
    vo_container: {
        flex: 1,
        backgroundColor: "black",
    },
    vo_header: {
        paddingHorizontal: ms(10),
        height: ms(50),
        justifyContent: "center"
    },
    vo_control_box: {
        height: ms(45),
        aspectRatio: 1,
        backgroundColor: "#a8402f",
        borderRadius: ms(5),
        borderWidth: ms(1),
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
    vo_overlay: {
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "absolute",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    vo_time_box: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: ms(14),
        paddingBottom: ms(7)
    },
    vo_time: {
        color: "white",
        fontSize: ms(15)
    }
})