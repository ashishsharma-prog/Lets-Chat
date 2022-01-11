import React,{useState} from 'react'
import { StyleSheet, Text, View,Image,StyleSheet } from 'react-native'
import { Button } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

const ImgPicker = (props) => {

    const takeImageHandler = ()=>{
    ImagePicker.launchImageLibraryAsync()
    }
    return (
        <View style={styles.imagePicker}>
         <View style={styles.imagePreview}>
              <Text>No image picked yet</Text>
              <Image style={styles.image}/>
              </View>  
         <Button title="Title Image" 
         color="teal"
         onPress={takeImageHandler}
         ></Button>
        </View>
    )
}

export default ImgPicker

const styles = StyleSheet.create({})
