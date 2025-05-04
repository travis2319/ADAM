// app/(tabs)/chat.tsx
import React from 'react';
import ChatScreen from '../../screens/tabs/ChatScreen';

export default function Chat() {
  return <ChatScreen />;
}

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Feather } from '@expo/vector-icons';
// import Markdown from 'react-native-markdown-display';

// const ChatScreen: React.FC = () => {
//   const [query, setQuery] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);

//   const userId = 'VOID-001';
//   const currentTime = new Date().toISOString();
//   const baseUrl = 'http://192.168.0.112:8000';

//   const handleSendQuery = async () => {
//     if (!query) return;

//     setLoading(true);
//     try {
//       const encodedQuery = encodeURIComponent(query);
//       const url = `${baseUrl}/chatbot/ask?query=${encodedQuery}&user_id=${userId}&current_time=${currentTime}`;
//       const username = 'user';
//       const password = 'password';
//       const encodedCredentials = btoa(`${username}:${password}`);

//       const apiResponse = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'accept': 'application/json',
//           'Authorization': `Basic ${encodedCredentials}`,
//         },
//       });

//       if (!apiResponse.ok) throw new Error(`HTTP error! Status: ${apiResponse.status}`);
//       const data = await apiResponse.json();
//       setResponse(data.response || 'No response received.');
//     } catch (error) {
//       console.error('Error fetching chatbot response:', error);
//       Alert.alert('Error', 'Failed to get response from server. Please try again.');
//       setResponse('Error fetching response.');
//     } finally {
//       setLoading(false);
//       setQuery('');
//     }
//   };

//   const handleSuggestionClick = (text: string) => {
//     setQuery(text);
//     handleSendQuery();
//   };

//   const suggestions = [
//     { text: 'spark plug replacement', bg: '#eee5db' },
//     { text: 'air filter replacement', bg: '#eee5db' },
//     { text: 'battery health', bg: '#faf4ce' },
//     { text: 'coolant change', bg: '#faf4ce' },
//     { text: 'estimate oil change', bg: '#f4d7c3' },
//     { text: 'estimate brake pad wear', bg: '#f4d7c3' },
//   ];

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f9ff', padding: 20, paddingTop: 150 }}>
//       <View style={{ flex: 1 }}>
//         {/* Header */}
//         <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
//           How can we Help You?
//         </Text>
//         <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'center', color: '#444' }}>
//           Predictions
//         </Text>

//         {/* Suggestions */}
//         <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
//           {suggestions.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => handleSuggestionClick(item.text)}
//               style={{
//                 backgroundColor: item.bg,
//                 paddingHorizontal: 14,
//                 paddingVertical: 8,
//                 borderRadius: 20,
//                 margin: 6,
//               }}
//             >
//               <Text style={{ fontSize: 13 }}>{item.text}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Markdown Response */}
//         <ScrollView style={{ marginTop: 20, flex: 1 }}>
//           <Markdown>{response}</Markdown>
//         </ScrollView>

//         {/* Input + Send */}
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           keyboardVerticalOffset={90}
//         >
//           <View
//             style={{
//               backgroundColor: '#f1e8d9',
//               borderRadius: 20,
//               flexDirection: 'row',
//               alignItems: 'center',
//               paddingHorizontal: 16,
//               paddingVertical: 10,
//               marginTop: 12,
//             }}
//           >
//             <TextInput
//               placeholder="Ask Query"
//               placeholderTextColor="#333"
//               style={{ flex: 1, fontSize: 14 }}
//               value={query}
//               onChangeText={setQuery}
//             />
//             <TouchableOpacity onPress={handleSendQuery} disabled={loading}>
//               {loading ? (
//                 <ActivityIndicator size="small" color="#7b5e2d" />
//               ) : (
//                 <Feather name="arrow-up-circle" size={24} color="#7b5e2d" />
//               )}
//             </TouchableOpacity>
//           </View>
//         </KeyboardAvoidingView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ChatScreen;
