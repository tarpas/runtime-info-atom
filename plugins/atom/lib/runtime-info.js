'use babel';
/**
 * Atom plugin that shows python runtime info.
 * @module python-runtime-info
 */
import { CompositeDisposable } from 'atom';
import EditorDecorator from './editor-decorator.js';
import DataAcquirer from './data-acquirer.js';
const path = require('path');

/**
 * Singleton class representing python runtime info plugin.
 * @property {CompositeDisposable}  subscriptions - Easily disposable list of subscriptions
 * @property {object} fileDecorators - filePath{String} to {EditorDecorator} map.
 * @property {object} fileMarkMap - filePath{String} to {FileMark} map.
 * @property {DataAcquirer} dataAcquirer - Instance of data acquisition class.
 */
class RuntimeInfoPlugin {
  /**
  * Create plugin instance or returns instance if it was already created.
  * @return {RuntimeInfoPlugin} Instance of RuntimeInfoPlugin.
  */
  constructor() {
    if (!RuntimeInfoPlugin.instance) { // making sure class is singleton
      this.subscriptions = new CompositeDisposable();
      this.fileDecorators = {};
      this.fileMarkMap = {};
      this.dataAcquirer = null;
      RuntimeInfoPlugin.instance = this;
    }
    return RuntimeInfoPlugin.instance;
  }
  /**
  * Activate plugin. This function is entry point and it's called by Atom.
  * @param {object} state - Serialized state from previeous session.
  */
  activate(state) {
    // Acquire runtime data
    this.dataAcquirer = new DataAcquirer(
      (fileMarkMap) => this.dataAcquired(fileMarkMap) // Callback after succesfull acquisition
    );
    this.dataAcquirer.acquire();
    // Subscribe to events
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'python-runtime-info:decorate': () => this.dataAcquirer.acquire(),
      }),
      atom.workspace.observeTextEditors(// called on all opened TextEditors
        (textEditor) => this.registerDecorator(textEditor)
      )
    );
  }

  /**
  * Deactivate plugin. This function is called by Atom on when plugin is
  * deactivated or editor closed.
  */
  deactivate() {
    this.subscriptions.dispose();
  }

  /**
  * Serialize plugin state. This function is called by Atom before
  * closing editor.
  */
  serialize(state) {
    // TODO : Serialization of plugin state
  }

  /**
  * Callback function called after data aquisition. Sets fileMarkMap property
  * and calls decorateFile on files from acquired fileMarkMap
  * @param {object} fileMarkMap - Object map of paths to fileMark.
  */
  dataAcquired(fileMarkMap) {
    this.fileMarkMap = fileMarkMap;
    for (let filePath in fileMarkMap) {
      let absolutePath;
      if (path.isAbsolute(filePath)) {
        absolutePath = filePath;
      } else {
        absolutePath = path.normalize(__dirname + '/../../../' + filePath);
      }
      this.decorateFile(absolutePath);
    }
  }

  /**
  * Decorates file if it is opened in editor.
  * @param {string} filePath - Path to file that will be decorated.
  */
  decorateFile(filePath) {
    if (this.fileDecorators[filePath] !== undefined) {
      let decorator = this.fileDecorators[filePath];
      let fileMarks = this.fileMarkMap[filePath];
      decorator.decorate(fileMarks.marks);
    }
  }

  /**
  * Unregisters file decorator. Called when file is closed in editor.
  * @param {string} filePath - Path to file that was closed.
  */
  unregisterDecorator(filePath) {
    delete this.fileDecorators[filePath];
  }

  /**
  * Registers file decorator. Called when file is opened in editor.
  * @param {TextEditor} textEditor - textEditor instance that was opened.
  */
  registerDecorator(textEditor) {
    var filePath = textEditor.getPath();
    var fileScope = textEditor.getGrammar().scopeName;
    if (fileScope === 'source.python') {
      this.fileDecorators[filePath] = new EditorDecorator(textEditor);
      this.subscriptions.add(
        textEditor.onDidSave(() => this.dataAcquirer.acquire()),
        textEditor.onDidDestroy(() => this.unregisterDecorator(filePath))
      );
      if (this.fileMarkMap[filePath] !== undefined) {
        this.decorateFile(filePath);
      }
    }
  }
}

const runtimeInfoPlugin = new RuntimeInfoPlugin();

/**
* Singleton instance of RuntimeInfoPlugin.
* @name runtimeInfoPlugin
* @type {RuntimeInfoPlugin}
* @static
*/
export default runtimeInfoPlugin;
