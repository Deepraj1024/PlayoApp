import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import axios from 'axios';
import {AuthContext} from '../AuthContext';
import {getRegistrationProgress} from '../registrationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const PreFinalScreen = () => {
  const {token, setToken} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (token) {
      navigation.replace('MainStack', {screen: 'Main'});
    }
  }, [token]);

  useEffect(() => {
    getAllUserData();
  }, []);

  const getAllUserData = async () => {
    try {
      const screens = ['Register', 'Password', 'Name', 'Image'];
      let combinedData = {};

      for (const screenName of screens) {
        const screenData = await getRegistrationProgress(screenName);
        if (screenData) {
          combinedData = {...combinedData, ...screenData};
        }
      }

      setUserData(combinedData);
    } catch (error) {
      console.log('Error fetching user data', error);
    }
  };

  const clearAllScreenData = async () => {
    try {
      const screens = ['Register', 'Password', 'Name', 'Image'];
      for (const screenName of screens) {
        const key = `registration_progress_${screenName}`;
        await AsyncStorage.removeItem(key);
      }
      console.log('All screen data cleared!');
    } catch (error) {
      console.log('Error clearing screen data', error);
    }
  };

  const registerUser = async () => {
    if (!userData?.email || !userData?.password) {
      Alert.alert('Missing Data', 'Please complete all registration steps.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'http://192.168.0.127:8000/register',
        userData,
      );
      console.log(response," <<<res");
      
      const receivedToken = response.data.token;

      await AsyncStorage.setItem('token', receivedToken);
      setToken(receivedToken);
      await clearAllScreenData();
    } catch (error) {
      console.log('Registration error:', error.response?.data || error.message);
      Alert.alert('Registration Failed', 'Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 80}}>
        <Text style={styles.title}>All set to register</Text>
        <Text style={styles.title}>Setting up your profile for you</Text>
      </View>

      <Pressable
        onPress={registerUser}
        style={styles.button}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Finish Registering</Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

export default PreFinalScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'GeezaPro-Bold',
    marginLeft: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#03C03C',
    padding: 15,
    marginTop: 'auto',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
});
