'use babel';

import { exec } from 'child_process';
import { CompositeDisposable } from 'atom';
import fs from 'fs';
const path = require('path');

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
    this.filePath = this.normalizePath(atom.config.get('python-runtime-info.dataAcquisitionJson'));
    console.log("Acquisition json path is: " + this.filePath);
    this.subscriptions = new CompositeDisposable();
    this.watchFile();
    this.subscriptions.add(
      atom.project.onDidChangePaths(
        () => {
          this.unwatchFile();
          this.filePath = this.normalizePath(atom.config.get('python-runtime-info.dataAcquisitionJson'));
          console.log("Acquisition json path is: " + this.filePath);
          this.watchFile();
          this.acquire();
        }
      )
    );
  }

  unwatchFile(){
    if(this.filePath !== null){
      try {
        console.log("Unwatching file: " + this.filePath);
        fs.unwatchFile(this.filePath);
      } catch (e) {
        if (e.code === 'ENOENT') {
          //file does not exists but watcher is waiting for its creation
        } else {
          console.error(e);
        }
      }
    }
  }

  watchFile(){
    if(this.filePath !== null){
      console.log("Watching file: " + this.filePath);
      try {
        this.watcher = fs.watchFile(this.filePath,
          { persistent: true, interval: 1000 },
          (eventType, filename) => this.fileChanged());
      } catch (e) {
        if (e.code === 'ENOENT') {
          //file does not exists but watcher is waiting for its creation
        } else {
          console.error(e);
        }
      }
    }
  }

  /**
   * Asynchronously runs python script to acquire fileMarkList and calls
   * this.processAcquisitionResult when acquisition is finished.
   */
  acquire() {
    let acquirerCommand = atom.config.get('python-runtime-info.dataAcquisitionCommand');
    console.log("Acquirer command is: " + acquirerCommand);
    let wd = this.normalizePath(atom.config.get('python-runtime-info.dataAcquisitionWd'));
    console.log("Acquisition working dir is: " + wd);
    if (wd !== null) {
      exec(
        acquirerCommand,
        {windowsHide: true, cwd: wd},
        (error, stdout, stderr) => this.processAcquisitionResult(error, stdout, stderr)
      );
    }
  }

  normalizePath(filePath){
    if (path.isAbsolute(filePath)) {
      return filePath;
    }
    var projectPath = atom.project.getPaths()[0];
    if(!projectPath){
      return null;
    }
    return path.normalize(projectPath + '/' + filePath);
  }

  /**
   * Callback function that is called after data acquisition. If acquisition is
   * succesfull transforms fileMarkList to FileMarkMap and calls
   * acquisitionCallback.
   * @param {Error} error - Error object if python script couldn't be executed
   * @param {string} stdout - standard output form data acquisition
   * @param {string} error - error output form data acquisition
   */
  processAcquisitionResult(error, stdout, stderr) {
    console.log("Pytest error output:\n" + stderr);
    console.log("Pytest standard output:\n" + stdout);
  }

  fileChanged(){
    console.log("File changed!");
    var fileMarks = {};
    if(this.filePath === null){
      return;
    }
    try {
      var readOutput = fs.readFileSync(this.filePath,{
        "encoding": "UTF8",
      });
    } catch (e) {
      console.error(e);
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
