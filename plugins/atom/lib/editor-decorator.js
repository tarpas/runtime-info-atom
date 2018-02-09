'use babel';

class EditorDecorator {

  constructor(textEditor){
    this.textEditor = textEditor;
    this.markers = [];
    this.gutters = [
      this.getGutter('U'),
      this.getGutter('D')
    ];
  }

  decorate(marks){
    this.clearDecorations();
    for (mark of marks) {
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

  getAtomRange(jsonRange){
    return [
      this.getAtomPoint(jsonRange.start),
      this.getAtomPoint(jsonRange.end)
    ];
  }

  getAtomPoint(jsonPoint){
    return [jsonPoint.line, jsonPoint.character];
  }

  clearDecorations(){
    for(marker of this.markers){
      marker.destroy();
    }
    this.markers = [];
  }

  decorateGutterLink(type, range, targetFilePath = null, targetPoint = null) {
    var gutter = this.getGutter(type);
    var marker = this.textEditor.markBufferRange(range,{invalidate:'inside'});
    this.markers.push(marker);
    var item = this.getGutterItem(type, targetFilePath, targetPoint);
    gutter.decorateMarker(marker,{
      type: 'gutter',
      item: item
    });
  }

  getGutterItem(type, targetFilePath = null, targetPoint = null){
    var text, item;
    item = document.createElement('span');
    item.onclick = (event) => {
      var line = targetPoint[0];
      var column = targetPoint[1];
      atom.workspace.open(targetFilePath,{
        initialLine: line,
        initialColumn: column,
      });
    };
    item.classList.add('python-runtime-info-gutter-item');
    if(type === 'D'){
      text = document.createTextNode('🡇');
    } else if (type === 'U') {
      text = document.createTextNode('🡅');
    }
    item.appendChild(text);
    return item;
  }

  getGutter(type){
    var gutterName = 'python-runtime-info-' + type;
    var gutter = this.textEditor.gutterWithName(gutterName);
    if(gutter === null){
      gutter = this.textEditor.addGutter({
        name: gutterName,
        visible: true
      });
    }
    return gutter;
  }

  decorateUnderLine(range) {
    var marker = this.textEditor.markBufferRange(range,{invalidate:'inside'});
    this.markers.push(marker);
    this.textEditor.decorateMarker(marker, {
      type: 'text',
      class: 'python-runtime-info-underline'
    });
  }

  decorateSuffix(range, text){
    var item,text;
    var marker = this.textEditor.markBufferRange(range,{invalidate:'inside'});
    var lineHeight = atom.config.get('editor.lineHeight');
    this.markers.push(marker);
    item = document.createElement('div');
    item.classList.add('python-runtime-info-suffix-item');
    item.classList.add('text-error');
    item.style.position = 'relative';
    item.style.top = '-' + lineHeight + 'em';
    item.style.left = '2em';
    text = document.createTextNode(text);
    item.appendChild(text);
    this.textEditor.decorateMarker(marker, {
      type: 'overlay',
      item: item,
      'class': 'python-runtime-info-suffix',
      position: 'head',
      avoidOverflow: false
    });
  }

}

export default EditorDecorator;
