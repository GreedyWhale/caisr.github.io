const ghpages = require('gh-pages')

ghpages.publish('dist', {
  branch: 'gh-pages',
  repo: 'git@github.com:GreedyWhale/madao.github.io.git'
}, result => console.log(result))
