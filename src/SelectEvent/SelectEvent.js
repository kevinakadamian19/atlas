import React, {Component} from 'react'
import AtlasContext from '../AtlasContext'

class SelectEvent extends Component {
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
        const existingEvent = {
            name: e.target['event-name'].value
        }
        this.props.history.push(`/events/${existingEvent.name}`)
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

    render() {
        const {events} = this.context;
        const existingEvents = Object.values(events).map(event => 
            <option key={event.id} value={event.id}>{event.name}</option>);
        return(
            <div className='select-event'>
                <section>
                    Choose Existing Event
                    <form className='select-event-form' onSubmit={e => this.handleSubmit(e)}>
                        <div className='field'>
                            <label htmlFor='select-event'>
                                Event
                            </label>
                            <select 
                                id='event-select-input'
                                name='event-name'
                            >
                                <option value={null}>...</option>
                                { existingEvents }
                            </select>
                        </div>
                      
                        <button type='submit'>
                            Submit
                        </button>
                    </form>
                </section>
            </div>
        )
    }
}

export default SelectEvent;