import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const TagVenueScreen = () => {
  const [venues, setVenues] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get('http://192.168.0.127:8000/venues');
        setVenues(response.data);
      } catch (error) {
        console.log('Error', error);
      }
    };

    fetchVenues();
  }, []);
const [taggedVenue, setTaggedVenue] = useState(null);
useEffect(() => {
  if (taggedVenue) {
    console.log("taggedVenue")
    navigation.goBack({taggedVenue});
  }
}, [taggedVenue, navigation]);
  const handleSelectVenue = venue => {
    navigation.navigate('CreateActivity', {taggedVenue: venue});
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: 10,
          backgroundColor: '#294461',
          paddingBottom: 20,
        }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <Ionicons name="arrow-back" size={24} color="white" />

          <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
            Tag Venue
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={venues}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <Pressable
            onPress={() => handleSelectVenue(item?.name)}
            style={{
              padding: 10,
              marginVertical: 10,
              borderColor: '#e0e0e0',
              borderWidth: 1,
              marginHorizontal: 10,
            }}>
            <View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'cover',
                    borderRadius: 7,
                  }}
                  source={{
                    uri: item?.image,
                  }}
                />

                <View style={{flex: 1}}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{fontSize: 15, fontWeight: '500', width: '100%'}}>
                    {item?.name}
                  </Text>

                  <Text style={{marginTop: 5, color: 'gray'}}>
                   {item?.address}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="star" size={24} color="#ffd250" />
                    <Text style={{marginLeft: 6, fontWeight: '500'}}>
                      4.4 (122 ratings)
                    </Text>
                  </View>
                </View>

                <Ionicons
                  name="shield-checkmark-sharp"
                  size={24}
                  color="green"
                />
              </View>

              <View>
                <Text style={{textAlign: 'center', color: 'gray'}}>
                  BOOKABLE
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default TagVenueScreen;

const styles = StyleSheet.create({});
