const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const webpack = require("webpack");

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        plugins: [
            new NodePolyfillPlugin(),
            new webpack.ProvidePlugin({
                Buffer: [require.resolve("buffer/"), "Buffer"],
            }),
        ],
        resolve: {
            fallback: {
                "crypto": require.resolve("crypto-browserify"),
                "stream": require.resolve("stream-browserify"),
                "assert": require.resolve("assert/"),
                "util": require.resolve("util/"),
                "http": require.resolve("stream-http"),
                "https": require.resolve("https-browserify"),
                "os": require.resolve("os-browserify/browser"),
                // Add other fallbacks here as needed
            },
        },
    });
};
