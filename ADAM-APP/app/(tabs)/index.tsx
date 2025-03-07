import React from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import icon from '@/assets/images/prof.png';
import temp from '@/assets/images/temp.png';
import car from '@/assets/images/carlog.png';
import carimg from '@/assets/images/estilo.png';



const CarMonitoringApp = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f4f8', paddingTop:22 }}>
      <StatusBar barStyle="dark-content" />
      
      
      {/* Profile Header */}
      <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2302/2302790.png' }}
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }}
          />
          <View >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#105e62' }}>Hello, Chetan</Text>
            <Text style={{ fontSize: 12, color: '#777' }}>Porvorim, Goa</Text>
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
      <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
        <Image 
          source={{ uri: 'https://th.bing.com/th/id/R.e02339a312d4fa88081615dd587b87ee?rik=Nvb6s7Qnqw99BA&riu=http%3a%2f%2fi.ndtvimg.com%2fauto%2fmakers%2f29%2f198%2fmaruti-estilo.jpg&ehk=idaG%2brreG8tFC9vC6f%2fFB%2bkO7y%2fZwjcLJdW%2bnyFgsI8%3d&risl=&pid=ImgRaw&r=0' }}
          style={{width: '100%', height: 200, borderRadius: 26,  elevation: 10 }}
          resizeMode="contain"
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
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2405/2405523.png' }}
              style={{ width: 24, height: 24, marginRight: 8, tintColor: '#fff' }}
            />
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>RPM</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 8 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>1173.5</Text>
            <Text style={{ fontSize: 12, color: '#555', marginLeft: 4 }}>rpm</Text>
          </View>
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
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2928/2928993.png' }}
              style={{ width: 24, height: 24, marginRight: 8, tintColor: '#fff' }}
            />
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Speed</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 8 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>26</Text>
            <Text style={{ fontSize: 12, color: '#555', marginLeft: 4 }}>km/h</Text>
          </View>
        </View>
      </View>
      
      {/* Features Label */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#105e62', marginTop: 24, marginBottom: 16, paddingHorizontal: 16 }}>
        Features
      </Text>
      
      {/* Features Grid */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12 }}>
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
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>Car Log</Text>
            <Image
              source={car}
              style={{ width: 41, height: 47, alignSelf: 'flex-end' }}
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
        }}>
          <View style={{ 
            backgroundColor: '#badc58', 
            borderRadius: 12, 
            padding: 16,
            height: 140,
            justifyContent: 'space-between'
          }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>Locations</Text>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1180/1180854.png' }}
              style={{ width: 32, height: 32, alignSelf: 'flex-end' }}
            />
          </View>
        </TouchableOpacity>
      </View>
     
    </SafeAreaView>
  );
};

export default CarMonitoringApp;