'use babel';
import InfoPanel from './runtime-info-panel-view.jsx';
import { EVENT_EXCEPTIONS_UPDATED } from './constants.js';
import { Emitter } from 'atom';
import { CompositeDisposable } from 'atom';
import React from 'react';
import ReactDOM from 'react-dom';


export default class RuntimeInfoPanel {
  constructor() {
    this.element = document.createElement('div');
    this.element.setAttribute('id', 'runtime-info-panel-item');
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'runtime-info-atom:toggle-panel': () => this.togglePanel(),
      })
    );

    this.emitter = new Emitter();
    this.view = (
      <InfoPanel emitter = {this.emitter} />
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
    this.emitter.emit(EVENT_EXCEPTIONS_UPDATED, exceptionList);
  }

  getIconName() {
    return 'watch';
  }

  getURI() {
    return 'atom://runtime-info-atom';
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
    this.subscriptions.dispose();
    this.emitter.dispose();
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
