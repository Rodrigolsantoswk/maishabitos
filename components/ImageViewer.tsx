import { StyleSheet, useWindowDimensions } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = {
  imgSource: ImageSource;
  selectedImage?: string;
  widthPercent?: number; // Ex: 80 = 80% da largura da tela
};

export function ImageViewer({ imgSource, selectedImage, widthPercent = 100 }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;
  const { width: screenWidth } = useWindowDimensions();

  // Largura baseada em porcentagem da largura da tela
  const imageWidth = (screenWidth * widthPercent) / 100;

  return (
    <Image
      source={imageSource}
      style={[styles.image, { width: imageWidth, aspectRatio: 320 / 440 }]} // proporção original
      contentFit="contain"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 18,
  },
});
