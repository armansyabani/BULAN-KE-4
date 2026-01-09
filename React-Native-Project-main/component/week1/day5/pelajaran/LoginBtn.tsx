import React, { useState } from 'react';
import {
  Pressable,
  Button,
  Alert,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableNativeFeedback
} from 'react-native';

function LoginBtn() {
    const [rippleColor, setRippleColor] = useState('red');
    const [rippleOverflow, setRippleOverflow] = useState(false);
  const [count, setCount] = useState(0);
  const handleCount = () => {
    setCount(count + 1);
  };
  const handleLogin = () => {
    Alert.alert('Login Berhasil');
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Login Page</Text>
      {/* {----Penggunaan Button Pada Android----} */}
      <Button title="Login" onPress={handleLogin} color={'#2196F3'} />
        {/*{----Penggunaan Pressable----} */}
      <Pressable
        onPress={() => Alert.alert('Pressable Sekali Klik')}
        onLongPress={() => Alert.alert('Pressable Di Klik Lama')}
        disabled={false}
      >
        <View
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: '#4CAF50',
            borderRadius: 5,
          }}
        >
          <Text style={{ color: '#fff' }}>Register</Text>
        </View>
      </Pressable>
          {/* {----Penggunaan TouchableOpacity----} */}
      <TouchableOpacity
        disabled={false}
        activeOpacity={0.5}
        style={{
          backgroundColor: '#f44336',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ marginTop: 20 }}>Lupa Password?</Text>
      </TouchableOpacity>
        {/* {----Penggunaan TouchableHighlight----} */}
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#0bed5aff"
        onPress={() => Alert.alert('Help di Klik')}
      >
        <Text style={{ marginTop: 20 }}>Help</Text>
      </TouchableHighlight>
        {/* {----Penggunaan TouchableWithoutFeedback----} */}
      <View>
        <Text>Count: {count}</Text>
      </View>
      <TouchableWithoutFeedback onPress={handleCount}>
        <View style={styles.button}>
          <Text>Tambah Count</Text>
        </View>
      </TouchableWithoutFeedback>
        {/* {----Penggunaan TouchableNativeFeedback----} */}
        <View style={styles.container1}>
        <TouchableNativeFeedback
            onPress={() => {
                setRippleColor('#f5118edd')
                setRippleOverflow(!rippleOverflow)
            }}
            background={TouchableNativeFeedback.Ripple(rippleColor,rippleOverflow)}
        >
            <View style={styles.touchable}>
            <Text style={styles.text}>Touchable Native Feedback</Text>
            </View>
        </TouchableNativeFeedback>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  countText: {
    color: '#FF00FF',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  touchable: {
    flex: 0.33,
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    alignSelf: 'center',
  },
});

export default LoginBtn;
