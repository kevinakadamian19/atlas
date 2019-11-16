import React, {Component} from 'react'
import AtlasContext from '../AtlasContext'
import ValidationError from '../ValidationError'

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
            squat: e.target['lift-squat'].value,
            bench: e.target['lift-bench'].value,
            deadlift: e.target['lift-deadlift'].value,
            athlete: e.target['lift-athlete'].value,
            event: this.props.match.params.eventId
        };
        this.context.addLifts(newLifts)
        this.props.history.push(`/events/${newLifts.event}`)
        /*fetch(`${config.API_ENDPOINT}/lifts`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
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
        })*/
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
        return athletes.filter(athlete => athlete.event === eventId)
    }

    render() {
        const {athletes} = this.context;
        const eventId = this.props.match.params.eventId;
        const squatError= this.validateSquat();
        const benchError = this.validateBench();
        const deadliftError = this.validateDeadlift();
        const filteredAthletes = this.filteredAthletes(athletes, eventId);
        return (
            <div className='register-lift'>
                <h3>Register Lifts</h3>
                <section>
                    Complete this form to register for the meet.
                    <form className='register-lift-form' onSubmit={e => this.handleSubmit(e)}>
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
                      
                        <button 
                            type='submit'
                            >
                                Submit
                        </button>
                    </form>
                </section>
            </div>
        )
    }
} 
export default AddLifts;