import React from 'react';
import { FlatList, View, Text } from 'react-native';
import SummaryItem from './SummaryItem';

const SummaryList = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>{item.headline}</Text>
          <SummaryItem summary={item.summary} />
        </View>
      )}
    />
  );
};

export default SummaryList;
