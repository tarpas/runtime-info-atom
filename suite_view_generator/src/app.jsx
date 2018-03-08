'use babel';
import React from 'react';
import fs from 'fs';
import generateView from './lib/generator.js'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.fontSize = 8;
  }

  componentWillMount(){
    window.addEventListener('scroll', (event) => this.handleScroll(event));
    console.log("Will mount");
  }

  componentDidMount(){
    console.log("Mounted");
    this.updateFontSize();
    this.renderSuiteDataView();
  }

  componentDidUpdate(){
    console.log("Updated");
    this.updateFontSize();
    this.renderSuiteDataView();
  }

  updateFontSize(){
    var body = document.getElementsByTagName("BODY")[0];
    body.style.fontSize = Math.floor(this.fontSize)+"px";
  }

  renderSuiteDataView(){
    var jsonData = {
      groups: require('../../suite_data/carrot_groups.json')
    }
    var viewHTML = generateView(jsonData);
    this.generatedContentContainer.innerHTML = viewHTML;
  }

  handleScroll(event){
    if (event.ctrlKey) {
      event.preventDefault();
      var delta = event.deltaY/50.0
      if(!isNaN(delta)){
        this.fontSize = this.fontSize + delta;
        this.updateFontSize();
      }
    }
  }

  render() {
    return (
      <div
        ref={(el) => { this.generatedContentContainer = el; }}
        onWheel={(event) => this.handleScroll(event)}
      />
    );
  }
}

export default App;
