import React, { Component } from 'react';
import DeleteDialog from "./DeleteDialog";
import ViewDialog from "./ViewDialog";

class IndexTable extends Component {
    data = [];
    keys = [];
    state = { showDelete: false, showView: false, index: -1 };
    selectionHandler;

    showDeleteModal = (index) => {
        this.setState({ showDelete: true, showView: false, index: index });
    };

    hideDeleteModal = (index) => {
        this.setState({ showDelete: false, showView: false, index: -1 });
        if (index >= 0) {
            this.data.splice(index,1);
        }
    };

    showViewModal = (index) => {
        console.log(index);
        this.setState({ showDelete: false, showView: true, index: index });
    };

    hideViewModal = (index) => {
        this.setState({ showDelete: false, showView: false, index: -1 });
        if (index >= 0) {
            this.data.splice(index,1);
        }
    };

    constructor(props) {
        super();
        this.data = props.data;
        this.keys = props.keys;
        this.selectionHandler = props.selectionHandler;
    }

    createTable(data) {
        const headers = [];
        const rows = [];
        data.forEach((item, i) => {
            const cols = [];
            this.keys.forEach((key)=> {
                const notId = key.indexOf('id') < 0;
                if (notId) {
                    if (headers.length < this.keys.length - 1) {
                        headers.push(React.createElement('th', null, key));
                    }
                    if (key === 'title') {
                        const propsCol = {  style: { 'maxWidth' : '50%'}, onClick: () => { this.showViewModal(i) } };
                        cols.push(React.createElement('td', propsCol, React.createElement('a', null, data[i][key])));
                    } else {
                        cols.push(React.createElement('td', null, data[i][key]));
                    }
               }
            });
            cols.push(React.createElement('td',
                { onClick: () => {
                        this.showDeleteModal(i);
                    }
                }
            , React.createElement('button', null, 'x')));
            cols.push(React.createElement('td',
                { onClick: () => {
                        this.selectionHandler(i);
                    }
                }
                , React.createElement('div', { className: 'edit-icon' })));
            rows.push(React.createElement('tr', { id: data[i]['_id'] }, cols));
        });
        headers.push(React.createElement('th', null, 'Delete'));
        headers.push(React.createElement('th', null, 'Edit'));
        const head = React.createElement('thead', null, React.createElement('tr', null, headers));
        const body = React.createElement('tbody', null, rows);

        return React.createElement('table', null, [head, body]);
    }

    getTable = (data) => {
        console.log(this.data[this.state.index]);
        const table = this.createTable(data);
        const deleteDialog = DeleteDialog({ show: this.state.showDelete, handleClose: this.hideDeleteModal, indexDelete: this.state.index });
        const viewDialog = ViewDialog({ show: this.state.showView, handleClose: this.hideViewModal, viewItem: this.data[this.state.index], keys: this.keys });
        return React.createElement('main', null, [ table, deleteDialog, viewDialog ]);
    }

    render() {
        return this.getTable(this.data);
    }
}

export default IndexTable;