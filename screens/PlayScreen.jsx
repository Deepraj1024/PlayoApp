import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import Game from '../components/Game';
import {AuthContext} from '../AuthContext';
import UpComingGame from '../components/UpComingGames';

const PlayScreen = () => {
  const route = useRoute;
  const [option, setOption] = useState(initialOption);
  const [sport, setSport] = useState('Badminton');
  const [games, setGames] = useState([]);
  const {userId} = useContext(AuthContext);
  const [upcomingGames, setUpcomingGames] = useState([]);
  const initialOption = route?.params?.initialOption || 'My Sports';

  useEffect(() => {
    if (initialOption) {
      setOption(initialOption);
    }
  }, [initialOption]);
  const navigation = useNavigation();
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://192.168.0.127:8000/games');
      setGames(response.data);
    } catch (error) {
      console.error('Failed to fetch games:', error);
      // Handle error
    }
  };
  console.log('games', games);

  useEffect(() => {
    if (userId) {
      fetchUpcomingGames();
    }
  }, [userId]);
  const fetchUpcomingGames = async () => {
    try {
      console.log('myysdyfydyfdf', userId);
      const response = await axios.get(
        `http://192.168.0.127:8000/upcoming?userId=${userId}`,
      );
      setUpcomingGames(response.data);
    } catch (error) {
      console.error('Failed to fetch upcoming games:', error);
    }
  };

  console.log(upcomingGames);
  return (
    <SafeAreaView>
      <View style={{padding: 12, backgroundColor: '#223536'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>
              Sahakar Nagar
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Ionicons name="chatbox-outline" size={24} color="white" />
            <Ionicons name="notifications-outline" size={24} color="white" />
            <Pressable onPress={() => navigation.navigate('Profile')}>
              <Image
                style={{width: 30, height: 30, borderRadius: 15}}
                source={{
                  uri: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740',
                }}
              />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginVertical: 13,
          }}>
          <Pressable onPress={() => setOption('Calender')}>
            <Text
              style={{
                fontWeight: 500,
                fontSize: 15,
                color: option == 'Calender' ? '#12e04c' : 'white',
              }}>
              Calender
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption('My Sports')}>
            <Text
              style={{
                fontWeight: 500,
                fontSize: 15,
                color: option == 'My Sports' ? '#12e04c' : 'white',
              }}>
              My Sports
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption('Other Sports')}>
            <Text
              style={{
                fontWeight: 500,
                fontSize: 15,
                color: option == 'Other Sports' ? '#12e04c' : 'white',
              }}>
              Other Sports
            </Text>
          </Pressable>
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              onPress={() => setSport('Badminton')}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                padding: 10,
                borderColor: 'white',
                marginRight: 10,
                borderRadius: 8,
                borderWidth: sport == 'Badminton' ? 0 : 1,
                backgroundColor:
                  sport == 'Badminton' ? '#1dff22' : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 15}}>
                Badminton
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSport('Cricket')}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                padding: 10,
                borderColor: 'white',
                marginRight: 10,
                borderRadius: 8,
                borderWidth: sport == 'Cricket' ? 0 : 1,
                backgroundColor: sport == 'Cricket' ? '#1dff22' : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 15}}>
                Cricket
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSport('Cycling')}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                padding: 10,
                borderColor: 'white',
                marginRight: 10,
                borderRadius: 8,
                borderWidth: sport == 'Cycling' ? 0 : 1,
                backgroundColor: sport == 'Cycling' ? '#1dff22' : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 15}}>
                Cycling
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSport('Running')}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                padding: 10,
                borderColor: 'white',
                marginRight: 10,
                borderRadius: 8,
                borderWidth: sport == 'Running' ? 0 : 1,
                backgroundColor: sport == 'Running' ? '#1dff22' : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 15}}>
                Running
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 10,
        }}>
        <Pressable onPress={() => navigation.navigate('CreateActivity')}>
          <Text style={{fontWeight: 'bold'}}>Create Game</Text>
        </Pressable>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Pressable>
            <Text style={{fontWeight: 'bold'}}>Filter</Text>
          </Pressable>

          <Pressable>
            <Text style={{fontWeight: 'bold'}}>Sort</Text>
          </Pressable>
        </View>
      </View>
      {option == 'My Sports' && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={games}
          contentContainerStyle={{paddingBottom: 200}}
          keyExtractor={item => item._id}
          renderItem={({item}) => <Game item={item} />}
        />
      )}

      {option == 'Calender' && (
        <FlatList
          data={upcomingGames}
          keyExtractor={item => item._id}
          renderItem={({item}) => <UpComingGame item={item} />}
          contentContainerStyle={{paddingBottom: 200}}
        />
      )}
    </SafeAreaView>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({});
