import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import './config/ReactotronConfig';

const App: React.FC = () => {
  useEffect(() => {
    console.tron.log('Hello');
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <View style={styles.container}>
        <Text style={styles.title}>Hello</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7159c1',
  },
  title: {
    fontSize: 30,
    color: '#FFF',
  },
});

export default App;
