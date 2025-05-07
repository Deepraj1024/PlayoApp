import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StackNavigator from "./navigation/StackNavigator";
import { AuthProvider } from "./AuthContext";
import ModalPortal from 'react-native-modals'
const App = () => {
  return (
    <AuthProvider>
    <StackNavigator/>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});

// mongodb+srv://deepraj:<db_password>@cluster0.wagf6is.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0