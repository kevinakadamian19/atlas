import React, { Component } from 'react'
import AtlasContext from '../AtlasContext'


class AthleteInfo extends Component {
    constructor(props) {
        super(props)
    }

    static contextType = AtlasContext;

    handleSubmit = e => {
        e.preventDefault();
        const updateAthlete = {

        }
    }

    render() {
        return(
            <div className='athlete-info'>
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
                        <button type='submit'>
                            Register Athlete
                        </button>
                    </form>
            </div>
        )
    }
}

export default AthleteInfo;