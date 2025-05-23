import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../AuthContext';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {setToken, setUserId} = useContext(AuthContext);

  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem('token');

      setToken('');

      setUserId('');
      navigation.replace('Start');
    } catch (error) {
      console.log('Eror', error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 12}}>
          <View
            style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#E0E0E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name="calendar" size={24} color={'green'} />
              </View>

              <View style={{}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  My Bookings
                </Text>
                <Text style={{marginTop: 7, color: 'gray'}}>
                  View Transactions & Receipts
                </Text>
              </View>
            </View>

            <View
              style={{
                height: 1,
                borderColor: '#E0E0E0',
                borderWidth: 0.5,
                marginTop: 15,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginVertical: 15,
              }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#E0E0E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons name="people-outline" size={24} color={'green'} />
              </View>

              <View style={{}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>Playpals</Text>
                <Text style={{marginTop: 7, color: 'gray'}}>
                  View & Manage Players
                </Text>
              </View>
            </View>

            <View
              style={{height: 1, borderColor: '#E0E0E0', borderWidth: 0.5}}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 15,
              }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#E0E0E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name="book" size={24} color={'green'} />
              </View>

              <View style={{}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>Passbook</Text>
                <Text style={{marginTop: 7, color: 'gray'}}>
                  Manage Karma,Playo credits, etc
                </Text>
              </View>
            </View>

            <View
              style={{
                height: 1,
                borderColor: '#E0E0E0',
                borderWidth: 0.5,
                marginTop: 15,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 15,
                marginBottom: 10,
              }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#E0E0E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcons
                  name="privacy-tip"
                  size={24}
                  color={'green'}
                />
              </View>

              <View style={{}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Preference and Privacy
                </Text>
                <Text style={{marginTop: 7, color: 'gray'}}>
                  View Transactions & Receipts
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{padding: 12}}>
          <View
            style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#E0E0E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name="calendar" size={24} color={'green'} />
              </View>

              <View style={{}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>Offers</Text>
              </View>
            </View>

            <View
              style={{
                height: 1,
                borderColor: '#E0E0E0',
                borderWidth: 0.5,
                marginTop: 15,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginVertical: 15,
              }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#E0E0E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons name="people-outline" size={24} color={'green'} />
              </View>

              <View style={{}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>Blogs</Text>
              </View>
            </View>

            <View
              style={{height: 1, borderColor: '#E0E0E0', borderWidth: 0.5}}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 10,
              }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#E0E0E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name="book" size={24} color={'green'} />
              </View>

              <View style={{}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Invite & Earn
                </Text>
              </View>
            </View>

            <View
              style={{
                height: 1,
                borderColor: '#E0E0E0',
                borderWidth: 0.5,
                marginTop: 15,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 15,
                marginBottom: 10,
              }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#E0E0E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcons
                  name="help"
                  size={24}
                  color={'green'}
                />
              </View>

              <View style={{}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Help & Support
                </Text>
              </View>
            </View>

            <View
              style={{height: 1, borderColor: '#E0E0E0', borderWidth: 0.5}}
            />

            <Pressable
              onPress={clearAuthToken}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 15,
                marginBottom: 10,
              }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#E0E0E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name="logout" size={24} color={'green'} />
              </View>

              <View style={{}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>Logout</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
