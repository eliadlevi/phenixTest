import S3 from './S3/S3';
import FileReader from './utils/FileReader';

const bucketName = 'adsfghjklm';
const filePath = 'C:\\Users\\eliad\\source\\repos\\PhenixHomeTest\\123.json';

const S3Write = async () => {
  try {
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
  const s3 = new S3();

  const filePathParts = filePath.split('\\');
  const fileName = filePathParts[filePathParts.length - 1];
  const file = FileReader.jsonRead(filePath);
  if (file === undefined) {
    console.log(
      `The at the path: ${filePath} \nMay not exist or is not in a json format`
    );
  } else {
    await s3.uploadFile(file, fileName, bucketName);
  }
};

S3Write();
