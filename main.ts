import FileStorageManager from './utils/FileStorageManager';
import S3 from './aws/S3';

const filePath = 'C:\\Users\\eliad\\source\\repos\\PhenixHomeTest\\123.json';
const fileNameToDownload = '123.json';

const main = async () => {
  try {
    const fileStorageManager = new FileStorageManager(new S3());
    await fileStorageManager.UploadJson(filePath);
    const result = await fileStorageManager.DownloadJson(fileNameToDownload);
    console.log(result);
  } catch (e) {
    if (e instanceof Error) {
      console.log(`Error: ${e.message}`);
    } else {
      console.log('Unkown error');
    }
  }
};

main();
