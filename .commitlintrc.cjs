module.exports = {
  extends: [
    'git-commit-emoji',
    'cz'
  ],
  rules: {
    "header-max-length": [2, 'always', 120],
    "header-min-length": [2, 'always', 10]
  }
}
