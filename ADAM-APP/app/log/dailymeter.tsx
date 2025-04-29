import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type RouteParams = {
  params: {
    selectedDay: string;
  };
};

const DailyMeterScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const navigation = useNavigation();
  const { selectedDay } = route.params;

  const days = [
    { day: 'Mon', value: 80 },
    { day: 'Tue', value: 140 },
    { day: 'Wed', value: 30 },
    { day: 'Thu', value: 90 },
    { day: 'Fri', value: 110 },
    { day: 'Sat', value: 60 },
    { day: 'Sun', value: 60 },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F5FCFF', padding: 20 }}>
      
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Daily Meter</Text>
      </View>

      {/* Bar Graph */}
      <View style={{ backgroundColor: '#E8F7FA', borderRadius: 20, padding: 20, marginBottom: 20 }}>
        <View style={{ height: 200, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around' }}>
          {days.map((item, index) => (
            <View key={index} style={{ alignItems: 'center' }}>
              <View style={{
                height: item.value,
                width: 20,
                backgroundColor: item.day === selectedDay ? '#007f5f' : '#64C7CC', // Selected = dark green
                borderRadius: 5
              }} />
              <Text style={{ marginTop: 5 }}>{item.day}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Daily Stats Boxes */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
        <View style={{ alignItems: 'center', backgroundColor: '#E0F7F9', padding: 15, borderRadius: 10, width: 90 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>90</Text>
          <Text>km/h</Text>
          <Text style={{ fontSize: 10, color: 'gray' }}>Top Speed</Text>
        </View>
        <View style={{ alignItems: 'center', backgroundColor: '#E0F7F9', padding: 15, borderRadius: 10, width: 90 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>57</Text>
          <Text>km</Text>
          <Text style={{ fontSize: 10, color: 'gray' }}>Max Trip</Text>
        </View>
        <View style={{ alignItems: 'center', backgroundColor: '#E0F7F9', padding: 15, borderRadius: 10, width: 90 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>5</Text>
          <Text>Ltr</Text>
          <Text style={{ fontSize: 10, color: 'gray' }}>Fuel Consumed</Text>
        </View>
      </View>

      {/* Max Trip Info Box */}
      <View style={{ backgroundColor: '#C7F2F7', borderRadius: 20, padding: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Max Trip</Text>
        <Text>From: Start</Text>
        <Text>To: Destination 1</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>12</Text>
            <Text>km/ltr</Text>
            <Text style={{ fontSize: 10, color: 'gray' }}>Mileage</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>15</Text>
            <Text>km/ltr</Text>
            <Text style={{ fontSize: 10, color: 'gray' }}>Expected</Text>
          </View>
        </View>
      </View>

    </ScrollView>
  );
};

export default DailyMeterScreen;
