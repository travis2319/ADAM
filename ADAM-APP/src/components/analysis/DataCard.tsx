import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DataCardProps {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  iconBgColor: string;
  textColor: string;
  loading: boolean;
  disabled: boolean;
  onFetch: () => void;
  children?: React.ReactNode;
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  icon,
  bgColor,
  iconBgColor,
  textColor,
  loading,
  disabled,
  onFetch,
  children,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: bgColor,
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
      }}
    >
      {/* Icon Circle */}
      <View
        style={{
          backgroundColor: iconBgColor,
          borderRadius: 999,
          padding: 10,
          marginRight: 15,
          marginTop: 4,
        }}
      >
        {icon}
      </View>

      {/* Text + Analyze Button */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: textColor,
            marginBottom: 10,
          }}
        >
          {title}
        </Text>
        {/* Placeholder bars */}
        <View
          style={{
            height: 10,
            backgroundColor: '#eee',
            borderRadius: 5,
            marginBottom: 5,
          }}
        />
        <View
          style={{
            height: 8,
            backgroundColor: '#ddd',
            borderRadius: 5,
            marginBottom: 10,
            width: '60%',
          }}
        />
        {/* Data or Loading */}
        {loading ? (
          <ActivityIndicator size="small" color={textColor} style={{ marginTop: 10 }} />
        ) : (
            children
        )}
        <TouchableOpacity
          onPress={onFetch}
          disabled={disabled}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: 15,
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              color: textColor,
              fontSize: 16,
              marginRight: 5,
            }}
          >
            Analyze
          </Text>
          <Ionicons name="search" size={20} color={textColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DataCard;


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