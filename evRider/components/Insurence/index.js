import React, { Component } from 'react';
import { View, Text,FlatList,TouchableOpacity } from 'react-native';
import { Button,Container,List,Content,Icon,Thumbnail} from "native-base";
import ListItem from './Listitem.js';
import ListPartnered from './ListPartnered';
import insure from '../../utils/insure.js'; 

console.log("abcx",insure.insure.companies)

const abc = [{
  "name":"AEGON",
  "price":"₹5000",
  "rating":"4.5",
  "plan":"Collision insurance",
  "partnered":true
},
{
  "name":"Aviva",
  "price":"₹5500",
  "rating":"5",
  "plan":"All Insurance",
  "partnered":true
}]


class Insurence extends Component {
  static navigationOptions = {
    header: null,};

  constructor(props) {
    super(props);
    this.state = {
        abc:4
    };
  }

  render() {
    return (
      <View>
      
       <List 
          dataArray={abc}
          
          renderRow={data => {
            console.log("babababbababa   ",data)
            return (
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('insurenceDetails',{details:{name:data.name , price:data.price , plan:data.plan , rating:data.rating}})}>
                 <ListPartnered name={data.name} price={data.price} rating={data.rating} plan={data.plan} partner={data.partner} />
              </TouchableOpacity>
              );
            }}
        />

        <List 
          dataArray={insure.insure.companies}
          
          renderRow={data => {
            console.log("babababbababa   ",data)
            return (
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('insurenceDetails',{details:{name:data.name , price:data.price , plan:data.plan , rating:data.rating}})}>
                  <ListItem name={data.name} price={data.price} rating={data.rating} plan={data.plan} partner={data.partner} />  
              </TouchableOpacity>

              );
            }}
        />


      </View>
    );
  }
}

export default Insurence;