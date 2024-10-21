import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Library from '../component/library/Library';

const LibraryScreen = Library;

const LibraryStack = createNativeStackNavigator();
const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator
      initialRouteName="Library"
      screenOptions={{
        headerShown: true,
        headerTintColor: '#F8F8F8', // Set the tint color for the header
        headerStyle: {
          backgroundColor: '#00171F', // Set the background color for the header
        },
      }}>
      <LibraryStack.Screen name="Library" component={LibraryScreen} />
    </LibraryStack.Navigator>
  );
};

export default LibraryStackNavigator;
