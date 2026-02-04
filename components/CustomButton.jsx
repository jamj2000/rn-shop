import { Ionicons } from '@expo/vector-icons';
import { Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '@/lib/colors';


const CustomButton = ({ children, icon, isLoading, ...rest }) => {
  const primaryColor = Colors.primary;

  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: (pressed || isLoading) ? primaryColor + '90' : primaryColor },
        styles.button,
      ]}
      disabled={isLoading}
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
