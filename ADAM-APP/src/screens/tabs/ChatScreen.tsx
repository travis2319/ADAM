// // screens/tabs/ChatScreen.tsx
import React, { useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import QuickActionButton from '@/components/chat/QuickActioButton';
import ChatInput from '@/components/chat/ChatInput';
import ResponseViewer from '@/components/chat/ResponseViewer';
import { useChatbot } from '@/hooks/useChatbot';
import { QUICK_ACTIONS } from '@/constants/chatQuries';

const ChatScreen: React.FC = () => {
  const {
    query,
    setQuery,
    response,
    loading,
    handleSendQuery,
    handleButtonClick,
  } = useChatbot();

  return (
    <SafeAreaView className="flex-1 bg-[#f0f9ff]">
      {/* Full screen container */}
      <View className="flex-1 px-4 pt-8 pb-4">
        {/* Header */}
        <View className="items-center mb-4">
          <Text className="text-2xl font-bold text-center text-black">How can we Help You?</Text>
          <Text className="text-sm font-semibold text-center text-gray-700 mt-1">Predictions</Text>
        </View>

        {/* Quick Action Buttons */}
        <View className="flex-row flex-wrap justify-center gap-2 mb-4">
          {QUICK_ACTIONS.flat().map((action, index) => (
            <QuickActionButton
              key={`btn-${index}`}
              label={action.label}
              bgColor={action.bgColor}
              onPress={handleButtonClick}
            />
          ))}
        </View>

        {/* Response Viewer */}
        <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
          <ResponseViewer response={response} />
        </ScrollView>

        {/* Input Field */}
        <ChatInput
          query={query}
          setQuery={setQuery}
          loading={loading}
          onSend={handleSendQuery}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;


// import React from 'react';
// import { View, Text } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import QuickActionButton from '@/components/chat/QuickActioButton';
// import ChatInput from '@/components/chat/ChatInput';
// import ResponseViewer from '@/components/chat/ResponseViewer';
// import { useChatbot } from '@/hooks/useChatbot';
// import { QUICK_ACTIONS } from '@/constants/chatQuries';

// const ChatScreen: React.FC = () => {
//   const {
//     query,
//     setQuery,
//     response,
//     loading,
//     handleSendQuery,
//     handleButtonClick,
//   } = useChatbot();

//   return (
//     <SafeAreaView className="flex-1 bg-[#f0f9ff] px-4">
//       <View className="flex-1">
//         <View className="items-center mt-8">
//           <Text className="text-2xl font-bold text-black">How can we Help You?</Text>
//           <Text className="text-sm text-gray-700 mt-1">Predictions</Text>
//         </View>

//         {/* Quick Action Buttons */}
//         <View className="mt-6 flex-1 justify-center gap-4">
//           {QUICK_ACTIONS.map((row, rowIndex) => (
//             <View key={`row-${rowIndex}`} className="flex-row justify-center gap-4">
//               {row.map((action, btnIndex) => (
//                 <QuickActionButton
//                   key={`btn-${rowIndex}-${btnIndex}`}
//                   label={action.label}
//                   bgColor={action.bgColor}
//                   onPress={handleButtonClick}
//                 />
//               ))}
//             </View>
//           ))}
//         </View>

//         {/* Response Display */}
//         <ResponseViewer response={response} />

//         {/* Input Field */}
//         <ChatInput
//           query={query}
//           setQuery={setQuery}
//           loading={loading}
//           onSend={handleSendQuery}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ChatScreen;