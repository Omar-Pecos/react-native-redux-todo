import React from 'react';
import {Text,View,Image, StyleSheet, TouchableOpacity} from 'react-native';
import store from './../redux/store';
import {markAs} from './../redux/actions';

const styles = StyleSheet.create({
    container:{
        marginBottom : 10,
        borderBottomColor : '#e5e5e5',
        borderBottomWidth : 3,
        padding : 10
    },
    containerFav:{
        backgroundColor : "#f5f500",
        marginBottom : 10,
        borderBottomColor : '#e5e5e5',
        borderBottomWidth : 3,
        padding : 10
    },
    title:{
        color : 'black',
        fontSize : 22,
        fontWeight : 'bold',
    },
    titleDone :{
        fontSize : 22,
        fontWeight : 'bold',
        textDecorationLine : "line-through",
        color : "tomato"
    },
    flex:{
        display : 'flex',
        justifyContent : "flex-start",
        alignItems : "center",
        flexDirection : "row"
    },
    imageBig:{
        width : 50,
        height : 50,
        margin : 7,
        marginLeft : -10
    },
    imageSmall:{
        width : 20,
        height : 20,  
    }
});

const {container,containerFav,title,titleDone,imageBig,imageSmall,flex} = styles;

const markAsType = (type,value,index) =>{
       store.dispatch(markAs(type,value,index));
}

const ToDo = ({todo,index}) =>{
    return(
        <View style={todo.favorite == false ? container : containerFav}>
            <Text style={todo.done == true ? titleDone : title}>{todo.title}</Text>
            <View style={flex}>
                <Image style={imageBig} source={{uri : `https://robohash.org/${todo.title}`}} />
                <Text>
                    {todo.text}
                </Text>
            </View>
            {/** Buttons Row (Favorites,Done/Undone) */}
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                {
                  todo.favorite === false ?
                    <TouchableOpacity onPress={() => markAsType('favorite',true,index)} >
                        <Image  style={imageSmall} source={{uri : "https://icon-icons.com/icons2/38/PNG/48/star_favorite_5754.png"}} />
                    </TouchableOpacity>
                        :
                    <TouchableOpacity onPress={() => markAsType('favorite',false,index)} >
                        <Image  style={imageSmall} source={{uri : "https://icon-icons.com/icons2/39/PNG/48/favoritesilver_star_favorite_6338.png"}} />
                    </TouchableOpacity>     
                }
                
                    <Text>&nbsp; &nbsp;</Text>
                {
                    todo.done === false ?
                    <TouchableOpacity onPress={() => markAsType('done',true,index)}>
                        <Image style={imageSmall} source={{uri : "https://icon-icons.com/icons2/1380/PNG/48/vcsnormal_93488.png"}} />       
                    </TouchableOpacity>
                        :
                    <TouchableOpacity onPress={() => markAsType('done',false,index)}>
                        <Image style={imageSmall} source={{uri : "https://icon-icons.com/icons2/1380/PNG/48/vcsconflicting_93497.png"}} />       
                    </TouchableOpacity>   
                }
                
            </View>
        </View>
    )
}

export default ToDo