import React,{useLayoutEffect,useEffect,useState} from 'react'
import { StyleSheet, Text, View ,SafeAreaView,ScrollView,TouchableOpacity} from 'react-native'
import CustomListItem from '../Components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { auth,db } from '../Firebase'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { addDoc,collection,onSnapshot} from 'firebase/firestore';
import {  serverTimestamp, orderBy ,query} from "firebase/firestore";
import { StatusBar } from 'expo-status-bar'
import {updateProfile } from "firebase/auth"
import * as ImagePicker from 'expo-image-picker';
const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState([])
    const [update, setUpdate] = useState("");
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }
    
    useEffect(() => {
        const colRef = collection(db, 'chats');
        const unsubscribe = onSnapshot(colRef, {
          next: (snapshot) => {
            setChats(snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            })));
          },
          error: (err) => {
            
          }
        });
      
        return unsubscribe; 
      },[]);
useLayoutEffect(()=>{
    navigation.setOptions({
        title:"Chats Rooms",
        headerStyle:{backgroundColor:'#0a98dd'},
        headerTintColor:'black',
        headerTitleStyle:{color:'black'},
        headerLeft: () => (
            <View style={{marginLeft:20}}>
                <TouchableOpacity onPress={signOutUser} >
                <Avatar rounded source = {{uri: update || auth?.currentUser?.photoURL}}/>
              
               </TouchableOpacity> 
            </View>
           
        ),
        headerRight:()=>(
            <View style={styles.icon}>
                
             <TouchableOpacity 
           onPress={updateProfileim}
             >
             <AntDesign  name="camerao" size={24} color="black" />
             </TouchableOpacity>
             <TouchableOpacity 
             onPress={()=>{
                 navigation.navigate('AddChat')
             }}
             >
             <SimpleLineIcons name="pencil" size={24} color="black" />
             </TouchableOpacity>
            </View>
        )
    })
},[navigation])
const enterChat = (id,chatName)=>{
    navigation.navigate('Chats',{
        id,
        chatName,
    })
}
const updateProfileim = async() => {
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [16, 16],
        quality: 1,
      });
      console.log(result.uri)
      if (!result.cancelled) {
        setUpdate(result.uri);
      }
     updateProfile(auth.currentUser, {
        photoURL: {update}
     })
 }
    return (
        <SafeAreaView>
            <StatusBar style="light" />
            <ScrollView style={{height:'100%'}}>
                {chats.map(({id,data:{chatName}})=>(
                    <CustomListItem key={id} id={id} 
                    chatName={chatName}
                    enterChat={enterChat}
                    />
                ))}
             
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
   icon:{
       flexDirection:'row',
       justifyContent:'space-between',
       width: 80,
       marginRight:20
   }
})
