import React from 'react'

export default React.createContext({
    events: {},
    athletes: {},
    lifts: {},
    addAthlete: () => {},
    addLifts: () => {},
    addEvent: () => {},
    deleteAthlete: () => {}
})