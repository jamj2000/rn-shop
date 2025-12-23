import { Ionicons } from '@expo/vector-icons';
import { Text, Pressable, StyleSheet } from 'react-native';
import Colors from '@/lib/colors';


const CustomButton = ({ children, icon, ...rest }) => {
  const primaryColor = Colors.primary;

  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: pressed ? primaryColor + '90' : primaryColor },
        styles.button,
      ]}
      {...rest}
    >
      <Text style={{ color: 'white' }}>{children}</Text>

      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color="white"
          style={{ marginHorizontal: 5 }}
        />
      )}
    </Pressable>
  );
};
export default CustomButton;



const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
