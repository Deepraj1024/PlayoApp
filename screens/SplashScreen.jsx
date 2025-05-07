import React, {useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main'); // or any screen you want to navigate to
    }, 2000);

    return () => clearTimeout(timer); // cleanup on unmount
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50',
          }}
          accessibilityLabel="Playo Logo"
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#52cc4b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 110,
    height: 60,
    resizeMode: 'contain',
  },
});
