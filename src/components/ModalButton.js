import React, { Fragment, useState } from 'react';
import { Button } from 'reactstrap';
import Modal from './Modal';

const ModalButton = ({ component, text }) => {
    const [active, setActive] = useState(false);

    return (
        <Fragment>
            <Button onClick={ () => setActive(true) }>
                { text }
            </Button>
            <Modal
                shown={ active }
            >{ component({ close: () => setActive(false) }) }</Modal>
        </Fragment>
    );
};

export default ModalButton;
