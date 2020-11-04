import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ToDo from './ToDo';
import NotificationComponent from './NotificationComponent';
import { Ionicons } from '@expo/vector-icons'

import { Notification } from "react-native-in-app-message";
import { setError } from '../redux/actions';

/*const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        status: state.status,
        hasError : state.hasError,
        error : state.error
    }
}*/

var shouldShowMessage = (error,dispatch) =>{
   if(error != null){
       Notification.show();
        // needs to dispacth and action
        setTimeout(() => dispatch(setError()) ,5000);
       // setTimeout(() => error = null,5000);
   }
}

var setMessageType = (error,hasError) =>{
    var notif,notifComponent;
    if (error != null && hasError){
        notifComponent = <NotificationComponent 
            message={error}
            type={'error'}
        />
        notif = <Notification customComponent={notifComponent} style={{paddingTop: 22}} duration={5000} />
    }else{
            notifComponent = <NotificationComponent 
            message={error}
            type={'success'}
        />
        //not an error msg
        notif = <Notification customComponent={notifComponent} style={{paddingTop: 22}} duration={5000}/>
    }

    return notif;
}

export default ToDoList = ({ navigation }) => {
    const todos = useSelector(state => state.todos);
    const status = useSelector(state => state.status);
    const hasError = useSelector(state => state.hasError);
    const error = useSelector(state => state.error);

    //console.log(message);
    const dispatch = useDispatch();

    function renderList() {
        if (status == 'loading') {
            return (
                <Spinner
                    visible={true}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
            )
        } else {
            return (
                <ScrollView contentContainerStyle={contentContainer}>
                    {
                        todos.map((todo, i) => (
                            <ToDo
                                key={todo._id}
                                navigation={navigation}
                                todo={todo}
                                index={i}
                            />
                        ))
                    }
                </ScrollView>
            )
        }
    }

    return (
        <React.Fragment>
             { setMessageType(error,hasError)}
            {
               shouldShowMessage(error,dispatch)
            }
            <View style={container} >
                <Text style={title}>ToDo List</Text>
                {renderList()}
                <View style={styles.fabContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddModal')}
                        style={styles.fabButton}>
                        <Ionicons name='ios-add' color='#fff' size={70} />
                    </TouchableOpacity>
                </View>
            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffcf5'
    },
    contentContainer: {
        margin: 5,
        padding: 10
    },
    fabContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        right: 10,
        bottom: 20
    },
    fabButton: {
        backgroundColor: 'blue',
        borderRadius: 35,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        paddingTop: 10,
        margin: 7,
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 20
    }
})

const { container, contentContainer, title, fabButton, fabContainer } = styles;

//const ToDoList = connect(mapStateToProps)(ConnectedToDoList);

//export default ToDoList;