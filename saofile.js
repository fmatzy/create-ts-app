module.exports = {
  templateData: {
    year: new Date().getFullYear(),
  },
  prompts() {
    return [
      {
        name: 'name',
        message: 'What is the name of the new project',
        default: this.outFolder,
        filter: val => val.toLowerCase(),
      },
      {
        name: 'description',
        message: 'How would you descripe the new project',
        default: 'my awesome project',
      },
      {
        name: 'username',
        message: 'What is your GitHub username',
        default: this.gitUser.username || this.gitUser.name,
        filter: val => val.toLowerCase(),
        store: true,
      },
      {
        name: 'npmClient',
        message: 'Choose the package manager',
        type: 'list',
        choices: ['npm', 'yarn'],
        default: 'npm',
      },
    ];
  },
  actions: [
    {
      type: 'add',
      files: '**',
    },
  ],
  async completed() {
    const { npmClient } = this.answers;
    this.gitInit();
    await this.npmInstall({ npmClient });
    this.showProjectTips();
  },
};
