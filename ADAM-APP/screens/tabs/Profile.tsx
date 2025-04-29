import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import icon from "@/assets/images/prof.png";

// Define the type for document items
interface Document {
  id: number;
  title: string;
  icon: 'card' | 'shield-checkmark' | 'document-text' | 'id-card';
  route: string;
}

// Array of documents with their respective types
const documents: Document[] = [
  { id: 1, title: 'Licence', icon: 'card', route: '(profile)/licence' },
  { id: 2, title: 'Insurance', icon: 'shield-checkmark', route: '(profile)/insurance' },
  { id: 3, title: 'PUC', icon: 'document-text', route: '(profile)/puc' },
  { id: 4, title: 'ID Proof', icon: 'id-card', route: '(profile)/id-proof' },
];

const Profile: React.FC = () => {
  const router = useRouter();
  const { signOut } = useAuth();

  // Function to handle document press
  const handleDocumentPress = (route: string) => {
    router.push(route as any);
  };

   const BackArrow = () => (
      <View
        style={{
          width: 12,
          height: 12,
          borderLeftWidth: 3,
          borderBottomWidth: 3,
          borderColor: '#333',
          transform: [{ rotate: '45deg' }],
        }}
      />
    );

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="flex-1 px-4 ">
          <TouchableOpacity
                    style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}
                    onPress={() => router.back()}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#D9F0F7',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <BackArrow />
                    </View>
                  </TouchableOpacity>
          {/* Header Section */}
          <View className="bg-[#eaf6ff] flex-1 p-4">
              
              {/* Top Card */}
              <View className="flex-row items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <View className="flex-row items-center flex-1">
                  
                  {/* Profile Image */}
                  <Image
                    source={ require('../../assets/images/profile.jpeg') } 
                    style={{ width: 50, height: 50, borderRadius: 20, marginRight: 12 }}
                    className="w-14 h-14 rounded-full bg-gray-100"
                    resizeMode="cover"
                  />

                  {/* Name and Vehicle */}
                  <View className="ml-3 flex-1">
                    <Text className="text-lg font-bold text-gray-900 underline">Travis Fernandes</Text>
                    <Text className="text-sm text-gray-500 mt-1">
                      GA-09-A-4683 <Text className="text-gray-400"> Zen Estilo LXI</Text>
                    </Text>
                  </View>
                </View>

                {/* Edit Icon */}
                <TouchableOpacity
                  className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
                  onPress={() => router.push('(profile)/editProfile' as any)}
                  accessibilityLabel="Edit Profile"
                >
                  <Feather name="edit" size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>

              {/* Vehicle Details Card */}
              <View className="bg-[#fdf2c5] p-4 rounded-xl shadow-md border border-gray-100">
                <View className="mb-4">
                  <Text className="text-sm font-semibold text-gray-800 mb-1">Vehicle Age</Text>
                  <Text className="text-base font-bold text-gray-900">
                    14 years 2 months 12 days
                  </Text>
                </View>

                {/* Divider */}
                <View className="h-[1px] bg-gray-300 my-2" />

                <View className="mt-4">
                  <Text className="text-sm font-semibold text-gray-800 mb-1">Last Servicing Date</Text>
                  <Text className="text-base font-bold text-gray-900">
                    31st October 2024
                  </Text>
                </View>
              </View>
              
            </View>

          {/* Documents Section */}
          <View className="mb-4">
            <Text className="text-base font-semibold text-gray-900 mb-4 px-1">Documents</Text>
            <View className="flex-row flex-wrap justify-between">
              {documents.map((doc) => (
                <TouchableOpacity
                  key={doc.id}
                  className="w-[48%] mb-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm"
                  onPress={() => handleDocumentPress(doc.route)}
                  accessibilityLabel={`View ${doc.title}`}
                >
                  <View className="bg-gray-50 w-10 h-10 rounded-full items-center justify-center mb-3">
                    <Ionicons name={doc.icon} size={20} color="#6b7280" />
                  </View>
                  <Text className="text-sm font-medium text-gray-700">{doc.title}</Text>
                  <Text className="text-xs text-gray-500 mt-1">View details</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View className="mt-4 bg-white rounded-lg border border-gray-100 shadow-sm p-4 mb-4">
            <Text className="text-sm font-medium text-gray-900 mb-3">Quick Actions</Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="flex-row items-center"
                accessibilityLabel="Download All Documents"
              >
                <View className="w-8 h-8 bg-blue-50 rounded-full items-center justify-center mr-2">
                  <Ionicons name="download-outline" size={16} color="#3b82f6" />
                </View>
                <Text className="text-sm text-gray-600">Download All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center"
                accessibilityLabel="Share Documents"
              >
                <View className="w-8 h-8 bg-green-50 rounded-full items-center justify-center mr-2">
                  <Ionicons name="share-outline" size={16} color="#10b981" />
                </View>
                <Text className="text-sm text-gray-600">Share</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Logout Button */}
          <View className="mt-4">
            <TouchableOpacity
              className="flex-row items-center justify-center space-x-2 bg-gray-100 p-4 rounded-lg border border-gray-200"
              onPress={signOut}
              accessibilityLabel="Log out"
            >
              <Ionicons name="log-out-outline" size={20} color="#6b7280" />
              <Text className="text-sm font-medium text-gray-700">Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;


// import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
// import React from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Feather, Ionicons } from '@expo/vector-icons';
// import { router, useRouter } from 'expo-router';
// import { useAuth } from '@/providers/AuthProvider';

// const documents: { id: number; title: string; icon: 'card' | 'shield-checkmark' | 'document-text' | 'id-card' }[] = [
//   { id: 1, title: 'Licence', icon: 'card' },
//   { id: 2, title: 'Insurance', icon: 'shield-checkmark' },
//   { id: 3, title: 'PUC', icon: 'document-text' },
//   { id: 4, title: 'ID Proof', icon: 'id-card' },
// ];

// const Profile = () => {
//   const router = useRouter();
//   const {signOut} = useAuth();
//   return (
//     <>
//       <ScrollView>
//       <View className="flex-1 px-4 pt-4">
//         {/* Header Section */}
//         <View className="flex-row items-center justify-between mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
//           <View className="flex-row items-center flex-1">
//             <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
//               <Ionicons name="person" size={24} color="#6b7280" />
//             </View>
//             <View className="ml-3 flex-1">
//               <Text className="text-lg font-semibold text-gray-900">Travis Fernandes</Text>
//               <Text className="text-sm text-gray-500">Ga-04-4683 Zen Estilo LXI</Text>
//             </View>
//           </View>
//           <TouchableOpacity 
//             className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
//             onPress={()=>{router.push('/(tabs)/(profile)/editProfile')}}
//           >
//             <Feather name="edit" size={20} color="#6b7280" />
//           </TouchableOpacity>
//         </View>

//         {/* Documents Section */}
//         <View className="mb-4">
//           <Text className="text-base font-semibold text-gray-900 mb-4 px-1">Documents</Text>
//           <View className="flex-row flex-wrap justify-between">
//             {documents.map((doc) => (
//               <TouchableOpacity
//                 key={doc.id}
//                 className="w-[48%] mb-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm"
//               >
//                 <View className="bg-gray-50 w-10 h-10 rounded-full items-center justify-center mb-3">
//                   <Ionicons name={doc.icon} size={20} color="#6b7280" />
//                 </View>
//                 <Text className="text-sm font-medium text-gray-700">{doc.title}</Text>
//                 <Text className="text-xs text-gray-500 mt-1">View details</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>


//         {/* Quick Actions */}
//         <View className="mt-4 bg-white rounded-lg border border-gray-100 shadow-sm p-4 mb-4">
//           <Text className="text-sm font-medium text-gray-900 mb-3">Quick Actions</Text>
//           <View className="flex-row justify-between">
//             <TouchableOpacity className="flex-row items-center">
//               <View className="w-8 h-8 bg-blue-50 rounded-full items-center justify-center mr-2">
//                 <Ionicons name="download-outline" size={16} color="#3b82f6" />
//               </View>
//               <Text className="text-sm text-gray-600">Download All</Text>
//             </TouchableOpacity>
//             <TouchableOpacity className="flex-row items-center">
//               <View className="w-8 h-8 bg-green-50 rounded-full items-center justify-center mr-2">
//                 <Ionicons name="share-outline" size={16} color="#10b981" />
//               </View>
//               <Text className="text-sm text-gray-600">Share</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
        
//         {/* Logout Button */}
//         <View className="mt-4">
//           <TouchableOpacity 
//             className="flex-row items-center justify-center space-x-2 bg-gray-100 p-4 rounded-lg border border-gray-200"
//             onPress={signOut}
//           >
//             <Ionicons name="log-out-outline" size={20} color="#6b7280" />
//             <Text className="text-sm font-medium text-gray-700">Log out</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       </ScrollView>
//     </>
//   );
// };

// export default Profile;
