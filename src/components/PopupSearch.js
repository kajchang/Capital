import React, { Fragment, useState } from 'react';
import { Input, ListGroup, ListGroupItem } from 'reactstrap';

const PopupSearch = ({ placeholder, maxShown, popUpWidth, data, onComplete, onInterrupted }) => {
    const [value, setValue] = useState('');
    const [active, setActive] = useState(false);

    return (
        <Fragment>
            <Input value={ value } onChange={ e => setValue(e.target.value) } onFocus={ () => {
                setActive(true);
                onInterrupted();
            } } placeholder={ placeholder }/>
            {
                active ? <ListGroup style={ { position: 'absolute', zIndex: 1, width: popUpWidth, marginTop: 38 } }>
                    {
                        data
                            .filter(content => content.toLowerCase().includes(value.toLowerCase()))
                            .slice(0, maxShown)
                            .map((content, idx) =>
                                <ListGroupItem onClick={ () => {
                                    setValue(content);
                                    setActive(false);
                                    onComplete(content);
                                } } key={ idx } style={ { cursor: 'pointer'} }>{ content }</ListGroupItem>
                            )
                    }
                </ListGroup> : null
            }
        </Fragment>
    );
};

export default PopupSearch;
