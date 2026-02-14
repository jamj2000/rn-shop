import { Ionicons } from '@expo/vector-icons';
import { Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '@/lib/colors';


const CustomButton = ({ children, icon, isLoading, style, ...rest }) => {
  const primaryColor = Colors.primary;

  return (
    <Pressable
      disabled={isLoading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: primaryColor,
          opacity: pressed || isLoading ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        style,
      ]}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          <Text style={{ color: 'white' }}>{children}</Text>

          {icon && (
            <Ionicons
              name={icon}
              size={24}
              color="white"
              style={{ marginHorizontal: 5 }}
            />
          )}
        </>
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
