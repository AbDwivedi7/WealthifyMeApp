import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { sendOtp, verifyOtp, createProfile } from '../services/api/auth';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import type { AppDispatch } from '../store';
import { colors } from '@/theme';

const AuthScreen: React.FC = () => {
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSendOtp = async () => {
    if (!/^\d{10}$/.test(mobileNumber)) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    try {
      await sendOtp(mobileNumber);
      Alert.alert('OTP Sent', 'Please check your mobile for the OTP.');
      setStep(2);
      setResendDisabled(true);
      setTimeout(() => setResendDisabled(false), 30000); // 30s cooldown
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
    <View style={styles.screen}>
      <View style={styles.card}>
        {step === 1 && (
          <>
            <Text style={styles.title}>Verification</Text>
            <Text style={styles.subtitle}>
              We will send you a <Text style={styles.bold}>One Time Password</Text> on your phone number
            </Text>
            <Input
              placeholder="Enter Phone Number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              style={styles.input}
            />
            <Button title="GET OTP" onPress={handleSendOtp} disabled={!/^\d{10}$/.test(mobileNumber)} />
          </>
        )}
        {step === 2 && (
          <>
            <Text style={styles.title}>Verification</Text>
            <Text style={styles.subtitle}>
              You will get a OTP via <Text style={styles.bold}>SMS</Text>
            </Text>
            <Input
              placeholder="••••"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              style={styles.input}
              secureTextEntry
              maxLength={6}
            />
            <Button title="VERIFY" onPress={handleVerifyOtp} />
            <Text style={styles.resendText}>
              Didn't receive the verification OTP?{' '}
              <TouchableOpacity disabled={resendDisabled} onPress={handleSendOtp}>
                <Text style={[styles.resendLink, resendDisabled && styles.resendDisabled]}>Resend again</Text>
              </TouchableOpacity>
            </Text>
          </>
        )}
        {step === 3 && (
          <>
            <Text style={styles.title}>Create Profile</Text>
            <Input
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <Input
              placeholder="Gender"
              value={gender}
              onChangeText={setGender}
              style={styles.input}
            />
            <Button title="Create Profile" onPress={handleCreateProfile} />
            <Button title="Login" onPress={handleLogin} />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  card: {
    width: '90%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: colors.secondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  input: {
    width: 260,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 18,
    backgroundColor: colors.background,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    width: 260,
    height: 48,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontSize: 13,
    color: colors.secondary,
    marginTop: 8,
    textAlign: 'center',
  },
  resendLink: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  resendDisabled: {
    color: colors.disabled,
  },
});

export default AuthScreen; 