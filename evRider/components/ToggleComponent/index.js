import React, { Component } from 'react'
import { Text, StyleSheet, View,FlatList,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {abc} from '../../utils/services';

const services = abc.services 


export default class Toggle extends Component {

    constructor(props){
        super(props)
        
        this.state={
            title:props.title,
            text:props.text,
            numberOfLines:0,
            service:services,
            expanded:false,
            iconState:'chevron-circle-down'
        }
    }

    toggleButton(){
        if (this.state.expanded==false){
          this.setState({numberOfLines:300,expanded:true,iconState:"chevron-circle-up"})
        }
        else{
          this.setState({numberOfLines:0,expanded:false,iconState:"chevron-circle-down"})
        }
      }
    
  render() {
      const {title}=styles
    return (
      <View>
        <TouchableOpacity onPress={()=>this.toggleButton()}>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          
            <Text style={title} >{this.state.title}</Text>
            <Icon onPress={()=>this.toggleButton()} name={this.state.iconState} style={{fontSize:25,fontWeight:'bold',color:"#4200AE",marginRight:15}} />
          
          </View>
        </TouchableOpacity>
        {this.state.expanded ? (
          <View>
            <FlatList 
              data = {this.state.text}
      
              renderItem={i => {
                
                return (
                    <View style={{ flex:1, flexDirection:"row",marginBottom:8}}>
                        <View style={{flex:0.5}}>
                          <Text style={{fontSize:17 , paddingLeft:15}}>Name: {i.item.name}</Text>
                          <Text style={{fontSize:13 , paddingLeft:15}}>Timings: {i.item.time}</Text>
                        </View>

                        <View style={{flex:0.5 , alignItems:'center'}}>
                          <Text style={{fontSize:16 , textAlign:'center'}}>Cont no: {i.item.number}</Text>
                        </View>
                    </View>
                )}}
              >
            </FlatList>
          </View>
        ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({

    title:{
        fontSize:20,
        fontWeight:'bold',
        color:"#4200AE",
        fontFamily:"sans-serif-medium",
        marginLeft: 10,
    }
})
