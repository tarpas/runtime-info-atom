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
    // TODO: get script path and cwd path from config
    let pythonAcquirer = path.normalize(__dirname + '/../../../python-acquirer.py');
    // TODO try/catch
    exec(
      "pytest", // TODO make this configurable
      {windowsHide: true, cwd: path.normalize(__dirname + '/../../../sampleproject')},
      (error, stdout, stderr) => this.processAcquisitionResult(error, stdout, stderr)
    );
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
    // TODO log stdout and stderr
    var fileMarks = {};
    var filePath = path.normalize(__dirname + '/../../../sampleproject/tests/runtime_test_report.json');
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
