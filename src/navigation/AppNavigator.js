import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import ToDoList from './../components/ToDoList';
import AddScreen from './../components/AddScreen';
import DeleteScreen from '../components/DeleteScreen';
import EditScreen from '../components/EditScreen';

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        mode='modal'
        headerMode='none'
        screenOptions={{
          cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1]
              })
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: 'clamp'
              })
            }
          })
        }}>
        <Stack.Screen name='List' component={ToDoList} />
        <Stack.Screen name='AddModal' component={AddScreen} />
        <Stack.Screen name='DeleteModal' component={DeleteScreen} />
        <Stack.Screen name='EditModal' component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default MainStackNavigator