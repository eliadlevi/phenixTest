import AWS from 'aws-sdk';
import EnvReader from '../utils/EnvReader';
import IFileStorage from './IFileStorage';

const s3AccessKeyEnvFieldName = 'S3_ACCESS_KEY';
const s3SecretAccessKeyEnvFieldName = 'S3_SECRET_ACCESS_KEY';
const s3BucketNameEnvFieldName = 'S3_BUCKET_NAME';

export default class S3 implements IFileStorage {
  private s3: AWS.S3;
  private env: EnvReader = new EnvReader();

  constructor() {
    const accessKey = this.env.readField(s3AccessKeyEnvFieldName);
    const secretAccessKey = this.env.readField(s3SecretAccessKeyEnvFieldName);
    if (!accessKey || !secretAccessKey) {
      throw new Error(
        'please validate you have S3_ACCESS_KEY and S3_SECRET_ACCESS_KEY in the .env'
      );
    }
    AWS.config.update({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
    });
    this.s3 = new AWS.S3();
  }

  public async getFile(fileName: string): Promise<string> {
    const bucket = this.env.readField(s3BucketNameEnvFieldName);
    if (!bucket) {
      throw new Error('Bucket is not in the env variables, please add it');
    } else {
      const body = await (
        await this.s3.getObject({ Bucket: bucket, Key: fileName }).promise()
      ).Body;

      if (!body) {
        throw new Error('Download from s3 failed');
      } else {
        return body.toString();
      }
    }
  }

  public async uploadFile(file: string, fileName: string): Promise<void> {
    try {
      const bucket = this.env.readField(s3BucketNameEnvFieldName);
      if (!bucket) {
        console.log('Bucket is not in the env variables, please add it');
      } else {
        await this.s3
          .putObject({
            Body: file,
            Bucket: bucket,
            Key: fileName,
          })
          .promise();
        console.log(`The file ${fileName} uploaded to s3 succecfully`);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log('Error:' + e.message);
      } else {
        console.log('Error:' + 'Unknown error');
      }
      console.log(`The file ${fileName} failed to upload to s3`);
    }
  }
}
