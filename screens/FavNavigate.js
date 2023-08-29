import FavSelect from "./FavSelect";
import FavoritesScreen from "./FavoritesScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';

const Stack = createStackNavigator ();

function FavNavigate() {
  return (
    
        <Stack.Navigator initialRouteName="FavorSelect">
            <Stack.Screen name="FavorSelect" component={FavSelect} options={{ headerShown: false }}/>
            <Stack.Screen name="View" component={FavoritesScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    
  );
}

export default FavNavigate;