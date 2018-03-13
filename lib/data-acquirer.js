'use babel';

import { exec } from 'child_process';
import { CompositeDisposable } from 'atom';
import fs from 'fs';
import os from 'os';
import path from 'path';

/**
 * Python runtime info acquisition class.
 */
class DataAcquirer {
  /**
   * Create DataAcquirer.
   * @param {Callback} acquisitionCallback - Callback function to be called
   * after data is succesfully acquired. Callback function takes FileMarkMap
   * as paramter.
   */
  constructor(acquisitionCallback) {
    this.acquisitionCallback = acquisitionCallback;
    this.filePath = path.join(os.tmpdir(), "runtime_test_report.json");
    this.subscriptions = new CompositeDisposable();
    this.watchFile();
  }

  unwatchFile(){
    try {
      fs.unwatchFile(this.filePath);
    } catch (e) {
      if (e.code === 'ENOENT') {
        //file does not exists but watcher is waiting for its creation
      } else {
        console.error(e);
      }
    }
  }

  watchFile(){
    try {
      this.watcher = fs.watchFile(this.filePath,
        { persistent: true, interval: 1000 },
        (eventType, filename) => this.acquire());
    } catch (e) {
      if (e.code === 'ENOENT') {
        //file does not exists but watcher is waiting for its creation
      } else {
        console.error(e);
      }
    }
  }

  acquire() {
    var fileMarks = {};
    try {
      var readOutput = fs.readFileSync(this.filePath,{
        "encoding": "UTF8",
      });
    } catch (e) {
      return;
    }
    var jsonData = JSON.parse(readOutput);
    var exceptionList = jsonData.exceptions;
    for (let file of jsonData.fileMarkList) {
      fileMarks[file.path] = file;
    }
    this.acquisitionCallback(fileMarks, exceptionList);
  }

  dispose() {
    this.subscriptions.dispose();
    this.unwatchFile();
  }
}

export default DataAcquirer;
