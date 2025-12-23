import { useAuthStore } from '@/lib/stores/useAuthStore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/lib/colors';


const LogoutIconButton = () => {
  const { logout } = useAuthStore();
  const primaryColor = Colors.primary;

  return (
    <TouchableOpacity style={{ marginRight: 8 }} onPress={logout}>
      <Ionicons name="log-out-outline" size={24} color={primaryColor} />
    </TouchableOpacity>
  );
};
export default LogoutIconButton;
