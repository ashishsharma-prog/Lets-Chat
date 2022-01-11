import React,{useState} from 'react'
import { StyleSheet, Text, View,KeyboardAvoidingView,TextInput,Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../Firebase'
import { createUserWithEmailAndPassword ,updateProfile} from 'firebase/auth'
const RegisterScreen = () => {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [ImageUrl, setImageUrl] = useState('')
    const register = ()=>{
   createUserWithEmailAndPassword(auth,Email,Password)
   .then(()=>{
       updateProfile(auth.currentUser,{
           displayName:Name,
           photoURL: ImageUrl ||
           'https://randomuser.me/api/portraits/men/36.jpg',
       })
   }).catch((err)=>{
       alert(err.message)
   })
    }
    return (
        <KeyboardAvoidingView style={styles.Container}>
            <StatusBar style='light'/>
            <Text style={styles.text}>Create A <Text style={{fontWeight:'bold',color:'teal'}}> Lets Chat's </Text> Account</Text>
            <View style={styles.inputContainer}>
            <TextInput 
               style={{
                ...styles.Search,
                backgroundColor: 'white',
                color: 'black',
                borderRadius: 10,
                margin: 10
            }}
            value={Name}
            type = 'Name'
            autoFocus
            onChangeText={(text) => setName(text)}
            placeholder='Enter Your Name'
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
            value={Email}
            type = 'Email'
          
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
            value={Password}
            type = 'Password'
            secureTextEntry 
            onChangeText={(text) => setPassword(text)}
            placeholder='Enter Your Password'
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
            value={ImageUrl}
            type = 'ImageUrl'
            
            onChangeText={(text) => setImageUrl(text)}
            placeholder='Enter Your ImageUrl (Optional)'
            placeholderTextColor='grey'
            onSubmitEditing={register}

            />
            <View style={styles.divider}/>
           
            </View>
            <View style={styles.btn}><Button title="Register" onPress={register}/></View>
         <View style={{height:100}}/>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    Container:{
   flex:1,
   alignItems:'center',
   justifyContent:'center',
     padding: 10
    },
    Search:{
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        fontSize: 15,
        width: 340
        
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
    btn:{
      width:200
    },
    text:{
       fontSize:22 
    }
})
