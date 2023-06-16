from flask import Flask, request, jsonify
from flask_cors import CORS
import oneai

app = Flask(__name__)
CORS(app)


@app.route('/summarize', methods=['POST'])
def summarize():
    url = request.json['url']
    oneai.api_key = '<your-oneai-api>'

    extract = oneai.Pipeline(
        steps=[
            oneai.skills.HtmlToArticle()
        ]
    )

    summ = oneai.Pipeline(
        steps=[
            oneai.skills.Summarize()
        ]
    )

    text = extract.run(url).text
    output = summ.run(text)
    summarized_text = output.summary.text

    try:

        return jsonify({'summary': summarized_text})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
