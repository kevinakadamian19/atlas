import React from 'react'

export default React.createContext({
    competitions: {},
    athletes: {},
    lifts: {},
    addAthlete: () => {},
    addLifts: () => {},
    addCompetition: () => {},
    deleteAthlete: () => {},
    deleteLift: () => {}
})