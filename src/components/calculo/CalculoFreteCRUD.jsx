import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/FreteActions'
import { Grid, ControlLabel, Button, Row, FormGroup, Col, FormControl, Modal } from 'react-bootstrap'
import { css } from 'react-emotion'
import { BarLoader } from 'react-spinners'

const override = css `display: block; margin: 0 auto; border-color: red;`

class CalculoFreteCRUD extends Component {

  constructor (props) {
    super(props)

    this.state = {
      tipoCarga: undefined,
      distancia: undefined,
      numeroEixos: undefined,
      margemLucro: undefined,
      totalPedagios: undefined,
      totalFrete: undefined
    }
  }

  componentWillMount() {
    this.props.screenLoading(false)
  }

  componentDidMount() {
    this.setState({
        showModalErro: this.props.calculoFreteReducer.mensagemErro ? true : false
    })
  }

  calcularFrete = () => {
    this.props.screenLoading(true)
    this.props.calcularFrete({
      tipoCarga: this.state.tipoCarga,
      distancia: this.state.distancia,
      numeroEixos: this.state.numeroEixos,
      margemLucro: this.state.margemLucro,
      totalPedagios: this.state.totalPedagios
    })
  }

  limparCampos = () => {
    this.setState({
        tipoCarga: 'selecione',
        distancia: '',
        numeroEixos: '',
        margemLucro: '',
        totalPedagios: ''
    })
  }

  handleHide = () => {
      this.props.fecharModalErro();
  }

  handleChange = (e) => {
    this.setState({ tipoCarga: e.target.value })
  }

  render() {
    return (
      <div>
      <Grid>
          <Row>&nbsp;</Row>
          <Row >
            <Col xs={6} mdOffset={5} md={2}>
                <h4>Cálculo de Frete</h4>
            </Col>
          </Row>
        
        <Row>&nbsp;</Row>
        <Row>
          <FormGroup bsSize="small">    
            <Col xs={12} mdOffset={1} md={3}>
              <ControlLabel>Tipo de Carga*</ControlLabel>
              <FormControl 
                componentClass="select"
                value={this.state.tipoCarga}
                onChange={this.handleChange}>
                  <option value="selecione">Selecione</option>
                  <option value="carga-geral">Carga Geral</option>
                  <option value="carga-granel">Carga Granel</option>
                  <option value="carga-neogranel">Carga Neogranel</option>
                  <option value="carga-frigorificada">Carga Frigorificada</option>
                  <option value="carga-perigosa">Carga Perigosa</option>
              </FormControl>
            </Col>
            <Col xs={12} md={3}>
              <ControlLabel>Distância (em Km)*</ControlLabel>
              <FormControl
                type="text"
                value={this.state.distancia}
                placeholder="Ex.: 500"
                onChange={e => this.setState({ distancia: e.target.value })} />
            </Col>
            <Col xs={12} md={3}>
              <ControlLabel>Número de Eixos*</ControlLabel>
              <FormControl
                type="text"
                value={this.state.numeroEixos}
                placeholder="Ex.: 6"
                onChange={e => this.setState({ numeroEixos: e.target.value })} />
            </Col>
          </FormGroup>
        </Row>

        <Row>&nbsp;</Row>
        <Row>
          <FormGroup bsSize="small">
            <Col xs={12} mdOffset={1} md={3}>
              <ControlLabel>Porcentagem de Lucro*</ControlLabel>
              <FormControl
                type="text"
                value={this.state.margemLucro}
                placeholder="Ex.: 30.5"
                onChange={e => this.setState({ margemLucro: e.target.value })} />
            </Col>
            <Col xs={12} md={3}>
              <ControlLabel>Custos com Pedágios</ControlLabel>
              <FormControl
                type="text"
                value={this.state.totalPedagios}
                placeholder="Ex.: 550.45"
                onChange={e => this.setState({ totalPedagios: e.target.value })} />
            </Col>
            <Col xs={3} md={1}>
              <ControlLabel>&nbsp;</ControlLabel>
              <Row>
                <Col xs={6} md={2}>
                  <Button bsStyle="primary" bsSize="small" onClick={() => this.calcularFrete()}>Calcular</Button>
                </Col>
              </Row>
            </Col>

            <Col xs={6} md={1}>
              <ControlLabel>&nbsp;</ControlLabel>
              <Row>
                <Col xs={3} md={1}>
                  <Button bsStyle="default" bsSize="small" onClick={() => this.limparCampos()}>Limpar</Button>
                </Col>
              </Row>
            </Col>
          </FormGroup>
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
        <Row>
          <Col xs={12} mdOffset={4} md={6}>
            <Col xs={6} md={4}>
              <Row bsClass="text-right"><ControlLabel>Valor Total do Frete</ControlLabel></Row>
            </Col>
            <Col xs={6} md={3}>
              <Row>
                <ControlLabel>{formataValor(this.props.calculoFreteReducer.totalFrete)}</ControlLabel>
              </Row>
            </Col>
          </Col>
        </Row>
      </Grid>

      <Modal show={this.props.calculoFreteReducer.mensagensErro.length > 0}>
        <Modal.Header><Modal.Title>Parâmetros Inválidos</Modal.Title></Modal.Header>
        <Modal.Body>
          <ul>{this.props.calculoFreteReducer.mensagensErro.map(err => { return <li>{err}</li> })}</ul>
        </Modal.Body>
        <Modal.Footer><Button onClick={() => this.handleHide()}>Fechar</Button></Modal.Footer>
      </Modal>
      </div>
    )
  }
}

function formataValor(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor); // '$100.00'
}

function mapStateToProps(state) {
    return { 
        calculoFreteReducer: state.CalculoFreteReducer
    }
}

const mapDispacthToProps = dispacth => bindActionCreators(actions, dispacth);

export default connect(mapStateToProps, mapDispacthToProps)(CalculoFreteCRUD)
