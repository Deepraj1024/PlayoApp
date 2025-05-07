import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StartScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          uri: 'https://media.istockphoto.com/id/1136317339/photo/sports-equipment-on-floor.jpg?s=612x612&w=0&k=20&c=-aI8u_Se89IC-HJZYH724ei5z-bIcSvRW6qUwyMtRyE=',
        }}
        style={styles.bannerImage}
      />
     

      <View style={styles.textContainer}>
        <Text style={styles.heading}>Find Player in Your Neighbourhood</Text>
        <Text style={styles.subheading}>Just like you did as a Kid!</Text>
      </View>

      <Pressable
        style={styles.loginLinkContainer}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginLinkText}>Already have an account? Login</Text>
      </Pressable>

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50',
          }}
        />
      </View>

      <View style={styles.footer}>
        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={styles.registerButton}
        >
          <Text style={styles.registerButtonText}>READY, SET, GO</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerImage: {
    width: '100%',
    height: 350,
  },
  textContainer: {
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: '500',
    width: '70%',
    textAlign: 'center',
  },
  subheading: {
    marginTop: 20,
    color: 'gray',
    fontSize: 15,
  },
  loginLinkContainer: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginLinkText: {
    color: "skyblue",
    fontSize: 16,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  logo: {
    width: 150,
    height: 80,
    resizeMode: 'contain',
  },
  footer: {
    padding: 10,
    backgroundColor: 'white',
    marginTop: 'auto',
  },
  registerButton: {
    backgroundColor: '#1ec921',
    padding: 12,
    borderRadius: 7,
    marginBottom: 20,
  },
  registerButtonText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    color: 'white',
  },
});
