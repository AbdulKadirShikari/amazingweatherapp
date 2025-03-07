import  React,{useState,useEffect} from 'react';
import { TextInput,Button,Card,Title} from 'react-native-paper';
import {View,Text,FlatList,Image, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';

const Home = (props)=>{
    const [info,setInfo]=useState({
        name:"loading!!",
        temp:"loading!!",
        humidity:"loading!!",
        desc:"loading!!",
        icon:"loading!!"
        
    })

    useEffect(()=>{
        getWeather()

    },[])

    const getWeather = async()=>{
        let myCity=await AsyncStorage.getItem("newCity")
        const {city}= props.route.params 
        if(!myCity){
            myCity=city
        }
        
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+myCity+"&appid=eb657c4ce0fc53ddc69076b76a408364&units=metric")
        .then(data=>data.json())
        .then(results=>{
            console.log(results)
            setInfo({
                name:results.name,
                temp:results.main.temp,
                humidity:results.main.humidity,
                desc:results.weather[0].description,
                icon:results.weather[0].icon
            })
        }).catch(err=>{
            Alert(err.message)
        })
    }
    if(props.route.params.city != "Galiakot")
    {
        getWeather()
    }
    return(
        <View style={{flex:1}}>
            <Header name="Weather App"/>
           <View style={{alignItems:'center'}}>
               <Title style={{
                color:'#00aaff',
                 marginTop:30,
                 fontSize:30,
                 }}>
                  {info.name}
               </Title>
               <Image 
               style={{
                width:120,
                height:120
               }}
               source={{uri:"https://openweathermap.org/img/w/"+info.icon+".png"}}
               
               />
           </View>
           <Card style={{
            margin:5,
            padding:12
                }}>
             <Title style={{color:"#00aaff"}}>Tempreture - {info.temp} </Title>
           </Card>
    
           <Card style={{
            margin:5,
            padding:12
                }}>
             <Title style={{color:"#00aaff"}}>humidity - {info.humidity} </Title>
           </Card>
           <Card style={{
            margin:5,
            padding:12
                }}>
             <Title style={{color:"#00aaff"}}>description - {info.desc} </Title>
           </Card>
        </View>
    )
}

export default Home
