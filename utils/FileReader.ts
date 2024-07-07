import { readFileSync } from 'fs';
import { join } from 'path';

export default class FileReader {
  public static jsonRead(filePath: string): any {
    try {
      const file = readFileSync(join(filePath), 'utf-8');
      JSON.parse(file);
      return file;
    } catch (e) {
      return undefined;
    }
  }
}
