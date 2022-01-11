
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './Navigator/AppNavigator';
import { LogBox } from 'react-native';



LogBox.ignoreAllLogs();
export default function App() {
  return (
   <AppNavigator/>
  
  );
}

const styles = StyleSheet.create({
  
});
