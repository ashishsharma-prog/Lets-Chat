import React,{useLayoutEffect,useState} from 'react'
import { StyleSheet, Text, View,TextInput } from 'react-native'
import { Input,Button } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'; 
import { addDoc,collection } from 'firebase/firestore';
import { db } from '../Firebase';

const AddChat = ({navigation}) => {
    const [input, setInput] = useState('')
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Add a New Chat",
         
            
        })
    },[navigation])
    const createChat = async () => {
        await addDoc(
           collection(db,'chats'), {
               chatName: input,
           } 
        )
        .then(() => {
            navigation.goBack();
        })
        .catch((error) => alert(error));
    }
    return (
        <View style={styles.Container}>
            <Input 
            
            placeholder="Enter a chat Name"
            value={input}
            onChangeText={(text)=>setInput(text)}
            onSubmitEditing={createChat}
            leftIcon={
                <AntDesign name="message1" size={24} color="black" />
            }
            />
            <Button disabled={!input} title="Create a New Chat" onPress={createChat}/>
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    
    Container:{
        backgroundColor:'white',
        padding:30,
        height: '100%'
    }
})
