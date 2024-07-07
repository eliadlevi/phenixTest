export default interface IFileStorage {
  uploadFile(file: string, fileName: string): Promise<void>;
  getFile(fileName: string): Promise<string>;
}
