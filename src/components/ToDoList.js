import React from 'react';
import {View,Text,ScrollView,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import  ToDo  from './ToDo';

const mapStateToProps = (state) =>{
    return{
        todos : state.todos,
        status : state.status
    }
}

const ConnectedToDoList = ({todos,status}) =>{

  const {contentContainer,title} = styles;
    
  function renderList(){
       if (status == 'loading'){
           return(
            <Spinner
                visible={true}
                textContent={'Loading...'}
                textStyle={{color : '#FFF'}}
          />
           )
       }else{
           return (
                <ScrollView contentContainerStyle={contentContainer}>
                    {
                        todos.map( (todo, i) =>(
                            <ToDo
                                key={todo._id}
                                todo={todo}
                                index={i}
                            />
                        ))
                    }
                </ScrollView>
           )
       }
   }

   return(
       <View>
            <Text style={title}>ToDo List</Text>
            {renderList()}
       </View>
   )
}

const styles = StyleSheet.create({
    contentContainer : {
        paddingVertical : 20
    },
    title:{
        textAlign : "center",
        fontSize : 30
    }
})

const ToDoList = connect(mapStateToProps)(ConnectedToDoList);

export default ToDoList;