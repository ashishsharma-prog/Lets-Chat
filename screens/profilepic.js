import React from 'react'
import { StyleSheet, Text, View ,Image} from 'react-native'

const profilepic = ({navigation,route}) => {
    
    return (
        <View style={styles.container}>
            
           <Image style={styles.image} source={{uri:route?.params?.uri}}/>
        </View>
    )
}

export default profilepic

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding: 10,
        
       
    },
    image:{
        width:'100%',
        height: '100%',
        borderRadius:20,
        elevation:20
    }
})
