const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

module.exports = {
    ...defaultConfig,
    entry: {
        relation: './src/relation/relation.jsx',
        dl: './src/dl/dl.jsx',
        profile: './src/profile/profile.jsx',
        columns: './src/columns/columns.jsx',
        speech: './src/speech/speech.jsx',
        button: './src/button/button.jsx',
        cv: './src/cv/cv.jsx',
        toc: './src/toc/toc.jsx',
        description: './src/description/description.jsx',
        preview: './src/preview/preview.jsx',
    },
    resolve: {
        ...defaultConfig.resolve,
        extensions: ['.tsx', '.ts', 'js', 'jsx'],
    },
    output: {
        path: path.join(__dirname, './../theme/blocks/build'),
        filename: '[name].js',
    },
};
