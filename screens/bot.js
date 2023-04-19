import { OneAI } from 'oneai';

const oneai = new OneAI('4e176a0e-a844-4060-a4fe-4a17e7ecdf56');

const pipeline = new oneai.Pipeline(
   oneai.skills.summarize()
);
/*oneai.skills.names(),
   oneai.skills.summarize(),
   oneai.skills.highlights()*/

const output = await pipeline.run('Whether to power translation to document summarization, enterprises are increasing their investments in natural language processing (NLP) technologies. According to a 2021 survey from John Snow Labs and Gradient Flow, 60% of tech leaders indicated that their NLP budgets grew by at least 10% compared to 2020, while a third said that spending climbed by more than 30%');

console.log(output.summary.text);

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


import fetch from 'node-fetch';
import NewsAPI from 'newsapi';
import cheerio from 'cheerio'
//const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('206b9ac974c74f53b9f44291c63eaeed');
const apiKey = "206b9ac974c74f53b9f44291c63eaeed";
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

/*fetch(url)
  .then(response => response.json())
  .then(data => {
    const articles = data.articles;
    //console.log(articles);
  })
  .catch(error => console.error(error));*/

async function getArticles() {
  const topHeadlines = await newsapi.v2.topHeadlines({
    country: 'us',
    category: 'general'
  });

  const articles = topHeadlines.articles;
  const fullArticles = [];

  for (let i = 0; i < Math.min(articles.length, 5); i++) {
    const article = articles[i];
    const response = await fetch(article.url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const content = $('article').text().trim();
    fullArticles.push(content);
  }

  return fullArticles;
}

var articles = await getArticles()

//console.log(articles[0]);
var content_pipe = await pipeline.run(articles[0]);
console.log(content_pipe);
console.log(content_pipe.summary.text);






/*getArticles().then((articles) => {
   console.log(articles);
 });*/