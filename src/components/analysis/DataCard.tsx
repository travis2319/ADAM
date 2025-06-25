
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * DataCard Component for Expo React Native
 * @param {string} title - Card title
 * @param {React.ReactNode} icon - Icon component to display
 * @param {string} bgColor - Background color of the card
 * @param {string} iconBgColor - Background color of the icon circle
 * @param {string} textColor - Color of text and icons
 * @param {boolean} disabled - Whether the analyze button is disabled
 * @param {Function} onFetch - Function to call when analyze button is pressed
 * @param {React.ReactNode} children - Content to display after fetching
 */
const DataCard = ({
  title,
  icon,
  bgColor = '#FFFFFF',
  iconBgColor = '#E6F0FF',
  textColor = '#333333',
  disabled = false,
  onFetch,
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const handleFetch = () => {
    setLoading(true);
    
    // Simulate fetch operation if no onFetch function is provided
    if (onFetch) {
      Promise.resolve(onFetch())
        .finally(() => {
          setLoading(false);
          setFetched(true);
        });
    } else {
      // Demo mode with timeout
      setTimeout(() => {
        setLoading(false);
        setFetched(true);
      }, 1500);
    }
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: bgColor },
      ]}
    >
      {/* Icon Circle */}
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: iconBgColor },
        ]}
      >
        {icon}
      </View>

      {/* Text + Analyze Button */}
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: textColor }]}>
          {title}
        </Text>
        
        {/* Placeholder bars - show only when not fetched */}
        {!fetched && (
          <>
            <View style={styles.placeholderBar1} />
            <View style={styles.placeholderBar2} />
          </>
        )}
        
        {/* Loading indicator or content */}
        {loading ? (
          <ActivityIndicator 
            size="small" 
            color={textColor} 
            style={styles.loadingIndicator} 
          />
        ) : (
          fetched && children
        )}
        
        {/* Analyze button */}
        <TouchableOpacity
          onPress={handleFetch}
          disabled={disabled || loading}
          style={[
            styles.analyzeButton,
            { opacity: (disabled || loading) ? 0.5 : 1 },
          ]}
        >
          <Text style={[styles.analyzeText, { color: textColor }]}>
            Analyze
          </Text>
          <Ionicons name="search" size={20} color={textColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 20,
    marginBottom: 25,
    padding: 20,
    minHeight: 140,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    borderRadius: 999,
    padding: 10,
    marginRight: 15,
    marginTop: 4,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  placeholderBar1: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 5,
  },
  placeholderBar2: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    width: '60%',
  },
  loadingIndicator: {
    marginTop: 10,
  },
  analyzeButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 15,
  },
  analyzeText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
  },
});

export default DataCard;
// import React from 'react';
// import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// interface DataCardProps {
//   title: string;
//   icon: React.ReactNode;
//   bgColor: string;
//   iconBgColor: string;
//   textColor: string;
//   loading: boolean;
//   disabled: boolean;
//   onFetch: () => void;
//   children?: React.ReactNode;
// }

// const DataCard: React.FC<DataCardProps> = ({
//   title,
//   icon,
//   bgColor,
//   iconBgColor,
//   textColor,
//   loading,
//   disabled,
//   onFetch,
//   children,
// }) => {
//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         backgroundColor: bgColor,
//         borderRadius: 20,
//         marginBottom: 25,
//         padding: 20,
//         minHeight: 140,
//         alignItems: 'flex-start',
//         shadowColor: '#000',
//         shadowOpacity: 0.06,
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 8,
//         elevation: 2,
//       }}
//     >
//       {/* Icon Circle */}
//       <View
//         style={{
//           backgroundColor: iconBgColor,
//           borderRadius: 999,
//           padding: 10,
//           marginRight: 15,
//           marginTop: 4,
//         }}
//       >
//         {icon}
//       </View>

//       {/* Text + Analyze Button */}
//       <View style={{ flex: 1 }}>
//         <Text
//           style={{
//             fontWeight: 'bold',
//             fontSize: 16,
//             color: textColor,
//             marginBottom: 10,
//           }}
//         >
//           {title}
//         </Text>
//         {/* Placeholder bars */}
//         <View
//           style={{
//             height: 10,
//             backgroundColor: '#eee',
//             borderRadius: 5,
//             marginBottom: 5,
//           }}
//         />
//         <View
//           style={{
//             height: 8,
//             backgroundColor: '#ddd',
//             borderRadius: 5,
//             marginBottom: 10,
//             width: '60%',
//           }}
//         />
//         {/* Data or Loading */}
//         {loading ? (
//           <ActivityIndicator size="small" color={textColor} style={{ marginTop: 10 }} />
//         ) : (
//             children
//         )}
//         <TouchableOpacity
//           onPress={onFetch}
//           disabled={disabled}
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'flex-end',
//             alignItems: 'center',
//             marginTop: 15,
//             opacity: disabled ? 0.5 : 1,
//           }}
//         >
//           <Text
//             style={{
//               fontWeight: 'bold',
//               color: textColor,
//               fontSize: 16,
//               marginRight: 5,
//             }}
//           >
//             Analyze
//           </Text>
//           <Ionicons name="search" size={20} color={textColor} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default DataCard;


// import React from 'react';
// import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { FontAwesome6 } from '@expo/vector-icons';

// interface DataCardProps {
//   title: string;
//   icon: React.ReactNode;
//   bgColor: string;
//   iconBgColor: string;
//   loading: boolean;
//   disabled: boolean;
//   onFetch: () => void;
//   children: React.ReactNode;
// }

// const DataCard: React.FC<DataCardProps> = ({
//   title,
//   icon,
//   bgColor,
//   iconBgColor,
//   loading,
//   disabled,
//   onFetch,
//   children,
// }) => {
//   return (
//     <View className={`bg-[${bgColor}] rounded-2xl shadow-md p-7 relative`}>
//       <View className={`absolute -top-4 -left-4 bg-[${iconBgColor}] rounded-full p-4 shadow-md`}>
//         {icon}
//       </View>
//       <Text className="text-base font-bold mb-16 ml-8 text-black">
//         {title}
//       </Text>
      
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         children
//       )}
      
//       <TouchableOpacity 
//         className={`self-end bg-[${iconBgColor}] rounded-full p-3 ${disabled ? 'opacity-50' : ''}`} 
//         onPress={onFetch}
//         disabled={disabled}
//       >
//         <FontAwesome6 name="searchengin" size={26} color="#000000" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default DataCard;