'use babel';

import { CompositeDisposable } from 'atom';
import { getCurrentFilePath } from './helpers.js';
import { EVENT_EXCEPTIONS_UPDATED } from './constants.js';
import React from 'react';
import ReactTable from 'sb-react-table';

class InfoPanel extends React.Component {
  constructor(props) {
    super(props);
    this.subscriptions = new CompositeDisposable();
    this.emitter = props.emitter;
    this.state = {
      currentFileToggled: false,
      exceptions: [],
      activePath: ''
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
  }

  shouldComponentUpdate(newProps, newState) {
    if (!this.state.currentFileToggled
        && newState.activePath !== this.state.activePath) {
      return false;
    }
    return true;
  }

  updateActivePath() {
    let path = getCurrentFilePath();
    this.setState({
      ...this.state,
      activePath: path
    });
  }

  componentDidMount() {
    this.subscriptions.add(
      this.emitter.on(EVENT_EXCEPTIONS_UPDATED, (exceptions) =>{
        this.updateExceptions(exceptions);
      }),
      atom.workspace.onDidChangeActiveTextEditor(() => {
        this.updateActivePath();
      })
    );
  }

  componentWillUnmount() {
    this.subscriptions.dispose();
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

  toggleCurrentFile() {
    this.setState({
      ...this.state,
      currentFileToggled: !this.state.currentFileToggled
    });
  }

  sortRows(sortInfo, rows) {
    // TODO: Implement sorting and sorting arrows
    return rows;
  }

  renderBodyColumn(row, column) {
    let rowClick = () => {
      atom.workspace.open(row.path, {
        initialLine: row.line,
      });
    };
    return (
      <span
        className="panel-table-column"
        onClick={rowClick}>
        {row[column]}
      </span>
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
