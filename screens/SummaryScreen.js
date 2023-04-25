import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { NativeBaseProvider, FlatList, ScrollView, Divider, Image, Spinner } from 'native-base';
import { getArticleSummary } from '../services/bot.mjs';
import Constants from 'expo-constants';

const NEWS_API_KEY = Constants.manifest.extra.NEWS_API_KEY;


export default function SummaryScreen() {
  const [newsData, setNewsData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch news articles from the News API
    fetchNewsData();
  }, []);
  
  const fetchNewsData = async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=10&apiKey=${NEWS_API_KEY}`);
      const data = await response.json();
      setNewsData(data.articles);
      setLoading(false);
  
      // Retrieve summaries for each article
      data.articles.forEach(article => {
        getSummary(article.url, article.title);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSummary = async (articleUrl, articleTitle) => {
    try {
      const summary = await getArticleSummary(articleUrl);
      // Add the summary and title to the summaryData state array
      setSummaryData(summaryData => [...summaryData, { title: articleTitle, summary }]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewsPress = (url) => {
    Linking.openURL(url);
  };

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
