import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const cardData = [
  {
    title: 'Engine Health Monitoring',
    icon: <MaterialCommunityIcons name="engine" size={30} color="#003f5c" />,
    bgColor: '#D8ECFE',
    iconBg: '#72B8F4',
    textColor: '#003f5c',
  },
  {
    title: 'Emission Compliance',
    icon: <MaterialCommunityIcons name="car-electric" size={30} color="#006D77" />,
    bgColor: '#C5F5F9',
    iconBg: '#71DDEB',
    textColor: '#006D77',
  },
  {
    title: 'Driving Behavior Analysis',
    icon: <Ionicons name="car-sport" size={30} color="#8B2E2E" />,
    bgColor: '#FFD8C5',
    iconBg: '#FF9C75',
    textColor: '#8B2E2E',
  },
  {
    title: 'Predictive Maintenance',
    icon: <MaterialIcons name="build-circle" size={30} color="#5A5A00" />,
    bgColor: '#FFF5C5',
    iconBg: '#E1D55A',
    textColor: '#5A5A00',
  },
];

export default function AnalysisScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#EAF8FF', padding: 20, paddingTop: 70 }}>
      
      {/* Feature Cards */}
      {cardData.map((item, index) => (
        <View key={index} style={{
          flexDirection: 'row',
          backgroundColor: item.bgColor,
          borderRadius: 20,
          marginBottom: 25,
          padding: 20,
          height: 140,
          alignItems: 'flex-start',
        }}>
          {/* Icon Circle */}
          <View style={{
            backgroundColor: item.iconBg,
            borderRadius: 999,
            padding: 10,
            marginRight: 15,
            marginTop: 4,
          }}>
            {item.icon}
          </View>

          {/* Text + Analyze Button */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: item.textColor, marginBottom: 10 }}>
              {item.title}
            </Text>
            <View style={{ height: 10, backgroundColor: '#eee', borderRadius: 5, marginBottom: 5 }} />
            <View style={{ height: 8, backgroundColor: '#ddd', borderRadius: 5, marginBottom: 10, width: '60%' }} />

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 15 }}>
              <Text style={{ fontWeight: 'bold', color: item.textColor,fontSize: 16, marginRight: 5}}>Analyze</Text>
              <Ionicons name="search" size={20} color={item.textColor} />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
