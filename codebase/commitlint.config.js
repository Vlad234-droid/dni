module.exports = {
  rules: {
    'tesco-jira': [2, 'always'],
    'subject-case': [0, 'never']
  },
  plugins: [
    {
      rules: {
        'tesco-jira': ({subject}) => {
          const jiraRegExp = /^(UNTRACKED)|(TESCO-\d{1,5})/;
          return [
            jiraRegExp.test(subject),
            `Your subject should contain jira task link`,
          ];
        },
      },
    },
  ],
  extends: [
    "@commitlint/config-conventional",
    "@commitlint/config-lerna-scopes",
  ],
};
