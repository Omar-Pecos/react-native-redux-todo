import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ToDo from './ToDo';
import { Ionicons } from '@expo/vector-icons'

const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        status: state.status
    }
}

const ConnectedToDoList = ({ todos, status,navigation }) => {

    const {container, contentContainer, title, fabButton,fabContainer } = styles;

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
        <View style={container}>
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : '#fffcf5'
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
      title:{
          textAlign: "center",
          fontWeight:'bold',
          fontSize: 22
      }
})

const ToDoList = connect(mapStateToProps)(ConnectedToDoList);

export default ToDoList;