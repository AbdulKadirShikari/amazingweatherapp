 
import { SafeAreaProvider } from 'react-native-safe-area-context';

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Search from './screens/Search';
import Home from './screens/Home';
import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Tab = createBottomTabNavigator();
function App(): JSX.Element {
 
 

  return (
   
    <SafeAreaProvider>
    <StatusBar barStyle="dark-content" backgroundColor="#00aaff"/>
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={({route})=>({
        tabBarIcon:({color})=>{
          let iconName="";
          if(route.name==="Home"){
                iconName="home-city-outline"
          }else if(route.name==="Search"){
            iconName="city"
          }
          
          return( <MaterialCommunityIcons  name = {iconName} size={30} color={color}/>
          )
        },

      })}
       tabBarOptions={{
        activeTintColor:"white",
        inactiveTintColor:"gray",
        activeBackgroundColor:"#00aaff",
        inactiveBackgroundColor:"#00aaff"
       }}

      >
       <Tab.Screen  name="Home" component={Home} options={{ headerShown: false }} 
       initialParams={{city:"Galiakot"}}
       />
       <Tab.Screen name="Search" component={Search} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </NavigationContainer>

     </SafeAreaProvider>
    
  );
}


  
  


export default App;
