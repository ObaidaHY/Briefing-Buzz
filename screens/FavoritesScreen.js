import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CATEGORIES = [
  { name: 'Politics', value: 'politics' },
  { name: 'Sports', value: 'sports' },
  { name: 'Technology', value: 'technology' },
  { name: 'Entertainment', value: 'entertainment' },
];

const FavoritesScreen = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    const index = selectedCategories.indexOf(category);
    if (index === -1) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      const newCategories = [...selectedCategories];
      newCategories.splice(index, 1);
      setSelectedCategories(newCategories);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Categories:</Text>
      {CATEGORIES.map((category) => (
        <TouchableOpacity
          key={category.value}
          onPress={() => toggleCategory(category.value)}
          style={[
            styles.category,
            selectedCategories.includes(category.value) && styles.selected,
          ]}
        >
          <Text style={styles.categoryName}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  category: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
  },
  selected: {
    backgroundColor: '#ccc',
  },
});

export default FavoritesScreen;
