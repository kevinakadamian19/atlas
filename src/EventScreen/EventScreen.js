import React, {Component} from 'react'
import AtlasContext from '../AtlasContext'
import ValidationError from '../ValidationError'
import config from '../config'
import './EventScreen.css'

class EventScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            choice: {
                value: '',
                touched: false
            },
            name: {
                value: '',
                touched: false
            }
        }
    }
    static defaultProps = {
        history: {
            push: () => { }
        }
    }
    static contextType = AtlasContext;

    handleSubmit = e => {
        e.preventDefault();
        const newEvent = {
            name: e.target['event-name'].value
        }
        fetch(`${config.API_ENDPOINT}/api/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${config.API_KEY}`
            },
            body: JSON.stringify(newEvent)
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(event => {
            this.context.addEvent(event)
            this.props.history.push(`/events/${event.id}`)
        })
        .catch(error => {
            console.error({error})
        })
    }

    handleSelect = e => {
        e.preventDefault();
        const existingEvent = {
            name: e.target['event-name'].value
        }
        this.props.history.push(`/events/${existingEvent.name}`)
    }
    addEventName(event) {
        this.setState({name: {value: event, touched: true}})
    }

    selectOrRegister(choice) {
        this.setState({choice: {value: choice, touched: true}})
    }

    validateEventName(fieldValue) {
        const name = this.state.name.value.trim();
        if(name.length === 0) {
            return 'Event name is required';
        } else if(name.length < 3) {
            return 'Event name must be at least 3 characters long';
        }
    }

    registerEvent = () => {
        const nameError = this.validateEventName();
        return(
            <form className='register-event-form' onSubmit={e => this.handleSubmit(e)}>
                        <div className='field'>
                            <label htmlFor='register-event'>
                                Name
                            </label>
                            <input 
                                type='text'
                                id='event-name-input'
                                name='event-name'
                                className='select'
                                onChange={e => this.addEventName(e.target.value)}
                            />
                            {this.state.name.touched && (
                                <ValidationError message={nameError} />
                            )}
                        </div>
                        <button 
                            type='submit'
                            disabled={this.validateEventName()}>
                            Submit
                        </button>
            </form>
        )
    }

    selectEvent = () => {
        const {events} = this.context;
        const existingEvents = Object.values(events).map(event => 
            <option key={event.id} value={event.id}>{event.name}</option>);
        return(
                    <form className='select-event-form' onSubmit={e => this.handleSelect(e)}>
                        <div className='field'>
                            <label htmlFor='select-event'>
                                Existing Events
                            </label>
                            <select 
                                id='event-select-input'
                                name='event-name'
                                className='select'
                            >
                                <option value={null}>...</option>
                                { existingEvents }
                            </select>
                        </div>
                      
                        <button type='submit'>
                            Submit
                        </button>
                    </form>
        )
    }

    renderForm = () => {
        const selected = this.state.choice.value;
        if(selected === 'select') {
            return this.selectEvent();
        }
        if(selected === 'register') {
            return this.registerEvent();
        }
        return;
    }

    render() {
        const renderForm = this.renderForm();
        return(
            <div className='page'>
                <h1>Atlas</h1>
                <h4>Create an event, or choose one that exists!</h4>
                <form className='form-selection'>
                    <div className='field'>
                        <select
                            id='form-selection'
                            name='form-selection'
                            onChange={e => this.selectOrRegister(e.target.value)}
                            className='select'
                        >
                            <option value='register'>Register New Event</option>
                            <option value='select'>Select Existing Event</option>
                        </select>
                    </div>
                </form>
                {renderForm}
                   
            </div>
        )
    }
}

export default EventScreen;