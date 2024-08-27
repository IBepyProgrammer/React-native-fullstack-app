import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'

import { useGlobalContext } from '../../context/GlobalProvider'


import { createUser } from '../../lib/appwrite'

const SignUp = () => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
// After creating logic for sign Up in database, we check if there is data on the form fields.
// If there is no form.username or form.password or form.email, We issue an alert(using Alert.alert from reactNative)
// The alert will be of type "Error" i.e the title followed up with the message to be displayed.
    if(!form.username ==="" || !form.email ==="" || !form.password===""){
      Alert.alert("Error", "Please fill required fields")
    }

// If we do have all the fields, we set the hook, "setIsSubmitting to true"
// We then open a new try and catch block. In the catch we pass an (Alert.alert)
// We then add a finally clause where the "setIsSubmitting" is false because if we got an error or signed-Up, the loading is done.
// In the try block, we call the createUser function and pass in the email, password and username.
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username)
      // the two lines of code below were added later. This is because they were set to global state using context.
      setUser(result)
      setIsLoggedIn(true)

      // we then use the router function from Expo-Router to replace the route to home.
      router.replace('/home')
    } catch (error) {
      Alert.alert("Error", error.message)
    }finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign Up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form, username: e})}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign in</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp