import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/FreteActions'
import { Grid, Table, Row, Col, ControlLabel } from 'react-bootstrap'
import { css } from 'react-emotion'
import { BarLoader } from 'react-spinners'

const override = css `display: block; margin: 0 auto; border-color: red;`

class TabelasFreteCRUD extends Component {

  constructor (props) {
    super(props)
  }

  componentWillMount() {
    this.props.screenLoading(true)
  }

  componentDidMount() {
    this.props.obterFretes()
  }

  render() {
    return (
      <div>
      <Grid>
          <Row>&nbsp;</Row>
          <Row bsClass="text-center">
            <Col xs={6} mdOffset={2} md={8}>
                <h4>Tabelas de Frete ANTT</h4>
            </Col>
          </Row>

        <Row>&nbsp;</Row>
        {
            <BarLoader
                className={override}
                sizeUnit={"px"}
                height={1}
                heightUnit={'px'}
                widthUnit={'%'}
                width={100}
                color={'#337ab7'}
                loading={this.props.calculoFreteReducer.loading}/>
        }

                
        <Row>&nbsp;</Row>

        {this.props.calculoFreteReducer.tabelasANTT.map((tabela, index1) => {
            return (
                <div>
                    <Col xs={6} mdOffset={2} md={8}>
                        <Row bsClass="text-center">
                            <ControlLabel>Tabela de Preços Mínimos por Km/Eixo - {formataNomeTipoCarga(tabela.tipoCarga)}</ControlLabel>
                        </Row>
                        <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>Km Inicial</th>
                                    <th>Km Final</th>
                                    <th>Custo por Km/Eixo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tabela.fretes.map((frete, index2) => {
                                        return (
                                            <tr key={index2}>
                                                <td>{frete.de}</td>
                                                <td>{frete.ate}</td>
                                                <td>{formataValor(frete.custoPorKm)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Col>
                </div>
            )
        })}
      </Grid>
      </div>
    )
  }
}

function formataValor(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor); // '$100.00'
}

function formataNomeTipoCarga(nome) {
    return nome.replace('-', ' ').toUpperCase()
}

function mapStateToProps(state) {
    return { 
        calculoFreteReducer: state.CalculoFreteReducer
    }
}

const mapDispacthToProps = dispacth => bindActionCreators(actions, dispacth);

export default connect(mapStateToProps, mapDispacthToProps)(TabelasFreteCRUD)
