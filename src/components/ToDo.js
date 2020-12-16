import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
//import {  } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux'

import { markAs } from './../redux/actions';

//Import Images
import starFavoriteImage from './../../assets/star_favorite.png';
import silverStarFavoriteImage from './../../assets/silver_star_favorite.png';
import checkImage from './../../assets/check.png';
import uncheckImage from './../../assets/uncheck.png';
import deleteImage from './../../assets/delete.png';
import editImage from './../../assets/edit.png';
import eyeVisibleImage from './../../assets/eye-visible.png';
import eyeNoVisibleImage from './../../assets/eye-novisible.png';

//get Image Uris
const starFavoriteImgUri = Image.resolveAssetSource(starFavoriteImage).uri;
const silverStarFavoriteImgUri = Image.resolveAssetSource(silverStarFavoriteImage).uri;
const checkImgUri = Image.resolveAssetSource(checkImage).uri;
const uncheckImgUri = Image.resolveAssetSource(uncheckImage).uri;
const deleteImgUri = Image.resolveAssetSource(deleteImage).uri;
const editImgUri = Image.resolveAssetSource(editImage).uri;
const eyeVisibleImgUri = Image.resolveAssetSource(eyeVisibleImage).uri;
const eyeNoVisibleImgUri = Image.resolveAssetSource(eyeNoVisibleImage).uri;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 3,
        padding: 10
    },
    containerFav: {
        backgroundColor: "#f5f500",
        marginBottom: 10,
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 3,
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
        width: 65,
        height: 65,
        margin: 7,
        marginLeft: -5
    },
    imageSmall: {
        width: 30,
        height: 30,
    }
});

const { container, containerFav, title, titleDone, imageBig, imageSmall, flex } = styles;

const randomHexColor = () => {
    return "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
    });
};

const ToDo = ({ todo, index, navigation }) => {
    const [displayEditToolbar, changeDisplayToolbar] = useState(false);
    const [rippleColor, setRippleColor] = useState(randomHexColor());
    const [rippleOverflow, setRippleOverflow] = useState(false);
    const dispatch = useDispatch()

    return (
        <TouchableNativeFeedback
            onPress={() => {
                setRippleColor(randomHexColor());
                setRippleOverflow(!rippleOverflow);
            }}
            background={TouchableNativeFeedback.Ripple(rippleColor, rippleOverflow)}
            onLongPress={() => changeDisplayToolbar(displayEditToolbar == true ? false : true)}
        >

            {
                todo.noVisible ?
                 
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {/** Button Row (Set visible AGAIN or noVisible to false ;) ) */}
                    <TouchableOpacity onPress={() => dispatch(markAs('noVisible', false, index))}>
                        <Image style={imageSmall} source={{ uri: eyeVisibleImgUri }} />
                    </TouchableOpacity>
                </View>
                
                :

                <View style={todo.favorite == false ? container : containerFav}>
                <Text style={todo.done == true ? titleDone : title}>{todo.title}</Text>
                <View style={flex}>
                    <Image style={imageBig} source={{ uri: `https://robohash.org/${todo.title}` }} />
                    <Text style={{ paddingRight: 55 }}>
                        {todo.text}
                    </Text>
                </View>
                {/** Buttons Row (Favorites,Done/Undone) */}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {
                        todo.favorite === false ?
                            <TouchableOpacity onPress={() => dispatch(markAs('favorite', true, index))} >
                                <Image style={imageSmall} source={{ uri: starFavoriteImgUri }} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => dispatch(markAs('favorite', false, index))} >
                                <Image style={imageSmall} source={{ uri: silverStarFavoriteImgUri }} />
                            </TouchableOpacity>
                    }

                    <Text>&nbsp; &nbsp;</Text>
                    {
                        todo.done === false ?
                            <TouchableOpacity onPress={() => dispatch(markAs('done', true, index))}>
                                <Image style={imageSmall} source={{ uri: checkImgUri }} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => dispatch(markAs('done', false, index))}>
                                <Image style={imageSmall} source={{ uri: uncheckImgUri }} />
                            </TouchableOpacity>
                    }

                </View>

                {/** Buttons Row (Edit,Delete) */}
                {
                    displayEditToolbar === true &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 7 }}>

                        <TouchableOpacity onPress={() => navigation.navigate('DeleteModal', { todo })}>
                            <Image style={imageSmall} source={{ uri: deleteImgUri }} />
                        </TouchableOpacity>


                        <Text>&nbsp; &nbsp;</Text>


                        <TouchableOpacity onPress={() => navigation.navigate('EditModal', { todo })} >
                            <Image style={imageSmall} source={{ uri: editImgUri }} />
                        </TouchableOpacity>


                    </View>
                }

                {/** Button Row (Set invisible or noVisible to true ;) ) */}
                {
                    displayEditToolbar === true &&
                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 10 }}>

                        <TouchableOpacity onPress={() => dispatch(markAs('noVisible', true, index))}>
                            <Image style={imageSmall} source={{ uri: eyeNoVisibleImgUri }} />
                        </TouchableOpacity>


                    </View>
                }

            </View>
            }

        </TouchableNativeFeedback>
    )
}

export default ToDo