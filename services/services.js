import {API_KEY} from '../config/config';
const endpoint = "https://newsapi.org/v2/top-headlines";
const country = 'us';

export async function services(category = 'general') {
    let articles = await fetch(`${endpoint}?country=${country}&category=${category}`, {
        headers: {
            'X-API-KEY': API_KEY
        }
    });

    let result = await articles.json();
    articles = null;

    return result.articles;
}