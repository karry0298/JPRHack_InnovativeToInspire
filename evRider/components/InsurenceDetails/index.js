import React, { Component } from 'react';
import { View, Text,FlatList,ScrollView,Dimensions } from 'react-native';
import { Button,Container,List,Content,Icon,Thumbnail} from "native-base";
import { Rating} from 'react-native-elements';

const descp = 'Your car gives you two things –  independence and free of movement. To further make your driving experience, we also give you the third ingredient, peace of mind. With our car insurance stay protected and cruise without worries.As General Insurance Company Limited, don’t just get insured, get protected.'
const f1 = 'The Company will indemnify the Insured against loss or damage to the vehicle insured hereunder and/or its accessories whilst thereon: (i) by fire, explosion self-ignition or lightning; (ii) by burglary, housebreaking or theft; (iii) by riot and strike; (iv) by earthquake (Fire and Shock Damage); (v) by flood, typhoon, hurricane, storm, tempest, inundation, cyclone, hailstorm, frost; (vi) by accidental external means; (vii) by malicious act; (viii) by terrorist activity; (ix) whilst in transit by road rail inland - waterway lift elevator or air; (x) by landslide, rockslide. Subject to deduction for depreciation at the rates mentioned in policy wordings in respect of parts replaced.'
const f2 ='The Company will indemnify the Insured in the event of an accident caused by or arising out of the use of the vehicle against all sums which the insured shall become legally liable to pay in respect of, a) death of or bodily injury to any person including occupants carried in the vehicle; b) damage to property other than property belonging to the insured or held in trust or in the custody or control of the Insured.'
const f3 ='The company undertakes to pay compensation for bodily injury / death sustained by the owner-driver of the vehicle upto Rs. 2 lakh, in direct connection with the vehicle insured. For nature of injury and scale of compensation, please refer to the policy wordings.'
class InsurenceDetails extends Component {
  static navigationOptions = {
    header: null,};

  constructor(props) {
    super(props);
    this.state = {
        abc:4
    };
  }

  render() {

    const details = this.props.navigation.getParam('details')

    console.log("blabl  ",details)

    return (
      <View>
      <ScrollView>
        <View style={{alignContent:'center'}}>
          <Text style={{fontFamily:'sans-serif-lite' ,fontSize:35,textAlign:'center'}}>{details.name}</Text>
        </View>

        <View style={{ marginTop:10,flexDirection: 'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:20 , marginLeft:10}}>Plan: {details.plan}</Text>
          <Rating
            imageSize={25}
            readonly
            startingValue={details.rating}
            style={{marginRight: 10,}}
          />
        </View>

        <View style={{ marginTop:10,flexDirection: 'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:20 , marginLeft:10}}>{details.price}</Text>
          <Text style={{fontSize:20 , marginRight:10}}> +91 9112311219</Text>
        </View>

        <View style={{alignContent:'center'}}>
          <Text style={{fontFamily:'sans-serif-lite' ,fontSize:30,textAlign:'center' }}>Description</Text>
          <Text style={{marginLeft:5,marginRight:5,marginTop:10,fontSize:15,textAlign:'justify'}}>{descp}</Text>
        </View>

        <View style={{alignContent:'center'}}>
          <Text style={{fontFamily:'sans-serif-lite' ,fontSize:30,textAlign:'center' }}>Features</Text>
          <View >
            <Text style={{marginLeft:5,marginRight:5,marginTop:10,fontWeight:'400',fontSize:18,textAlign:'justify',textDecorationLine:'underline'}}>1)   Loss of or Damage to the Vehicle Insured :</Text>
            <Text style={{marginLeft:5,marginRight:5,fontSize:15,textAlign:'justify'}}>{f1}</Text>
          </View>
          
        </View>
        
        <View style={{alignContent:'center'}}>
          <View >
            <Text style={{marginLeft:5,marginRight:5,marginTop:10,fontWeight:'400',fontSize:18,textAlign:'justify',textDecorationLine:'underline'}}>2)   Liability to third parties :</Text>
            <Text style={{marginLeft:5,marginRight:5,fontSize:15,textAlign:'justify'}}>{f2}</Text>
          </View>
          
        </View>

        <View style={{alignContent:'center'}}>
          <View >
            <Text style={{marginLeft:5,marginRight:5,marginTop:10,fontWeight:'400',fontSize:18,textAlign:'justify',textDecorationLine:'underline'}}>3)   Personal accident cover for owner-driver :</Text>
            <Text style={{marginLeft:5,marginRight:5,fontSize:15,textAlign:'justify'}}>{f3}</Text>
          </View>
        </View>

        <View style={{margin:10,alignContent:'center'}}>
          <Button style={{width:Dimensions.get('window').width-30 , borderRadius:15,alignSelf:'center',justifyContent:'center'}}>
            <Text style={{textAlign:'center',color:'white',fontSize:20}}>Buy Now</Text>
          </Button>
        </View>

        </ScrollView>
      </View>
    );
  }
}

export default InsurenceDetails;