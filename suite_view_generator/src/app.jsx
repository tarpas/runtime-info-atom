'use babel';
import React from 'react';
import fs from 'fs';
import generateView from './lib/generator.js'

const MIN_FONT_SIZE = 8;
const MAX_FONT_SIZE = 20;

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
    if(this.fontSize < MIN_FONT_SIZE){
      this.generatedContentContainer.classList.add('minimized')
    } else {
      this.generatedContentContainer.classList.remove('minimized')
    }
    body.style.fontSize = Math.floor(this.fontSize)+"px";
    console.log(document.getElementById('test-id'));
  }

  renderSuiteDataView(){
    var jsonData = {
      groups: require('../../suite_data/carrot_groups.json')
    }
    var viewHTML = generateView(jsonData);
    this.generatedContentContainer.innerHTML = viewHTML;
  }

  normalizeDelta(delta){ //ensures small steps and max 1px chande per scroll
    var smallDelta = delta/50.0;
    if(smallDelta > 1){
      return 1;
    } else if(smallDelta < -1){
      return -1;
    }
    return smallDelta;
  }

  handleScroll(event){
    var fontSize = this.fontSize;
    if (event.ctrlKey) {
      event.preventDefault();
      var delta = this.normalizeDelta(event.deltaY);
      if(!isNaN(delta)){
        if((delta < 0 && fontSize >= MIN_FONT_SIZE) ||
           (delta > 0 && fontSize <= MAX_FONT_SIZE)){
          this.fontSize = this.fontSize + delta;
        }
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
