import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, FlatList, ScrollView, Divider, Image, Spinner } from 'native-base';
import { services } from '../services/services';
import moment from 'moment';

export default function FavoritesScreen({ navigation, route }) {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params?.selectedCategories) {
      const selectedCategories = route.params.selectedCategories;
      fetchNewsData(selectedCategories);
    }
  }, [route.params?.selectedCategories]);

  const fetchNewsData = (selectedCategories) => {
    setLoading(true);
    if (selectedCategories.length > 0) {
      const categoryString = selectedCategories.join(',');

      services(categoryString)
        .then((data) => {
          setNewsData(data);
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <NativeBaseProvider>

        
        
          <FlatList
            data={newsData}
            renderItem={({ item }) => (
              <View>
                <View style={styles.newsContainer}>
                  <TouchableOpacity  onPress={() => Linking.openURL(item.url)}>
                    <View>
                      <Image
                        width={550}
                        height={250}
                        resizeMode={'cover'}
                        source={{
                          uri: item.urlToImage,
                        }}
                        alt="Alternate Text"
                      />
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.date}>{moment(item.publishedAt).format('LLL')}</Text>
                      <Text style={styles.newsDescription}>{item.description}</Text>
                    </View>
                  </TouchableOpacity >
                </View>
                <Divider my={2} bg="#e0e0e0" />
              </View>
            )}
                keyExtractor={(item) => item.id}
              />

      
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 20,
    
  },
  categorySelectionContainer: {
    marginBottom: 20,
  },
  categorySelectionText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  categorySelectionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  categoryButtonText: {
    color: '#333',
    fontSize: 14,
  },
  getNewsButton: {
    backgroundColor: '#4285f4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  getNewsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsContainer: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  date: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 10,
  },
  newsDescription: {
    fontSize: 14,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noDataText: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
  },
});
