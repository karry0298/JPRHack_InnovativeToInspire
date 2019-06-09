import React, { Component } from 'react';
import { View, Text,FlatList,TouchableOpacity ,ScrollView} from 'react-native';
import { Button,Container,List,Content,Icon,Thumbnail} from "native-base";
import ListItem from './Listitem.js';
import ListPartnered from './ListPartnered';
import abc from '../../utils/services'; 

console.log("blablablabalblsbafbjksfdayfg   ",abc.abc.services)

const xyz = [{
  "name":"Raj Services",
  "time":"8am - 10pm",
  "number":"9845523121",
  "current":"Closed ⋅ Opens 8:00AM",
  "type":"Manufacturer",
  "rating":"4",
  "dist":"2km away from current location"
},
{
  "name":"Ram Services",
  "time":"10am - 6pm",
  "number":"9842123121",
  "current":"Closed ⋅ Opens 8:00AM",
  "type":"Repair Shop",
  "dist":"2.4km away from current location"
}]

class Services extends Component {
  static navigationOptions = {
    header: null,};

  constructor(props) {
    super(props);
    this.state = {
        klm:4
    };
  }

  render() {
    return (
      <View style={{flex:1}}> 
      <ScrollView>
       <List 
          dataArray={xyz}
          
          renderRow={data => {
            //console.log("babababbababa   ",data)
            return (
              <ListPartnered name={data.name} time={data.time} rating={data.rating} type={data.type} no={data.number} curr={data.current} dist={data.dist} />
              );
            }}
        />

        <List 
          dataArray={abc.abc.services}
          
          renderRow={data => {
            console.log("babababbababa   ",data)
            return (
              <TouchableOpacity>
                  <ListItem name={data.name} time={data.time} rating={data.rating} type={data.type} no={data.number} curr={data.current} dist={data.dist} />  
              </TouchableOpacity>

              );
            }}
        />

      </ScrollView>
      </View>
    );
  }
}

export default Services;