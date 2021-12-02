const path = require('path')

const Dotenv = require('dotenv-webpack');


module.exports = {
  mode: 'development',
  entry: './Src/index.js',
  output: {
    path: path.resolve(__dirname, 'Dist'),
    filename: 'bundle.js'
  },
  // plugins: [
  //   new EnvironmentPlugin({
  //     // 'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  //     "process.env": {
  //       API_KEY: process.env.API_KEY,
  //       AUTH_DOMAIN: process.env.AUTH_DOMAIN,
  //       PROJECT_ID: process.env.PROJECT_ID,
  //       STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  //       MSG_SENDER_ID: process.env.MSG_SENDER_ID,
  //       APP_ID: process.env.APP_ID
  //     },
  //     // "process.env": JSON.stringify(process.env)
  //   }),
  // ],
  plugins: [
    new Dotenv()
  ],
  watch: true
}