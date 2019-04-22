import React, { Fragment } from 'react';
import { Container, Nav, NavItem } from 'reactstrap';

import { withRouter } from 'react-router-dom';

const TabbedLink = ({ children, history, to }) => (
    <NavItem onClick={ () => history.push(to) } style={ { WebkitAppRegion: 'no-drag', cursor: 'pointer', fontSize: 20, paddingRight: 15, opacity: history.location.pathname === to ? 1 : 0.5 } }>
        { children }
    </NavItem>
);

const Landing = ({ children, history }) => (
    <Fragment>
        <Nav className='bg-light' style={ { WebkitAppRegion: 'drag', padding: 25 } }>
            <TabbedLink to='/' history={ history }>
                Capital
            </TabbedLink>
            <TabbedLink to='/accounts' history={ history }>
                Accounts
            </TabbedLink>
        </Nav>
        <Container fluid={ true }>
            { children }
        </Container>
    </Fragment>
);

export default withRouter(Landing);
