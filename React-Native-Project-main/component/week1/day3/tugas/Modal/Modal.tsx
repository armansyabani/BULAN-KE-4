import React from "react";
import { Modal, Text , View, Button} from "react-native";

function ModalComponent() {
    const [visible, setVisible] = React.useState(true);
    const onClose = () => {
        setVisible(false);
    }
  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <Modal
        visible={visible}
        animationType="fade"
        transparent
        onRequestClose={() => setVisible(false)} 
      >
        {/* Konten Modal */}
            <View>
                <Text>Ini adalah isi Modal</Text>
            </View>
      </Modal>
      <View>
        <Button title="Tutup Modal" onPress={onClose} />
        <Text>Ini Di luar Modal</Text>
      </View>
      </View>
  )
}

export default ModalComponent;