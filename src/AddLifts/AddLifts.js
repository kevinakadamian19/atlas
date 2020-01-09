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
            },
            athlete: {
                value: '',
                touched: false
            },
            total: {
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

    totalLifts = () => {
        const a = parseInt(this.state.squat.value)
        const b = parseInt(this.state.bench.value)
        const c = parseInt(this.state.deadlift.value)
        return a + b + c;
    }

    handleSubmit = e => {
        e.preventDefault();
        const newLifts = {
            squat: e.target['lift-squat'].value,
            bench: e.target['lift-bench'].value,
            deadlift: e.target['lift-deadlift'].value,
            athlete: e.target['lift-athlete'].value,
            event: this.props.match.params.eventId,
            total: this.totalLifts()
        };
        fetch(`${config.API_ENDPOINT}/lifts`, {
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
            this.props.history.push(`/events/:event_id`)
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

    filteredAthletes = (athletes, eventId) => {
        return Object.values(athletes).filter(athlete => athlete.event === eventId)
    }

    render() {
        const {athletes} = this.context;
        const eventId = this.props.match.params.eventId;
        const squatError= this.validateSquat();
        const benchError = this.validateBench();
        const deadliftError = this.validateDeadlift();
        const filteredAthletes = this.filteredAthletes(athletes, eventId);
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
                        <Link to='/event'>
                            <button type='button'>
                                Events
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
                                id='lift-deadlift-input'
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