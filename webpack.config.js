module.exports  = {
  entry: __dirname + '/app/main.js',

  output: {
    path:__dirname,
    publicPath: '/public/',
    filename: 'public/bundle.js',
  },

  devServer: {
    inline: true,
    port: 8080
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        query: {
          presets: ['es2015', 'react', 'stage-2', ]
        }
      }
    ]
  }
};
