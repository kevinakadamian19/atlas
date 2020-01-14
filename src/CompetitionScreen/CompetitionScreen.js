import React, {Component} from 'react'
import AtlasContext from '../AtlasContext'
import ValidationError from '../ValidationError'
import config from '../config'
import './CompetitionScreen.css'

class CompetitionScreen extends Component {
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
        const newCompetition = {
            name: e.target['competition-name'].value
        }
        fetch(`${config.API_ENDPOINT}/api/competitions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${config.API_KEY}`
            },
            body: JSON.stringify(newCompetition)
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(competition => {
            this.context.addCompetition(competition)
            this.props.history.push(`/competitions/${competition.id}`)
        })
        .catch(error => {
            console.error({error})
        })
    }

    handleSelect = e => {
        e.preventDefault();
        const existingCompetition = {
            name: e.target['competition-name'].value
        }
        this.props.history.push(`/competitions/${existingCompetition.name}`)
    }
    addCompetitionName(competition) {
        this.setState({name: {value: competition, touched: true}})
    }

    selectOrRegister(choice) {
        this.setState({choice: {value: choice, touched: true}})
    }

    validateCompetitionName(fieldValue) {
        const name = this.state.name.value.trim();
        if(name.length === 0) {
            return 'Competition name is required';
        } else if(name.length < 3) {
            return 'Competition name must be at least 3 characters long';
        }
    }

    registerCompetition = () => {
        const nameError = this.validateCompetitionName();
        return(
            <form className='register-competition-form' onSubmit={e => this.handleSubmit(e)}>
                        <div className='field'>
                            <label htmlFor='register-competition'>
                                Name
                            </label>
                            <input 
                                type='text'
                                id='competition-name-input'
                                name='competition-name'
                                className='select'
                                onChange={e => this.addCompetitionName(e.target.value)}
                            />
                            {this.state.name.touched && (
                                <ValidationError message={nameError} />
                            )}
                        </div>
                        <button 
                            type='submit'
                            disabled={this.validateCompetitionName()}>
                            Submit
                        </button>
            </form>
        )
    }

    selectCompetition = () => {
        const {competitions} = this.context;
        const existingCompetitions = Object.values(competitions).map(competition => 
            <option key={competition.id} value={competition.id}>{competition.name}</option>);
        return(
                    <form className='select-competition-form' onSubmit={e => this.handleSelect(e)}>
                        <div className='field'>
                            <label htmlFor='select-competition'>
                                Existing Competitions
                            </label>
                            <select 
                                id='competition-select-input'
                                name='competition-name'
                                className='select'
                            >
                                <option value={null}>...</option>
                                { existingCompetitions }
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
            return this.selectCompetition();
        }
        if(selected === 'register') {
            return this.registerCompetition();
        }
        return;
    }

    render() {
        const renderForm = this.renderForm();
        return(
            <div className='page'>
                <h1>Atlas</h1>
                <h4>Register a competition, or choose one that exists!</h4>
                <form className='form-selection'>
                    <div className='field'>
                        <select
                            id='category_type'
                            name='form-selection'
                            onChange={e => this.selectOrRegister(e.target.value)}
                            className='select'
                        >
                            <option value=''>...</option>
                            <option value='register'>Register New Competition</option>
                            <option value='select'>Select Existing Competition</option>
                        </select>
                    </div>
                </form>
                {renderForm}
                   
            </div>
        )
    }
}

export default CompetitionScreen;