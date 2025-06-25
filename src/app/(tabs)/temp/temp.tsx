import { router } from 'expo-router';
import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import cloud from "@/assets/images/cloud.png";
import thermo from "@/assets/images/thermo.png";
import temo from "@/assets/images/temo.png";
import eng from "@/assets/images/eng.png";


export default function TemperatureScreen() {
  const Circle: React.FC<{ color: string; size?: number }> = ({ color, size = 50 }) => (
    <View style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
    }} />
  );

  const BackArrow = () => (
    <View style={{
      width: 12,
      height: 12,
      borderLeftWidth: 3,
      borderBottomWidth: 3,
      borderColor: '#333',
      transform: [{ rotate: '45deg' }],
    }} />
  );


  const ArcMeter = ({ temperature = 38 }) => {
    const radius = 140; // increased from 100
    const strokeWidth = 18;
    const centerX = 160;
    const centerY = 160;
    const width = centerX * 2;
    const height = centerY + strokeWidth;
    const minTemp = 0;
    const maxTemp = 100;
  
    const clampedTemp = Math.max(minTemp, Math.min(maxTemp, temperature));
    const angle = Math.PI * (1 - (clampedTemp - minTemp) / (maxTemp - minTemp));
    const knobX = centerX + radius * Math.cos(angle);
    const knobY = centerY - radius * Math.sin(angle); 
    const startAngle = Math.PI;
    const endAngle = 0;
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);
    const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';
    const arcPath = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  
    return (
      <View style={{ alignItems: 'center', marginVertical: 30 }}>
        <Svg height={height} width={width}>
          <Defs>
            <SvgLinearGradient id="grad" x1="0" y1="1" x2="1" y2="0">
              <Stop offset="0" stopColor="#2EC4F7" />
              <Stop offset="0.5" stopColor="#4285F4" />
              <Stop offset="1" stopColor="#2CD5C4" />
            </SvgLinearGradient>
          </Defs>
          <Path
            d={arcPath}
            stroke="url(#grad)"
            strokeWidth={strokeWidth}
            fill="none"
          />
        </Svg>
  
        {/* Knob (dynamic) */}
        <View style={{
          position: 'absolute',
          top: knobY - 15,
          left: knobX - 15,
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: '#FF5A5F',
          borderWidth: 4,
          borderColor: 'white',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        }} />
      </View>
    );
  };
  

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#EDF8FD',
      padding: 20,
      alignItems: 'center',
    }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 40,
          left: 10,
          zIndex: 10,
        }}
        onPress={() => router.back()}
      >
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#D9F0F7',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <BackArrow />
        </View>
      </TouchableOpacity>

      {/* Title */}
      <Text style={{
        fontSize: 20,
        fontWeight: '600',
        color: '#222',
        alignSelf: 'flex-start',
        marginBottom: 30,
        position: 'relative',
        left: 10,
        top: 54,
      }}>
        Temperature
      </Text>

      {/* Arc Meter */}
      <ArcMeter temperature={38} />

      {/* Main Temp */}
      <Text style={{ fontSize: 40, fontWeight: '700', color: '#222', top: -120 }}>38°C</Text>
      <Text style={{ fontSize: 16, color: '#777', marginBottom: 20, top:-120}}>Heating</Text>

      {/* Inside / Outside Temp Block */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#FFB866',
        borderRadius: 20,
        padding: 20,
        marginVertical: 10,
        width: '100%',
        justifyContent: 'space-between',
        top: -110,
      }}>
        <View style={{ alignItems: 'center' }}>
          <View style={{ position: 'relative' }}>
            <Circle color="#B65D00" />
            <Image source={thermo} style={{ width: 30, height: 30, position: 'absolute', top: 10, left: 10, resizeMode:"contain" }} />
          </View>
          <Text style={{ marginTop: 8, fontSize: 18, fontWeight: '600', color: '#222' }}>18 C</Text>
          <Text style={{ fontSize: 14, color: '#4A2F00' }}>inside</Text>
        </View>
        <View style={{ width: 1, backgroundColor: '#E57300' }} />
        <View style={{ alignItems: 'center' }}>
          <Circle color="#B65D00" />
          <Image source={cloud} style={{ width: 30, height: 30, position: 'absolute', top: 10, left: 10, resizeMode:"contain" }} />
          <Text style={{ marginTop: 8, fontSize: 18, fontWeight: '600', color: '#222' }}>28 C</Text>
          <Text style={{ fontSize: 14, color: '#4A2F00' }}>outside</Text>
        </View>
      </View>

      {/* Coolant / Engine Block */}
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between',top: -110}}>
        <View style={{
          backgroundColor: '#A6DBF9',
          borderRadius: 20,
          padding: 20,
          flex: 1,
          marginRight: 10,
          alignItems: 'center',
        }}>
          <View style={{ position: 'relative' }}>
          <Circle color="#2B5771" />
          <Image source={temo} style={{ width: 30, height: 30, position: 'absolute', top: 10, left: 10, resizeMode:"contain" }} />
          </View>
          <Text style={{
            fontSize: 20,
            fontWeight: '700',
            color: '#111',
            marginTop: 10,
          }}>Coolant</Text>
          <Text style={{ fontSize: 26, fontWeight: '700', color: '#222' }}>90°C</Text>
        </View>

        <View style={{
          backgroundColor: '#90E9F7',
          borderRadius: 20,
          padding: 20,
          flex: 1,
          marginLeft: 10,
          alignItems: 'center',
        }}>
          <View style={{ position: 'relative' }}>
          <Circle color="#006F6C" />
          <Image source={eng} style={{ width: 30, height: 30, position: 'absolute', top: 10, left: 10, resizeMode:"contain" }} />
          </View>
          <Text style={{
            fontSize: 20,
            fontWeight: '700',
            color: '#111',
            marginTop: 10,
          }}>Engine</Text>
          <Text style={{ fontSize: 26, fontWeight: '700', color: '#222' }}>105°C</Text>
        </View>
      </View>

      {/* Info Text */}
      <View style={{
        marginTop: 30,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        top: -110,
      }}>
       
        <Circle color="#84CDE3" size={10} />
        <Text style={{
          fontSize: 13,
          color: '#333',
          marginLeft: 8,
          flex: 1,
        }}>
        
          If car is too hot we recommend you to open the windows to let the hot air out before turning the AC on.
        </Text>
      </View>
    </SafeAreaView>
  );
}
