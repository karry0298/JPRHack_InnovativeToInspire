import React, { Component } from 'react';
import { View, Text,StyleSheet,FlatList,ScrollView,Image} from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import { Rating} from 'react-native-elements';
import {Button,ListItem,List, Container, Header, Content, Card, CardItem, Body ,Left,Thumbnail, Item } from "native-base";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Dialog, { DialogTitle,DialogContent,DialogFooter,DialogButton,SlideAnimation} from 'react-native-popup-dialog';
//http://192.168.2.13:2454/api/findStation
import BatteryDialog from '../BatteryDialog/batteryDialog'

Mapbox.setAccessToken('sk.eyJ1Ijoia2FycnkwMjk4IiwiYSI6ImNqcXVtcXJ3aTBrZHE0Mm55MjE1bm9xM28ifQ.B3V1a-Yd0Q1PS2GDjZ-_bg');

class NearMeList extends Component {

    constructor(props) {
        super(props);
              
        this.state = {
            valueBattery: 88,
            DialogBattery: false,
            borderColor: "green",
            colorText: "green",
            Dialog:true,
            latitude: 19.13566162451865,
            longitude: 72.86615863993508,
            placeLat : '',
            placeLon : '',
            DialogCard: [],
            battery:60,
            dialogC:[2,3,4],
            DialogDist:20,
            Dialog:false,
            DialogTitle:"abcTitle",
            dialogC:[2,3,4],
            DialogRating: 4,
            finCoord:[],
            DialogMail:"abc@abc",
            DialogUri:'https://dqbasmyouzti2.cloudfront.net/assets/content/cache/made/content/images/articles/EV_ChargingII_XL_721_420_80_s_c1.jpg',
            DialogContact: 999233233,
            colorTags:["Turbo","Home","Mall","Public","Hotel"],
            colors:["blue","black","brown","red","#ddbc00"],
            prevLatLng: {},
            coordinate:{latitude: 19.26196225,longitude: 72.86661427},
            route:{},
            allStations : {},
            filteredStations : {},
            filterStatus : false
        };

        this.updateFunc = this.updateFunc.bind(this)
      }    

      deg2rad(deg) {
        return deg * (Math.PI/180)
      }

//--------------------------------------------------Calculating Distance in KM--------------------------------------------------------------

     getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km

        return d;
      }


    componentDidMount(){
      
      let rout = this.props.navigation.getParam("abc");
      this.setState({ allStations : rout });
      console.log("component did mount setting stations")

    }

    updateFunc(data){
      this.setState( { allStations: data }  )
    }


    routeFun(item){
        console.log("Entered")

        var cooors = []
      
        axios.post("http://192.168.2.12:5003/route?slon=72.831353&slat=18.968835&elon=77.166284&elat=28.677697&range=30000")
        .then(s=>{
            
           // console.log(s.data[0])
            cooors = s.data[0]

        })
        .catch(e=>{
           console.log("some errp ",e);
        } )

        console.log("ababa",cooors)
        console.log("Exit")
    }
      
  render() {

    console.disableYellowBox = true

    let rout = this.state.allStations;
    var cords = []

//--------------------------------------------------Rendering the list Of Station--------------------------------------------------------------

    for(i=0 ; i<rout.length ; i++){
       
        let colors=["blue","black","brown","red","#ddbc00"]
        let DialogCharge=["chademo","css_sae","j-1772","supercharger","type2","wall"]
        let colorTags=["Turbo","Home","Mall","Public","Hotel"]
  
          let long = rout[i].location.coordinates[0]
          let lat = rout[i].location.coordinates[1]
          let col = colors[colorTags.indexOf(rout[i].typeOfStation)]
          let title = rout[i].name
          let email = rout[i].email
          let contact = rout[i].contactNo
          let rating = rout[i].rating
          let owner = rout[i].owner
          let price =  rout[i].price
          let imgUri = rout[i].imageUrl
          let imgPk = rout[i].slots
          let description=rout[i].description
          let icoList = ["bolt","house-damage","city","street-view","hotel"]
          let img = [require("../../assets/images/chademo.png"),
              require("../../assets/images/css_sae.png"),
              require("../../assets/images/j-1772.png"),
              require("../../assets/images/supercharger.png"),
              require("../../assets/images/type2.png"),
              require("../../assets/images/wall.png")]
          let FinImag = []
  
        for(j=0 ; j<imgPk.length;j++){
            let z = DialogCharge.indexOf(imgPk[j].connector)
            FinImag.push(img[z])
          }


         let dist = Math.round(this.getDistanceFromLatLonInKm(this.state.latitude,this.state.longitude,lat,long))
         let dict = {uLongitude:this.state.longitude,uLatitude:this.state.latitude,pLongitude:long,pLatitude:lat, 
            name:title , distance : dist , mail:email , contact , rate:rating ,img:imgUri,charge:FinImag,description:description,price:price,
            type:icoList[this.state.colorTags.indexOf(rout[i].typeOfStation)],typeName:rout[i].typeOfStation}

         cords.push(dict)                           
      }
 


     cords.sort(function(a, b){
        return a.distance-b.distance
    })

    this.state.DialogCard = cords

    return (  
      <View style={styles.container}>
{/* --------------------------------------------------Pop Up Daiglog-------------------------------------------------------------- */}
        <Dialog
            onDismiss={() => {
            this.setState({ Dialog: false });
            }}
            width={1}
            visible={this.state.Dialog}
            rounded
            actionsBordered
            >
            
    
            <View >
              <View style={{alignItems: "center"}}>
                  <Text style={{fontSize:25}}>{this.state.DialogTitle}</Text>
              </View>
          
              <View style={{flexDirection:"row",justifyContent: "space-between",alignItems: "center"}}>
                  <Text style={{marginLeft:10,fontSize:15}} >{this.state.DialogMail}</Text>
                  <Text style={{marginRight:10,fontSize:15}}>{this.state.DialogContact}</Text> 
              </View>
            
              <Image style={{width:"100%",height:200}} source={{uri:this.state.DialogUri}}></Image>

              <Rating
                  imageSize={30}
                  readonly
                  startingValue={this.state.DialogRating}
                  style={{marginTop:3}}
                  />

            </View>

            <View >
              <FlatList 
                  numColumns={3}
                  data = {this.state.dialogC}
                  renderItem={({item}) => {
                      //console.warn("baka    ",item)  
                      return (
                          <View style={{marginLeft:10}}><Image style={{width:78,height:78,margin:10}} source={item} ></Image></View>
                      )}}
              >
              </FlatList>
            </View>


            <Text style={{marginLeft:10}}>There will be loading shedding between 6 PM to 9PM on 9 March 2019 </Text>

            <View style={{flexDirection:"row"}}>
                <Button light onPress={() => {this.setState({ Dialog: false });}}>
                <Text style={{fontSize:21}}>    Back </Text>
                <FontAwesome5 name={"reply"} brand style={{paddingLeft:5 , fontSize: 20, color:'black'}} />        
                </Button>

                <Button light onPress={() => {this.setState({ Dialog: false });}}>
                <Text style={{fontSize:21}} >          Fav </Text>
                <FontAwesome5 name={"star"} brand style={{paddingLeft:5 , fontSize: 20, color:'black'}} />        
                </Button>

                <Button light onPress={() => {this.setState({ Dialog: false });}}>
                <Text style={{fontSize:21}} >         Nav </Text>
                <FontAwesome5 name={"location-arrow"} brand style={{paddingLeft:5, marginRight:30 , fontSize: 20, color:'black'}} />        
                </Button>
            </View>

          </Dialog>

{/* --------------------------------------------------Diaglog for battery level-------------------------------------------------------------- */}

          <BatteryDialog 
            setDialogBattery={(val) => this.setState({ DialogBattery: val })}
            batteryValue={this.state.valueBattery}
            dialogVisible={this.state.DialogBattery}
            borderColor={this.state.borderColor}
            colorText={this.state.colorText}
          />
        
{/* --------------------------------------------------Header-------------------------------------------------------------- */}


        <View style={{flexDirection:"row" ,justifyContent: 'center', }}>
              <Button style={{flex:2, backgroundColor:"#6200EE", }}
                      onPress={() => {this.props.navigation.navigate('nearmeMap')}}>
                <View style={{paddingLeft:4, paddingRight:4, flexDirection:"row",justifyContent: 'space-around',  }}>
                  <FontAwesome5 name={"map-marked-alt"} brand style={{paddingLeft:5 , fontSize: 20, color:'white', flex:1}} />
                  <Text style={{fontSize:21, flex:2, color:'white'}}>Map </Text>
                </View>
              </Button>

                <Button style={{flex:3, backgroundColor:"#6200EE", }} onPress={()=>this.setState({DialogBattery:true})} >
                <View style={{paddingLeft:4, paddingRight:4, flexDirection:"row",justifyContent: 'space-around',  }}>

                    <FontAwesome5 name={"battery-three-quarters"} brand style={{transform: [{ rotate: '270deg'}],fontSize: 20, color:"white" }} />
                    <Text style={{fontSize:21 ,color:"white"}} > {"charge:" + this.state.valueBattery +"%"} </Text>
                </View>
                </Button>
                <Button style={{flex:2, backgroundColor:"#3700B3", }}
                        onPress={() => {this.props.navigation.navigate('nearmelist',{abc:this.state.myStateFinale})}}>
                  <View style={{paddingLeft:4, paddingRight:4, flexDirection:"row" ,justifyContent: 'space-around', }}>
                    <FontAwesome5 name={"list-ul"} brand style={{fontSize: 20, color:"white", flex:1}} />     
                    <Text style={{fontSize:21,color:"white", flex:2}} > List </Text>
                </View>
                </Button>
        </View>

{/* --------------------------------------------------List of items-------------------------------------------------------------- */}

          <ScrollView>
            {
              this.state.DialogCard.map((item, index) => (
                
                <View key = {index} >

                  <ListItem button style={{borderBottomWidth: 0 , paddingTop:0,paddingBottom:0}} 
                              onPress={() => this.props.navigation.navigate('nearmerout',item)}>
                      <Content padder>
                         
                          <Card>
                        
                            <View style={{flexDirection:"row",justifyContent: "space-between",alignItems: "center"}}>
                                <Text style={{marginLeft:10,fontSize:23}} >{item.name}</Text>
                                <Text style={{marginRight:10,fontSize:18}}>{item.distance+" kms Away"}</Text> 
                            </View>
                        
                            <Image style={{width:"100%",height:150,borderBottomWidth:0.7,borderColor:"#bab8b8"}} source={{uri:item.img}}></Image>

                            <View style={{flexDirection:"row",justifyContent: "space-between",alignItems: "center",marginTop:10}}>
                                <Text style={{marginLeft:10,fontSize:15}} >Owner: MrAlex</Text>
                                <Text style={{marginRight:10,fontSize:15}}>{item.contact}</Text> 
                            </View>

                            <View style={{marginTop:5, borderBottomColor: '#e5e5e5',borderBottomWidth: 0.8,}} />


                            <View style={{flexDirection:"row",justifyContent: "space-between",alignItems: "center",marginTop:10}}>
                              <Rating
                                  imageSize={30}
                                  readonly
                                  startingValue={item.rate}
                                  style={{marginLeft:10}}
                                  />
                              <View style={{flexDirection:"row",marginRight:10}}>
                                  <FontAwesome5 name={item.type} brand style={{marginRight:10,paddingLeft:5 , fontSize: 30, color:'black'}} />   
                                  <Text style={{paddingTop:3}}>{item.typeName}</Text> 
                              </View>   
                            </View>

                            <View style={{marginTop:5, borderBottomColor: '#e5e5e5',borderBottomWidth: 0.8,}} />

                            <View style={{marginTop:10}}>
                                <FlatList 
                                  numColumns={4}
                                  data = {item.charge}
                                  
                                  renderItem={i => {
                                      // console.warn("Baka Entered") 
                                      return (
                                          <View style={{marginLeft:10}}><Image style={{width:45,height:45,margin:10}} source={i.item} ></Image></View>
                                      )}}>

                                </FlatList>
                            </View>

                          <CardItem footer bordered>
                              <Text>There will be loading shedding between 6 PM to 9PM on 9 March 2019 </Text>
                          </CardItem>
            
                        </Card>
                      </Content>
                    </ListItem>
                  </View>
                ))
              }
            </ScrollView>

{/* --------------------------------------------------Bottom Navigation-------------------------------------------------------------- */}


            <View style={{flexDirection:"row"}}>
            <Button style={{backgroundColor:"white",paddingLeft:55,paddingRight:55}}
                    onPress={() =>{this.props.navigation.navigate("filter", { updateFunc : this.updateFunc , data : this.state.allStations })}}>
                <Text style={{fontSize:21}}> Filters </Text>
                <FontAwesome5 name={"filter"} brand style={{paddingLeft:5 , fontSize: 20, color:'black'}} />        
            </Button>

            <Button style={{marginLeft:1,backgroundColor:"white",paddingLeft:60,paddingRight:75}} 
                    onPress={() =>{this.props.navigation.navigate("sort", { updateFunc : this.updateFunc , data : this.state.allStations, origin : 'nearmelist' })}}
                    >
                <Text style={{fontSize:21}} > Sort </Text>
                <FontAwesome5 name={"exchange-alt"} brand style={{transform: [{ rotate: '90deg'}],paddingLeft:5 , fontSize: 20, color:'black'}} />        
            </Button>

</View>
        

      </View>
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
  annotationContainer: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  }
});

export default NearMeList;
