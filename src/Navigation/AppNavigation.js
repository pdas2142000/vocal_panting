import React, { useEffect, useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox, Image } from 'react-native'
import Home from '../Screens/Home/Home';
import Solfa from '../Screens/Solfa/Solfa';
import Intro from '../Screens/Intro/Intro';
import Learn from '../Screens/Learn/Learn';
// import PlayVideo from '../Screens/PlayVideo/PlayVideo';
import VocalDetails from '../Screens/VocalDetails/VocalDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoPlayer from '../Screens/PlayVideo/VideoPlayer';

LogBox.ignoreLogs(['ViewPropTypes will be removed',]);

const Stack = createStackNavigator();

const AppNavigation = () => {

    useEffect(() => {
        storeData()
    }, [])

    const getData = async (type, newData) => {
        let responseData = await fetch(`https://api.theintelligentchoir.com/api/${type}`).then(response => response.json())

        if (newData) {
            await saveLocal(responseData)
        }
        return newData ? false : responseData.data
    }

    const saveLocal = async (data) => {
        try {
            await AsyncStorage.setItem('localData', JSON.stringify(data.result))
            await AsyncStorage.setItem('intro', JSON.stringify(data.introduction))
            await AsyncStorage.setItem('previousFetch', JSON.stringify(parseInt(Date.now() / 1000)))
        } catch (e) {
            console.log(e)
        }
    }

    const preloadImages = useCallback((data) => {
        let urlOfImages = []
        data.map(val => {
            val.sign.map((item, index) => {
                if (index <= 15) urlOfImages.push(item.image)
            })
        })
        let preFetchTasks = [];
        urlOfImages.forEach((url) => {
            preFetchTasks.push(Image.prefetch(url));
        });
        Promise.all(preFetchTasks).then((results) => {
            try {
                let downloadedAll = true;
                results.forEach((result) => {
                    if (!result) {
                        downloadedAll = false;
                    }
                })
            } catch (e) {
                console.log(e)
            }
        })
    }, []);

    const storeData = async () => {

        try {
            let previousFetch = parseInt(await AsyncStorage.getItem('previousFetch'))
            let checkdate = await getData("get_last_update")


            if (!previousFetch || isNaN(previousFetch)) {
                getData("groups", true)
            } else {
                let localData = await AsyncStorage.getItem('localData')

                if (checkdate.timer_group > previousFetch || checkdate.timer_sign > previousFetch || !localData) {
                    getData("groups", true)
                }
            }
        } catch (e) {
            getData("groups", true)
        }
    }

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }} >
                    <Stack.Screen name='Home' component={Home} />
                    <Stack.Screen name='Solfa' component={Solfa} />
                    <Stack.Screen name='Intro' component={Intro} />
                    <Stack.Screen name='Learn' component={Learn} />
                    {/* <Stack.Screen name='PlayVideo' component={PlayVideo} /> */}
                    <Stack.Screen name='PlayVideo' component={VideoPlayer} />
                    <Stack.Screen name='VocalDetails' component={VocalDetails} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default AppNavigation