const NODE_ENV = (process.env.NODE_ENV || 'development').trim();
const MODE = NODE_ENV === 'development' ? 'development' : 'production';

function isMax(mq) {
  return /max-width/.test(mq);
}

function isMin(mq) {
  return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
  let A = a.replace(/\D/g, '');
  let B = b.replace(/\D/g, '');
  
  switch (true) {
    case (isMax(a) && isMax(b)): return B - A;
    case (isMin(a) && isMin(b)): return A - B;
    case (isMin(a) && isMax(b)): return -1;
    case (isMax(a) && isMin(b)): return 1;    
    default                    : return 1;
  }
};

const plugins = {
  'autoprefixer': require('autoprefixer')(),

  'css-mqpacker': require('css-mqpacker')({
    sort: sortMediaQueries
  }),

  'postcss-csso': require('postcss-csso')({
    restructure: false,
    comments: false
  })
};

const commonPlugins = [
  plugins['autoprefixer']
];

const envPlugins = {
  'production': [
      plugins['css-mqpacker'], plugins['postcss-csso']
  ],
  'development': []
};

var config = {
  plugins: [
      ...commonPlugins,
      ...envPlugins[MODE]
  ]
};

module.exports = config;
