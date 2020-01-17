import * as React from "react";

class Form extends React.Component {

    updateDataHandler;

    constructor(props) {
        super(props);
        let stateProp = null;
        if (props[0] && props[0].location && props[0].location.state) {
            stateProp = props[0].location.state;
        } else {
            stateProp = props;
        }
        this.updateDataHandler = props.updateDataHandler;

        let id;
        if (stateProp.selectedItem && stateProp.selectedItem._id) {
            id = stateProp.selectedItem._id;
        } else {
            id = Math.random().toString();
        }

        this.state = {
            _id: id,
            title : stateProp.selectedItem?.title ,
            city : stateProp.selectedItem?.city ,
            employer : stateProp.selectedItem?.employer,
            requirements: stateProp.selectedItem?.requirements,
            tasks: stateProp.selectedItem?.tasks,
            selectedItem: stateProp?.selectedItem,
            data: stateProp.data,
            usrForm: null
        };

        this.formFields = {
            title : {
                value: this.state.title,
                type: 'text'
            },
            city : {
                value: this.state.city,
                    type: 'text'
            },
            employer : {
                value: this.state.employer,
                type: 'text'
            },
            requirements: {
                value: this.state.requirements,
                type: 'text-area'
            },
            tasks: {
                value: this.state.tasks,
                type: 'text-area'
            }
        };
    }

    componentDidMount () {
        this.buildForm();
    };

    updateField = e => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => this.buildForm());

    };

    buildForm() {
        const usrForm = (<ul key={Math.random() * Math.random()} className="form-style-1"> {Object.keys(this.formFields).map(field => {
            this.formFields[field].value = this.state[field];
            switch (this.formFields[field].type) {
                case 'text':
                    return (
                        <li key={Math.random() * Math.random()}>
                            <label> {field}*</label>
                            <input type={
                                this.formFields[field].type
                            }
                                      value={
                                          this.formFields[field].value
                                      }
                                      onChange={
                                          this.updateField
                                      }
                                      name={field}
                            />
                        </li>
                    );
                case 'text-area':
                    return (<li key={Math.random() * Math.random()}>
                        <label> {field}*</label>
                        <textarea type={
                        this.formFields[field].type
                    }
                              value={
                                  this.formFields[field].value
                              }
                              onChange={
                                  this.updateField
                              }
                              name={field}
                    /></li>);
                default:
                    return '';
            }
        }) }</ul>);
        this.setState({
            usrForm: usrForm
        });
    }

    render() {
        return (
            <div> {
                this.state.usrForm
            }
                <input type="button" className="submit-button" onClick={() => {
                    const errorMessage = 'All mandatory fields should be filled';
                    if (this.state.title == null) {
                        alert(errorMessage);
                        return;
                    }

                    if (this.state.city == null) {
                        alert(errorMessage);
                        return;
                    }

                    if (this.state.requirements == null) {
                        alert(errorMessage);
                        return;
                    }

                    if (this.state.employer == null) {
                        alert(errorMessage);
                        return;
                    }

                    if (this.state.tasks == null) {
                        alert(errorMessage);
                        return;
                    }
                    let requirements = this.state.requirements;
                    let tasks = this.state.tasks;

                    if (Array.isArray(this.state.requirements)) {
                        requirements = this.state.requirements.toString();
                    }

                    if (Array.isArray(this.state.tasks)) {
                        tasks = this.state.tasks.toString();
                    }
                    const selectObject = {
                        _id: this.state._id,
                        title : this.state.title ,
                        city : this.state.city ,
                        employer : this.state.employer,
                        requirements:requirements.split("."),
                        tasks: tasks.split("."),
                    };

                    this.updateDataHandler(selectObject);
                }} value="Submit" />
            </div>

        )

    }
}

export default Form;