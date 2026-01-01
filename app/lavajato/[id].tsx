

import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function LavaJatoDetalhe() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>
        Lava-jato #{id}
      </Text>
    </View>
  );
}
