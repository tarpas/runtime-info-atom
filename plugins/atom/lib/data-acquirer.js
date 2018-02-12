'use babel';

import { exec } from 'child_process';
const path = require('path');

class DataAcquirer {
  constructor(state, acquisitionCallback) {
    this.acquisitionCallback = acquisitionCallback;
  }

  acquire() {
    let pythonAcquirer = path.normalize(__dirname + '/../../../python-acquirer.py');
    exec(
      pythonAcquirer,
      {windowsHide: true, cwd: path.normalize(__dirname + '/../../../')},
      (error, stdout, stderr) => this.processAcquisitionResult(error, stdout, stderr)
    );
  }

  processAcquisitionResult(error, stdout, stderr) {
    var fileMarks = {};
    var jsonData = JSON.parse(stdout);
    for (let file of jsonData.fileMarkList) {
      fileMarks[file.path] = file;
    }
    this.acquisitionCallback(fileMarks);
  }
}

export default DataAcquirer;
