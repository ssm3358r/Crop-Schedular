import { Image, StyleSheet, View } from 'react-native';

export function AuthLogo({ size = 112 }: { size?: number }) {
  return (
    <View
      style={[
        styles.logoShell,
        {
          borderRadius: size / 2,
          height: size,
          width: size,
        },
      ]}>
      <Image
        source={require('@/assets/images/fps-logo.jpeg')}
        style={[
          styles.logoImage,
          {
            borderRadius: size / 2 - 10,
            height: size - 20,
            width: size - 20,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoShell: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E3E5DE',
    borderWidth: 1,
    justifyContent: 'center',
    shadowColor: '#1B4332',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },
  logoImage: {
    backgroundColor: '#FFFFFF',
  },
});
