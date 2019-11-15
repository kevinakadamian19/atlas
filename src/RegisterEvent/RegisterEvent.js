import React, {Component} from 'react'
import AtlasContext from '../AtlasContext'
import ValidationError from '../ValidationError'

class RegisterEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        //Note to self: remove id from newEvent once moving to express endpoints.
        const newEvent = {
            id: '3',
            name: e.target['event-name'].value
        }
        this.context.addEvent(newEvent)
        this.props.history.push(`/events/${3}`)
        /*
        fetch(`${config.API_ENDPOINT}/events`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
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
        */
    }
    addEventName(event) {
        this.setState({name: {value: event, touched: true}})
    }

    validateEventName(fieldValue) {
        const name = this.state.name.value.trim();
        if(name.length === 0) {
            return 'Event name is required';
        } else if(name.length < 3) {
            return 'Event name must be at least 3 characters long';
        }
    }

    render() {
        const nameError = this.validateEventName();
        return(
            <div className='register-event'>
                <section>
                    Register New Event
                    <form className='register-event-form' onSubmit={e => this.handleSubmit(e)}>
                        <div className='field'>
                            <label htmlFor='register-event'>
                                Name
                            </label>
                            <input 
                                type='text'
                                id='event-name-input'
                                name='event-name'
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
                </section>

            </div>
        )
    }
}

export default RegisterEvent;