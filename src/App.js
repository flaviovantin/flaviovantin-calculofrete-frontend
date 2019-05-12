import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Modal, Button } from 'react-bootstrap'
import { Route, Link } from 'react-router-dom'
import Home from './components/Home'
import TabelasFreteCRUD from './components/tabelas/TabelasFreteCRUD'
import CalculoFreteCRUD from './components/calculo/CalculoFreteCRUD'
import CandidatoCRUD from './components/candidato/CandidatoCRUD'

class App extends Component {

  constructor (props) {
    super(props)
    this.handleHide = this.handleHide.bind(this)
  }

  handleHide() {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Cálculo de Frete</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1}><Link to="/fretes">Tabela de Frete ANTT</Link></NavItem>
              <NavItem eventKey={2}><Link to="/calculofrete">Cálculo de Frete</Link></NavItem>
              <NavItem eventKey={32}><Link to="/sobrecandidato">Sobre o Candidato</Link></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Route path="/" exact={true} component={Home} />
        <Route path="/fretes" component={TabelasFreteCRUD} />
        <Route path="/calculofrete" component={CalculoFreteCRUD} />
        <Route path="/sobrecandidato" component={CandidatoCRUD} />
      </div>
    )
  }
}

export default App
