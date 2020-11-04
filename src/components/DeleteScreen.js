import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { deleteToDo } from '../redux/actions'

const DeleteScreen = ({route,navigation}) =>{
    //get param
    const {todo} = route.params;
    const dispatch = useDispatch();

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
                        Are you sure?
                    </Text>
                    <Text style={{marginTop:15, padding: 10, fontSize: 16 }}>If you delete "{todo.title}" you will not be able to recover it</Text>
                    <TouchableOpacity
                        style={{
                            marginTop: 10,
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5
                        }}
                        onPress={() => deleteToDoFunc(dispatch,navigation,todo._id)}
                        >
                       <Image style={{width:30,height:30}} source={{ uri: "https://icon-icons.com/icons2/1808/PNG/48/trash-can_115312.png" }} />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

const deleteToDoFunc = (dispatch,navigation,ID) =>{
    dispatch(deleteToDo(ID));
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
        height: '40%',
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


export default DeleteScreen
