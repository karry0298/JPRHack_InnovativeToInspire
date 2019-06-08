import React,{Component} from "react";
import { AppRegistry, Image, StatusBar,Text } from "react-native";
import { Button,Container,List,Content,Icon,Thumbnail, View} from "native-base";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Rating} from 'react-native-elements';



export default class ListItem extends Component {
  render() {
    
    return (    
      
        <View style={{flex:1,}}>
          
          <View style={{flexDirection:'row' ,marginTop:7 , marginBottom: 7}}>
            <View style={{flex:0.5}}>
              <View style={{flexDirection:'row'}}>
                 <Text blurRadius={1} style={{color:'black' , fontSize:23, paddingLeft:20 ,paddingRight:5}}>{this.props.name}</Text>
                 {/* <Text style={{borderWidth:1 , borderColor:'black',borderRadius:50,fontSize:10, paddingLeft:5,paddingRight:5,paddingTop:2,marginBottom:15}}>Partner</Text> */}
              
              </View>
              <Text blurRadius={1} style={{color:'grey' , fontSize:12, paddingLeft:20 ,paddingRight:5}}>{this.props.plan}</Text>
            </View>
            
            <View style={{flex:0.5 , justifyContent:'center' , alignItems: 'center', }}>
              <Rating
                imageSize={30}
                readonly
                startingValue={this.props.rating}
                style={{marginLeft:10}}
              />
              <Text blurRadius={1} style={{color:'black' , fontSize:18,paddingRight:5}}>{this.props.price}</Text>
            </View>
          </View>

          <View
            style={{
              alignSelf:'center',
              borderBottomColor: 'grey',
              borderBottomWidth: 0.8,
              paddingLeft:20,
              width:450
            }}
          />
    
        </View>  

    );
  }
}