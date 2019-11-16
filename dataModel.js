const data = {
    'events': [
        {
            'id': '1',
            'name': 'Winter Swolestice'
        },
        {
            'id': '2',
            'name': 'Raw Nationals'
        }
    ],
    'athletes': [
        {
            'id': '1',
            'name': 'Damian Ta',
            'age': '26',
            'gender': 'male',
            'weight': '83',
            'event': '1'
        },
        {
            'id': '2',
            'name': 'Juan Salgado',
            'age': '25',
            'gender': 'male',
            'weight': '83',
            'event': '2'
        },
        {
            'id': '3',
            'name': 'Mimi Parkeen',
            'age': '23',
            'gender': 'female',
            'weight': '47',
            'event': '1'
        }
    ],
    'lifts': [
        {
            'id': '1',
            'squat': '178',
            'bench': '102',
            'deadlift': '214',
            'athlete': '1',
            'event': '1'
        },
        {
            'id': '2',
            'squat': '183',
            'bench': '128',
            'deadlift': '231',
            'athlete': '2',
            'event': '2'
        }
    ]
}

state = {
  events: {
    1: {
      'id': '1',
      'name': 'Winter Swolestice',
      athletes: [1,3],
      lifts: [1,3]
    },
  },
  athletes: {
    1: {
      'id': '1',
      'name': 'Damian Ta',
      'age': '26',
      'gender': 'male',
      'weight': '83',
      'event': '1',
      lifts: [1]
    }
  },
  lifts: {
    1: {
        'id': '1',
        'squat': '178',
        'bench': '102',
        'deadlift': '214',
        'athlete': '1',
        'event': '1',
    },
  }
}

// assuming all data has come back, and placed into one object, with events, athletes, and lifts keys and corresponding arrays of objects 
// fetch events, athletes, and lifts independantly, create an object as above, then normalize that object as below then can update state

// normalize events 
const events = data.events.reduce((acc, obj) => {
  obj.athletes = data.athletes.reduce((acc, athlete) => {
    if (athlete.event === obj.id) {
      acc.push(athlete.id)
    }
    return acc;
  }, []);
  obj.lifts = data.lifts.reduce((acc, lift) => {
    if (lift.event === obj.id) {
      acc.push(lift.id)
    }
    return acc;
  }, []);

  acc[obj.id] = obj;
  return acc;
}, {})


// normalize athletes 
const athletes = data.athletes.reduce((acc, obj) => {
  obj.lifts = data.lifts.filter(lift => lift.athlete === obj.id)
  acc[obj.id] = obj;
  return acc;
}, {})


// normalize lifts
const lifts = data.lifts.reduce((acc,obj) => {
  acc[obj.id] = obj;
  return acc;
}, {})

state = {
  events,
  athletes,
  lifts
}

console.log(JSON.stringify(state, null, 4))