import { View, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import DataCard from '@/components/analysis/DataCard';
import { HealthMonitoringDisplay, EmissionsDisplay, PredictiveMaintenanceDisplay } from '@/components/analysis/DataDisplay';
import { useFetch } from '@/hooks/useFetch';
import { analysisService } from '@/services/api';
import { cardThemes } from '@/constants/cardThemes';

const Analysis = () => {
  const { 
    data: healthMonitoringData, 
    loading: loadingHealthMonitoring, 
    disabled: healthMonitoringDisabled, 
    fetchData: fetchHealthMonitoringData 
  } = useFetch(analysisService.fetchHealthMonitoringData);

  const { 
    data: emissionsData, 
    loading: loadingEmissions, 
    disabled: emissionsDisabled, 
    fetchData: fetchEmissionsData 
  } = useFetch(analysisService.fetchEmissionsData);

  const { 
    data: predictiveMaintenanceData, 
    loading: loadingPredictiveMaintenance, 
    disabled: predictiveMaintenanceDisabled, 
    fetchData: fetchPredictiveMaintenanceData 
  } = useFetch(analysisService.fetchPredictiveMaintenanceData);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EAF8FF' }}>
      <ScrollView style={{ padding: 20, paddingTop: 70 }}>
        
          <DataCard 
          title={cardThemes.healthMonitoring.title}
          icon={<MaterialCommunityIcons nityIcons name='engine' size={32} color="#003f5c" />}
          bgColor={cardThemes.healthMonitoring.bgColor}
          iconBgColor={cardThemes.healthMonitoring.iconBgColor}
          loading={loadingHealthMonitoring}
          disabled={healthMonitoringDisabled}
          onFetch={fetchHealthMonitoringData} textColor={''}          >
            <HealthMonitoringDisplay data={healthMonitoringData} />
          </DataCard>

          <DataCard 
          title={cardThemes.emissions.title}
          icon={<FontAwesome5 name='shipping-fast' size={32} color="#006D77" />}
          bgColor={cardThemes.emissions.bgColor}
          iconBgColor={cardThemes.emissions.iconBgColor}
          loading={loadingEmissions}
          disabled={emissionsDisabled}
          onFetch={fetchEmissionsData} textColor={''}          >
            <EmissionsDisplay data={emissionsData} />
          </DataCard>

          {/* <DataCard 
            title={cardThemes.drivingBehavior.title}
            icon={<Ionicons name='car-sport' size={32} color="#8B2E2E" />}
            bgColor={cardThemes.drivingBehavior.bgColor}
            iconBgColor={cardThemes.drivingBehavior.iconBgColor}
            loading={loadingDrivingBehavior}
            disabled={drivingBehaviorDisabled}
            onFetch={fetchDrivingBehaviorData}
            textColor={cardThemes.drivingBehavior.textColor}
          >
            <DrivingBehaviorDisplay data={drivingBehaviorData} />
          </DataCard> */}

          <DataCard 
          title={cardThemes.predictiveMaintenance.title}
          icon={<FontAwesome5 name='tools' size={32} color="#5A5A00" />}
          bgColor={cardThemes.predictiveMaintenance.bgColor}
          iconBgColor={cardThemes.predictiveMaintenance.iconBgColor}
          loading={loadingPredictiveMaintenance}
          disabled={predictiveMaintenanceDisabled}
          onFetch={fetchPredictiveMaintenanceData} textColor={''}          >
            <PredictiveMaintenanceDisplay data={predictiveMaintenanceData} />
          </DataCard>
          
      </ScrollView>
    </SafeAreaView>
  );
};

export default Analysis;

// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
// import { Ionicons, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const cardData = [
//   {
//     title: 'Engine Health Monitoring',
//     icon: <MaterialCommunityIcons name="engine" size={30} color="#003f5c" />,
//     bgColor: '#D8ECFE',
//     iconBg: '#72B8F4',
//     textColor: '#003f5c',
//   },
//   {
//     title: 'Emission Compliance',
//     icon: <MaterialCommunityIcons name="car-electric" size={30} color="#006D77" />,
//     bgColor: '#C5F5F9',
//     iconBg: '#71DDEB',
//     textColor: '#006D77',
//   },
//   {
//     title: 'Driving Behavior Analysis',
//     icon: <Ionicons name="car-sport" size={30} color="#8B2E2E" />,
//     bgColor: '#FFD8C5',
//     iconBg: '#FF9C75',
//     textColor: '#8B2E2E',
//   },
//   {
//     title: 'Predictive Maintenance',
//     icon: <MaterialIcons name="build-circle" size={30} color="#5A5A00" />,
//     bgColor: '#FFF5C5',
//     iconBg: '#E1D55A',
//     textColor: '#5A5A00',
//   },
// ];

// const Analysis = () => {
//   const navigation = useNavigation();

//   return (
//     <ScrollView style={{ flex: 1, backgroundColor: '#EAF8FF', padding: 20, paddingTop: 70 }}>

//       {/* Feature Cards */}
//       {cardData.map((item, index) => (
//         <View key={index} style={{
//           flexDirection: 'row',
//           backgroundColor: item.bgColor,
//           borderRadius: 20,
//           marginBottom: 25,
//           padding: 20,
//           height: 140,
//           alignItems: 'flex-start',
//         }}>
//           {/* Icon Circle */}
//           <View style={{
//             backgroundColor: item.iconBg,
//             borderRadius: 999,
//             padding: 10,
//             marginRight: 15,
//             marginTop: 4,
//           }}>
//             {item.icon}
//           </View>

//           {/* Text + Analyze Button */}
//           <View style={{ flex: 1 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, color: item.textColor, marginBottom: 10 }}>
//               {item.title}
//             </Text>
//             <View style={{ height: 10, backgroundColor: '#eee', borderRadius: 5, marginBottom: 5 }} />
//             <View style={{ height: 8, backgroundColor: '#ddd', borderRadius: 5, marginBottom: 10, width: '60%' }} />
//             <TouchableOpacity onPress={() => console.log(`${item.title} card pressed`)}>
//               <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 15 }}>
//               <Text style={{ fontWeight: 'bold', color: item.textColor, fontSize: 16, marginRight: 5 }}>Analyze</Text>
//               <Ionicons name="search" size={20} color={item.textColor} />
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// export default Analysis;