import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem,Avatar } from 'react-native-elements'
import { collection,doc,onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';
import {   orderBy ,query} from "firebase/firestore";
const CustomListItem = ({id,chatName,enterChat}) => {
  const [chatMessages, setChatMessages] = useState([]);
  const[currentAvatar, setCurrentAvatar] = useState("");
  const [name, setname] = useState("")
 
  useEffect(() => {
    const docRef = doc(db, "chats",id);
    const colRef = collection(docRef, 'messages');
    const q = query(colRef ,orderBy('timestamp','desc'))
  
    const unsubscribe = onSnapshot(q, {
        next: (snapshot) => {
            setChatMessages(snapshot.docs[0]?.data()?.message)
            setCurrentAvatar(snapshot.docs[0]?.data()?.photoURL)
            setname(snapshot.docs[0]?.data()?.displayName)
            
        },
        error: (err)=>{alert(err)}
    }, [db]);
    return unsubscribe;
})


    return (
        <ListItem key={id} bottomDivider onPress={()=>enterChat(id,chatName)}>
            <Avatar
            rounded
            source={{
              uri: currentAvatar ||
              'https://www.pngarts.com/files/3/Avatar-PNG-Download-Image.png'
            }}
            
            
            />
            <ListItem.Content>
              <ListItem.Title style={{fontWeight:"bold"}}>
                {chatName }
              </ListItem.Title>
              <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                  {name}: {chatMessages}
                </ListItem.Subtitle>
            </ListItem.Content>

        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
