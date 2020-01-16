import React from 'react';

const ViewDialog = ({ handleClose, show, viewItem, keys }) => {
    const showHideClassName = show ? "modal view display-block" : "modal view display-none";
    let labels = '';
    if(viewItem) {
        labels = keys.map((prop)=> {
            if (prop.indexOf('requirements') >= 0 || prop.indexOf('tasks') >= 0) {
                return <div style={{'paddingBottom': '3%'}}><label style={{'float':'left'}}><b>{prop}: </b></label> <span style={{'float':'right'}}><ul> {viewItem[prop].map((item)=> { return <li style={{float: 'left'}}>{item}</li> })}</ul></span></div>
            }
            return <div style={{'paddingBottom': '3%'}}><label style={{'float':'left'}}><b>{prop}: </b></label> <span style={{'float':'right'}}> {viewItem[prop]}</span></div>
        });
    }

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <button className="modal-button" onClick={handleClose}>X</button>
                <div style={{'display':'grid'}}>
                    { labels }
                </div>
            </section>
        </div>
    );
};
export default ViewDialog;