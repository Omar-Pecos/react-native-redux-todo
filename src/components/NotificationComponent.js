import React from 'react';
import {Image,StyleSheet,Text,View} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection : "row",
        padding : 10,
        justifyContent : 'flex-start',
        alignItems : "center"
    },
    image:{
        width: 30,
        height:30,
        margin: 5
    }
})

const {container,image} = styles;

const NotificationComponent = ({message,type}) =>{
    return(
        <View style={container}>
            {
                type == 'success' ?
                <Image style={image} source={{uri : "https://icon-icons.com/icons2/1380/PNG/48/vcsnormal_93488.png"}} />
                    :
                <Image style={image} source={{uri : "https://icon-icons.com/icons2/1380/PNG/48/vcsconflicting_93497.png"}} />
            }

            <Text>{message}</Text>
        </View>
    )
}

export default NotificationComponent