import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const SearchBar = ({placeholders, data}) => {
  var index = 0;
  const [placeholder, setPlaceholder] = useState(placeholders[index]);
  const [filteredData, setFilteredData] = useState(data);
  const [queryText, setQueryText] = useState('');
  var count = placeholders.length;

  useEffect(() => {
    const changePlaceholder = () => {
      index = (index + 1) % count;
      setPlaceholder(placeholders[index]);
    };
    // Interval of 5000ms to change the timer.
    const changePlaceholderEvery2s = setInterval(changePlaceholder, 5000);
    return () => clearInterval(changePlaceholderEvery2s);
  }, []);

  const handleFilter = text => {
    console.log(text);
    const newData = data.filter(value => {
      return value.title.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredData(newData);
    setQueryText(text);
  };

  const clearInput = () => {
    setQueryText('');
    setFilteredData(data);
  };

  return (
    <>
      <View style={styles.boxContainer}>
        <TextInput
          value={queryText}
          style={styles.inputBox}
          placeholder={placeholder}
          onChangeText={text => handleFilter(text)}
        />
        {queryText.length === 0 ? (
          <Icon
            style={styles.searchIcon}
            name="search"
            size={24}
            color="black"
          />
        ) : (
          <Icon
            style={styles.searchIcon}
            onPress={clearInput}
            name="remove"
            size={24}
            color="black"
          />
        )}
      </View>
      {filteredData.length != 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={filteredData}
          keyExtractor={item => {
            return item.title;
          }}
          style={styles.resultsContainer}
          renderItem={({item}) => {
            return (
              <View style={styles.resultItem}>
                <Text>{item.title}</Text>
              </View>
            );
          }}
        />
      )}
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  boxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.2,
    borderRadius: 2,
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#555',
    width: '90%',
  },
  inputBox: {
    height: 50,
    fontSize: 18,
    width: '90%',
  },
  searchIcon: {
    color: 'grey',
    width: '10%',
    textAlign: 'center',
  },
  backIcon: {
    color: 'grey',
  },
  resultsContainer: {
    marginTop: 10,
    width: '90%',
  },
  resultItem: {
    paddingVertical: 15,
    width: '100%',
    paddingHorizontal: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: '#888',
  },
});
