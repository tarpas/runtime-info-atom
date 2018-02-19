'use babel';

import React from 'react';
import ReactTable from 'sb-react-table';

class InfoPanel extends React.Component {
  constructor(props) {
    super(props);
    this.emitter = props.emitter;
    this.state = {
      currentFileToggled: false,
      exceptions: [],
      activePath: ""
    };
    this.columns = [
      {
        key: 'path',
        label: 'File',
        sortable: true
      },
      {
        key: 'description',
        label: 'Description',
      },
      {
        key: 'line',
        label: 'Line',
        sortable: true
      }
    ];
    atom.workspace.onDidChangeActiveTextEditor(() => { // TODO add to subscriptions
      this.updateActivePath();
    });
  }

  shouldComponentUpdate(newProps, newState) {
    if (!this.state.currentFileToggled
        && newState.activePath !== this.state.activePath) {
      return false;
    }
    return true;
  }

  updateActivePath() {
    let path = this.getCurrentFilePath();
    this.setState({
      ...this.state,
      activePath: path
    });
  }

  componentDidMount() {
    this.emitter.on('exceptions-updated', (exceptions) =>{
      this.updateExceptions(exceptions);
    });
  }

  updateExceptions(exceptions) {
    this.setState({
      ...this.state,
      exceptions: exceptions
    });
  }

  getRows() {
    var rows = [];
    var exceptions = this.state.exceptions;
    var activePath = this.state.activePath;
    for (let excId in exceptions) {
      let exc = exceptions[excId];
      if (this.state.currentFileToggled && activePath !== exc.path) {
        continue;
      }
      exc.key = excId;
      rows.push(exc);
    }
    return rows;
  }

  getCurrentFilePath() { // TODO: refactor to helpers
    let textEditor = atom.workspace.getActiveTextEditor();
    if (textEditor !== undefined) {
      return textEditor.getPath();
    } else {
      return this.state.activePath;
    }
  }

  toggleCurrentFile() {
    this.setState({
      ...this.state,
      currentFileToggled: !this.state.currentFileToggled
    });
  }

  refreshData(e) {
    atom.commands.dispatch(e.target, 'python-runtime-info:refresh');
  }

  sortRows(sortInfo, rows) {
    // TODO: Implement sorting and sorting arrows
    return rows;
  }

  renderBodyColumn(row, column) {
    return (
      <span>{row[column]}</span>
    );
  }

  render() {
    let rows = this.getRows();
    return (
      <div>
        <div className="panel-control">
          <div className="current-file-toggle">
            <label className='input-label'>
              <input
                className='input-toggle' type='checkbox'
                defaultChecked={this.state.currentFileToggled}
                onChange={() => this.toggleCurrentFile()}/>
              Current File Only
            </label>
          </div>
          <button
            className='btn icon icon-sync inline-block'
            onClick={this.refreshData}>Refresh
          </button>
        </div>
        <div className="panel-table">
          <ReactTable
            rows={rows}
            columns={this.columns}
            initialSort={{ column: 'file', type: 'asc' }}
            sort={this.sortRows}
            rowKey={row => row.key}
            renderHeaderColumn={column => <span>{column.label}</span>}
            renderBodyColumn={(row, column) => this.renderBodyColumn(row, column)}
          />
        </div>
      </div>
    );
  }
}

export default InfoPanel;
