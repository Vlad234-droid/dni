const fs = require('fs');
const childProcess = require('child_process');
const Commons = require('./commons');

Commons.displayMessage('Node started', Commons.Colors.FgBlue);

const getGitHash = () =>
  childProcess
    .execSync('git rev-parse --short HEAD')
    .toString()
    .trim();

const getImageName = (config) => {
  const appName = config?.app?.name || '';
  return `${process.env.ACR_URL}/${process.env.ENV}/${appName}:${getGitHash()}`;
};

const buildDockerCommand = (config, buildArgs) => {
  const mapToArg = (key) => `--build-arg ${key}=$${key}`;
  const dockerArgs = Object.keys(buildArgs).map(mapToArg);

  const result = [
    'docker build',
    `--tag ${getImageName(config)}`,
    ...dockerArgs,
    `-f ${config.build?.dockerFileDirectory || './Dockerfile'} .`,
  ];
  return result.join(' \\\n');
};

const appendIgnoredFiles = () => {
  fs.appendFileSync(
    '.dockerignore',
    [
      '',
      '# Build files',
      'secrets.json',
      'config.json',
      'build-docker-shell-scripts.js',
      'build.sh',
      'push.sh',
      'cleanup.sh',
    ].join('\n'),
  );
};

try {
  appendIgnoredFiles();

  Commons.displayMessage(
    'Files to ignore added to .dockerignore',
    Commons.Colors.FgGreen,
  );

  const secrets = require('./secrets.json');
  const config = require('./config.json');
  const imageName = getImageName(config);
  const buildArgs = config?.build?.args || {};
  const buildShContentLines = Object.keys(buildArgs).map((key) => {
    const { type, name, value } = buildArgs[key];
    switch (type) {
      case 'plain':
        return `${key}=${value}`;
      case 'secret':
        return `${key}=${secrets.secrets[name]}`;
    }
  });

  buildShContentLines.push(buildDockerCommand(config, buildArgs));

  fs.writeFileSync(
    './build.sh',
    buildShContentLines.filter(Boolean).join('\n'),
  );
  Commons.displayMessage('File build.sh created', Commons.Colors.FgGreen);

  fs.writeFileSync('./push.sh', `docker push ${imageName}`);
  Commons.displayMessage('File push.sh created', Commons.Colors.FgGreen);
} catch (e) {
  Commons.displayMessage(
    'Error while building build scripts!',
    Commons.Colors.FgRed,
  );
  console.error(e);
  process.exit(1);
}
