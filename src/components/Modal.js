import React  from 'react';

const Modal = ({ shown, children }) => (
    shown ? <div style={ {
        position: 'fixed',
        zIndex: 1,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    } }><div style={ {
        position: 'fixed',
        top: '30%',
        left: '50%',
        marginLeft: '-40%',
        width: '80%'
    } }>
        { children }
    </div></div>: null
);

export default Modal;
