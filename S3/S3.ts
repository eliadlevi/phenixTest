import AWS from 'aws-sdk';
import EnvReader from '../utils/EnvReader';
import IS3 from './IS3';

const s3AccessKeyEnvFieldName = 'S3_ACCESS_KEY';
const s3SecretAccessKeyEnvFieldName = 'S3_SECRET_ACCESS_KEY';

export default class S3 implements IS3 {
  private s3: AWS.S3;
  constructor() {
    const env = new EnvReader();
    const accessKey = env.readField(s3AccessKeyEnvFieldName);
    const secretAccessKey = env.readField(s3SecretAccessKeyEnvFieldName);
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

  getFile(fileName: string): string {
    throw new Error('Method not implemented.');
  }

  public async uploadFile(
    file: string,
    fileName: string,
    bucketName: string
  ): Promise<void> {
    try {
      await this.s3
        .putObject({
          Body: file,
          Bucket: bucketName,
          Key: fileName,
        })
        .promise();
      console.log(`The file ${fileName} uploaded to s3 succecfully`);
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
