# Briefing Buzz

Welcome to Briefing Buzz! This app was created using Expo, a free and open-source platform for building React Native apps.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [API Keys](#api-keys)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Running the App](#running-the-app)
- [Built With](#built-with)
- [Contributing](#contributing)

## Disclaimer

Please note that this app is still a work in progress. The Brief feature needs final refinements, and the app may not have a polished user interface. We are actively working on improving the app's design and user experience, and appreciate any feedback or suggestions you may have.<br />
You may encounter bugs or unexpected behavior while using this app!<br />

## Getting Started

To get started with this project, clone the repository to your local machine and install the necessary dependencies.<br />

```bash
git clone https://github.com/ObaidaHY/Briefing-Buzz.git
cd briefing-buzz
npm install
```

## Prerequisites

Before you can run this app, you'll need to install Expo CLI. You can do this by running the following command:<br />

```bash
npm install -g expo-cli
```

You'll also need to install the required Python dependencies for the server. Make sure you have Python 3 and pip installed. Then, navigate to the Server directory and run the following command:<br />

```bash
pip3 install -r pythonReq.txt
```

<br />

## API Keys

To use Briefing Buzz, you will need to obtain API keys for **TWO** services: ONE AI and News API.<br />

- To get a **ONE AI API key**, visit the [ONE AI website](https://oneai.com/) and sign up for an account. Once you have signed up, you can access your API key in the account settings section.<br />
- To get a **News API key**, visit the [News API website](https://newsapi.org/) and sign up for an account. Once you have signed up, you can access your API key in the dashboard section.<br />
  <br />

Once you have obtained both API keys, create a new folder called **config** in the root directory of the project and define a **config.js** file in that folder with the API keys, like this:

```arduino
export const API_KEY = "insert your News API key here";
export const ONEAI_API_KEY = "insert your ONEAI API key here";
```

Replace with your actual API keys.
<br />
Also make sure to replace `<your-oneai-api>` with your actual ONEAI API key in the `main.py` file.<br />

## Installation

Once you have cloned the repository and installed the necessary dependencies, you can run the app on your local machine.

```bash
npm start
```

This will start the Expo development server and open the app in your default browser. You can then use the Expo app on your mobile device to scan the QR code and view the app.
<br />

## Running the Server

Before running the app, you need to start the server. In a separate terminal, navigate to the Server directory and run the following command:

```bash
python main.py
```

Or simply run the main.py python file.<br />
This will start the Flask server and enable the backend functionality of the app.
<br />

## Running the App

To run the app on your mobile device, you'll need to download the Expo app from the App Store or Google Play. Once you have the Expo app installed, you can scan the QR code generated by `npm start` and view the app.
<br />

## Built With

- Expo - A free and open-source platform for building React Native apps.<br />
- React Native - A JavaScript framework for building native mobile apps.<br />
- React Navigation - A routing and navigation library for React Native apps.<br />
- Flask - A micro web framework for building server-side applications.<br />
  ... and more (see package.json for full list).
  <br />

## Contributing

If you would like to contribute to this project, please open an issue or pull request on the GitHub repository.
