import React from 'react';
import { Container } from 'reactstrap';
import {
    AppHeader,
    AppSidebar,
    AppSidebarNav
} from '@coreui/react';
import navConfing from '../../../components/UI/navigation/navConfing';
import HeaderNav from '../../../components/UI/headerNav/HeaderNav';
import './MainLayout.scss';

class MainLayout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="app">
                    <AppHeader fixed>
                        <HeaderNav />
                    </AppHeader>
                    <div className="app-body">
                        <AppSidebar fixed display="lg">
                            <AppSidebarNav navConfig={navConfing} />
                        </AppSidebar>
                        <div className="main">
                            <Container fluid>
                                {this.props.children}
                            </Container>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default MainLayout;


