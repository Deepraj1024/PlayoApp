import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const GameSetupScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {item, userId, players, requests} = route?.params || {};

  const [matchFull, setMatchFull] = useState(item?.matchFull || false);

  const toggleMatchFullStatus = async gameId => {
    try {
      // Call the backend endpoint to toggle the matchFull status
      const response = await axios.post(
        'http://192.168.0.127:8000/toggle-match-full',
        {gameId},
      );

      if (response.status === 200) {
        // Display a success message
        Alert.alert('Success', `Match full status updated`);

        setMatchFull(!matchFull);
        // Optionally, refresh game data or update UI accordingly
      }
    } catch (error) {
      console.error('Failed to update match full status:', error);
      Alert.alert('Error', 'Failed to update match full status');
    }
  };
  console.log('isUserAdmin:', route?.params?.item?.isUserAdmin);
  console.log('route.params:', route.params);

  const sendJoinRequest = async gameId => {
    try {
      const response = await axios.post(
        `http://192.168.0.127:8000/games/${gameId}/request`,
        {
          userId,
        },
      );

      if (response.status == 200) {
        Alert.alert('Request Sent', 'please wait for the host to accept!', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () =>
              console.log('Request sent successfully:', response.data),
          },
        ]);
      }
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  };
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get('http://192.168.0.127:8000/venues');
        setVenues(response.data);
      } catch (error) {
        console.error('Failed to fetch venues:', error);
      }
    };

    fetchVenues();
  }, []);

  const venue = venues?.find(item => item?.name == route?.params?.item?.area);

  console.log('ver', venue);

  const [startTime, endTime] = route?.params?.item?.time
    ?.split(' - ')
    .map(time => time.trim());

  console.log('comment', route?.params?.item?.matchFull);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
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
                justifyContent: 'space-between',
              }}>
              <Ionicons name="arrow-back" size={24} color="white" />
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Entypo name="share" size={24} color="white" />
                <Entypo name="dots-three-vertical" size={24} color="white" />
              </View>
            </Pressable>

            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 14,
              }}>
              <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
                Badminton
              </Text>
              <View
                style={{padding: 7, backgroundColor: 'white', borderRadius: 7}}>
                <Text>Regular</Text>
              </View>
              <View
                style={{
                  marginLeft: 'auto',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                }}>
                <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
                  Match Full
                </Text>
                <FontAwesome
                  onPress={() =>
                    toggleMatchFullStatus(route?.params?.item?._id)
                  }
                  name={matchFull ? 'toggle-on' : 'toggle-off'}
                  size={24}
                  color="white"
                />
              </View>
            </View>

            <Text
              style={{
                marginTop: 10,
                fontSize: 15,
                color: 'white',
                fontWeight: '500',
              }}>
              {item?.time} · {item?.date}
            </Text>

            <Pressable
              onPress={() =>
                navigation.navigate('Slot', {
                  place: route?.params?.item?.area, // Pass the selected venue object
                  sports: venue?.sportsAvailable || [], // Pass the sports available at the venue
                  date: route?.params?.item?.date,
                  slot: route?.params?.item?.time,
                  startTime: startTime,
                  endTime: endTime,
                  gameId: route?.params?.item?._id,
                  bookings: venue?.bookings,
                })
              }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                backgroundColor: '#28c752',
                paddingVertical: 6,
                paddingHorizontal: 10,
                justifyContent: 'center',
                marginTop: 10,
                borderRadius: 7,
              }}>
              <Entypo name="location" size={24} color="white" />
              <Text style={{color: 'white'}}>{item?.area}</Text>
            </Pressable>
          </View>

          <View
            style={{
              marginVertical: 20,
              marginHorizontal: 15,
              backgroundColor: 'white',
              padding: 10,
              flexDirection: 'row',
              gap: 10,
            }}>
            <MaterialCommunityIcons
              name="directions-fork"
              size={24}
              color="#adcf17"
            />
            <View>
              <Text style={{fontSize: 15}}>Add Expense</Text>
              <View
                style={{
                  marginTop: 6,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{width: '80%', color: 'gray'}}>
                  Start adding your expenses to split cost among players
                </Text>
                <Entypo name="chevron-small-right" size={24} color="gray" />
              </View>
            </View>
          </View>

          <View style={{marginHorizontal: 15}}>
            <Image
              style={{
                width: '100%',
                height: 220,
                borderRadius: 20,
                resizeMode: 'contain',
              }}
              source={{
                uri: 'https://playo.gumlet.io/OFFERS/PlayplusSpecialBadmintonOfferlzw64ucover1614258751575.png',
              }}
            />
          </View>

          <View
            style={{
              marginVertical: 20,
              marginHorizontal: 15,
              backgroundColor: 'white',
              padding: 12,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, fontWeight: '600'}}>
                Players ({item?.players?.length})
              </Text>
              <Ionicons name="earth" size={24} color="gray" />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text style={{fontSize: 15, fontWeight: '500'}}>
                ❤️ You are not covered 🙂
              </Text>
              <Text style={{fontWeight: '500'}}>Learn More</Text>
            </View>

            <View style={{marginVertical: 12, flexDirection: 'row', gap: 10}}>
              <Image
                style={{width: 60, height: 60, borderRadius: 30}}
                source={{uri: item?.adminUrl}}
              />
              <View>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Text>{item?.adminName}</Text>
                  <View
                    style={{
                      backgroundColor: '#E0E0E0',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 8,
                    }}>
                    <Text>HOST</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderColor: 'orange',
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginTop: 10,
                  }}>
                  <Text style={{alignSelf: 'center'}}>INTERMEDIATE</Text>
                </View>
              </View>
            </View>
          </View>

          {route?.params?.item?.isUserAdmin == false ? (
            <View
              style={{
                backgroundColor: 'white',
              }}>
              <Pressable
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 14,
                  paddingHorizontal: 15,
                }}>
                <View
                  style={{
                    width: 60,

                    height: 60,
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{width: 30, height: 30, resizeMode: 'contain'}}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/343/343303.png',
                    }}
                  />
                </View>
                <Text style={{fontSize: 15, fontWeight: '500', flex: 1}}>
                  Add Co-Host
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="black"
                />
              </Pressable>

              <View
                style={{
                  height: 1,
                  borderWidth: 0.5,
                  borderColor: '#E0E0E0',
                  marginVertical: 12,
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  paddingHorizontal: 10,
                }}>
                <Pressable>
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      borderColor: '#E0E0E0',
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 30, height: 30, resizeMode: 'contain'}}
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/1474/1474545.png',
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      marginTop: 8,
                      fontWeight: '500',
                      textAlign: 'center',
                    }}>
                    Add
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() =>
                    navigation.navigate('Manage', {
                      requests,
                      userId,
                      gameId: item?._id,
                    })
                  }>
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      borderColor: '#E0E0E0',
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 50,
                    }}>
                    <Image
                      style={{width: 30, height: 30, resizeMode: 'contain'}}
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/7928/7928637.png',
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      marginTop: 8,
                      fontWeight: '500',
                      textAlign: 'center',
                      marginLeft: 50,
                    }}>
                    Manage ({requests?.length || 2})
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() =>
                    navigation.navigate('Player', {players: item?.players})
                  }>
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      borderColor: '#E0E0E0',
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 50,
                    }}>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={24}
                      color="black"
                    />
                  </View>
                  <Text
                    style={{
                      marginTop: 8,
                      fontWeight: '500',
                      textAlign: 'center',
                      marginLeft: 50,
                    }}>
                    All Players
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  height: 1,
                  borderWidth: 0.5,
                  borderColor: '#E0E0E0',
                  marginVertical: 12,
                }}
              />
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{width: 30, height: 30, resizeMode: 'contain'}}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/1511/1511847.png',
                    }}
                  />
                </View>

                <View>
                  <Text>Not on Playo? Invite</Text>
                  <Text style={{marginTop: 6, color: 'gray', width: '80%'}}>
                    Earn 100 Karma points by referring your friend
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <Pressable
              onPress={() =>
                navigation.navigate('Player', {players: item?.players})
              }
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderTopColor: '#E0E0E0',
                borderTopWidth: 1,
                borderBottomColor: '#E0E0E0',
                borderBottomWidth: 1,
                marginBottom: 20,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  padding: 10,
                  borderColor: '#E0E0E0',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 12,
                }}>
                <MaterialCommunityIcons
                  style={{textAlign: 'center'}}
                  name="chevron-right"
                  size={24}
                  color="black"
                />
              </View>

              <Text style={{marginBottom: 12, fontWeight: '600'}}>
                All Players
              </Text>
            </Pressable>
          )}

          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
              borderRadius: 6,
              marginTop: 15,
            }}>
            <View>
              <Text style={{fontSize: 18, fontWeight: '600'}}>Queries (0)</Text>

              <View style={{marginVertical: 12}}>
                <Text
                  style={{color: 'gray', fontSize: 15, textAlign: 'center'}}>
                  There are no queries yet! Queries sent by players will be
                  shown here
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {route?.params?.item?.isUserAdmin == false ? (
        <Pressable
          style={{
            backgroundColor: '#07bc0c',
            marginTop: 'auto',
            marginBottom: 0,
            padding: 15,
            marginHorizontal: 10,
            borderRadius: 4,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 15,
              fontWeight: '500',
            }}>
            GAME CHAT
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => sendJoinRequest(route?.params?.item?._id)}
          style={{
            backgroundColor: '#07bc0c',
            marginTop: 'auto',
            marginBottom: 0,
            padding: 15,
            marginHorizontal: 10,
            borderRadius: 4,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 15,
              fontWeight: '500',
            }}>
            JOIN GAME
          </Text>
        </Pressable>
      )}
    </>
  );
};

export default GameSetupScreen;
