import React from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity,  ScrollView, StatusBar } from 'react-native';
import icon from "@/assets/images/prof.png";
import temp from "@/assets/images/temp.png";
import temp1 from "@/assets/images/temp1.png";
import car from "@/assets/images/carlog.png";
import location from "@/assets/images/loc.png";
import speed from "@/assets/images/speed.png";
import rpm from "@/assets/images/rpm.png";
import rpm2 from "@/assets/images/rpm2.png";
import curv from "@/assets/images/curv.png";
import speed2 from "@/assets/images/speed2.png";
import route from "@/assets/images/route.png";
import carimg from '@/assets/images/estilo.png';
import { useAuth } from '@/providers/AuthProvider';
import { Link, router, useRouter } from 'expo-router';



export default function Home() {
  const {user} = useAuth();
  let currentDate = new Date();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f4f8', paddingTop:22 }}>
      <ScrollView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      
      
      {/* Profile Header */}
      <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
              source={require('../../assets/images/profile.jpeg')} 
              style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }}
          />
          <View >
          <Text style={{color: '#105e62',fontSize: 16, fontWeight: 'bold' }}>Hello, {user?.name}</Text>
                <Text className="text-sm text-gray-600">
                {currentDate.toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
                </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/545/545705.png' }}
            style={{ width: 24, height: 24, tintColor: '#777' }}
          />
        </TouchableOpacity>
      </View>
      
      {/* Car Image */}
      <View style={{ paddingHorizontal: 10, marginTop: -10 }}>
        <Image 
          source={{ uri: 'https://th.bing.com/th/id/R.e02339a312d4fa88081615dd587b87ee?rik=Nvb6s7Qnqw99BA&riu=http%3a%2f%2fi.ndtvimg.com%2fauto%2fmakers%2f29%2f198%2fmaruti-estilo.jpg&ehk=idaG%2brreG8tFC9vC6f%2fFB%2bkO7y%2fZwjcLJdW%2bnyFgsI8%3d&risl=&pid=ImgRaw&r=0' }}
          style={{width: '100%', height: 200, borderRadius: 26,  elevation: 10 }}
        />
      </View>
      
      {/* Metrics */}
      <View style={{ flexDirection: 'row', marginTop: 16, paddingHorizontal: 16 }}>
        {/* RPM Metric */}
        
        <View style={{ 
          flex: 1, 
          backgroundColor: '#ffab76', 
          padding: 16, 
          borderRadius: 12,
          marginRight: 8 
        }}>

          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={rpm}
              style={{ width: 36, height: 29, marginRight: 8, tintColor: '#fff' }}
            />
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>RPM</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 8 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>1173.5</Text>
            <Text style={{ fontSize: 12, color: '#555', marginLeft: 4, zIndex:3 }}>rpm</Text>
          </View>
        <Image
              source={rpm2}
              style={{
                width: 111,
                height: 90,
                position: "absolute", // Makes it a background element
                right: -20, // Aligns to the right
                bottom: -10, // Moves to bottom
                tintColor: "#fff", // Light color effect
                opacity: 0.5, // Faded effect
                zIndex: 1,
              }}
            />
        </View>
        
        {/* Speed Metric */}
        <View style={{ 
          flex: 1, 
          backgroundColor: '#93c6e7', 
          padding: 16, 
          borderRadius: 12,
          marginLeft: 8 
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={speed}
              style={{ width: 36, height: 29, marginRight: 8, tintColor: '#fff' }}
            />
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Speed</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 8 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>26</Text>
            <Text style={{ fontSize: 12, color: '#555', marginLeft: 4, zIndex:3 }}>km/h</Text>
            <Image
              source={speed2}
              style={{
                width: 90,
                height: 90,
                position: "absolute", // Makes it a background element
                right: -20, // Aligns to the right
                bottom: -28, // Moves to bottom
                tintColor: "#fff", // Light color effect
                opacity: 0.5, // Faded effect
                zIndex: 1
              }}
            />
          </View>
        </View>
      </View>
      
      {/* Features Label */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#105e62', marginTop: 4, marginBottom: 16, paddingHorizontal: 16 }}>
        Features
      </Text>
      
      {/* Features Grid */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, marginTop: -10}}>
        {/* Car Log */}
        <TouchableOpacity style={{ 
          width: '50%', 
          paddingHorizontal: 4, 
          marginBottom: 8 
        }}>
          <View style={{ 
            backgroundColor: '#e9e58f', 
            borderRadius: 12, 
            padding: 16,
            height: 140,
            justifyContent: 'space-between'
          }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333', zIndex:2 }}>Car Log</Text>
            <Image
              source={car}
              style={{ width: 41, height: 47, alignSelf: 'flex-end' }}
            />
            <Image
              source={curv}
              style={{
                width: 140,
                height: 150,
                position: "absolute", // Makes it a background element
                left:-7, // Aligns to the right
                top: -5, // Moves to bottom
                tintColor: "#fff", // Light color effect
                opacity: 0.3, // Faded effect
                zIndex: 0,
              }}
            />
          </View>
        </TouchableOpacity>
        
        {/* Temperatures */}
        <TouchableOpacity style={{ 
          width: '50%', 
          paddingHorizontal: 4, 
          marginBottom: 8 
        }}>
          <View style={{ 
            backgroundColor: '#ffab76', 
            borderRadius: 12, 
            padding: 16,
            height: 140,
            justifyContent: 'space-between'
          }}>
             <Image
              source={temp1}
              style={{
                width: 140,
                height: 150,
                position: "absolute", // Makes it a background element
                right: -20, // Aligns to the right
                top: -30, // Moves to bottom
                tintColor: "#fff", // Light color effect
                opacity: 0.2, // Faded effect
                zIndex: 0,
              }}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>Temperatures</Text>
            <Image
              source={temp}
              style={{ width: 32, height: 58, alignSelf: 'flex-end' }}
            />
          </View>
        </TouchableOpacity>
        
        {/* Car Profile */}
        <TouchableOpacity style={{ 
          width: '50%', 
          paddingHorizontal: 4, 
          marginBottom: 8 
        }}>
          <View style={{ 
            backgroundColor: '#93c6e7', 
            borderRadius: 12, 
            padding: 16,
            height: 140,
            justifyContent: 'space-between'
          }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>Car Profile</Text>
            <Image
              source={icon}
              style={{ width: 60, height: 48, alignSelf: 'flex-end'}}
            />
          </View>
        </TouchableOpacity>
        
        {/* Locations */}
        <TouchableOpacity style={{ 
          width: '50%', 
          paddingHorizontal: 4, 
          marginBottom: 8 
        }} className='ml-auto' onPress={() => router.push('../maps/1')}>
          <View style={{ 
            backgroundColor: '#badc58', 
            borderRadius: 12, 
            padding: 16,
            height: 140,
            justifyContent: 'space-between'
          }}>
            <Image
              source={route}
              style={{
                width: 164,
                height: 150,
                position: "absolute", // Makes it a background element
                left: -4, 
                bottom: -10, // Moves to bottom
                opacity: 0.7, // Faded effect
                zIndex: 1
              }}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333',zIndex:2 }}>Locations</Text>
            <Image
              source={location}
              style={{ width: 70, height: 70, alignSelf: 'flex-end' , backgroundColor: '#fff', borderRadius: 35, zIndex:2}}
            />
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

