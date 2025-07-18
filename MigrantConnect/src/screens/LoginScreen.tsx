import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }: any) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.API_BASE_URL}/api/auth/login`, { phone, password });
      Alert.alert('Success', 'Login successful!');
      if (navigation) navigation.navigate('Welcome', { user: res.data.user });
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Login failed';
      if (errorMsg === 'User not found') {
        Alert.alert('Error', 'No user exists with the given credentials.');
      } else if (errorMsg === 'Invalid password') {
        Alert.alert('Error', 'Incorrect password.');
      } else {
        Alert.alert('Error', errorMsg);
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Phone</Text>
      <TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Login" onPress={handleLogin} />
      {navigation && (
        <Button title="Don't have an account? Register" onPress={() => navigation.navigate('Register')} />
      )}
    </View>
  );
} 