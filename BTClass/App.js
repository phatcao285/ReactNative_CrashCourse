import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Login from './BTBuoi2/Login'; // Adjust this path based on your project structure

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Login />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;