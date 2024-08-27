import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    // Note the other styles have been added to the view incase we want to modify the styles for each specific element
    // The other styles creates margins and spaces each of the form fields
    <View className={`space-y-2 ${otherStyles}`}>

      {/* In the code below we render the title instead of the form field */}
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
            className="flex-1 text-white font-semibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            // The code below works when typing a password. Password is hidden when being typed.
            secureTextEntry={title === 'Password' && !showPassword}
        />
        {/* The code below allows users to toggle the password field fro visible to hidden */}
        {title === 'Password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={!showPassword? icons.eye : icons.eyeHide}
                    className="w-6 h-6"
                    resizeMode="contain"
                />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField