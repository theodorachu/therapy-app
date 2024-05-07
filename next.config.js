require('dotenv').config();
const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {}

//module.exports = nextConfig
module.exports = {
  webpack: (config, {isServer}) => {
    if(isServer) {
      config.plugins.push(new webpack.EnvironmentPlugin({
        OAI_KEY: process.env.OAI_KEY,}));
    }
    return config;
  },
};