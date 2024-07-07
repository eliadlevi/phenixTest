export default interface IS3 {
  uploadFile(file: string, fileName: string, bucketName: string): Promise<void>;
  getFile(fileName: string): string;
}
