import React, { Component } from 'react';
import { View, Text, StyleSheet, Image ,ScrollView,Dimensions } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { Container, Header, Row, Button, Icon, Fab, Content,Input } from 'native-base';


Mapbox.setAccessToken('sk.eyJ1Ijoia2FycnkwMjk4IiwiYSI6ImNqcXVtcXJ3aTBrZHE0Mm55MjE1bm9xM28ifQ.B3V1a-Yd0Q1PS2GDjZ-_bg');

//http://192.168.2.12:5003/route?slon=72.831353&slat=18.968835&elon=77.166284&elat=28.677697&range=300000

export default class RouteNearMe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dLat: 18.8282,
      dLon: 72.8888,
      sLat: 17.8888,
      sLon: 73.8888,
      colorArr:['white','white','white','white','white'],
      stars:'0',
      comment:'',
      user:'raj',
      service:''      
    }
  }

  colorBox(num){
    let arr=[]
    for (i = 0; i < 5; i++) { 
     arr[i]='white'
    }
    arr[num]='#ffe502'

    var abc = (num+1).toString()
    

    this.setState({colorArr:arr , stars:abc})
    console.log('hio')
  }

  componentDidMount() {
    const { navigation } = this.props;  
    this.setState({service:navigation.getParam('name')})
    
  }

  paramsUpload(){
    axios.get('https://randomtest001.000webhostapp.com/getrating.php',
    {
      stars:this.state.stars,
      comment:this.state.comment,
      user:this.state.user,
      name:this.state.service
    })
    .then(s=> {
        console.log("Successss")
        console.log(this.state.stars)
        console.log(this.state.comment)
        console.log(this.state.user)
        console.log(this.state.service)
        this.props.navigation.navigate('nearmeMap')
    } )
    .catch(e=>{
      console.log("some errp ",e);
    })
  }

  render() {

    let colorss = ["red", "blue", "brown"]

    
    const { navigation } = this.props;
    const imgURL = navigation.getParam('img')

    return (

        <Container>
          <Content>
            <View style={styles.container}>

            <ScrollView>
              <Image style={{ width: "100%", height: 200 }}
                source={{ uri: imgURL }}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22, marginLeft: 25, marginTop: 10, color: 'black' }}>{navigation.getParam('name')}</Text>
                <View style={{ backgroundColor: "green", marginRight: 15, width: 50, borderRadius: 12, marginTop: 10, height: 30 }}><Text style={{ textAlign: 'center', fontSize: 19, color: 'white' }}>{parseFloat(navigation.getParam('rate'))}</Text></View>

              </View>
              <Text style={{ marginLeft: 25, marginRight: 100, marginTop: 5 }}>{navigation.getParam('description')}</Text>
              <Text style={{ marginLeft: 25, marginRight: 25, marginTop: 5, color: '#000011' }}>Address: Nagpada,Mumbai Central,Mumbai</Text>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:25}}>
              <Text style={{fontSize:16,color:'black'}}>Prices: {navigation.getParam('price')}</Text>
              <Text style={{fontSize:16, marginRight:25,color:'black'}}> WaitTime :50 Min</Text>
              </View>
              <View
                style={{
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 10
                }}
              />
              <View style={{ backgroundColor: '#FFFFFF', marginLeft: 20, marginRight: 20 }}>
                <Text style={{ fontSize: 23, color: '#4cb8ce', fontWeight: '200' }}>Rate this station</Text>
                <View style={{ flexDirection: 'row' }}>
                <Button onPress={(e) => this.colorBox(0) } transparent><View  style={[styles.ratebox,{backgroundColor:this.state.colorArr[0]}] }><View style={{ flexDirection: 'row' }}><Text style={styles.innerText}>1</Text><Icon type="FontAwesome" style={styles.iconStar} name="star-o" /></View></View></Button>
                <Button onPress={(e) => this.colorBox(1) } transparent ><View style={[styles.ratebox,{backgroundColor:this.state.colorArr[1]}]}><View style={{ flexDirection: 'row' }}><Text style={styles.innerText} >2</Text><Icon type="FontAwesome" style={styles.iconStar} name="star-o" /></View></View></Button>
                <Button onPress={(e) => this.colorBox(2) } transparent ><View style={[styles.ratebox,{backgroundColor:this.state.colorArr[2]}]}><View style={{ flexDirection: 'row' }}><Text style={styles.innerText} >3</Text><Icon type="FontAwesome" style={styles.iconStar} name="star-o" /></View></View></Button>
                <Button onPress={(e) => this.colorBox(3) } transparent ><View style={[styles.ratebox,{backgroundColor:this.state.colorArr[3]}]}><View style={{ flexDirection: 'row' }}><Text style={styles.innerText}>4</Text><Icon type="FontAwesome" style={styles.iconStar} name="star-o" /></View></View></Button>
                <Button onPress={(e) => this.colorBox(4) } transparent ><View style={[styles.ratebox,{backgroundColor:this.state.colorArr[4]}]}><View style={{ flexDirection: 'row' }}><Text style={styles.innerText} >5</Text><Icon type="FontAwesome" style={styles.iconStar} name="star-o" /></View></View></Button>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 10
                }}
              />
              <View style={{ backgroundColor: '#FFFFFF', marginLeft: 20, marginRight: 20, marginTop: 5 }}>
                <Text style={{ fontSize:18, color: '#4cb8ce', fontWeight: '200' }}>Women Friendliness: <Text style={{color:'black'}}>4/5</Text></Text>
                <Text style={{ fontSize:18, color: '#4cb8ce', fontWeight: '200' }}>Charging Experience: <Text style={{color:'black'}}>3/5</Text> </Text>
              </View>

              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 10
                }}
              />

              <View style={{ backgroundColor: '#FFFFFF', marginLeft: 20, marginRight: 20, marginTop: 5 }}>
                <Text style={{ fontSize: 22, color: '#4cb8ce', fontWeight: '200' }}>Promotions:</Text>
                <Text>25% Off between 1 AM to 6 AM </Text>
              </View>

              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 10
                }}
              />

              <View style={{marginLeft: 20, marginRight: 20, marginTop: 5}}>
                  <Text style={{fontSize: 22, color: '#4cb8ce', fontWeight: '200'}}>Reviews</Text>              
              </View>


              {/* <View style={{marginLeft: 20, marginRight: 20, marginTop: 5 , marginBottom:25}}> 
                  <Text style={{fontSize: 17, color: 'black', fontWeight: '200' ,  borderBottomColor: 'black',borderBottomWidth: 1, }}>This was a nice place</Text>              
                </View>

                <View style={{marginLeft: 20, marginRight: 20, marginTop: 5 , marginBottom:25}}> 
                  <Text style={{fontSize: 17, color: 'black', fontWeight: '200' ,  borderBottomColor: 'black',borderBottomWidth: 1, }}>Great Place for Charging</Text>              
                </View>

                <View style={{marginLeft: 20, marginRight: 20, marginTop: 5 , marginBottom:25}}> 
                  <Text style={{fontSize: 17, color: 'black', fontWeight: '200' ,  borderBottomColor: 'black',borderBottomWidth: 1, }}>Prices are reasonable</Text>              
                </View>

                <View style={{marginLeft: 20, marginRight: 20, marginTop: 5 , marginBottom:25}}> 
                  <Text style={{fontSize: 17, color: 'black', fontWeight: '200' ,  borderBottomColor: 'black',borderBottomWidth: 1, }}>Charging is slow</Text>              
                </View> */}

                <Input placeholder='Enter your reviews here ...' onChangeText={text => this.setState({comment:text})} placeholderTextColor="black" style={{paddingLeft:25 , color:'black'}} />

                <View style={{margin:10,alignContent:'center'}}>
                  <Button style={{width:Dimensions.get('window').width-30 , borderRadius:15,alignSelf:'center',justifyContent:'center'}}
                    onPress={() => this.paramsUpload()}>
                    <Text style={{textAlign:'center',color:'white',fontSize:20}}>Submit</Text>
                  </Button>
                </View>

              </ScrollView>
            </View>
          </Content>
        </Container>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  ratebox: {
    borderColor: 'black', borderWidth: 1, marginRight: 15, width: 50, borderRadius: 12, marginTop: 10, height: 30
  },
  annotationContainer: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  innerText: {
    marginLeft: 10, marginTop: 3,color:'black'
  },
  iconStar: {
    color: 'black', marginTop: 3, marginLeft: 2, marginRight: 20, fontSize: 20
  },
  annotationFill: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  }
});
