
import atualizarStyle from '@/app/estilos/empresa/atualizarDadosStyle';
import { View, Text, TouchableOpacity } from 'react-native'

const CARD = '#F9FAFB';
const PRIMARY = '#2563EB';

export function Card({ title, children }: any) {
    return (
        <View style={{ backgroundColor: CARD, borderRadius: 12, padding: 16, marginTop: 16 }}>
            <Text style={{ fontWeight: '600', marginBottom: 12 }}>{title}</Text>
            {children}
        </View>
    );
}

export function Tag({ label, active, onPress }: any) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ padding: 10, borderRadius: 8, backgroundColor: active ? PRIMARY : '#E5E7EB', margin: 4 }}>
            <Text style={{ color: active ? '#FFF' : '#111' }}>{label}</Text>
        </TouchableOpacity>
    );
}

export function PrimaryButton({ label, onPress }: any) {
    return (
        <TouchableOpacity onPress={onPress} style={{ flex: 1, backgroundColor: PRIMARY, padding: 14, borderRadius: 10 }}>
            <Text style={{ color: '#FFF', textAlign: 'center', fontWeight: '600' }}>{label}</Text>
        </TouchableOpacity>
    );
}

export function SecondaryButton({ label, onPress }: any) {
    return (
        <TouchableOpacity onPress={onPress} style={{ flex: 1, backgroundColor: '#E5E7EB', padding: 14, borderRadius: 10 }}>
            <Text style={{ textAlign: 'center', fontWeight: '600' }}>{label}</Text>
        </TouchableOpacity>
    );
}

export function ChipCust({ label, active, onPress }: any) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                atualizarStyle.chip,
                active && atualizarStyle.chipActive
            ]}
        >
            <Text
                style={[
                    atualizarStyle.chipText,
                    active && atualizarStyle.chipTextActive
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}