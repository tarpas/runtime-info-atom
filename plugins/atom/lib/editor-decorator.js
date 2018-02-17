'use babel';

import { CompositeDisposable } from 'atom';

/**
 * Class used to manage decorations of atom TextEditor.
 * @property {TextEditor} textEditor - atom TextEditor instance
 * @property {CompositeDisposable}  subscriptions - Easily disposable list of subscriptions
 * @property {Marker[]} markers - list of atom markers
 * @property {Gutter[]} gutter - list of atom gutters
 */
class EditorDecorator {
  /**
   * Create DataAcquirer.
   * @param {TextEditor} textEditor - atom TextEditor instance that will be
   * decorated.
   */
  constructor(textEditor) {
    this.textEditor = textEditor;
    this.subscriptions = new CompositeDisposable();
    this.markers = [];
    this.gutters = [
      this.getGutter('U'),
      this.getGutter('D')
    ];
  }
  /**
   * Clears all decorations for text editor and discards markers.
   */
  clearDecorations() {
    for (let marker of this.markers) {
      marker.destroy();
    }
    this.markers = [];
  }

  /**
   * Decorates text editor based on FileMark list. All existing decorations
   * are cleared before decorationg.
   * @param  {FileMark[]} fileMarks - List of file marks for file opened
   * in TextEditor.
   */
  decorate(fileMarks) {
    this.clearDecorations();
    for (let mark of fileMarks) {
      let range = this.getAtomRange(mark.range);
      switch (mark.type) {
      case 'GutterLink':
        this.decorateGutterLink(
          mark.gutterLinkType, range,
          mark.targetPath, this.getAtomPoint(mark.target)
        );
        continue;
      case 'RedUnderLineDecoration':
        this.decorateUnderLine(range);
        continue;
      case 'Suffix':
        this.decorateSuffix(range, mark.text);
        continue;
      }
    }
  }
  /**
   * Helper function to convert json range to atom Range.
   * @param  {object} jsonRange - FileMark Range from json
   * @return {Range} Range in atom format
   */
  getAtomRange(jsonRange) {
    return [
      this.getAtomPoint(jsonRange.start),
      this.getAtomPoint(jsonRange.end)
    ];
  }
  /**
   * Helper function to convert json  point to atom Point.
   * @param  {object} jsonPoint - FileMark Point form json
   * @return {Point} Point in atom format.
   */
  getAtomPoint(jsonPoint) {
    return [jsonPoint.line, jsonPoint.character];
  }

  /**
   * Creates gutter link decoration.
   * @param  {string} type           - type of gutter link ('D' or 'U')
   * @param  {Range} range           - Atom range that will be decorated.
   * @param  {string} targetFilePath - absolute path of link target file.
   * @param  {Point} targetPoint     - atom Point for link target.
   * Cursor will be moved to this position after clicking on gutter link
   */
  decorateGutterLink(type, range, targetFilePath, targetPoint) {
    var gutter = this.getGutter(type);
    var marker = this.textEditor.markBufferRange(range, {invalidate: 'inside'});
    this.markers.push(marker);
    var item = this.getGutterItem(type, targetFilePath, targetPoint);
    gutter.decorateMarker(marker, {
      type: 'gutter',
      item: item
    });
  }

  /**
   * Creates html element for gutter link decoration.
   * @param  {string} type           - type of gutter link ('D' or 'U')
   * @param  {string} targetFilePath - absolute path of link target file.
   * @param  {Point}  targetPoint    - atom Point for link target.
   * @return {element}                element for gutter link decoration
   */
  getGutterItem(type, targetFilePath, targetPoint) {
    var text;
    var item;
    item = document.createElement('span');
    item.onclick = () => {
      var line = targetPoint[0];
      var column = targetPoint[1];
      atom.workspace.open(targetFilePath, {
        initialLine: line,
        initialColumn: column,
      });
    };
    item.classList.add('python-runtime-info-gutter-item');
    if (type === 'D') {
      text = document.createTextNode('🡇');
    } else if (type === 'U') {
      text = document.createTextNode('🡅');
    }
    item.appendChild(text);
    return item;
  }
  /**
   * Returns gutter based on gutter link type.
   * @param  {string} type - type of gutter link ('D' or 'U')
   * @return {Gutter}      - atom Gutter.
   */
  getGutter(type) {
    var gutterName = 'python-runtime-info-' + type;
    var gutter = this.textEditor.gutterWithName(gutterName);
    if (gutter === null) {
      gutter = this.textEditor.addGutter({
        name: gutterName,
        visible: true
      });
    }
    return gutter;
  }
  /**
   * Creates underline decoration.
   * @param  {Range} range - Atom range that will be underlined.
   */
  decorateUnderLine(range) {
    var marker = this.textEditor.markBufferRange(range, {invalidate: 'inside'});
    this.markers.push(marker);
    this.textEditor.decorateMarker(marker, {
      type: 'text',
      class: 'python-runtime-info-underline'
    });
  }
  /**
   * Creates overlay decoration with error mesage placed after content of line.
   * @param  {Range}  range  - Atom range that will be decorated.
   * @param  {string} text  - error message to show after line.
   */
  decorateSuffix(range, text) {
    var item = this.getSuffixItem(text);
    var marker = this.textEditor.markBufferRange(range, {invalidate: 'inside'});
    this.markers.push(marker);
    this.textEditor.decorateMarker(marker, {
      type: 'overlay',
      item: item,
      'class': 'python-runtime-info-suffix',
      position: 'head',
      avoidOverflow: false
    });
  }
  /**
   * Return html element for overlay decoration.
   * @param  {string} text - error message to show after line.
   * @return {element}     - element for overlay decoration
   */
  getSuffixItem(text) {
    var item;
    var textNode;
    var lineHeight = atom.config.get('editor.lineHeight'); // TODO: subscribe to change of lineHeight
    item = document.createElement('div');
    item.classList.add('python-runtime-info-suffix-item');
    item.style.position = 'relative';
    item.style.top = '-' + lineHeight + 'em'; // positions suffix to same line as error
    item.style.left = '2em';
    textNode = document.createTextNode(text);
    item.appendChild(textNode);
    return item;
  }
}

export default EditorDecorator;
