import React,{useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import {useDispatch } from 'react-redux'
import {addToDo} from '../redux/actions'

import { Ionicons } from '@expo/vector-icons'

function AddScreen({ navigation }) {

    const dispatch = useDispatch();
    
    const [title,setTitle] = useState('')
    const [text,setText] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.closeButtonContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => navigation.goBack()}>
                        <Ionicons name='ios-close' color='#101010' size={40} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalContainer}>

                    <Text style={{ color: '#444', fontSize: 20 }}>
                        Add
                    </Text>

                    <TextInput
                        style={{
                            height: 50,
                            width: 200,
                            padding: 5,
                            borderColor: 'gray',
                            borderBottomWidth: 1
                        }}
                        numberOfLines={1}
                        onChangeText={title => setTitle(title)}
                        value={title}
                        placeholder='Enter Title'
                        clearButtonMode='while-editing'
                    />
                    <TextInput
                        style={{
                            height: 50,
                            width: 200,
                            padding: 5,
                            borderColor: 'gray',
                            borderBottomWidth: 1
                        }}
                        numberOfLines={3}
                        multiline={true}
                        onChangeText={text => setText(text)}
                        value={text}
                        placeholder='Enter Text'
                        clearButtonMode='while-editing'
                    />
                    <TouchableOpacity
                        style={{
                            marginTop: 10,
                            backgroundColor: 'blue',
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5
                        }}
                        onPress={() => addToDoFunc(dispatch,navigation,{title,text})}
                        disabled={!title || !text}
                        >
                        <Ionicons name='ios-arrow-dropright-circle' size={40} color='#fff' />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}
const addToDoFunc = (dispatch,navigation,body) =>{
    dispatch(addToDo(body));
    navigation.navigate('List');
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        height: '60%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#fff'
    },
    closeButtonContainer: {
        position: 'absolute',
        alignItems: 'flex-end',
        right: 10
    },
    closeButton: {
        backgroundColor: '#d3d3d3',
        borderRadius: 20,
        width: 40,
        height: 40,
        top: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '80%',
        marginVertical: 35,
        marginHorizontal: 'auto',
        top: 10,
        left: 50
    }
})
export default AddScreen