import React,{useState} from 'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import { FontAwesome } from '@expo/vector-icons'; 
const Speak = (props) =>{
   
  const speak = () => {
    const thingToSay = props.sound;
    Speech.speak(thingToSay);
  };

  return (
    
<TouchableOpacity onPress={speak} style={{marginHorizontal:5}}>
     <FontAwesome name="microphone" size={22} color="black" />
     </TouchableOpacity>
   
  );
}

export default Speak
const styles = StyleSheet.create({
  
   
})

