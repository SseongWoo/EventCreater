import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ChoiceScreen from './screens/ChoiceScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Choice">
        <Stack.Screen name="Choice" component={ChoiceScreen} options={{ title: '선택 화면' }} />
        <Stack.Screen name="CreateEvent" component={CreateEventScreen} options={{ title: '이벤트 등록' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
