import React, {Component} from 'react'
import AtlasContext from '../AtlasContext'
import { Link } from 'react-router-dom'
import ValidationError from '../ValidationError'
import config from '../config'
import './AddLifts.css'

class AddLifts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bench: {
                value: '',
                touched: false
            },
            squat: {
                value: '',
                touched: false
            },
            deadlift: {
                value: '',
                touched: false
            }
        }
    }
    static defaultProps = {
        match: {
            params: {}
        },
        history: {
            push: () => { }
        }
    }
    static contextType = AtlasContext;

    handleSubmit = e => {
        e.preventDefault();
        
        const newLifts = {
            squat: parseInt(e.target['lift-squat'].value),
            bench: parseInt(e.target['lift-bench'].value),
            deadlift: parseInt(e.target['lift-deadlift'].value),
            athlete_id: parseInt(e.target['lift-athlete'].value),
            competition_id: parseInt(this.props.match.params.competitionId),
            total: (parseInt(this.state.squat.value) + parseInt(this.state.bench.value) + parseInt(this.state.deadlift.value))
        };
        console.log(newLifts)
        fetch(`${config.API_ENDPOINT}/api/lifts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${config.API_KEY}`
            },
            body: JSON.stringify(newLifts)
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(lifts => {
            this.context.addAthlete(lifts)
            this.props.history.push(`/competitions/${newLifts.competition_id}`)
        })
        .catch(error => {
            console.error({error})
        })
    }
    handleUpdateSquat = squat => {
        this.setState({
            squat: {
                value: squat,
                touched: true
            }
        })
    }
    handleUpdateBench = bench => {
        this.setState({
            bench: {
                value: bench,
                touched: true
            }
        })
    }
    handleUpdateDeadlift = deadlift => {
        this.setState({
            deadlift: {
                value: deadlift,
                touched: true
            }
        })
    }

    handleUpdateAthlete = athlete => {
        this.setState({
            athlete: {
                value: athlete,
                touched: true
            }
        })
    }

    validateSquat(fieldValue) {
        const squat = this.state.squat.value.trim();
        if(squat === null) {
            return `Numeric Entry is required for squat.`
        }
    }
    validateBench(fieldValue) {
        const bench = this.state.bench.value.trim();
        if(bench === null) {
            return `Numeric Entry is required for bench press.`
        }
    }
    validateDeadlift(fieldValue) {
        const deadlift = this.state.deadlift.value.trim();
        if(deadlift === null) {
            return `Numeric Entry is required for deadlift.`
        }
    }

    filteredAthletes = (athletes, competitionId) => {
        const id = parseInt(competitionId)
        return Object.values(athletes).filter(athlete => athlete.competition_id === id)
    }

    render() {
        const {athletes} = this.context;
        const competitionId = this.props.match.params.competitionId;
        const squatError= this.validateSquat();
        const benchError = this.validateBench();
        const deadliftError = this.validateDeadlift();
        const filteredAthletes = this.filteredAthletes(athletes, competitionId);
        return (
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
                <h3>Register Lifts</h3>
                    Complete this form to register for the meet.
                    <form className='register-lift-form' onSubmit={e => this.handleSubmit(e)}>
                    <div className='field'>
                            <label htmlFor='register-lift'>
                                Athlete
                            </label>
                            <select 
                                id='category_type'
                                name='lift-athlete'
                            >
                                <option value={null}>...</option>
                                {filteredAthletes.map(athlete => 
                                    <option key={athlete.id} value={athlete.id}>
                                        {athlete.name}
                                    </option>    
                                )}
                            </select>
                        </div>
                        <div className='field'>
                            <label htmlFor='register-lift'>
                                Squat
                            </label>
                            <input 
                                type='number'
                                id='lift-squat-input'
                                name='lift-squat'
                                defaultValue= '0'
                                onChange={e => this.handleUpdateSquat(e.target.value)}
                            />
                            {this.state.squat.touched && (
                                <ValidationError message={squatError} />
                            )}
                        </div>
                        <div className='field'>
                            <label htmlFor='register-lift'>
                                Bench
                            </label>
                            <input 
                                type='number'
                                id='lift-bench-input'
                                name='lift-bench'
                                defaultValue= '0'
                                onChange={e => this.handleUpdateBench(e.target.value)}
                            />
                            {this.state.squat.touched && (
                                <ValidationError message={benchError} />
                            )}
                        </div>
                        <div className='field'>
                            <label htmlFor='register-lift'>
                                Deadlift
                            </label>
                            <input 
                                type='number'
                                id='lift-deadlift-input'
                                name='lift-deadlift'
                                defaultValue= '0'
                                onChange={e => this.handleUpdateDeadlift(e.target.value)}
                            />
                            {this.state.squat.touched && (
                                <ValidationError message={deadliftError} />
                            )}
                        </div>
                      
                        <button 
                            type='submit'
                            >
                                Submit
                        </button>
                    </form>
            </div>
        )
    }
} 
export default AddLifts;