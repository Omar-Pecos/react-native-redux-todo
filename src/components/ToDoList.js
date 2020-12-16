import React, { useState,useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ToDo from './ToDo';
import NotificationComponent from './NotificationComponent';
import Favorite from './Favorite';
import { Ionicons } from '@expo/vector-icons'

import { Notification } from "react-native-in-app-message";
import NumericInput from 'react-native-numeric-input'
import { setError, setReloadTime } from '../redux/actions';
import { getToDos } from './../redux/actions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import favIconImage from './../../assets/fav_icon.png';
import configImage from './../../assets/settings.png';

const favIconImgUri = Image.resolveAssetSource(favIconImage).uri;
const configImgUri = Image.resolveAssetSource(configImage).uri;



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
    },
    additionalToolbar:{
         flexDirection: 'row',
         justifyContent: 'space-between',
         margin : 7,
         marginTop : -20,
    },
})

const { container, contentContainer, title, fabButton, fabContainer ,additionalToolbar} = styles;

var shouldShowMessage = (error,dispatch) =>{
   if(error != null){
       Notification.show();
        // needs to dispacth and action
        setTimeout(() => dispatch(setError()) ,3000);
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
        notif = <Notification customComponent={notifComponent} style={{paddingTop: 22}} duration={3000} onPress={Notification.hide} />
    }else{
            notifComponent = <NotificationComponent 
            message={error}
            type={'success'}
        />
        //not an error msg
        notif = <Notification customComponent={notifComponent} style={{paddingTop: 22}} duration={3000} onPress={Notification.hide}/>
    }

    return notif;
}

var setReloadMinTime = (time, dispatch , setShow) =>{
    var num ;
    if (time <= 0)
        num = 1;
    else if (time > 60)
        num = 60;
    else
        num = time;

    dispatch(setReloadTime(num));
    setShow(false);
}

export default ToDoList = ({ navigation }) => {
    const todos = useSelector(state => state.todos);
    const status = useSelector(state => state.status);
    const hasError = useSelector(state => state.hasError);
    const error = useSelector(state => state.error);
    const reloadTime = useSelector(state => state.reloadTime);

    const dispatch = useDispatch();
    const [showConfig,setShowConfig] = useState(false);
    const [showFav,setShowFav] = useState(false);
   
    const [time,setTime] = useState( reloadTime );
    
    /*Interval to request data to server
        reloadTime = 1 min 
        if reloadTime changes, clear that interval and create a new one
    */
      useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getToDos());
        }, reloadTime * 60000);
        return () => clearInterval(interval);
      }, [reloadTime]);

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
                <Text style={{fontSize: 10,color: 'grey',textAlign: 'center'}}>Reload every {reloadTime} min</Text>
                {/** FavoriteDetail button + Config button */}
                <View style={additionalToolbar}>
                    <TouchableWithoutFeedback onPress={() => showFav == true ? setShowFav(false) : setShowFav(true)}>
                        <Image style={{width: 30, height: 30}} source={{ uri : favIconImgUri }}  />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => showConfig == true ? setShowConfig(false) : setShowConfig(true)}>
                        <Image style={{width: 30, height: 30}} source={{ uri : configImgUri }}  />
                    </TouchableWithoutFeedback>      
                </View>
                {/** config the reload time */}
                {
                    showConfig === true &&
                    <View style={{justifyContent:'center', alignItems: 'center'}}>
                        <Text style={{fontSize:14,padding:7}}>¿How many minutes to reload data?</Text>
                        <NumericInput 
                            value={time} 
                            onChange={value => setTime(value)} 
                            minValue={1}
                            maxValue={60}
                            totalWidth={200} 
                            totalHeight={40} 
                            iconSize={25}
                            valueType='real'
                            rounded 
                            textColor='#B0228C' 
                            iconStyle={{ color: 'white' }} 
                            rightButtonBackgroundColor='#EA3788' 
                            leftButtonBackgroundColor='#E56B70'/>
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
                        onPress={() => {setReloadMinTime(time,dispatch,setShowConfig)}}
                        > 
                        <Ionicons name='ios-arrow-dropright-circle' size={40} color='#fff' />
                    </TouchableOpacity>
                    </View>
                }
                {/** fav component */}
                {
                    showFav === true && 
                    <Favorite />
                }
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