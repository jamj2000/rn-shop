import { Ionicons } from '@expo/vector-icons';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import Colors from '@/lib/colors';
import { useRef, useState } from 'react';


const CustomTextInput = ({ icon, style, ...rest }) => {
  const primaryColor = Colors.primary;
  const textColor = Colors.text;

  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef(null);

  return (
    <View
      style={[
        {
          ...styles.border,
          borderColor: isActive ? primaryColor : '#ccc',
        },
        style,
      ]}
      onTouchStart={() => inputRef.current?.focus()}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color={textColor}
          style={{ marginRight: 10 }}
        />
      )}

      <TextInput
        ref={inputRef}
        placeholderTextColor="#5c5c5c"
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        style={{
          color: textColor,
          marginRight: 10,
          flex: 1,
        }}
        {...rest}
      />
    </View>
  );
};
export default CustomTextInput;





const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
