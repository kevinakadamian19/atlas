import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import AtlasContext from '../AtlasContext'
import AthleteInfo from '../Loader/Loader'
import './Results.css'

class Results extends Component {
    static defaultProps = {
        match: {
            params: () => {}
        },
        history: {
            push: () => { }
        }
    }
    static contextType = AtlasContext;

    filteredAthletes = (athletes, competitionId) => {
        const id = parseInt(competitionId)
        return Object.values(athletes).filter(athlete => athlete.competition_id === id)
    }

    calculateWilksScore = (obj) => {
        const athletes = Object.values(obj)
        const results = {}
        for(let i = 0; i < athletes.length; i++) {
            if(athletes[i].gender === 'male') {
                const x = athletes[i].weight;
                const a = -216.0475144;
                const b = 16.2606339 * x;
                const c = -0.002388645 * x;
                const d = -0.00113732 * x;
                const e = 0.00000701863 * x;
                const f = -0.00000001291 * x;
                const wilksScore = (athletes[i].lifts[0].total * 500) / (a + b + Math.pow(c,2) + Math.pow(d, 3) + Math.pow(e,4) + Math.pow(f, 5));
                results[athletes[i].name] = wilksScore;
            }
            if(athletes[i].gender === 'female') {
                const x = athletes[i].weight;
                const a = 594.31747775582;
                const b = -27.23842536447 * x;
                const c = 0.82112226871 * x;
                const d = -0.00930733913 * x;
                const e = 0.00004731582 * x;
                const f = -0.00000009054 * x;
                const wilksScore = (athletes[i].lifts[0].total * 500) / (a + b + Math.pow(c,2) + Math.pow(d, 3) + Math.pow(e,4) + Math.pow(f, 5));
                results[`${athletes[i].name}`] = wilksScore;
            }
        }
        return results;
    }

    determineWinner = (obj) => {
        if(Object.keys(obj).length === 0) {
            return;
        }
        if(Object.keys(obj).length >= 1) {
            return Object.keys(obj).reduce(function(a,b) {
                return obj[a] > obj[b] ? a : b;
            })
        }
          
    }
   

    render() {
        const {athletes} = this.context;
        const competitionId = this.props.match.params.competitionId;
        const filteredAthletes = this.filteredAthletes(athletes, competitionId);
        const calculateScore = this.calculateWilksScore(filteredAthletes);
        const winner = this.determineWinner(calculateScore)
        return(
            <div className='page'>
              <nav className='nav-bar'>
                    <h1>Atlas</h1>
                    <div className='nav-buttons'>
                        <Link to='/'>
                            <button type='button'>
                                Home
                            </button>
                        </Link>
                        <Link to='/competitions'>
                            <button type='button'>
                                Competitions
                            </button>
                        </Link>
                    </div>
                </nav>
                <div className='winner'>
                    <h2>Congratulations!</h2>
                    <h4>The winner of the competition is: </h4>
                    {winner}
                </div>
                <table className="result-list">
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Weight Class</th>
                            <th>Total Lifted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAthletes.map(athlete =>
                                <tr key={athlete.id}>
                                     <AthleteInfo
                                        key={athlete.id}
                                        id={athlete.id}
                                        name={athlete.name}
                                        gender={athlete.gender}
                                        weight={athlete.weight}
                                        total={athlete.lifts[0].total}
                                    />
                                </tr>
                                )}
                        </tbody>
                        </table>

                
                <button
                    tag='button'
                    role='link'
                    className='results-button'
                    onClick={() => this.props.history.goBack()}
                >
                    Return
                </button>
            </div>
        )
    }
}

export default Results;