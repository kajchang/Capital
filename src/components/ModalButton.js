import React, { Fragment, useState } from 'react';
import { Button } from 'reactstrap';
import Modal from './Modal';

const ModalButton = ({ text, component, buttonProps }) => {
    const [active, setActive] = useState(false);

    return (
        <Fragment>
            <Button { ...buttonProps } onClick={ () => setActive(true) }>
                { text }
            </Button>
            <Modal
                shown={ active }
            >{ component({ close: () => setActive(false) }) }</Modal>
        </Fragment>
    );
};

export default ModalButton;
