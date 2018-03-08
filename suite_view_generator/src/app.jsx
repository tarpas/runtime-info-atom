'use babel';
import React from 'react';
import fs from 'fs';
import generateView from './lib/generator.js'

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log("Mounted");
    this.renderSuiteDataView();
  }

  componentDidUpdate(){
    console.log("Updated");
    this.renderSuiteDataView();
  }

  renderSuiteDataView(){
    var jsonData = {
      groups: require('../../suite_data/carrot_groups.json')
    }
    var viewHTML = generateView(jsonData);
    this.generatedContentContainer.innerHTML = viewHTML;
  }



  render() {
    return (
      <div ref={(el) => { this.generatedContentContainer = el; }}></div>
    );
  }
}

export default App;
