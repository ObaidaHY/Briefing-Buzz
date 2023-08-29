import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';

// Options data must contain 'item' & 'id' keys
const K_OPTIONS = [
  {
    item: 'Business',
    id: 'business',
  },
  {
    item: 'Entertainment',
    id: 'entertainment',
  },
  {
    item: 'Health',
    id: 'health',
  },
  {
    item: 'Science',
    id: 'science',
  },
  {
    item: 'Sports',
    id: 'sports',
  },
  {
    item: 'Technology',
    id: 'technology',
  }
]

function FavSelect({navigation}) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const onMultiChange = (item) => {
    setSelectedCategories(xorBy(selectedCategories, [item], 'id'));
  };

  const navigateToFavorites = () => {
    let selected = [];
    for (let i = 0; i < selectedCategories.length; i++){
        selected.push(selectedCategories[i].id);
    }
    navigation.navigate('View', {
      selectedCategories: selected, // Pass selectedCategories as a parameter
    });
  };

  return (
    <View>
      <View style={{ margin: 25 }}>
        <View style={{ height: 20 }} />
        <Text style={{ fontSize: 16, paddingBottom: 20, fontWeight: 'bold' }}>
          Select your preferred news categories:
        </Text>
        <SelectBox
          label=""
          options={K_OPTIONS}
          selectedValues={selectedCategories}
          onMultiSelect={onMultiChange}
          onTapClose={onMultiChange}
          isMulti
        />
      </View>
      <Button
        title="Get News"
        disabled={selectedCategories.length === 0}
        onPress={navigateToFavorites} // Call the navigation function
      />
    </View>
  );
}

export default FavSelect;




