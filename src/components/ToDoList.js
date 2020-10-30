import React from 'react';
import {View,Text,ScrollView} from 'react-native';
import {connect} from 'react-redux';

const mapStateToProps = (state) =>{
    return{
        todos : state.todos,
        status : state.status
    }
}

const ConnectedToDoList = ({todos,status}) =>{
    
  function renderList(){
       if (status == 'loading'){
           return(
                <Text>Loading data ...</Text>
           )
       }else{
           return (
                <ScrollView>
                    {
                        todos.map(todo =>(
                            <View key={todo._id}>
                                <Text>{todo.title}</Text>
                                <Text>{todo.text}</Text>
                            </View>
                        ))
                    }
                </ScrollView>
           )
       }
   }

   return(
       <View>
            <Text>ToDo List</Text>
            {renderList()}
       </View>
   )
}

const ToDoList = connect(mapStateToProps)(ConnectedToDoList);

export default ToDoList;