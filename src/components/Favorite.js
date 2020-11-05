import React, { useState } from 'react';
import {Image,View,Text,StyleSheet,TouchableNativeFeedback} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        padding: 10
    },
    containerFav: {
        backgroundColor: "#f5f500",
        marginBottom: 10,
        padding: 10
    },
    title: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
    },
    titleDone: {
        fontSize: 22,
        fontWeight: 'bold',
        textDecorationLine: "line-through",
        color: "tomato"
    },
    flex: {
        display: 'flex',
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row"
    },
    imageBig: {
        width: 100,
        height: 100,
        margin: 7,
        marginLeft: -5
    }
});

const {container,containerFav,title,flex,titleDone,imageBig} = styles;

var formatDate = date => {
    var newDate = new Date(date);
    return newDate.getDay()+'/'+ newDate.getMonth()+'/'+ newDate.getFullYear() + ' ' + newDate.toLocaleTimeString();
}

const Favorite = () =>{

    const todo = useSelector(state => state.favorite);
    const [uriImage,setUriImage] = useState(`https://robohash.org/${ (new Date().getTime() / 1000) }`);

    if (todo != null){
        //setUriImage(`https://robohash.org/${todo.title}`);

        return(
            <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple('#fff',false)}>
                <View style={todo.favorite == false ? container : containerFav}>
                    <Text style={todo.done == true ? titleDone : title}>{todo.title}</Text>
                    <View style={flex}>
                        <TouchableOpacity onLongPress={() => setUriImage("https://robohash.org/"+todo.title+'_'+ (new Date().getTime() / 1000))}>
                            <Image style={imageBig} source={{ uri: uriImage  }} />
                        </TouchableOpacity>
                        <Text style={{ paddingRight: 85 }}>
                            {todo.text}
                        </Text>
                    </View>
                    <Text style={container}>
                        {formatDate(todo.date)}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        )
    }else{
        return(
            <View style={container}>
                <Text style={{fontSize: 12}}>Add one todo as favorite to see more in detail</Text>
            </View>
        )
    }
    
}

export default Favorite