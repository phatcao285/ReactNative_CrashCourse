import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  StatusBar, 
  ImageBackground,
  FlatList,
  Alert,
  Modal
} from 'react-native';

// Sample user data
const userAccounts = [
  { id: '1', username: 'trainer1', password: 'pikachu123' },
  { id: '2', username: 'trainer2', password: 'charizard456' },
  { id: '3', username: 'trainer3', password: 'bulbasaur789' },
  { id: '4', username: 'test', password: 'test' },
];

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAccounts, setShowAccounts] = useState(false);
  const [showLoginInfo, setShowLoginInfo] = useState(false);

  const handleLogin = () => {
    setShowLoginInfo(true);
    
    const user = userAccounts.find(
      (account) => account.username === username && account.password === password
    );

    if (user) {
      console.log('Login successful!');
    } else {
      console.log('Invalid username or password');
    }
  };

  const handleRegister = () => {
    setShowAccounts(!showAccounts);
  };

  const handleSelectAccount = (item) => {
    setUsername(item.username);
    setPassword(item.password);
    setShowAccounts(false);
  };

  const renderAccountItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.accountItem} 
      onPress={() => handleSelectAccount(item)}
    >
      <Text style={styles.accountText}>{item.username}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#333" barStyle="light-content" />
      
      <ImageBackground
        source={require('../assets/bubble_background.png')}
        style={styles.backgroundImage}
      >
        {/* Header time */}
        <View style={styles.header}>
          <Text style={styles.timeText}>12:45</Text>
        </View>

        {/* Pokémon GO Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/pokemongo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          {/* Register Button */}
          <View style={styles.registerContainer}>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerText}>REGISTER</Text>
            </TouchableOpacity>
          </View>

          {/* Username Input */}
          <TextInput
            style={styles.input}
            placeholder="USERNAME"
            placeholderTextColor="#555"
            value={username}
            onChangeText={setUsername}
          />

          {/* Password Input */}
          <TextInput
            style={styles.input}
            placeholder="PASSWORD"
            placeholderTextColor="#555"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Login Button */}
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          {/* Account Selection FlatList */}
          {showAccounts && (
            <View style={styles.accountsContainer}>
              <Text style={styles.accountsTitle}>Select an account:</Text>
              <FlatList
                data={userAccounts}
                renderItem={renderAccountItem}
                keyExtractor={item => item.id}
                style={styles.accountsList}
              />
            </View>
          )}
        </View>
      </ImageBackground>

      {/* Modal to display entered login information */}
      <Modal
        visible={showLoginInfo}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLoginInfo(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Login Information</Text>
            
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Username:</Text>
              <Text style={styles.infoValue}>{username}</Text>
            </View>
            
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Password:</Text>
              <Text style={styles.infoValue}>{password}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowLoginInfo(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: '#4caf50', // Fallback color if image doesn't load
  },
  header: {
    height: 40,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  timeText: {
    color: 'white',
    fontSize: 16,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  logo: {
    width: 250,
    height: 100,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#f1c40f', // Yellow background for form
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  registerContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  registerText: {
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#e74c3c', // Red login button
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 20,
    borderRadius: 10,
    padding: 15,
    maxHeight: 200,
  },
  accountsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  accountsList: {
    flex: 1,
  },
  accountItem: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    padding: 12,
    borderRadius: 5,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4caf50',
  },
  accountText: {
    fontSize: 14,
    color: '#333',
  },
  // Modal styles
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    width: '100%',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '40%',
    color: '#2c3e50',
  },
  infoValue: {
    fontSize: 16,
    width: '60%',
    color: '#34495e',
  },
  closeButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;