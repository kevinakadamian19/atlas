import React, {Component} from 'react'
import AtlasContext from '../AtlasContext'
import './AddAthlete.css'

class AddAthlete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: {
                value: '',
                touched: false
            },
            age: {
                value: '',
                touched: false
            },
            gender: {
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
        const newAthlete = {
            name: e.target['athlete-name'].value,
            age: e.target['athlete-age'].value,
            gender: e.target['athlete-gender'].value,
            weight: e.target['athlete-weight'].value,
            event: this.props.match.params
        }
        console.log(newAthlete.event)
        this.context.addAthlete(newAthlete)
        this.props.history.push(`/events/${this.props.match.params}`)
        /*fetch(`${config.API_ENDPOINT}/athletes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newAthlete)
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(athlete => {
            this.context.addAthlete(athlete)
            this.props.history.push(`/athletes/${athlete.id}`)
        })
        .catch(error => {
            console.error({error})
        })*/
    }
    render() {
        return (
            <div className='register-athlete'>
                <header role="banner">
                    <h1>Register</h1>
                </header>

                <section>
                    Complete this form to register for the meet.
                    <form className='register-athlete-form' onSubmit={e => this.handleSubmit(e)}>
                        <div className='field'>
                            <label htmlFor='register-athlete'>
                                Name
                            </label>
                            <input 
                                type='text'
                                id='athlete-name-input'
                                name='athlete-name'
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor='register-athlete'>
                                Age
                            </label>
                            <input 
                                type='text'
                                id='athlete-age-input'
                                name='athlete-age'
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor='register-athlete'>
                                Gender
                            </label>
                            <input 
                                type='text'
                                id='athlete-gender-input'
                                name='athlete-gender'
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor='register-athlete'>
                                Weight Class
                            </label>
                            <input 
                                type='text'
                                id='athlete-weight-input'
                                name='athlete-weight'
                            />
                        </div>
                        <button type='submit'>
                            Register Athlete
                        </button>
                    </form>
                </section>
            </div>
        )
    }
} 
export default AddAthlete;