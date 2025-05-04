import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, Linking } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import darkMapStyle from './mapStyles/darkMapStyle.json';
const polyline = require('@mapbox/polyline') as any;

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.3;

const CATEGORIES = [
  { id: 'gas_station', name: 'Gas Station' },
  { id: 'car_repair', name: 'Service Centre' },
  { id: 'car_wash', name: 'Washing Centre' },
];

const MAP_TYPES = [
  { label: 'Default', type: 'standard' },
  { label: 'Dark', type: 'dark' },
  { label: 'Satellite', type: 'hybrid' },
  { label: 'Terrain', type: 'terrain' },
];

const GOOGLE_API_KEY = 'AIzaSyB6Jrfjx3DX5SkrGKkP_tqn6jpsSwErY0U';

export default function Maps() {
  const mapRef = useRef<MapView | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('gas_station');
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'terrain' | 'hybrid'>('standard');
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [routeCoords, setRouteCoords] = useState<{ latitude: number; longitude: number }[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      mapRef.current?.animateToRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 1000);
    })();
  }, []);

  useEffect(() => {
    if (location) fetchNearbyPlaces(selectedCategory);
  }, [selectedCategory, location]);

  const fetchNearbyPlaces = async (type: string) => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location?.latitude},${location?.longitude}&radius=5000&type=${type}&key=${GOOGLE_API_KEY}`
      );
      setPlaces(res.data.results);
      setRouteCoords([]);
      setSelectedPlace(null);
    } catch (err) {
      console.error('Failed to fetch places', err);
    }
  };

  const getDirections = async (destLat: number, destLng: number, place: any) => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${location?.latitude},${location?.longitude}&destination=${destLat},${destLng}&key=${GOOGLE_API_KEY}`
      );
      const points = polyline.decode(res.data.routes[0].overview_polyline.points);
      const coords = points.map(([lat, lng]: [number, number]) => ({
        latitude: lat,
        longitude: lng,
      }));
      setRouteCoords(coords);
      setSelectedPlace(place);
    } catch (err) {
      console.error('Failed to get directions', err);
    }
  };

  const openInGoogleMaps = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${location?.latitude},${location?.longitude}&destination=${lat},${lng}&travelmode=driving`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        showsUserLocation
        showsMyLocationButton
        mapType={mapType === 'dark' ? 'standard' : mapType}
        customMapStyle={mapType === 'dark' ? darkMapStyle : []}
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            title={place.name}
            description={place.vicinity}
            onPress={() => getDirections(place.geometry.location.lat, place.geometry.location.lng, place)}
          />
        ))}
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="#007AFF" />
        )}
      </MapView>

      {/* Category Selector */}
      <View style={styles.carouselContainer}>
        <FlatList
          data={CATEGORIES}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.categoryButton, selectedCategory === item.id && styles.activeButton]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Text style={[styles.buttonText, selectedCategory === item.id && styles.activeText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Selected Place Info Card */}
      {selectedPlace && (
        <View style={styles.bottomInfoCard}>
          <Text style={styles.placeName}>{selectedPlace.name}</Text>
          <Text style={styles.placeVicinity}>{selectedPlace.vicinity}</Text>
          <TouchableOpacity
            style={styles.directionsButton}
            onPress={() =>
              openInGoogleMaps(
                selectedPlace.geometry.location.lat,
                selectedPlace.geometry.location.lng
              )
            }
          >
            <Text style={styles.directionsText}>Open in Google Maps</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Map Type Selector */}
      <View style={styles.mapTypesRow}>
        {MAP_TYPES.map(({ label, type }) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.mapTypeBox,
              mapType === type && { borderColor: '#4682B4', borderWidth: 2 },
            ]}
            onPress={() => setMapType(type as any)}
          >
            <View style={[styles.mapTypeImage, mapType === type && { opacity: 0.9 }]}>
              <Text style={{ fontSize: 10, color: '#fff' }}>{label}</Text>
            </View>
            <Text style={styles.mapTypeLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  carouselContainer: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: '#E6F0FA',
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    zIndex: 1,
  },
  categoryButton: {
    width: CARD_WIDTH,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  activeText: {
    color: '#fff',
  },
  mapTypesRow: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: '#E6F0FA',
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapTypeBox: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  mapTypeImage: {
    width: 60,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#4682B4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  mapTypeLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#333',
  },
  bottomInfoCard: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  placeVicinity: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },
  directionsButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  directionsText: {
    color: '#fff',
    fontWeight: '600',
  },
});


// import React, { lazy, useEffect, useRef, useState } from 'react';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import { StyleSheet, TouchableOpacity, View, Text, Dimensions, FlatList, Modal, ScrollView } from 'react-native';
// import { useNavigation } from 'expo-router';
// import * as Location from 'expo-location';

// const { width, height } = Dimensions.get('window');
// const CARD_WIDTH = width * 0.8;
// const SPACING = width * 0.1;

// // Location Categories Data
// const PETRO_PUMP_LOCATIONS = [
//     { name: "City Fuels & Service",  latitude: 15.273918126593086, longitude: 73.95744219694588 ,latitudeDelta: 0.0922, longitudeDelta: 0.0421},
//     { name: "Highway Energy Station", latitude: 15.277022, longitude: 73.958448, latitudeDelta: 0.0922, longitudeDelta: 0.0421},
//     { name: "Metro Petroleum", latitude: 15.291839, longitude: 73.9761, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
// ];

// const SERVICE_CENTER_LOCATIONS = [
//     { name: "AutoCare spares and service", latitude: 15.273151710614384,  longitude: 73.98068481062148, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
//     { name: "Luxury Car Service",  latitude: 15.269786890815313,  longitude: 73.9835275934396, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
//     { name: "Premium Auto Workshop", latitude: 15.26799518224674,  longitude: 73.96168021118278, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
// ];

// const CAR_WASH_LOCATIONS = [
//     { name: "GSL service center,washing",  latitude: 15.264492041429683,  longitude: 73.97616661099481, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
//     { name: "Angle's Car Detailing studio",  latitude: 15.26914719530096,  longitude: 73.9655743313175, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
//     { name: "Express Car Spa", latitude: 15.272896056684857,  longitude: 73.97144488365855, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
// ];


// export default function Maps() {
//     // const navigation = useNavigation();
//     const mapRef = useRef<MapView>(null);
    

//     const requestLocationPermission = async () => {
//         try {
//             const { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 console.log('Permission to access location was denied');
//                 return;
//             }

//             const location = await Location.getCurrentPositionAsync({});
//             const currentRegion = {
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//                 latitudeDelta: 0.0922,
//                 longitudeDelta: 0.0421,
//             };
//             mapRef.current?.animateToRegion(currentRegion, 1000);
//         } catch (error) {
//             console.log('Error getting location', error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <MapView
//                 ref={mapRef}
//                 style={styles.map}
//                 provider={PROVIDER_GOOGLE}
//                 showsUserLocation
//                 showsMyLocationButton
//                 onMapReady={requestLocationPermission}
//             >
//                 {PETRO_PUMP_LOCATIONS.map((marker, index) => 
//                 <Marker key={index} coordinate={marker}/>    
//             )}
//             </MapView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     map: {
//         width: '100%',
//         height: '100%',
//     },
//     carouselContainer: {
//         position: 'absolute',
//         bottom: 20,
//         width: '100%',
//     },
//     carousel: {
//         paddingHorizontal: SPACING / 2,
//     },
//     card: {
//         width: CARD_WIDTH,
//         marginHorizontal: SPACING / 2,
//         padding: 20,
//         borderRadius: 15,
//         backgroundColor: 'white',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//     },
//     selectedCard: {
//         transform: [{ scale: 1.05 }],
//     },
//     cardTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: 'white',
//         marginBottom: 8,
//     },
//     cardCount: {
//         fontSize: 14,
//         color: 'white',
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContent: {
//         backgroundColor: 'white',
//         marginHorizontal: 20,
//         borderRadius: 20,
//         maxHeight: height * 0.7,
//     },
//     modalHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#eee',
//     },
//     modalTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     closeButton: {
//         color: '#FF6B6B',
//         fontSize: 16,
//     },
//     locationsList: {
//         padding: 10,
//     },
//     locationItem: {
//         padding: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#eee',
//     },
//     locationName: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 5,
//     },
//     locationAddress: {
//         color: '#666',
//     },
// });

// import React, { useEffect, useRef } from 'react';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
// import { useNavigation } from 'expo-router';
// import * as Location from 'expo-location';


// const MARKER_COORDINATE = {
//     latitude: 18.520430,
//     longitude: 73.856743,
// };

// export default function Maps() {
//     const navigation = useNavigation();
//     const mapRef = useRef<MapView>(null);

//     useEffect(() => {
//         navigation.setOptions({
//             headerTitle: 'Map',
//             headerRight: () => <TouchableOpacity onPress={focusMap} >
//                 <Text>Focus</Text>
//             </TouchableOpacity>,
//         });
//     }, []);

//     const focusMap = () => {
//         mapRef.current?.animateCamera(
//             { center: MARKER_COORDINATE, zoom: 10 }, 
//             { duration: 2000 });
//         console.log('pressed!!');
//     };

//     const requestLocationPermission = async () => {
//         try {
//             const { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 console.log('Permission to access location was denied');
//                 return;
//             }
            
//             const location = await Location.getCurrentPositionAsync({});
//             const currentRegion = {
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//                 latitudeDelta: 0.0922,
//                 longitudeDelta: 0.0421,
//             };
//             mapRef.current?.animateToRegion(currentRegion, 1000);
//         } catch (error) {
//             console.log('Error getting location', error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <MapView
//                 ref={mapRef}
//                 style={styles.map}
//                 provider={PROVIDER_GOOGLE}
//                 showsUserLocation
//                 showsMyLocationButton
//                 onMapReady={requestLocationPermission}
//             >
//                 <Marker coordinate={MARKER_COORDINATE} />
//             </MapView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     map: {
//         width: '100%',
//         height: '100%',
//     },
// });



