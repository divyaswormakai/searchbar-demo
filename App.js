import React from 'react';
import { StyleSheet, View } from 'react-native';

import SearchBar from './components/SearchBar';
import Data from './data.json';

const App = () => {
  const placeholders = [
    'Placeholder 1',
    'Placeholder 2',
    'Placeholder 3',
    'Placeholder 4',
  ];

  return (
    <View style={styles.container}>
      <SearchBar placeholders={placeholders} data={Data} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    marginBottom: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
