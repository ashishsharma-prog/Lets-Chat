import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
 
} from "react-native";
import { Avatar } from "react-native-elements";
import { FontAwesome, Ionicons ,MaterialIcons} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { addDoc,collection,doc,onSnapshot } from 'firebase/firestore';
import { db,auth } from '../Firebase';
import {  serverTimestamp, orderBy ,query} from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import Speak from "../Components/Speech";
const Chats = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([])
  const [PickedImage, setPickedImage] = useState()
  const [Document, setDocument] = useState()
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chats",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: messages[0]?.data.photoURL,
            }}
            size = {33}
           onPress={()=>{
             navigation.navigate('Profile',{
              uri: messages[0]?.data.photoURL,
             })
           }}
          />
          <Text style={styles.headerText}>{route.params?.chatName}</Text>
        </View>
      ),
      headerRight: () => (
        <View style={styles.icon}>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call-sharp" size={28} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation,messages]);
  const sendMessage = () => {
    Keyboard.dismiss();
    const docRef = doc(db, "chats",route.params?.id);
    const colRef = collection(docRef, "messages");
    addDoc(colRef, {
    timestamp: serverTimestamp(),
    message:input,
    displayName:auth.currentUser.displayName,
    email:auth.currentUser.email,
    photoURL:auth.currentUser.photoURL,
    imageUrl:PickedImage?PickedImage:null,
    documentUrl:Document?Document:null
    });
    setInput("")
    setPickedImage('')
    setDocument('')
  };
  useEffect(() => {
    const docRef = doc(db, "chats",route.params?.id);
    const colRef = collection(docRef, 'messages');
    const q = query(colRef ,orderBy('timestamp','asc'))
  
    const unsubscribe = onSnapshot(q, {
      next: (snapshot) => {
        setMessages(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })));
      },
      error: (err) => {
        
      }
    });
  
    return unsubscribe; 
  },[route]);
  const takeImageHandler = async()=>{

   const document= await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
   })
   if (!document.cancelled) {
    setDocument(document.uri)
  }
  
   
    }
    const takeCameraHandler = async()=>{

     const image= await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
    aspect:[16,16],
    quality:1
     })
     if (!image.cancelled) {
      setPickedImage(image.uri)
    }
    
      }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FDF5E6" }}>
      <StatusBar style="light" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView  style={styles.contentContainer}>
            {messages.map(({id, data}) => (
                        data.email === auth.currentUser.email ? (
                            <View key = {id} style={styles. reciever} >
                             
                                <Avatar 
                                    position = 'absolute'
                                    rounded
                                    bottom= {-15}
                                    right = {-5}
                                    size = {30}
                                    source = {{uri : data.photoURL }}
                                    onPress={()=>{
                                      navigation.navigate('Profile',{
                                       uri: data.photoURL,
                                      })
                                    }}
                                />
                                <View style={{flexDirection:'row',padding:5}}>
                                <Text  style = {styles.recieverText}>{data.message}</Text>
                               { data.message? <Speak sound={data.message}/> :null}
                                </View>
                                
                                <TouchableOpacity  onPress={()=>{
                                navigation.navigate('Profile',{
                                 uri: data.imageUrl,
                                })
                              }} >
                                { data.imageUrl? <Image 
                              
                              style={styles.image}
                               source={{uri:data.imageUrl}}/> :null}
                                </TouchableOpacity>
                              <TouchableOpacity  onPress={()=>{
                                navigation.navigate('Profile',{
                                 uri: data.documentUrl,
                                })
                              }}>
                              { data.documentUrl? <Image
                              
                               style={styles.image} 
                               source={{uri:data.documentUrl}}/> :null}
                              </TouchableOpacity>
                             
                              </View>
                            
                            
                        ): (
                            <View style = {styles.sender}>
                                <Avatar 
                                    position = 'absolute'
                                    rounded
                                    bottom= {-15}
                                    right = {-5}
                                    size = {30}
                                    source = {{uri : data.photoURL }}
                                    onPress={()=>{
                                      navigation.navigate('Profile',{
                                       uri: data.photoURL,
                                      })
                                    }}
                                />
                                <View style={{flexDirection:'row',padding:5}}>
                                { data.message? <Speak  sound={data.message}/> :null}
                                <Text style = {styles.senderText}>{data.message}</Text>
                               
                                </View>
                                <Text style={styles.senderName}>{data.displayName}</Text>
                                <TouchableOpacity  onPress={()=>{
                                  navigation.navigate('Profile',{
                                   uri: data.imageUrl,
                                  })
                                }}>
                                { data.imageUrl?
                                 <Image style={styles.image}
                                
                                 source={{uri:data.imageUrl}}/> :null}
                                </TouchableOpacity>
                               <TouchableOpacity onPress={()=>{
                                  navigation.navigate('Profile',{
                                   uri: data.documentUrl,
                                  })
                                }}>
                               { data.documentUrl? <Image 
                                 style={styles.image} 
                                 
                                 source={{uri:data.documentUrl}}/> :null} 
                               </TouchableOpacity>
                               
                            </View>
                            
                        )
                    ))}
                
            </ScrollView>
            <View style={styles.footer}>
            <TouchableOpacity style={{marginRight:8}} onPress={takeImageHandler}>
              <MaterialIcons name="attachment" size={32} color="#0a98dd" style={{marginRight:8}} />
              </TouchableOpacity>
              <TextInput
                style={styles.Search}
                value={input}
                type="input"
                autoFocus
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
                placeholder="Type Your Message"
                placeholderTextColor="grey"
              />

              <TouchableOpacity onPress={sendMessage}>
                <Ionicons name="send" size={28} color="#0a98dd" />
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft:8}} onPress={takeCameraHandler}>
              <FontAwesome name="camera" size={28} color="#0a98dd" />
               
              </TouchableOpacity>
             
           
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chats;

const styles = StyleSheet.create({
    contentContainer:{
        paddingTop:15,
       
    },
  headerText: {
    color: "white",
    marginLeft: 10,
    fontWeight: "700",
  },
  icon: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginRight: 20,
  },
  container: {
    flex: 1,
    
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    marginBottom:15
  },
  Search: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
    
  },
  reciever:{
    padding: 15,
    backgroundColor: "#f4eecc",
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative"

  },
  recieverText:{
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  sender:{
    padding: 15,
    backgroundColor: "#1E90FF",
    alignSelf: 'flex-start',
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative"
  },
  senderText:{
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 10
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white"
},
image:{
  width:200,
  height: 200,
  
}
});
