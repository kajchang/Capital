import React, { Fragment } from 'react';
import { Container, Nav, NavItem } from 'reactstrap';

import { withRouter } from 'react-router-dom';

const Landing = ({ children, history }) => (
    <Fragment>
        <Nav className='bg-light' style={ { WebkitAppRegion: 'drag', padding: 25 } }>
            <NavItem onClick={ () => history.push('/') } style={ { WebkitAppRegion: 'no-drag', cursor: 'pointer', fontSize: 20 } }>
                Capital
            </NavItem>
        </Nav>
        <Container fluid={ true }>
            { children }
        </Container>
    </Fragment>
);

export default withRouter(Landing);
