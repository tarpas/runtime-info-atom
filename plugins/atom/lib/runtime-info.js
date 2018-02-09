'use babel';

import { CompositeDisposable } from 'atom';
import EditorDecorator from './editor-decorator.js';
import DataAcquirer from './data-acquirer.js';
import { resolve } from 'path';
const path = require('path');

export default{

  subscriptions : null,
  fileDecorators : {},
  fileMarkList: [],
  dataAcquirer: null,

  activate(state) {
    this.dataAcquirer = new DataAcquirer(state,(fileMarkList) => {this.dataAcquired(fileMarkList);});
    this.dataAcquirer.acquire();
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    atom.workspace.observeTextEditors(this.registerDecorator.bind(this));
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'python-runtime-info:decorate': () => this.dataAcquirer.acquire(),
    }));

  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {

  },

  dataAcquired(fileMarkList) {
    this.fileMarkList = fileMarkList;
    for(filePath in fileMarkList){
      let absolutePath;
      if(path.isAbsolute(filePath)){
        absolutePath = filePath;
      } else {
        absolutePath = path.normalize(__dirname + '/../../../' + filePath);
      }
      this.decorateFile(absolutePath);
    }
  },

  decorateFile(filePath){
    if(this.fileDecorators[filePath] !== undefined){
      let decorator = this.fileDecorators[filePath];
      let fileMarks = this.fileMarkList[filePath];
      decorator.decorate(fileMarks.marks);
    }
  },

  unregisterDecorator(filePath){
    delete this.fileDecorators[filePath];
  },

  registerDecorator(textEditor){
    var filePath = textEditor.getPath();
    var fileScope = textEditor.getGrammar().scopeName;
    if(fileScope === 'source.python'){
      this.fileDecorators[filePath] = new EditorDecorator(textEditor);
      textEditor.onDidSave(() => this.dataAcquirer.acquire());
      textEditor.onDidDestroy(() => this.unregisterDecorator(filePath));
      if(this.fileMarkList[filePath] !== undefined){
        this.decorateFile(filePath);
      }
    }
  }
};
