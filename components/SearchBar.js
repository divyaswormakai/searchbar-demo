import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const SearchBar = ({placeholders, data}) => {
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [filteredData, setFilteredData] = useState(data);
  const [queryText, setQueryText] = useState('');
  const [focusStyles, setFocusStyles] = useState({});

  useEffect(() => {
    const changePlaceholder = () => {
      let index = Math.floor(Math.random() * 12);
      setPlaceholder(placeholders[index % placeholders.length]);
    };
    const changePlaceholderEvery2s = setInterval(changePlaceholder, 2000);
    return () => clearInterval(changePlaceholderEvery2s);
  }, []);

  const handleFilter = text => {
    const newData = data.filter(value => {
      return (
        value.title.toLowerCase().includes(text.toLowerCase()) ||
        value.author.toLowerCase().includes(text.toLowerCase()) ||
        value.year.toString().toLowerCase().includes(text.toLowerCase())
      );
    });
    setFilteredData(newData);
    setQueryText(text);
  };

  const clearInput = () => {
    setQueryText('');
    setFilteredData(data);
  };

  const onFocus = () => {
    const style = {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,

      elevation: 24,
    };
    setFocusStyles(style);
  };

  return (
    <>
      <View style={[focusStyles, styles.boxContainer]}>
        <TextInput
          value={queryText}
          onFocus={onFocus}
          onBlur={() => setFocusStyles({})}
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
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>- By {item.author}</Text>
                <Text style={styles.year}>Published on: {item.year}</Text>
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
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 12,
  },
  year: {
    fontSize: 11,
    marginLeft: 7,
  },
  boxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.2,
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#555',
    width: '90%',
    backgroundColor: '#fff',
  },
  inputBox: {
    height: 50,
    fontSize: 16,
    borderWidth: 0,
  },

  searchIcon: {
    color: 'grey',
  },
  backIcon: {
    color: 'grey',
  },
  resultsContainer: {
    marginTop: 20,
    width: '90%',
  },
  resultItem: {
    paddingVertical: 15,
    marginBottom: 5,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: '#888',
    borderRadius: 6,
  },
});
