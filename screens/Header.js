import * as React from 'react';
import { Appbar, Title } from 'react-native-paper';
import {View,Text} from 'react-native'

export default Headers =(props)=> {

  return(
    <Appbar.Header 
    theme={{
      colors:{
        primary:"#00aaff",
     }
    }}style={{flexDirection:'row',justifyContent:'center',backgroundColor:"#00aaff"}}
    >
      <Title style={{color:'white'}}>
       {props.name}
      </Title>

    </Appbar.Header>
  )
}