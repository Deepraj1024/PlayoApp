import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import { saveRegistrationProgress } from '../registrationUtils';

const PasswordScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const handleNext = () => {
    if (password.trim() === '') {
      Alert.alert('Error', 'Password cannot be empty');
      return;
    }
  
  saveRegistrationProgress('Password', { password });
    navigation.navigate("Name");
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 90, marginHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 2,
              borderColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="lock1" size={26} color="green" />
          </View>

          <Image
            style={{width: 100, height: 40, marginLeft: 10}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>

        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginTop: 15,
          }}>
          Please choose a password
        </Text>

        <TextInput
          autoFocus={true}
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Enter your password"
          placeholderTextColor={'#BEBEBE'}
          style={{
            width: 340,
            marginVertical: 10,
            marginTop: 25,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
            fontFamily: 'GeezaPro-Bold',
            fontSize: password ? 22 : 22,
          }}
        />

        <Text style={{color: 'gray', fontSize: 15, marginTop: 7}}>
          Note: Your details will be safe with us
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleNext}
        activeOpacity={0.8}
        style={{marginTop: 30, marginLeft: 'auto'}}>
        <MaterialCommunityIcons
          style={{alignSelf: 'center', marginTop: 20}}
          name="arrow-right-circle"
          size={45}
          color="green"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({});
