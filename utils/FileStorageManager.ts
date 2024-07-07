import FileReader from './FileReader';
import IFileStorage from '../aws/IFileStorage';

export default class FileStorageManager {
  constructor(private fileStorage: IFileStorage) {}

  public async UploadJson(filePath: string): Promise<void> {
    try {
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }

    const filePathParts = filePath.split('\\');
    const fileName = filePathParts[filePathParts.length - 1];
    const file = FileReader.jsonRead(filePath);
    if (file === undefined) {
      console.log(
        `The at the path: ${filePath} \nMay not exist or is not in a json format`
      );
    } else {
      await this.fileStorage.uploadFile(file, fileName);
    }
  }

  public async DownloadJson(fileName: string): Promise<string> {
    return JSON.parse(await this.fileStorage.getFile(fileName));
  }
}
