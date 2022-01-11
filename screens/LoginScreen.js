import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,Image,TextInput,Button,KeyboardAvoidingView} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { onAuthStateChanged ,signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../Firebase'


const LoginScreen = ({navigation,route}) => {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,authUser =>{
        if(authUser){
            navigation.replace('Home')
        }
    })
    return unsubscribe
    },[])
    const signIn = () => {
        signInWithEmailAndPassword(auth, Email,Password)
        .then(() => {
            onAuthStateChanged(auth, authUser=> {
                if(authUser){
                    navigation.replace('Home');
                }
             });
        })
        .catch((error) => alert(error));
   }
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light'/>
            <Text style={{fontSize:18,fontWeight:'bold'}}>Welcome To The<Text style={{fontWeight:'bold', color:"#1E90FF",fontSize:26}}> Let's Chat</Text></Text>
        <Image style={styles.image} source={{uri:'http://icons.iconarchive.com/icons/igh0zt/ios7-style-metro-ui/512/MetroUI-Apps-Messaging-Alt-icon.png'}}/>
        <View style={styles.inputContainer}>
            <TextInput 
               style={{
                ...styles.Search,
                backgroundColor: 'white',
                color: 'black',
                borderRadius: 10,
                margin: 10
            }}
            value={Email}
            type = 'email'
            autoFocus
            onChangeText={(text) => setEmail(text)}
            placeholder='Enter Your Email'
            placeholderTextColor='grey'
            />
            <View style={styles.divider}/>
            <TextInput 
             style={{
                ...styles.Search,
                backgroundColor: 'white',
                color: 'black',
                borderRadius: 10,
                margin: 10
            }}
            secureTextEntry 
            type = 'password'
            value={Password}
            onChangeText={(text) => setPassword(text)}
            placeholder='Enter Your Password'
            placeholderTextColor='grey'
            onSubmitEditing={signIn}
            />
        </View>
        <View style={styles.btnConatiner}> 
           <View style={{marginTop:10,width:200 }}>
               <Button title="Login" color='#0a98dd' onPress={signIn} />
               
               </View> 
          <View style={{marginTop:10}}><Button
           title="Register"
            color='#0a98dd' 
            onPress={()=>{
                navigation.navigate('Register')
            }}
            
            /></View>  
        </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
   
    backgroundColor: '#ADD8E6'
    },
    image:{
        width: 200,
        height: 200,
        
      
    },
    Search:{
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        fontSize: 15,
        width: 300,
        
    },
    inputContainer:{
        padding: 10,
        
    },
    divider:{
        height:StyleSheet.hairlineWidth,
        backgroundColor:'grey',
        marginHorizontal:10,
        marginTop:5
    },
    btnConatiner:{
      
    }
   
})
