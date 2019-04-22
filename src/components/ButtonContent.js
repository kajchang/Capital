import React, { Fragment, useState } from 'react';
import { Button } from 'reactstrap';

const ButtonContent = ({ children, text }) => {
    const [active, setActive] = useState(false);

    return (
        <Fragment>
            <Button onClick={ () => setActive(!active) }>
                { text }
            </Button>
            {
                active ? children : null
            }
        </Fragment>
    );
};

export default ButtonContent;
