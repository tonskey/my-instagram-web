import { LocalProgramArgs, LocalWorkspace } from '@pulumi/pulumi/automation';
import process from 'process';
import { exec } from 'child_process';

const args = process.argv.slice(2);
let destroy = false;
if (args.length > 0 && args[0]) {
  destroy = args[0] === 'destroy';
}

const run = async () => {
  const stackArgs: LocalProgramArgs = {
    stackName: 'dev',
    workDir: '.',
  };
  // create (or select if one already exists) a stack that uses our local program
  const stack = await LocalWorkspace.createOrSelectStack(stackArgs);

  console.info('successfully initialized stack');
  console.info('setting up config');
  await stack.setConfig('aws:region', { value: 'us-west-2' });
  console.info('config set');
  console.info('refreshing stack...');
  await stack.refresh({ onOutput: console.info });
  console.info('refresh complete');

  if (destroy) {
    console.info('destroying stack...');
    await stack.destroy({ onOutput: console.info });
    console.info('stack destroy complete');
    process.exit(0);
  }

  console.info('updating stack...');
  const upRes = await stack.up({ onOutput: console.info });
  console.log(`update summary: \n${JSON.stringify(upRes.summary.resourceChanges, null, 4)}`);
  console.log(`website url: ${upRes.outputs.websiteUrl.value}`);
  console.log('syncing with S3 bucket...');
  exec(`aws s3 sync --acl public-read --follow-symlinks --delete dist s3://${upRes.outputs.bucketName.value}`);
  console.info('syncing complete');
};

run();
