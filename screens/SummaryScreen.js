import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SummaryScreen = () => {
  const navigation = useNavigation();
  const [articles, setArticles] = useState([]);
  const [summary, setSummary] = useState('');
  const [numArticles, setNumArticles] = useState('');

  const summarizeArticles = () => {
    if (!numArticles) {
      alert('Please enter the number of articles to summarize.');
      return;
    }

    const url = `https://api.meaningcloud.com/summarization-1.0?key=${process.env.MEANINGCLOUD_API_KEY}&sentences=${numArticles}&url=`;
    const articleUrls = articles.map(article => article.url);
    const articlePromises = articleUrls.map(url => axios.get(`${url}&key=${process.env.MEANINGCLOUD_API_KEY}`));

    Promise.all(articlePromises)
      .then(responses => {
        const articlesTexts = responses.map(response => response.data.summary);
        const joinedText = articlesTexts.join('. ');
        axios.post(url, joinedText)
          .then(response => {
            const summary = response.data.summary;
            setSummary(summary);
          })
          .catch(error => {
            console.log(error);
            alert('Failed to summarize articles.');
          });
      })
      .catch(error => {
        console.log(error);
        alert('Failed to fetch articles.');
      });
  };

  useEffect(() => {
    const apiKey = '[206b9ac974c74f53b9f44291c63eaeed]';
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    axios.get(url)
      .then(response => {
        const articles = response.data.articles;
        setArticles(articles);
      })
      .catch(error => {
        console.log(error);
        alert('Failed to fetch articles.');
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {articles.map((article, index) => (
          <TouchableOpacity key={index} style={styles.articleContainer}>
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleDescription}>{article.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.numArticlesInput}
          placeholder="Number of articles to summarize"
          keyboardType="numeric"
          onChangeText={text => setNumArticles(text)}
        />
        <TouchableOpacity style={styles.summarizeButton} onPress={summarizeArticles}>
          <Text style={styles.summarizeButtonText}>Summarize</Text>
        </TouchableOpacity>
      </View>
      {summary ? (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  articleContainer: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  articleDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
  },
  numArticlesInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  summarizeButton: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 5,
  },
  summarizeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  summaryContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginTop: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
  },
});


export default SummaryScreen;
