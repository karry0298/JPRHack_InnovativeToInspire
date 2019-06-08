import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,FlatList,TouchableOpacity, AppState} from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import {Button,List,Fab,Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { Rating} from 'react-native-elements';
import Dialog, { DialogTitle,DialogContent,DialogFooter,DialogButton,SlideAnimation} from 'react-native-popup-dialog';
import geolib from 'geolib'
import { IP } from '../../utils/constants' 
import openMap from 'react-native-open-maps';

Mapbox.setAccessToken('sk.eyJ1Ijoia2FycnkwMjk4IiwiYSI6ImNqcXVtcXJ3aTBrZHE0Mm55MjE1bm9xM28ifQ.B3V1a-Yd0Q1PS2GDjZ-_bg');

export default class NavRouteMaps extends Component {
  static navigationOptions = {
    header: null,};

  constructor(props) {
    super(props);


    this.state = {
      showAleart:false,
      dLat:18.8282,
      dLon:72.8888,
      sLat:17.8888,
      sLon:73.8888,
      Dialog:false,
      DialogTitle:"abcTitle",
      dialogC:[2,3,4],
      DialogCharge:["chademo","css_sae","j-1772","supercharger","type2","wall"],
      DialogRating: 4,
      DialogMail:"abc@abc",
      DialogUri:'https://dqbasmyouzti2.cloudfront.net/assets/content/cache/made/content/images/articles/EV_ChargingII_XL_721_420_80_s_c1.jpg',
      DialogContact: 999233233,
      myStateFinale:[],
      DialogIcon:'public',
      routea :{
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
              ]
            }
          }
        ]
      },
      routeb :{
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
              ]
            }
          }
        ]
      },
      route:{},
      coords:{}
    }
  }

  /* --------------------------------------------------------Displaying the source marker---------------------------------------------------------- */

  renderAnnoA (a,b,title){
    return (    
        <Mapbox.PointAnnotation
          key={title}
          id={title}
          coordinate={[a,b]}>       

            <View style={styles.annotationContainer}>
              <View style={styles.annotationFill}>
              </View>
            </View>

          <Mapbox.Callout title={title} />
        </Mapbox.PointAnnotation>
      )  
  }

  /* --------------------------------------------------------Displaying the destination marker---------------------------------------------------------- */

  renderAnnoB (a,b,title){
    return (    
        <Mapbox.PointAnnotation
          key={title}
          id={title}
          coordinate={[a,b]}>       
              <FontAwesome5 name={"map-marker-alt"} brand style={{paddingLeft:15 , fontSize: 25, color:"red"}} />
          <Mapbox.Callout title={title} />
        </Mapbox.PointAnnotation>
      )  
  }

  /* --------------------------------------------------------Rendering all the stations in the map---------------------------------------------------------- */

  renderAnnotations (a,b,k,colr,tite,imgPik,imgUri,email,contact,rating,locColr) {

    var icoList = ["bolt","house-damage","city","street-view","hotel"]
    var colors=["blue","black","brown","red","#ddbc00"]

    var glyf = icoList[colors.indexOf(colr)] 

      return (
        <Mapbox.PointAnnotation
          key={k}
          id={k}    
          coordinate={[a,b]}>

              <FontAwesome5 name={glyf} brand style={{fontSize: 28, color:locColr}}  
              onPress={() => { this.setState({Dialog: true , DialogTitle:tite , dialogC:imgPik ,
                                DialogUri:imgUri ,DialogMail:email ,DialogContact:contact,
                                DialogRating:rating ,DialogIcon:glyf });
            }}
              />
        
          <Mapbox.Callout title={tite} />
        </Mapbox.PointAnnotation>
      )
   
  }

  /* --------------------------------------------------------Function on activity started---------------------------------------------------------- */

  componentDidMount(){
    const  {navigation}  = this.props;

    const uLong = navigation.getParam("abc").uLang
    const uLat = navigation.getParam("abc").uLat
    const pLat = navigation.getParam("abc").dLat
    const pLong = navigation.getParam("abc").dLang
    var rout = navigation.getParam("abc").route
    var cords = []
    var cooords=[]
    

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
          let imgUri = rout[i].imageUrl
          let imgPk = rout[i].slots
          let icoList = ["bolt","house-damage","city","street-view","hotel"]
          let img = [require("../../assets/images/chademo.png"),
              require("../../assets/images/css_sae.png"),
              require("../../assets/images/j-1772.png"),
              require("../../assets/images/supercharger.png"),
              require("../../assets/images/type2.png"),
              require("../../assets/images/wall.png")]
          let FinImag = []
          let totalSlots = rout[i].totalSlots
          let usedSlots = rout[i].slotsAvailable

          let locColor = "black"

          if(usedSlots/totalSlots*100 > 75){
              locColor = "green"
          }
          else if(usedSlots/totalSlots*100 > 40){
              locColor = "blue"
          }
          else{
            locColor = "red"
          }
  
        for(j=0 ; j<imgPk.length;j++){
            let z = DialogCharge.indexOf(imgPk[j].connector)
            FinImag.push(img[z])
          }

          let dict = {uLongitude:uLong,uLatitude:uLat,pLongitude:long,pLatitude:lat, colr:col,
            name:title ,  mail:email , contact , rate:rating ,img:imgUri,charge:FinImag,
            type:icoList[colorTags.indexOf(rout[i].typeOfStation)],typeName:rout[i].typeOfStation}

         cords.push(dict)      
         cooords.push( this.renderAnnotations(long,lat,i.toString(),col,title,FinImag,imgUri,email,contact,rating,locColor))                            
                     
      }

    this.setState({sLon:uLong,
      sLat:uLat,
      dLon:pLong,
      dLat:pLat,
      route:cords,
    coords:cooords,
      showAl:false})
 
    axios.post("http://192.168.43.204:5003/route?slon="+uLong+"&slat="+uLat+"&elon="+pLong+"&elat="+pLat+"&range=300000")
    .then(s=>{
        
         let FinCoooords =[]
         let routFin = []
         let coooords = []
         let errorDiag = false
         let len = []


        for (i = 0 ; i < s.data.length ; i++ ){
          
          coooords = []

          for (j= 0 ; j < s.data[i].length ; j++ ){
            coooords.push([parseFloat(s.data[i][j].lon),parseFloat( s.data[i][j].lat )])
          }

          len.push(coooords.length)
          let rut = {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "LineString",
                  "coordinates": coooords
                }
              }
            ]
          }
          routFin.push(rut)
        }

        if(len[0]==0 && len[1]==0){
          errorDiag = true
        }
     
        this.setState({ routea:routFin[0],
                        routeb:routFin[1],
                        showAl:errorDiag})

    })
    .catch(e=>{
       console.log("some errp ",e);
    } )

  }

    
  

  render() {


    return (
      <View style={{flex:1}}>

  {/* --------------------------------------------------------Plotting the route inside the maps view---------------------------------------------------------- */}


        <Mapbox.MapView styleURL={Mapbox.StyleURL.Street}
            zoomLevel={12}
            centerCoordinate={[72.86661427,19.26196225]}
            style={styles.container}>
            
         
          {this.renderAnnoB(this.state.dLon,this.state.dLat,"Destination")}
          {this.renderAnnoA(this.state.sLon,this.state.sLat,"Source")}


          {this.state.coords}

            <Mapbox.ShapeSource id='line1' shape={this.state.routea} >
              <Mapbox.LineLayer id='linelayer1' style={{lineColor:'red'}}>
              </Mapbox.LineLayer>           
            </Mapbox.ShapeSource>

            <Mapbox.ShapeSource id='line2' shape={this.state.routeb} >
              <Mapbox.LineLayer id='linelayer2' style={{lineColor:'red'}}>
              </Mapbox.LineLayer> 
            </Mapbox.ShapeSource>

        </Mapbox.MapView> 

{/* --------------------------------------------------------popUp Error message if no routing present---------------------------------------------------------- */}


        <Dialog
                onDismiss={() => {
                this.setState({ showAl: false });
                }}
                width={0.9}
                height={0.7}
                visible={this.state.showAl}
                rounded
                actionsBordered

                >

                <View style={{flexDirection:"row",justifyContent: "space-between",alignItems: "center"}}>
                    <Text style={{marginLeft:10,fontSize:23 , color:'black' }} >Error Message</Text>
                </View>
            
              

                <View style={{flexDirection:"row"}}>
                    <Button light onPress={() => {this.setState({ showAl: false });}}>
                    <Text style={{fontSize:21}}>    Back </Text>
                    <FontAwesome5 name={"reply"} brand style={{paddingLeft:5 , fontSize: 20, color:'black'}} />        
                    </Button>
                </View>

            </Dialog>

{/* -------------------------------------------------------Pop up Displayng the data of selected station ------------------------------------------------------------------------------------- */}


            <Dialog
                onDismiss={() => {
                this.setState({ Dialog: false });
                }}
                width={0.85}
                visible={this.state.Dialog}
                rounded
                actionsBordered >


                <View style={{flexDirection:"row",justifyContent: "space-between",alignItems: "center"}}>
                    <Text style={{marginLeft:10,fontSize:23}} ></Text>
                </View>
            
                <Image style={{width:"100%",height:150,borderBottomWidth:0.7,borderColor:"#bab8b8"}} source={{uri:this.state.DialogUri}}></Image>

                <View style={{flexDirection:"row",justifyContent: "space-between",alignItems: "center",marginTop:10}}>
                    <Text style={{marginLeft:10,fontSize:15}} >{this.state.DialogMail}</Text>
                    <Text style={{marginRight:10,fontSize:15}}>{this.state.contact}</Text> 
                </View>

                <View style={{marginTop:5, borderBottomColor: '#e5e5e5',borderBottomWidth: 0.8,}} />


                <View style={{flexDirection:"row",justifyContent: "space-between",alignItems: "center",marginTop:10}}>
                    <Rating
                        imageSize={30}
                        readonly
                        startingValue={this.state.DialogRating}
                        style={{marginLeft:10}}
                        />
                    <View style={{flexDirection:"row",marginRight:10}}>
                        <FontAwesome5 name={this.state.DialogIcon} brand style={{marginRight:10,paddingLeft:5 , fontSize: 30, color:'black'}} />   
                        <Text style={{paddingTop:3}}>{this.state.DialogIcon}</Text> 
                    </View>   
                </View>

                <View style={{marginTop:5, borderBottomColor: '#e5e5e5',borderBottomWidth: 0.8,}} />

                <View style={{marginTop:10}}>
                      <FlatList 
                        numColumns={4}
                        data = {this.state.dialogC}
                        
                        renderItem={i => {
                            // console.warn("Baka Entered") 
                            return (
                                <View style={{marginLeft:10}}><Image style={{width:45,height:45,margin:10}} source={i.item} ></Image></View>
                            )}}
                      >
                    </FlatList>
                </View>


                <Text style={{marginLeft:10}}>There will be loading shedding between 6 PM to 9PM on 9 March 2019 </Text>

            <View>

                <Button style={{backgroundColor:'red' , width:'100%'}} onPress={() => {this.goToYosemite([19.13566162451865,72.86615863993508])}}>
                  <Text style={{fontSize:21 , paddingLeft:130 , color:"white"}} >  Nav </Text>
                  <FontAwesome5 name={"location-arrow"} brand style={{paddingLeft:5, marginRight:130 , fontSize: 20, color:"white"}} />        
                </Button>                              

            </View>

            <View style={{flexDirection:"row"}}>
                <Button light onPress={() => {this.setState({ Dialog: false });}}>
                  <Text style={{fontSize:21 , paddingLeft:35}}>    Back </Text>
                  <FontAwesome5 name={"reply"} brand style={{paddingLeft:5 , paddingRight:35 , fontSize: 20, color:'black'}} />        
                </Button>


                <Button light onPress={() => {this.setState({ Dialog: false });}}>
                  <Text style={{fontSize:21}} >          Fav </Text>
                  <FontAwesome5 name={"star"} brand style={{paddingLeft:5 , fontSize: 20, color:'black', paddingRight:85}} />        
                </Button>

            </View>

            </Dialog>



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
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'rgba(218, 82, 82, 0.25)',
    borderRadius: 150,
  },
  annotationFill: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  }
});