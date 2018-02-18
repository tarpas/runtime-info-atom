'use babel';
import InfoPanel from './runtime-info-panel-view.jsx';
import { Emitter } from 'atom';
import React from 'react';
import ReactDOM from 'react-dom';


export default class RuntimeInfoPanel {
  constructor() {
    this.element = document.createElement('div');
    this.element.setAttribute('id', 'runtime-info-panel-item');
    atom.commands.add('atom-workspace', {
      'python-runtime-info:toggle-panel': () => this.togglePanel(),
    });

    this.emitter = new Emitter();
    this.view = (
      <InfoPanel
        emitter = {this.emitter}>
        Message
      </InfoPanel>
    );
    ReactDOM.render(this.view, this.element);
  }

  togglePanel() {
    let container = atom.workspace.paneContainerForItem(this);
    if (container === undefined) {
      atom.workspace.open(this);
    } else {
      if (container.isVisible()) {
        container.hide();
      } else {
        atom.workspace.open(this);
      }
    }
  }

  setExceptions(exceptionList) {
    this.emitter.emit('exceptions-updated', exceptionList);
  }

  getIconName() {
    return 'watch';
  }

  getURI() {
    return 'atom://python-runtime-info';
  }
  getTitle() {
    return 'Runtime info';
  }
  getDefaultLocation() {
    return 'bottom';
  }
  getAllowedLocations() {
    return ['bottom', 'top'];
  }

  dispose() {
    this.emitter.dispose();
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
