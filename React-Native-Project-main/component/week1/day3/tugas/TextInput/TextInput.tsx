import React from "react";
import { TextInput } from "react-native";

function TextInputExample() {
    return(
        <TextInput
        placeholder="Masukkan Nama"
        style={{
          borderWidth: 1,
          borderColor: 'yellow',
            width: 200,
            backgroundColor: 'white',
        }}
        onChangeText={nama => console.log(nama)}
        keyboardType="default"
    />
    );
}

export default TextInputExample;