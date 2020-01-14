import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import AtlasContext from '../AtlasContext'
import GetStarted from '../GetStarted/GetStarted'
import Overview from '../Overview/Overview'
import CompetitionScreen from '../CompetitionScreen/CompetitionScreen'
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
      competition: {},
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
      fetch(`${config.API_ENDPOINT}/api/competitions`, options),
      fetch(`${config.API_ENDPOINT}/api/athletes`, options),
      fetch(`${config.API_ENDPOINT}/api/lifts`, options)
    ])
    .then(([competitionsRes, athletesRes, liftsRes]) => {
      if(!competitionsRes) {
        return competitionsRes.json().then(e => Promise.reject(e))
      }
      if(!athletesRes) {
        return athletesRes.json().then(e => Promise.reject(e))
      }
      if(!liftsRes) {
        return liftsRes.json().then(e => Promise.reject(e))
      }
      return Promise.all([
        competitionsRes.json(),
        athletesRes.json(),
        liftsRes.json()
      ])
    })
    .then(([competitions, athletes, lifts]) => {
      const competition = competitions.reduce((acc, obj) => {
        obj.athletes = athletes.reduce((acc, athlete) => {
          if (athlete.competition_id === obj.id) {
            acc.push(athlete.id)
          }
          return acc;
        }, []);
        obj.lifts = lifts.reduce((acc, lift) => {
          if (lift.competition_id === obj.id) {
            acc.push(lift.id)
          }
          return acc;
        }, []);
        acc[obj.id] = obj;
        return acc;
      }, {})

      const athlete = athletes.reduce((acc, obj) => {
        obj.lifts = lifts.filter(lift => lift.athlete_id === obj.id)
        acc[obj.id] = obj;
        return acc;
      }, {})
        const lift = lifts.reduce((acc,obj) => {
          acc[obj.id] = obj;
          return acc;
        }, {})

      this.setState({competition, athlete, lift})
    })
    .catch(error => {
      console.error({error})
    })
  }

  handleAddCompetition = competition => {
    this.setState({
      competitions: {
        ...this.state.competition,
        competition
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

  handleDeleteLift = liftId => {
    const currentLifts = this.state.lift;
    delete currentLifts[liftId]
    this.setState({
      lift: currentLifts
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
                  path='/competitions'
                  component={CompetitionScreen}
                />

                <Route
                  exact
                  path='/competitions/:competitionId'
                  component={Overview}
                />

                <Route
                  exact
                  path='/add-athlete/:competitionId'
                  component={AddAthlete}
                />

                <Route
                  exact
                  path='/add-lifts/:competitionId'
                  component={AddLifts}
                />

                <Route
                  exact
                  path='/results/:competitionId'
                  component={Results}
                />
      </>
    )
  }

  render() {
    const contextValue = {
      competitions: this.state.competition,
      athletes: this.state.athlete,
      lifts: this.state.lift,
      addAthlete: this.handleAddAthlete,
      addLifts: this.handleAddLifts,
      addCompetition: this.handleAddCompetition,
      deleteAthlete: this.handleDeleteAthlete,
      deleteLift: this.handleDeleteLift
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
