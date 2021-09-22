import React from 'react';
import { StyleSheet, View } from 'react-native';

import SearchBar from './components/SearchBar';
import Data from './data.json';

const App = () => {
  const placeholders = [
    'Search by title',
    'Search by author',
    'Search by date',
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
    paddingBottom: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#57A0D3',
  },
});
