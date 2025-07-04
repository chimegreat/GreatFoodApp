import { View, Text, Alert, KeyboardAvoidingView,TouchableOpacity, Platform, ScrollView , TextInput} from 'react-native'
import React, { useState } from 'react'
import {useSignUp} from "@clerk/clerk-expo";
import {useRouter} from "expo-router";
import { authStyles } from '../../assets/styles/auth.styles';
import { Image } from 'expo-image';
import { COLORS } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import VerifyEmail from "./verify-email";

const SignUpScreen = () => {
  const router = useRouter();
  const {isLoaded ,  signUp} = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pendingVerification, setPendingVerification] = useState(false)

  const handleSignUp = async () =>{
    if(!email || !password) return Alert.alert("Error","Please Fill in all the fields");
    if(password.length < 6) return Alert.alert("Error", "Password must be at least 6 characters")
    if(!isLoaded) return;

    setLoading(true);

    try {
      await signUp.create({emailAddress:email,password})
      
      await signUp.prepareEmailAddressVerification({strategy: "email_code"})
      
      setPendingVerification(true)
    } catch (err){
      Alert.alert("Error", err.errors?.[0]?.message || "failed to create account");
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setLoading(false)
    }
  };
  
  if(pendingVerification) return <VerifyEmail email={email} onBack={ () => setPendingVerification(false) } /> ;

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      style={authStyles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* image container */}
          <View style={authStyles.imageContainer}>
          <Image
              source={require("../../assets/images/i2.png")}
              style={authStyles.image}
              contentFit='contain'
          />
          </View>

          <Text style={authStyles.title}>Create Account</Text>

          <View style={authStyles.formContainer}>
            {/* Email Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
              style={authStyles.textInput}
              placeholder="Enter email"
              placeholderTextColor={COLORS.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              />
            </View>

            {/*Passwrod input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder='Enter password'
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize='none'
              />

           <TouchableOpacity
              style={authStyles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.textLight} 
                  />
           </TouchableOpacity>
            </View>

            {/* SignUp Button */}
             <TouchableOpacity
                style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
                onPress={handleSignUp}
                disabled={loading}
                activeOpacity={0.8}
                >
                <Text style={authStyles.buttonText}>
                    {loading ? "Creating Account..." : "Sign Up"} 
                </Text>
             </TouchableOpacity>
  
            {/*Sign Up Link */}
              <TouchableOpacity
                  style={authStyles.linkContainer}
                  onPress={ () => {router.back() && router.push("/(auth)/sign-up")} }>
                <Text style={authStyles.linkText}>
                      Already Have an account? <Text style={authStyles.link}>SignIn </Text>
                </Text>
              </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* <Text>SignUpScreen</Text> */}
    </View>
  )
}

export default SignUpScreen