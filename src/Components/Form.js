import * as React from "react";

class Form extends React.Component {
    valueMap = new Map();
    data;
    templateList;
    selectedObject;
    selectedIndex;
    updateDataHandler;

    constructor(props) {
        super(props);
        let stateProp = null;
        if (props[0] && props[0].location && props[0].location.state) {
            stateProp = props[0].location.state;
        } else {
            stateProp = props;
        }
        const fieldsList = props.keys;
        this.selectedObject = stateProp.selectedItem;
        this.selectedIndex = stateProp.selectedIndex;
        this.data = stateProp.data;
        this.updateDataHandler = props.updateDataHandler;

        fieldsList.forEach(field => {
            if (this.selectedObject) {
                this.valueMap.set(field, this.selectedObject[field]);
            } else {
                this.valueMap.set(field, '');
            }
        });

        this.state = {
            valueMap: this.valueMap
        };

        const fieldMap = [];
        this.valueMap.forEach((value, key) => {
            let type = 'input';
            if (key.indexOf('requirements') >= 0 || key.indexOf('tasks') >= 0) {
                type = 'textarea';
            }
            if (key.indexOf('id') < 0) {
                fieldMap.push(React.createElement('li', null, React.createElement('label', null, key, React.createElement(type, {type: 'text',
                onChange:  (event) => {
                    this.myChangeHandler(event, key);
                }, value: this.state.valueMap[key] , style: { width: '100%' }, name:key }))));
            }
        });
        this.templateList = React.createElement('ul', { className: 'form-style-1'}, fieldMap);
    }

    myChangeHandler = (event, key) => {
        this.valueMap.delete(key);
        this.valueMap.set(key, event.target.value);
        this.setState({valueMap: this.valueMap });
    };

    render() {
        return (
            <form >
                { this.templateList }
                <input type="button" className="submit-button" onClick={() => {
                    this.setState({ data: this.data, selectedItem: this.selectedObject, selectedIndex: this.selectedIndex, updateDataHandler: this.updateDataHandler });
                    this.updateDataHandler(this.selectedObject, this.selectedIndex);
                }} value="Submit" />
            </form>
        );
    }
}

export default Form;