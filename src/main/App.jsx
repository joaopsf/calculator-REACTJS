import React, { Component, Fragment } from "react";
import './App.scss';

import Button from '../components/Button';
import Display from '../components/Display'

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DialpadIcon from '@material-ui/icons/Dialpad';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}

export default class App extends Component {

  state = {...initialState}

  constructor(props) {
    super(props)
    this.clearMemory = this.clearMemory.bind(this)
    this.setOperation = this.setOperation.bind(this)
    this.addDigit = this.addDigit.bind(this)
  }

  clearMemory() {
    this.setState({...initialState})
  }

  setOperation(operation) {
    if(this.state.current === 0) {
      this.setState({operation, current: 1, clearDisplay: true})
    } else {
      const equals = operation === '='
      const currentOperation = this.state.operation

      const values = [...this.state.values]
      if(currentOperation === '+') {
        values[0] = values[0] + values[1]
      } else if(currentOperation === '-') {
        values[0] = values[0] - values[1]
      } else if(currentOperation === '/') {
        values[0] = values[0] / values[1]
      } else {
        values[0] = values[0] * values[1]
      }

      values[1] = 0
      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      })
    }
  }

  addDigit(n) {
    if(n === '.' && this.state.displayValue.includes('.')) {
      return 
    }
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    this.setState({displayValue, clearDisplay: false})

    if(n !== '.') {
      const i = this.state.current
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[i] = newValue
      this.setState({values})
    }
  }

  render() {
    return (
      <Fragment>
        <AppBar position="fixed">
          <Container maxWidth="lg">
            <Toolbar variant="dense">
              <IconButton edge="start" color="inherit" aria-label="menu">
                <DialpadIcon />
              </IconButton>
              <Typography variant="h6" color="inherit"> Calculator </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        <Container maxWidth="lg">
          <div className="app-description">
            <Grid item xs={12}>
              <h1>About!</h1>
              <p>A simple app that only converts the values ​​of some currencies to currencies, according to your need. Developed using only <strong>ReactJS</strong> and <strong>Material-UI</strong>.</p>
            </Grid>
          </div>
        </Container>
        <Container maxWidth="lg">
          <div className="calculator">
            <Display value={this.state.displayValue} />
            <Button label="AC" click={() => this.clearMemory()} triple></Button>
            <Button label="/" click={this.setOperation} operation></Button>
            <Button label="7" click={this.addDigit}></Button>
            <Button label="8" click={this.addDigit}></Button>
            <Button label="9" click={this.addDigit}></Button>
            <Button label="*" click={this.setOperation} operation></Button>
            <Button label="4" click={this.addDigit}></Button>
            <Button label="5" click={this.addDigit}></Button>
            <Button label="6" click={this.addDigit}></Button>
            <Button label="-" click={this.setOperation} operation></Button>
            <Button label="1" click={this.addDigit}></Button>
            <Button label="2" click={this.addDigit}></Button>
            <Button label="3" click={this.addDigit}></Button>
            <Button label="+" click={this.setOperation} operation></Button>
            <Button label="0" click={this.addDigit} double></Button>
            <Button label="." click={this.addDigit}></Button>
            <Button label="=" click={this.setOperation} operation></Button>
          </div>
        </Container>
      </Fragment>
    );
  }
}
