'use babel';

import { exec } from 'child_process';
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
    exec(
      acquirerCommand,
      {windowsHide: true, cwd: wd},
      (error, stdout, stderr) => this.processAcquisitionResult(error, stdout, stderr)
    );
  }

  normalizePath(filePath){
    if (path.isAbsolute(filePath)) {
      return filePath;
    }
    projectPath = atom.project.getPaths();
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
    var fileMarks = {};
    var filePath = this.normalizePath(atom.config.get('python-runtime-info.dataAcquisitionJson'));
    console.log("Acquisition json path is: " + filePath);
    var readOutput = fs.readFileSync(filePath,{
      "encoding": "UTF8",
    });
    var jsonData = JSON.parse(readOutput);
    var exceptionList = jsonData.exceptions;
    for (let file of jsonData.fileMarkList) {
      fileMarks[file.path] = file;
    }
    this.acquisitionCallback(fileMarks, exceptionList);
  }
}

export default DataAcquirer;
