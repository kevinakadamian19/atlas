import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import AtlasContext from '../AtlasContext'
import GetStarted from '../GetStarted/GetStarted'
import Overview from '../Overview/Overview'
import EventScreen from '../EventScreen/EventScreen'
import AddAthlete from '../AddAthlete/AddAthlete'
import AddLifts from '../AddLifts/AddLifts'
import Results from '../Results/Results'
import SubmitFormError from '../SubmitFormError/SubmitFormError'
import config from '../config'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: {},
      athlete: {},
      lift: {}
    }
  }

  componentDidMount() {
    const options = {
      method: 'GET',
      headers: {
        "Authorization": `${config.API_KEY}`,
        "Content-Type": "application/json"
        }
      };

      Promise.all([
      fetch(`${config.API_ENDPOINT}/api/events`, options),
      fetch(`${config.API_ENDPOINT}/api/athletes`, options),
      fetch(`${config.API_ENDPOINT}/api/lifts`, options)
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
    .then(([events, athletes, lifts]) => {
      const event = events.reduce((acc, obj) => {
        obj.athletes = athletes.reduce((acc, athlete) => {
          if (athlete.event === obj.id) {
            acc.push(athlete.id)
          }
          return acc;
        }, []);
        obj.lifts = lifts.reduce((acc, lift) => {
          if (lift.event === obj.id) {
            acc.push(lift.id)
          }
          return acc;
        }, []);
        acc[obj.id] = obj;
        return acc;
      }, {})
        const athlete = athletes.reduce((acc, obj) => {
          obj.lifts = lifts.filter(lift => lift.athlete === obj.id)
          acc[obj.id] = obj;
          return acc;
        }, {})
        const lift = lifts.reduce((acc,obj) => {
          acc[obj.id] = obj;
          return acc;
        }, {})

      this.setState({event, athlete, lift})
    })
    .catch(error => {
      console.error({error})
    })
  }

  handleAddEvent = event => {
    this.setState({
      events: {
        ...this.state.event,
        event
      }
    })
  }

  handleAddAthlete = athlete => {
    this.setState({
      athletes: {
        ...this.state.athlete,
        athlete
      }
    })
  }

  handleAddLifts = lift => {
    this.setState({
      lifts: {
        ...this.state.lift,
        lift
      }
    })
  }

  handleDeleteAthlete = athleteId => {
    const currentAthletes = this.state.athlete;
    delete currentAthletes[athleteId]
    this.setState({
      athlete: currentAthletes
    })
  }

  renderRoutes() {
    return (
      <>

                <Route
                  exact
                  path='/'
                  component={GetStarted}
                />

                <Route
                  exact
                  path='/events'
                  component={EventScreen}
                />

                <Route
                  exact
                  path='/events/:eventId'
                  component={Overview}
                />

                <Route
                  exact
                  path='/add-athlete/:eventId'
                  component={AddAthlete}
                />

                <Route
                  exact
                  path='/add-lifts/:eventId'
                  component={AddLifts}
                />

                <Route
                  exact
                  path='/results/:eventId'
                  component={Results}
                />
      </>
    )
  }

  render() {
    const contextValue = {
      events: this.state.event,
      athletes: this.state.athlete,
      lifts: this.state.lift,
      addAthlete: this.handleAddAthlete,
      addLifts: this.handleAddLifts,
      addEvent: this.handleAddEvent,
      deleteAthlete: this.handleDeleteAthlete
    }
    console.log(this.state)
    return (
      <AtlasContext.Provider value={contextValue}>
        <div className='page'>
          <Route render={({location}) => (
              <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={300}
                classNames="fade"
              >
                <Switch location={location}>
                  <SubmitFormError>
                    {this.renderRoutes()}
                  </SubmitFormError>
                </Switch>
              </CSSTransition>   
            </TransitionGroup>
          )} />
        </div>
      </AtlasContext.Provider>
    );
  }
}

export default App;
