import MarkdownIt from 'markdown-it'

const markdownIt = new MarkdownIt()

const markDownFormat = description =>
  description ? markdownIt.render(description) : null

export default markDownFormat
