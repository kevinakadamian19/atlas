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
    const events = data.events.reduce((acc, obj) => {
      obj.athletes = data.athletes.reduce((acc, athlete) => {
        if (athlete.event === obj.id) {
          acc.push(athlete.id)
        }
        return acc;
      }, []);
      obj.lifts = data.lifts.reduce((acc, lift) => {
        if (lift.event === obj.id) {
          acc.push(lift.id)
        }
        return acc;
      }, []);
    
      acc[obj.id] = obj;
      return acc;
    }, {})
    
    
    // normalize athletes 
    const athletes = data.athletes.reduce((acc, obj) => {
      obj.lifts = data.lifts.filter(lift => lift.athlete === obj.id)
      acc[obj.id] = obj;
      return acc;
    }, {})
    
    
    // normalize lifts
    const lifts = data.lifts.reduce((acc,obj) => {
      acc[obj.id] = obj;
      return acc;
    }, {})

    this.setState({
      events: events,
      athletes: athletes,
      lifts: lifts
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
      const events = data.events.reduce((acc, obj) => {
        obj.athletes = data.athletes.reduce((acc, athlete) => {
          if (athlete.event === obj.id) {
            acc.push(athlete.id)
          }
          return acc;
        }, []);
        obj.lifts = data.lifts.reduce((acc, lift) => {
          if (lift.event === obj.id) {
            acc.push(lift.id)
          }
          return acc;
        }, []);
      
        acc[obj.id] = obj;
        return acc;
      }, {})
    
    // normalize athletes 
        const athletes = data.athletes.reduce((acc, obj) => {
          obj.lifts = data.lifts.filter(lift => lift.athlete === obj.id)
          acc[obj.id] = obj;
          return acc;
        }, {})
    
    // normalize lifts
        const lifts = data.lifts.reduce((acc,obj) => {
          acc[obj.id] = obj;
          return acc;
        }, {})

      this.setState({events, athletes, lifts})
    })
    .catch(error => {
      console.error({error})
    })*/
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
    this.setState({
      athletes: this.state.athletes.filter(athlete => athlete.id !== athleteId)
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
      deleteAthlete: this.deleteAthlete
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
                  {this.renderRoutes()}
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
