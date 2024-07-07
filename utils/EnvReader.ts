import 'dotenv/config';
import path from 'path';
import dotenv from 'dotenv';

export default class EnvReader {
  public readField(fieldName: string): string | undefined {
    const fieldValue = process.env[fieldName];

    // Check if the environment variable exists
    if (fieldValue === undefined) {
      console.log(`Environment variable ${fieldName} is not defined.`);
      return undefined;
    }

    // You can perform additional type checks here
    // For example, if you expect a numeric value:
    const numericValue = parseFloat(fieldValue);
    if (!isNaN(numericValue)) {
      return numericValue.toString();
    }

    // If it's not a number, return the original string value
    return fieldValue;
  }
}
