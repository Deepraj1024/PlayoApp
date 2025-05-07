import {StyleSheet, Text, View,Image,Pressable, ScrollView} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { AuthContext } from "../AuthContext";

const PaymentScreen = () => {
  const route = useRoute();
  const total = (parseFloat(route?.params?.price) || 0) + 8.8;
  const navigation = useNavigation();
  const courtNumber = route.params.selectedCourt 
  const date = route.params.selectedDate;
  const time = route.params.selectedTime;
  const name = route.params.place
  const game = route.params?.gameId;
  const {userId} = useContext(AuthContext);

  const bookSlot = async () => {
    try {
      const response = await axios.post('http://192.168.0.127:8000/book', {
        courtNumber,
        date,
        time,
        userId,
        name,
        game,
      });
  
      if (response.status === 200) {
        console.log('Booking successful:', response.data);

        navigation.replace("Main")
        // Handle successful booking (e.g., show a success message, navigate to another screen, etc.)
      } else {
        console.error('Booking failed:', response.data.message);
        // Handle booking failure (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error booking slot:', error);
      // Handle server or network errors (e.g., show an error message)
    }
    console.log("Booking", bookSlot)
  };
  return (
    <>
    <ScrollView style={{ flex: 1, marginTop: 10}}>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 23, fontWeight: '500', color: 'green'}}>
          {route?.params?.selectedSport}
        </Text>
        <View
          style={{
            borderColor: '#E0E0E0',
            borderWidth: 1,
            padding: 10,
            marginTop: 10,
            borderRadius: 6,
            shadowColor: '#171717',
            elevation: 1,
          }}>
          <View>
            <View
              style={{
                marginVertical: 3,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 7,
              }}>
              <MaterialCommunityIcons
                name="fireplace-off"
                size={20}
                color="black"
              />
              <Text style={{fontSize: 15, fontWeight: '600'}}>
                {route?.params?.selectedCourt}
              </Text>
            </View>

            <View
              style={{
                marginVertical: 3,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 7,
              }}>
              <Feather name="calendar" size={24} color="black" />
              <Text>{route?.params?.selectedDate}</Text>
            </View>
            <View
              style={{
                marginVertical: 3,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 7,
              }}>
              <Feather name="clock" size={24} color="black" />
              <Text>{route?.params?.selectedTime}</Text>
            </View>
            <View
              style={{
                marginVertical: 3,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 7,
              }}>
              <MaterialCommunityIcons
                name="currency-rupee"
                size={20}
                color="black"
              />
              <Text style={{fontSize: 15, fontWeight: '600'}}>
                INR {route?.params?.price}
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: 15, marginHorizontal: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 7}}>
              <Text>Court Price</Text>
              <EvilIcons name="question" size={24} color="black" />
            </View>
            <Text style={{fontSize: 16, fontWeight: '500'}}>
              INR{route?.params?.price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginTop: 15,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 7}}>
              <Text>Convenience Fee</Text>
              <EvilIcons name="question" size={24} color="black" />
            </View>
            <Text style={{fontSize: 16, fontWeight: '500'}}>INR 8.8</Text>
          </View>
        </View>
        <Text
          style={{
            height: 1,
            borderColor: '#E0E0E0',
            borderWidth: 3,
            marginTop: 20,
          }}
        />
        <View
          style={{
            marginHorizontal: 15,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',

            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 16}}>Total Amount</Text>
          <Text style={{fontSize: 15, fontWeight: '500', color: 'green'}}>
            {total}
          </Text>
        </View>
      </View>
      <Text
        style={{
          height: 1,
          borderColor: '#E0E0E0',
          borderWidth: 3,
          marginTop: 20,
        }}
      />

      <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 60}}>
        <Image
          style={{width: 200, height: 80, resizeMode: 'contain'}}
          source={{
            uri: 'https://playo.co/_next/image?url=https%3A%2F%2Fplayo-website.gumlet.io%2Fplayo-website-v2%2FLogo%2Bwith%2BTrademark_Filled.png%3Fq%3D20%26format%3Dauto&w=3840&q=75',
          }}
        />
      </View>
    </ScrollView>
    <Pressable
    onPress={bookSlot}
      style={{
        backgroundColor: "#32CD32",
        padding: 15,
        marginBottom: 0,
        borderRadius: 6,
        marginHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{fontSize:17,fontWeight:"500",color:"white"}}>INR {total}</Text>
      <Text
        style={{ fontSize:17,fontWeight:"500",color:"white" }}
      >
        Proceed to Pay
      </Text>
    </Pressable>
    </>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
