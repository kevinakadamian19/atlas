import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'
import AtlasContext from '../AtlasContext'
import GetStarted from '../GetStarted/GetStarted'
import Overview from '../Overview/Overview'
import RegisterEvent from '../RegisterEvent/RegisterEvent'
import AddAthlete from '../AddAthlete/AddAthlete'
import AddLifts from '../AddLifts/AddLifts'
import SelectEvent from '../SelectEvent/SelectEvent'
import dummyData from '../dummy-data';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      athletes: [],
      lifts: []
    }
  }

  componentDidMount() {
    this.setState({
      events: dummyData.events,
      athletes: dummyData.athletes,
      lifts: dummyData.lifts
    })
    /*Promise.all([
      fetch(`${config.API_ENDPOINT}/events`)
      fetch(`${config.API_ENDPOINT}/athletes`)
      fetch(`${config.API_ENDPOINT}/lifts`)
    ])
    .then(([eventsRes, athletesRes, liftsRes]) => {
      if(!eventsRes) {
        return eventsRes.json().then(e => Promise.reject(e))
      }
      if(!athletesRes) {
        return athletesRes.json().then(e => Promise.reject(e))
      }
      if(!liftsRes) {
        return liftsRes.json().then(e => Promise.reject(e))
      }
      return Promise.all([
        eventsRes.json(),
        athletesRes.json(),
        liftsRes.json()
      ])
    })
    .then((events, athletes, lifts) => {
      this.setState({events, athletes, lifts})
    })
    .catch(error => {
      console.error({error})
    })*/
  }

  handleAddEvent = event => {
    this.setState({
      events: [
        ...this.state.events,
        event
      ]
    })
  }

  handleAddAthlete = athlete => {
    this.setState({
      athletes: [
        ...this.state.athletes,
        athlete
      ]
    })
  }

  handleAddLifts = lift => {
    this.setState({
      lifts: [
        ...this.state.lifts,
        lift
      ]
    })
  }

  handleDeleteAthlete = athleteId => {
    this.setState({
      athletes: this.state.athletes.filter(athlete => athlete.id !== athleteId)
    })
  }

  render() {
    const contextValue = {
      events: this.state.events,
      athletes: this.state.athletes,
      lifts: this.state.lifts,
      addAthlete: this.handleAddAthlete,
      addLifts: this.handleAddLifts,
      addEvent: this.handleAddEvent,
      deleteAthlete: this.deleteAthlete
    }
    return (
      <AtlasContext.Provider value={contextValue}>
        <div className='App'>
          <nav role='navigation'>
            Already registered?
            <Link to='/select-event'>
            <button type='button'>Choose Event</button>
            </Link>
          </nav>
          <header>
            <h1>Atlas</h1>
          </header>

          <Route
            exact
            path='/select-event'
            component={SelectEvent}
          />

          <Route
            exact
            path='/'
            component={GetStarted}
          />

          <Route
            exact
            path='/register-event'
            component={RegisterEvent}
          />

          <Route
            exact
            path='/events/:eventId'
            component={Overview}
          />

          <Route
            exact
            path='/add-athlete'
            component={AddAthlete}
          />

          <Route
            exact
            path='/add-lifts'
            component={AddLifts}
          />
        </div>
      </AtlasContext.Provider>
    );
  }
}

export default App;
