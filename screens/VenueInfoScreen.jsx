import {
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import React from 'react';
import Amenities from '../components/Amenities';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const VenueInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    name = '',
    timings = '',
    image = '',
    location = '',
    rating = 0,
    sportsAvailable = [],
    bookings = [],
  } = route.params || {};

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <Image
            style={styles.image}
            source={{uri: image}
            }
          />
          <View style={styles.infoContainer}>
            <Text style={styles.venueName}>{name}</Text>

            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={24} color="black" />
              <Text style={styles.infoText}>{timings}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={24} color="green" />
              <Text style={styles.locationText}>{location}</Text>
            </View>
          </View>

          <View style={styles.ratingContainer}>
            <View>
              <View style={styles.starRow}>
                {[...Array(5)].map((_, i) => (
                  <FontAwesome
                    key={i}
                    style={styles.starIcon}
                    name={i < Math.floor(rating) ? 'star' : 'star-o'}
                    size={15}
                    color="#FFD700"
                  />
                ))}
                <Text>{rating} (9 ratings)</Text>
              </View>
              <Pressable
                style={styles.button}
                accessibilityLabel="Rate this venue">
                <Text>Rate Venue</Text>
              </Pressable>
            </View>

            <View>
              <Text style={styles.activityInfo}>100 total Activities</Text>
              <Pressable
                style={styles.button}
                accessibilityLabel="View upcoming activities">
                <Text>1 Upcoming</Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Sports Available</Text>
          <ScrollView 
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={styles.sportsScroll}>
            {Array.isArray(sportsAvailable) && sportsAvailable.map((item, index) => (
              <View key={index} style={styles.sportCard}>
                <MaterialCommunityIcons
                  style={styles.sportIcon}
                  name={item.icon}
                  size={24}
                  color="gray"
                />
                <Text style={styles.sportName}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>

          <Amenities />

          <View style={styles.activitiesContainer}>
            <Text style={styles.activitiesTitle}>Activities</Text>
            <Pressable
              onPress={() => navigation.navigate('Create', {area: name})}
              style={styles.createActivityBtn}
              accessibilityLabel="Create a new activity">
              <AntDesign name="plus" size={24} color="black" />
              <Text>Create Activity</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Pressable 
        onPress={() =>
          navigation.navigate('Slot', {
            place: name,
            sports: sportsAvailable,
            bookings: bookings,
          })
        }
        style={styles.bookNowBtn}
        accessibilityLabel="Book a slot now">
        <Text style={styles.bookNowText}>Book Now</Text>
      </Pressable>
    </>
  );
};

export default VenueInfoScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
  },
  venueName: {
    fontSize: 20,
    fontWeight: '600',
  },
  infoRow: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoText: {
    fontSize: 15,
    fontWeight: '500',
  },
  locationText: {
    fontSize: 14,
    width: '80%',
    fontWeight: '500',
  },
  ratingContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    paddingHorizontal: 3,
  },
  button: {
    marginTop: 6,
    width: 160,
    borderColor: '#686868',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  activityInfo: {
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    marginHorizontal: 10,
    fontWeight: '500',
  },
  sportsScroll: {
    paddingHorizontal: 10,
  },
  sportCard: {
    borderColor: '#686868',
    margin: 10,
    padding: 20,
    width: 130,
    height: 90,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sportIcon: {
    textAlign: 'center',
  },
  sportName: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  activitiesContainer: {
    marginHorizontal: 10,
  },
  activitiesTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  createActivityBtn: {
    borderColor: '#787878',
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bookNowBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 0,
  },
  bookNowText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
