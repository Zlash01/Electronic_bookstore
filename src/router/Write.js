import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Write from '../component/write/Write.js';

const Stack = createNativeStackNavigator();

export default function WriteStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Write"
      screenOptions={{
        headerShown: true,
        headerTintColor: '#F8F8F8', // Set the tint color for the header
        headerStyle: {
          backgroundColor: '#00171F', // Set the background color for the header
        },
      }}>
      <Stack.Screen name="Write" component={Write} />
    </Stack.Navigator>
  );
}
