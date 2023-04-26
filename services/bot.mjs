//import fetch from 'node-fetch'
/*import { OneAI } from 'oneai';
import Constants from 'expo-constants';

const ONEAI_API_KEY = Constants.manifest.extra.ONEAI_API_KEY;
const oneai = new OneAI(ONEAI_API_KEY);

const pipeline = new oneai.Pipeline(
   oneai.skills.htmlToArticle(),
   oneai.skills.summarize()
);

*/
export async function getArticleSummary(link) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': "442f0ab5-ea18-470d-b5b7-96a5a0f2f5c3"
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
    }
  )
};

   // Edit this One AI API call using our studio at https://studio.oneai.com/?pipeline=zBBPlo&share=true
  try {
  const response = await fetch('https://api.oneai.com/api/v0/pipeline/async', options);
  const data = await response.json();
  return data;
  console.log(data);
  //const summaryText = response.output[1].contents[0].utterance;
    
    //console.log("summaryText");
    //return summaryText; // returning the summary text
    }catch (error) {
      console.log(error);
  }
  //let content_pipe = await pipeline.run(link);
  //return (content_pipe.htmlArticle.summary.text);
  //return 'abcd';
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

const API_KEY = '206b9ac974c74f53b9f44291c63eaeed';
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