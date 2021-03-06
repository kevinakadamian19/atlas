import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import AtlasContext from '../AtlasContext'
import config from '../config'
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
            competition_id: parseInt(this.props.match.params.competitionId)
        }
        fetch(`${config.API_ENDPOINT}/api/athletes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${config.API_KEY}`
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
            this.props.history.push(`/competitions/${newAthlete.competition_id}`)
        })
        .catch(error => {
            console.error({error})
        })
    }
    render() {
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
                <header role="banner">
                    <h1>Register Athlete</h1>
                </header>
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
                                Weight Class
                            </label>
                            <input 
                                type='text'
                                id='athlete-weight-input'
                                name='athlete-weight'
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor='register-athlete'>
                                Gender
                            </label>
                            <select
                                id='athlete-gender-input'
                                name='athlete-gender'
                            >
                                <option value={null}>...</option>
                                <option value='female'>Female</option>
                                <option value='male'>Male</option>
                            </select>
                        </div>
                        <button type='submit'>
                            Register Athlete
                        </button>
                    </form>
            </div>
        )
    }
} 
export default AddAthlete;