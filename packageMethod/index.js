
let chunkIndex = 0
let chunkCounts = 0
const manualChunks = (id) => {
  switch (true) {
  case id.includes('.md'):
    chunkIndex += 1
    if (chunkIndex % 9 === 0) {
      chunkCounts += 1
    }
    return `article_vendor_${chunkCounts}`
  case id.includes('highlight.js'):
    return 'highlight'
  default:
    break
  }
}
module.exports = {
  manualChunks
}
