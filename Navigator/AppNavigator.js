import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddChat from '../screens/AddChat';
import Chats from '../screens/Chats';
import profilepic from '../screens/profilepic';
const Stack = createStackNavigator();

function AppNavigator() {
  
  return (
      <NavigationContainer >
    <Stack.Navigator >
      <Stack.Screen name="Login"
       component={LoginScreen} 
       options={({ navigation }) => ({
        title: 'Login',
        headerStyle: {
            backgroundColor: "#0a98dd"
        },
        headerTitleStyle:{color:'white'},
        headerTintColor:'white'

    })}
       />
      <Stack.Screen name="Register"
       component={RegisterScreen} 
       options={({ navigation }) => ({
        title: 'Register Here',
        headerStyle: {
            backgroundColor: "#0a98dd"
        },
        headerTitleStyle:{color:'white'},
        headerTintColor:'white'

    })}
       
       />
       <Stack.Screen name="Chats"
       component={Chats} 
       options={({ navigation }) => ({
        title: 'Your Chats',
        headerStyle: {
            backgroundColor: "#0a98dd"
        },
        headerTitleStyle:{color:'white'},
        headerTintColor:'white'

    })}
       
       />
         <Stack.Screen name="Home"
       component={HomeScreen} 
       options={({ navigation }) => ({
        title: 'Home',
        headerStyle: {
            backgroundColor: "#0a98dd"
        },
        headerTitleStyle:{color:'white'},
        headerTintColor:'white',
       

    })}
       
       />
      <Stack.Screen name="AddChat"
       component={AddChat} 
       options={({ navigation }) => ({
        title: 'Add New Chat',
        headerStyle: {
            backgroundColor: "#0a98dd"
        },
        headerTitleStyle:{color:'white'},
        headerTintColor:'white'

    })}
    
       
       />
        <Stack.Screen name="Profile"
       component={profilepic} 
       options={({ navigation }) => ({
        title: 'Profile Pic',
        headerStyle: {
            backgroundColor: "#0a98dd"
        },
        headerTitleStyle:{color:'white'},
        headerTintColor:'white'

    })}
    
       
       />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator