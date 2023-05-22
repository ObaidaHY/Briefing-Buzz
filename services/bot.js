//import fetch from 'node-fetch'
import { ONEAI_API_KEY } from '../config/config';
/*import { OneAI } from 'oneai';
import Constants from 'expo-constants';

const ONEAI_API_KEY = Constants.manifest.extra.ONEAI_API_KEY;
const oneai = new OneAI(ONEAI_API_KEY);

const pipeline = new oneai.Pipeline(
   oneai.skills.htmlToArticle(),
   oneai.skills.summarize()
);

*/

/*
export async function getArticleSummary(link) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': ONEAI_API_KEY
    },
    body: JSON.stringify({
      input: link,
      input_type: "article",
      output_type: "json",
      multilingual: {
        "enabled": true
      },
      steps: [
        {
          skill: "html-extract-article"
        },
        {
          skill: "summarize"
        }
      ]
    })
  };

  try {
    const response = await fetch('https://api.oneai.com/api/v0/pipeline/async', options);
    const data = await response.json();

    if (data && data['output'] && data['output']['1'] && data['output']['1']['contents'] && data['output']['1']['contents'].length > 0) {
      const summaryText = data.output[1].contents[0].utterance;
      return summaryText;
    } else {
      throw new Error('Summary text not found');
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}*/


import axios from 'axios';
import cheerio from 'cheerio';

const fetchArticleContent = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const articleContent = $('article').text(); // Assuming the article content is wrapped inside an <article> element.
    return articleContent;
  } catch (error) {
    console.error('Error:', error);
    return 'Error';
  }
};


const url = 'https://edition.cnn.com/2023/05/16/europe/kyiv-russian-missile-attack-intl-hnk/index.html'; // Replace with your actual article URL

/*fetchArticleContent(url)
  .then((articleContent) => {
    if (articleContent) {
      console.log('Article Content:', articleContent);
      // Use the article content as needed (e.g., display it in your app)
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });*/















export async function getArticleSummary(link) {
  //const txt = await fetchArticleContent(link);
  const txt = "Natural language processing (NLP) is a subfield of linguistics, computer science, and artificial intelligence concerned with the interactions between computers and human language, in particular how to program computers to process and analyze large amounts of natural language data. The goal is a computer capable of 'understanding' the contents of documents, including the contextual nuances of the language within them. The technology can then accurately extract information and insights contained in the documents as well as categorize and organize the documents themselves. Challenges in natural language processing frequently involve speech recognition, natural language understanding, and natural language generation. Based on long-standing trends in the field, it is possible to extrapolate future directions of NLP. As of 2020, three trends among the topics of the long-standing series of CoNLL Shared Tasks can be observed: Interest on increasingly abstract, 'cognitive' aspects of natural language, Increasing interest in multilinguality and Elimination of symbolic representations.";
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': ONEAI_API_KEY
  },
  body: JSON.stringify({
      input: txt,
      input_type: "article",
      output_type: "json",
      multilingual: {
        "enabled": true
      },
      steps: [
        {
          skill: "summarize"
        }
      ]
    }
  )
};

   // Edit this One AI API call using our studio at https://studio.oneai.com/?pipeline=zBBPlo&share=true
  try {
  const response = await fetch('https://api.oneai.com/api/v0/pipeline/async', options);
  const data = await response.json();
  //return data;
  //console.log(data);
  const summaryText = data.output[0].contents[0].utterance;
    
    //console.log("summaryText");
    console.log(summaryText);
    return summaryText; // returning the summary text
    //return "None";
    }catch (error) {
      console.log(error);
  }
}
//var linkk = "https://theathletic.com/4443229/2023/04/23/warriors-draymond-green-steph-curry-kings/"

//const text = await getArticleSummary("hi there, I'm obaida. computer science student at tel-aviv university. I'm 22 yaers old. I like playing chess. I believe that we were created to make earth a better place to live in.");
//console.log(text)



















/*
import { OneAI } from 'oneai';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';

const ONEAI_API_KEY = Constants.manifest.extra.ONEAI_API_KEY;

const oneai = new OneAI(ONEAI_API_KEY);

const pipeline = new oneai.Pipeline(
   oneai.skills.htmlToArticle(),
   oneai.skills.summarize()
);

export async function getArticleSummary(link) {
  let fileUri = FileSystem.documentDirectory + 'temp.html';
  
  // Download the file from the link and save it to the document directory
  await FileSystem.downloadAsync(link, fileUri);

  // Read the contents of the downloaded file
  let fileContents = await FileSystem.readAsStringAsync(fileUri);

  let content_pipe = await pipeline.run(fileContents);
  
  // Delete the temporary file
  await FileSystem.deleteAsync(fileUri);

  return (content_pipe.htmlArticle.summary.text);
}
*/



/*oneai.skills.names(),
   oneai.skills.summarize(),
   oneai.skills.highlights()*/

/*const output = await pipeline.run('Whether to power translation to document summarization, enterprises are increasing their investments in natural language processing (NLP) technologies. According to a 2021 survey from John Snow Labs and Gradient Flow, 60% of tech leaders indicated that their NLP budgets grew by at least 10% compared to 2020, while a third said that spending climbed by more than 30%');

console.log(output.summary.text);*/

/*
import axios from 'axios';

const API_KEY = ;
const ARTICLE_URL = 'https://newsapi.org/v2/top-headlines?country=us&category=business';

async function getArticleContent() {
  try {
    const response = await axios.get(ARTICLE_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });

    // Extract the article content from the response data
    const articles = response.data.articles;
    const articleContent = articles.map(article => article.content);

    return articleContent;

  } catch (error) {
    console.error(error);
  }
}

//getArticleContent().then(content => console.log(content));
var content_pipe = await getArticleContent().then(content => pipeline.run(content[0]));
console.log(content_pipe.text);
console.log(content_pipe.summary.text); // does we even summarize anything? test if we really summarize.
// what does map in javascript do? how can I read all of the article? does we even get all of the article content?
*/


//import NewsAPI from 'newsapi';
//const NewsAPI = require('newsapi');
//const newsapi = new NewsAPI(NEWS_API_KEY);

/*fetch(url)
  .then(response => response.json())
  .then(data => {
    const articles = data.articles;
    //console.log(articles);
  })
  .catch(error => console.error(error));*/

  /*
async function getArticles() {
  const topHeadlines = await newsapi.v2.topHeadlines({
    country: 'us',
    category: 'general',
    pageSize: 20
  });

  const articles = topHeadlines.articles;
  const fullArticles = [];

  for (let i = 0; i < Math.min(articles.length, 10); i++) {
    const article = articles[i];
    const response = await fetch(article.url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const content = $('article').text().trim();
    fullArticles.push(content);
  }

  return fullArticles;
}*/

/*var articles = await getArticles()

//console.log(articles);
//console.log("length :", articles.length);
//console.log(articles[7])
var content_pipe = await pipeline.run(articles[6]);
//console.log(articles[0])
//console.log(content_pipe);
console.log(content_pipe.summary.text);*/



/*
const topHeadlines = await newsapi.v2.topHeadlines({
  country: 'us',
  category: 'general',
  pageSize: 10
});
const articles = topHeadlines.articles;
for (let i = 0; i < 1; i++) {
    var content_pipe = await pipeline.run(articles[i].url);
    console.log(content_pipe.htmlArticle.summary.text);
    console.log()
}
*/





/*getArticles().then((articles) => {
   console.log(articles);
 });*/