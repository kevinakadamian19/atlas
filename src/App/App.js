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
import data from '../dummy-data';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: {},
      athletes: {},
      lifts: {}
    }
  }

  componentDidMount() {
    // assuming all data has come back, and placed into one object, with events, athletes, and lifts keys and corresponding arrays of objects 
    // fetch events, athletes, and lifts independantly, create an object as above, then normalize that object as below then can update state
    // const events = data.events.reduce((acc, obj) => {
    //   obj.athletes = data.athletes.reduce((acc, athlete) => {
    //     if (athlete.event === obj.id) {
    //       acc.push(athlete.id)
    //     }
    //     return acc;
    //   }, []);
    //   obj.lifts = data.lifts.reduce((acc, lift) => {
    //     if (lift.event === obj.id) {
    //       acc.push(lift.id)
    //     }
    //     return acc;
    //   }, []);
    
    //   acc[obj.id] = obj;
    //   return acc;
    // }, {})
    
    
    // // normalize athletes 
    // const athletes = data.athletes.reduce((acc, obj) => {
    //   obj.lifts = data.lifts.filter(lift => lift.athlete === obj.id)
    //   acc[obj.id] = obj;
    //   return acc;
    // }, {})
    
    
    // // normalize lifts
    // const lifts = data.lifts.reduce((acc,obj) => {
    //   acc[obj.id] = obj;
    //   return acc;
    // }, {})

    // this.setState({
    //   events: events,
    //   athletes: athletes,
    //   lifts: lifts
    // })
    const options = {
      method: 'GET',
      headers: {
        "Authorization": `${config.API_KEY}`,
        "Content-Type": "application/json"
        }
      };

      Promise.all([
      fetch(`${config.API_ENDPOINT}/events`, options),
      fetch(`${config.API_ENDPOINT}/athletes`, options),
      fetch(`${config.API_ENDPOINT}/lifts`, options)
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
    
    // normalize athletes 
        const athlete = athletes.reduce((acc, obj) => {
          obj.lifts = lifts.filter(lift => lift.athlete === obj.id)
          acc[obj.id] = obj;
          return acc;
        }, {})
    
    // normalize lifts
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
        ...this.state.events,
        event
      }
    })
  }

  handleAddAthlete = athlete => {
    this.setState({
      athletes: {
        ...this.state.athletes,
        athlete
      }
    })
  }

  handleAddLifts = lift => {
    this.setState({
      lifts: {
        ...this.state.lifts,
        lift
      }
    })
  }

  handleDeleteAthlete = athleteId => {
    //id will not be string once we hook API. Remove the `${}`
    const currentAthletes = this.state.athletes;
    delete currentAthletes[`${athleteId}`]
    this.setState({
      athletes: currentAthletes
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
                  path='/event'
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
      events: this.state.events,
      athletes: this.state.athletes,
      lifts: this.state.lifts,
      addAthlete: this.handleAddAthlete,
      addLifts: this.handleAddLifts,
      addEvent: this.handleAddEvent,
      deleteAthlete: this.handleDeleteAthlete
    }
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
