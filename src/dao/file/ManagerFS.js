import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export class ManagerFS {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async create(record) {
    const records = await this.readFromFile();
    const newRecord = { id: uuidv4(), ...record };
    records.push(newRecord);
    await this.writeToFile(records);
    return newRecord;
  }

  async read(filter = {}) {
    const records = await this.readFromFile();
    return records.filter(this.applyFilter(filter));
  }

  async update(filter, updatedData) {
    const records = await this.readFromFile();
    const updatedRecords = records.map(record => {
      if (this.matchFilter(record, filter)) {
        return { ...record, ...updatedData };
      }
      return record;
    });
    await this.writeToFile(updatedRecords);
    return updatedRecords;
  }

  async delete(filter = {}) {
    const records = await this.readFromFile();
    const filteredRecords = records.filter(record => !this.matchFilter(record, filter));
    await this.writeToFile(filteredRecords);
    return filteredRecords;
  }

  applyFilter(filter) {
    return record => this.matchFilter(record, filter);
  }

  matchFilter(record, filter) {
    for (const key in filter) {
      if (record[key] !== filter[key]) {
        return false;
      }
    }
    return true;
  }

  async readFromFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.fileName, 'utf8', (error, data) => {
        if (error) {
          if (error.code === 'ENOENT') {
            resolve([]);
          } else {
            reject(error);
          }
        } else {
          try {
            const records = JSON.parse(data);
            resolve(records);
          } catch (parseError) {
            reject(parseError);
          }
        }
      });
    });
  }

  async writeToFile(records) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(records);
      fs.writeFile(this.fileName, data, 'utf8', error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}
