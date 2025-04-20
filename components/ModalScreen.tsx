import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from '@/constants/colors';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  TextColor?: string
}>;

export function ModalScreen({ isVisible, children, onClose,title="Modal" }: Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.backDrop}>
        <View style={styles.modalContainer}>
          <View style={styles.titleBar}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.titleButton}>
              <Pressable onPress={onClose}>
                <MaterialIcons name="close" color="#fff" size={22} />
              </Pressable>
            </View>
          </View>
          <View style={styles.modalContent}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backDrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.overlayPurple
  },
  modalContainer: {
    opacity: 1.0,
    backgroundColor: colors.blue,
  },
  modalContent: {
    backgroundColor: colors.sky ,
    margin: 12,
  },
  titleBar: {
    backgroundColor: colors.blue,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    padding: 8,
    height: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    color: colors.white,
  },
  titleButton: {
    backgroundColor: colors.red,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    color: colors.white,
    fontSize: 19,
  },
});
