import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { sendOtp, verifyOtp, createProfile } from '../services/api/auth';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import type { AppDispatch } from '../store';

const AuthScreen: React.FC = () => {
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSendOtp = async () => {
    try {
      await sendOtp(mobileNumber);
      Alert.alert('OTP Sent', 'Please check your mobile for the OTP.');
      setStep(2);
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyOtp(mobileNumber, otp);
      Alert.alert('OTP Verified', 'Proceeding to profile creation or login.');
      setStep(3);
    } catch (error) {
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
    }
  };

  const handleCreateProfile = async () => {
    try {
      await createProfile(name, gender);
      Alert.alert('Profile Created', 'Redirecting to dashboard.');
      dispatch(login({ name }));
    } catch (error) {
      Alert.alert('Error', 'Failed to create profile. Please try again.');
    }
  };

  const handleLogin = () => {
    dispatch(login({ name }));
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <View>
          <Text style={styles.title}>Enter Mobile Number</Text>
          <Input
            placeholder="Mobile Number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
          />
          <Button title="Send OTP" onPress={handleSendOtp} />
        </View>
      )}

      {step === 2 && (
        <View>
          <Text style={styles.title}>Enter OTP</Text>
          <Input
            placeholder="OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
          />
          <Button title="Verify OTP" onPress={handleVerifyOtp} />
        </View>
      )}

      {step === 3 && (
        <View>
          <Text style={styles.title}>Create Profile</Text>
          <Input
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder="Gender"
            value={gender}
            onChangeText={setGender}
          />
          <Button title="Create Profile" onPress={handleCreateProfile} />
          <Button title="Login" onPress={handleLogin} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AuthScreen; 