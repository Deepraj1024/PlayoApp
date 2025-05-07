import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';

const ManageRequestScreen = () => {
  const [option, setOption] = useState('Request');
  const route = useRoute();
  const navigation = useNavigation()
  const userId = route?.params?.userId;
  const gameId = route?.params?.gameId;
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.127:8000/games/${gameId}/requests`,
      );

      setRequests(response.data);
    } catch (error) {
      console.log('Error', error);
    }
  };
  console.log('Requests', requests);

  return (
    <SafeAreaView>
      <View style={{padding: 12, backgroundColor: '#223536'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            justifyContent: 'space-between',
          }}>
            <Pressable onPress={()=> navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
          
          <AntDesign name="plussquareo" size={24} color="white" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
            Manage
          </Text>
          <Text style={{color: 'white', fontSize: 17}}>Match Full</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 15,
          }}>
          <Pressable onPress={() => setOption('Requests')}>
            <Text
              style={{
                color: option == 'Requests' ? '#1dd132' : 'white',
                fontWeight: '500',
              }}>
              Request(0)
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption('Invited')}>
            <Text
              style={{
                color: option == 'Invited' ? '#1dd132' : 'white',
                fontWeight: '500',
              }}>
              Invited(0)
            </Text>
          </Pressable>

          <Pressable onPress={() => setOption('Playing')}>
            <Text
              style={{
                color: option == 'Playing' ? '#1dd132' : 'white',
                fontWeight: '500',
              }}>
              Playing(0)
            </Text>
          </Pressable>

          <Pressable onPress={() => setOption('Retired')}>
            <Text
              style={{
                color: option == 'Retired' ? '#1dd132' : 'white',
                fontWeight: '500',
              }}>
              Retired(0)
            </Text>
          </Pressable>
        </View>
        <View>
          {option == 'Requests' && (
            <View>
              {requests.map((item, index) => (
                <Pressable>
                  <View>
                    <Image style={{}} source={{uri: item?.image}} />

                    <View>
                      <Text>
                        {item?.firstName}
                        {item?.LastName}
                      </Text>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 3,
                          marginTop: 10,
                          borderRadius: 20,
                          borderColor: 'orange',
                          borderWidth: 1,
                          alignSelf: 'flex-start',
                        }}>
                        <Text style={{fontSize: 13}}>INTERMEDIATE</Text>
                      </View> 
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ManageRequestScreen;

const styles = StyleSheet.create({});
