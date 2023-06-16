import axios from 'axios';

export async function summarizeArticle(url){
  const apiUrl = 'http://localhost:5000/summarize';

  try {
    const response = await axios.post(apiUrl, { url });

    if (response.status !== 200) {
      throw new Error('Error occurred while summarizing the article');
    }

    return response.data.summary;
  } catch (error) {
    console.error(error);
  }
};