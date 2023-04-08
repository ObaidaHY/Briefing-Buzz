import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { NativeBaseProvider, FlatList, ScrollView, Divider, Image, Spinner } from 'native-base';
import { services } from '../services/services';
import moment from 'moment';
import axios from 'axios';

const NEWS_API_KEY = '206b9ac974c74f53b9f44291c63eaeed';
const MEANINGCLOUD_KEY = '5c325ff1ee93843e5fa2e7169fb102dc';
const MEANINGCLOUD_URL = 'https://api.meaningcloud.com/summarization-1.0';

export default function SummaryScreen() {
  const [newsData, setNewsData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch news articles from the News API
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`)
      .then(response => {
        setNewsData(response.data.articles);
        setLoading(false);
  
        // Retrieve summaries for each article
        response.data.articles.forEach(article => {
          getSummary(article.url, article.title);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  

  const getSummary = (articleUrl, articleTitle) => {
    // Send the article to MeaningCloud for summarization
    const data = {
      key: MEANINGCLOUD_KEY,
      url: articleUrl,
      sentences: 3
    };

    axios.post(MEANINGCLOUD_URL, data)
      .then(response => {
        // Add the summary and title to the summaryData state array
        setSummaryData(summaryData => [...summaryData, { title: articleTitle, summary: response.data.summary }]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleNewsPress = (url) => {
    Linking.openURL(url);
  }

  return (
    <NativeBaseProvider>
      <ScrollView height={850}>
        {loading ? (
          <View style={styles.spinner}>
            <Spinner color="danger.400" />
          </View>
        ) : (
          <FlatList
            data={summaryData}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleNewsPress(item.url)}>
                <View>
                  <Text style={styles.summaryTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.summaryDescription}>
                    {item.summary}
                  </Text>
                  <Divider my={2} bg="#e0e0e0" />
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  summaryContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  summaryTitle: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
  },
  summaryDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
});
