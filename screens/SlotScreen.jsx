import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import Calender from '../components/Calender';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SlotScreen = () => {
  const today = moment().format('YYYY-MM-DD');
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedSport, setSelectedSport] = useState(
    route.params.sports[0].name,
  );
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState([]);
  const [checkedTimes, setCheckedTimes] = useState([]);
  const [times, setTimes] = useState([]);

  const [duration, setDuration] = useState(60);

  const generateTimes = () => {
    const start = moment(selectedDate).startOf('day').add(6, 'hours'); // start at 6:00 am
    const end = moment(selectedDate).endOf('day');
    const interval = 60; // interval in minutes

    const result = [];
    let current = moment(start);
    while (current <= end) {
      result.push(current.format('h:mma'));
      current.add(interval, 'minutes');
    }
    setTimes(result);
  };

  useEffect(() => {
    generateTimes();
  }, [selectedDate]);

  useEffect(() => {
    const checkTime = () => {
      const currentDateTime = moment(); // Current date and time
      const selectedDateStart = moment(selectedDate).startOf('day'); // Start of the selected date

      const timess = times?.map(item => {
        // Combine the selected date with the current time slot to create a full date-time
        const dateTime = moment(selectedDateStart).set({
          hour: moment(item, 'h:mma').get('hour'),
          minute: moment(item, 'h:mma').get('minute'),
        });

        // Determine if the time slot is in the past or future
        const status = currentDateTime.isBefore(dateTime);
        return {time: item, status: status};
      });

      setCheckedTimes(timess);
    };

    checkTime();
  }, [selectedDate, times]);

  console.log('times', checkedTimes);

  const isSlotBooked = time => {};

  const calculateEndTime = (startTime, duration) => {
    // Check if startTime is defined and is a string
    if (typeof startTime !== 'string') {
      console.error('Invalid startTime:', startTime);
      return;
    }
    const match = startTime.match(/(\d+:\d+)([APMapm]+)/);
    if (!match) {
      console.error('Invalid startTime format:', startTime);
      return;
    }

    const time = match[1]; // The time part (e.g., '6:00')
    const modifier = match[2].toUpperCase(); // The AM/PM part (e.g., 'PM')

    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    // Add duration to the time
    const totalMinutes = hours * 60 + minutes + duration;
    let endHours = Math.floor(totalMinutes / 60);
    let endMinutes = totalMinutes % 60;

    let endModifier = endHours >= 12 ? 'PM' : 'AM';
    if (endHours >= 24) {
      endHours -= 24;
      endModifier = 'AM';
    }
    if (endHours >= 12) {
      endModifier = 'PM';
      if (endHours > 12) endHours -= 12;
    }
    if (endHours === 0) {
      endHours = 12;
      endModifier = 'AM';
    }

    const formattedEndHours = endHours.toString().padStart(2, '0');
    const formattedEndMinutes = endMinutes.toString().padStart(2, '0');
  };

  const price = route?.params?.sports
    .filter(item => item?.name == selectedSport)
    .map(item => item.price);
  const courts = route?.params?.sports.filter(
    item => item.name == selectedSport,
  );
  console.log(courts);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back-outline"
              size={25}
              color="black"
            />
            <Text style={{fontSize: 15, fontWeight: '500'}}>
              {route.params.place}
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{marginLeft: 'auto'}}
            showsHorizontalScrollIndicator={false}
            horizontal>
            {route.params.sports.map((item, index) => {
              // if (item.name === selectedSport) {
              //  showCalender
              // }
              return (
                <View key={index}>
                  {selectedSport.includes(item.name) ? (
                    <Pressable
                      style={{
                        borderColor: 'green',
                        margin: 10,
                        padding: 20,
                        width: 80,
                        height: 90,
                        borderWidth: 3,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons
                        style={{textAlign: 'center'}}
                        name={item.icon}
                        size={24}
                        color="gray"
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          width: 80,
                          textTransform: 'uppercase',
                          textAlign: 'center',
                          marginTop: 10,
                        }}>
                        {item.name}
                      </Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => {
                        setSelectedSport(item?.name);
                        setSelectedCourt([]);
                      }}
                      style={{
                        borderColor: '#686868',
                        margin: 10,
                        padding: 20,
                        width: 80,
                        height: 90,
                        borderWidth: 1,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons
                        style={{textAlign: 'center'}}
                        name={item.icon}
                        size={24}
                        color="gray"
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          width: 80,
                          textTransform: 'uppercase',
                          textAlign: 'center',
                          marginTop: 10,
                        }}>
                        {item.name}
                      </Text>
                    </Pressable>
                  )}
                </View>
              );
            })}
          </ScrollView>
          {selectedSport && (
            <ScrollView>
              <Calender
                selectedSport={selectedSport}
                onSelectDate={setSelectedDate}
                setSelectedTime={setSelectedTime}
                selected={selectedDate}
              />
            </ScrollView>
          )}
          <Pressable style={{alignItems: 'center', justifyContent: 'center'}}>
            <Pressable
              style={{
                borderRadius: 12,
                borderWidth: 1,
                paddingVertical: 8,
                width: 150,
              }}>
              <Text
                style={{fontSize: 13, fontWeight: '700', textAlign: 'center'}}>
                TIME
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  textAlign: 'center',
                  marginTop: 8,
                }}>
                {route?.params?.startTime
                  ? route?.params?.startTime
                  : selectedTime.length > 0
                  ? selectedTime
                  : 'Choose Time'}
              </Text>
            </Pressable>
          </Pressable>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '700',
              marginTop: 15,
            }}>
            Duration
          </Text>
          <Pressable
            style={{
              gap: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Pressable
              onPress={() => setDuration(Math.max(60, duration - 60))}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: 'gray',
                borderWidth: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{textAlign: 'center', fontSize: 15, fontWeight: '600'}}>
                -
              </Text>
            </Pressable>
            <Text
              style={{textAlign: 'center', fontSize: 16, fontWeight: '500'}}>
              {duration} min
            </Text>
            <Pressable
              onPress={() => setDuration(duration + 60)}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: 'gray',
                borderWidth: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{textAlign: 'center', fontSize: 15, fontWeight: '600'}}>
                +
              </Text>
            </Pressable>
          </Pressable>
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 10,
              fontSize: 18,
              fontWeight: '700',
            }}>
            Select Slot
          </Text>
          {selectedTime && (
            <ScrollView
              horizontal
              contentContainerStyle={{marginHorizontal: 10}}
              showsHorizontalScrollIndicator={false}>
              {checkedTimes?.map(item => {
                const disabled = isSlotBooked(item?.time);

                return (
                  <View key={item.time}>
                    {selectedTime?.includes(item?.time) ? (
                      <Pressable
                        disabled={item.status === false || disabled}
                        onPress={() => {
                          console.log('holaa', item?.time);
                          setSelectedTime(item?.time);
                        }}
                        style={{
                          margin: 10,
                          borderColor: '#1CAC78',
                          backgroundColor: '#29AB87',
                          borderRadius: 5,
                          borderWidth: 1,
                          padding: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: 'white',
                          }}>
                          {item?.time}
                        </Text>
                      </Pressable>
                    ) : (
                      <Pressable
                        style={{
                          margin: 10,
                          borderColor:
                            item.status === false || disabled
                              ? 'gray'
                              : '#1CAC78',
                          borderRadius: 5,
                          borderWidth: 1,
                          padding: 10,
                        }}>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                          {item?.time}
                        </Text>
                      </Pressable>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          )}

          <View style={{marginHorizontal: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent:"center",
                flexWrap: 'wrap',
              }}>
              {courts.map(item =>
                item.courts.map(court =>
                  selectedCourt.includes(court.name) ? (
                    <Pressable
                    key={`${item.name}-${court.name}`}
                      onPress={() => setSelectedCourt(court.name)}
                      style={{
                        backgroundColor: '#00A86B',
                        borderRadius: 6,
                        padding: 15,

                        width: 180,
                        margin: 10,
                      }}>
                      <Text style={{textAlign: 'center', color: 'white'}}>
                        {court.name}
                      </Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => setSelectedCourt(court.name)}
                      style={{
                        borderColor: '#00A86B',
                        borderRadius: 6,
                        padding: 15,
                        borderWidth: 1,
                        width: 180,
                        margin: 10,
                      }}>
                      <Text style={{textAlign: 'center', color: '#00A86B'}}>
                        {court.name}
                      </Text>
                    </Pressable>
                  ),
                ),
              )}
            </View>
          </View>
          {selectedCourt.length > 0 && (
            <Text
              style={{
                textAlign: 'center',
                marginTop: 10,
                marginBottom: 20,
                fontSize: 15,
                fontWeight: '500',
              }}>
              Court Price : Rs {price}
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>

      <Pressable
        onPress={() =>
          navigation.navigate('Payment', {
            selectedCourt: selectedCourt,
            selectedSport: selectedSport,
            price: price,
            selectedTime: route?.params?.startTime,
            selectedDate: selectedDate,
            place: route.params.place,
            gameId: route?.params?.gameId,
          })
        }
        style={{
          backgroundColor: '#32CD32',
          padding: 15,
          marginBottom: 0,
          borderRadius: 23,
          marginHorizontal: 15,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Next
        </Text>
      </Pressable>
    </>
  );
};

export default SlotScreen;

const styles = StyleSheet.create({});
