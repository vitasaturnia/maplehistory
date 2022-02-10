const APP_ID = "m51lB6A8uygjdUKKwQqAt20MQrO7HHJrWxgC2RhQ";
const SERVER_URL = "https://1xzpdwatopkj.usemoralis.com:2053/server";



const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        plugins: [new NodePolyfillPlugin()],
    });
};

const webpack = require("webpack")

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        plugins: [
            new webpack.ProvidePlugin({
                Buffer: [require.resolve("buffer/"), "Buffer"],
            }),
        ],
        resolve: {
            fallback: {
                "crypto": false,
                "stream": require.resolve("stream-browserify"),
                "assert": false,
                "util": false,
                "http": false,
                "https": false,
                "os": false
            },
        },
    })
}