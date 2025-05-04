// components/chat/ChatInput.tsx
import React from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ChatInputProps {
  query: string;
  setQuery: (text: string) => void;
  loading: boolean;
  onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  query, 
  setQuery, 
  loading, 
  onSend 
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ marginBottom: 90 }}
    >
      <View className="bg-[#f1e8d9] flex-row items-center px-2 py-3 rounded-lg shadow-md">
        <TextInput
          placeholder="Ask Query"
          placeholderTextColor="#333"
          className="flex-1 text-black text-[16px]"
          style={{ height: 40 }}
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity onPress={onSend} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#7b5e2d" />
          ) : (
            <Feather name="arrow-up-circle" size={24} color="#7b5e2d" />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatInput;