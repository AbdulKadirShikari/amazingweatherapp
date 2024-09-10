import  React,{useState} from 'react';
import { TextInput,Button,Card } from 'react-native-paper';
import {View,Text,FlatList} from 'react-native'
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Search =({navigation})=> {
  const [city,setCity]=useState('')
  const [cities,setCities] = useState([])
  const fetchCities=(text)=>{
     setCity(text)
     fetch("https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+text+"&key=AIzaSyB3soC6utwlaq2yrUKiHgDSmI6tr8wVnfs")
     .then(item=>item.json())
      .then(cityData=>{ 
        console.log(cityData) 
        setCities(cityData.predictions.slice(0,9))
        console.log(cities)
      }).catch(err=>{
        Alert(err.message)
    })
      
  }
    const btnClick = async() =>{
      await AsyncStorage.setItem("newCity",city)
      
      navigation.navigate("Home",{city:city})
    }
    const listClick = async(description) => {
      await AsyncStorage.setItem("newCity",description)
      setCity(description)
      navigation.navigate("Home",{city:description})

    }
  return(
   <View style={{flex:1}}>
    <Header name="Search Screen"/>
   
    <TextInput 
    label={"City Name"}
    theme={{colors:{primary:"#00aaff"}}}
    value={city}
    onChangeText={(text)=>fetchCities(text)}
    />
    <Button
    icon="content-save"
    mode="contained"
    theme={{colors:{primary:"#00aaff"}}}
    style={{margin:20}}
    onPress={()=>btnClick()}>
      <Text style={{color:"white"}}>SAVE CHANGES</Text>
    </Button>
    <FlatList
    data={cities}
    renderItem={({item})=>{
      return(
      <Card
      style={{margin:2,padding:12}}
      onPress={()=>listClick(item.description)}
      >
        <Text>{item.description}</Text>
      </Card>

      
      )
    }}
    keyExtractor={item=>item.description}
    />
   </View>
  )
}