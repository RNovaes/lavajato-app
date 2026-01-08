
import atualizarStyle from '@/app/empresa/atualizarDados.style';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IconButton, Modal, Portal } from 'react-native-paper';

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

export function CardInfo({ title, children }: any) {
    return (
        <View style={{ backgroundColor: CARD, borderRadius: 12, padding: 16, marginTop: 16, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
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

export function Infos({texto}: any) {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <IconButton
                icon="help-circle-outline"
                size={18}
                onPress={() => setVisible(true)}
                iconColor='blue'
            />
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    contentContainerStyle={{
                        backgroundColor: 'white',
                        padding: 20,
                        margin: 20,
                        borderRadius: 8,
                    }}
                >
                    <Text>
                        {texto}
                    </Text>
                </Modal>
            </Portal>
        </>
    )
}