import * as aws from '@pulumi/aws';

const BUCKET_NAME = 'my-instagram';

const siteBucket = new aws.s3.Bucket(BUCKET_NAME, {
  website: {
    indexDocument: 'index.html',
  },
});

function publicReadPolicyForBucket(bucketName: string) {
  return JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: '*',
        Action: ['s3:DeleteObject', 's3:GetObject', 's3:ListBucket', 's3:PutObject', 's3:PutObjectAcl'],
        Resource: [`arn:aws:s3:::${bucketName}`, `arn:aws:s3:::${bucketName}/*`],
      },
    ],
  });
}

new aws.s3.BucketPolicy('bucketPolicy', {
  bucket: siteBucket.bucket,
  policy: siteBucket.bucket.apply(publicReadPolicyForBucket),
});

exports.websiteUrl = siteBucket.websiteEndpoint;
exports.bucketName = BUCKET_NAME;
