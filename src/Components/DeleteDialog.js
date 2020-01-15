import React from 'react';

const DeleteDialog = ({ handleClose, show, indexDelete }) => {
    const showHideClassName = show ? "modal delete display-block" : "modal delete display-none";
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <button className="modal-button" onClick={handleClose}>X</button>
                Do you really want to delete this row?
                <br/>
                <button  onClick={ ()=> {
                    handleClose(indexDelete);
                }}>Yes</button>
            </section>
        </div>
    );
};
export default DeleteDialog;