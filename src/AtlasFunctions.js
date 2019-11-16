export const filteredAthletes = (athletes, eventId) =>
    athletes.filter(athlete => athlete.event === eventId)


export const calculateBestSquat = (arr) => {
    if(arr.length === 0) {
       return 'There are no squats currently registered.';
   }
   let completed = [];
   for(let i = 0; i < arr.length; i++) {
       completed.push(parseFloat(arr[i].squat))
   }
   const max = completed.reduce(function(a,b) {
       return Math.max(a,b);
   })
   return max;
}

export const calculateBestBench(arr) {
  if(arr.length === 0) {
       return 'There are no bench presses currently registered';
   }
   let completed = [];
   for(let i = 0; i < arr.length; i++) {
       completed.push(arr[i].bench)
   }
   const max = completed.reduce(function(a,b) {
       return Math.max(a,b);
   })
   return max;
}

export const calculateBestDeadlift(arr) {
   if(arr.length === 0) {
       return 'THere are no deadlifts currently registered.';
   }
   let completed = [];
   for(let i = 0; i < arr.length; i++) {
       completed.push(arr[i].deadlift)
   }
   const max = completed.reduce(function(a,b) {
       return Math.max(a,b);
   })
   return max;
}

export default filteredLifts = () => {
  const {athletes, lifts} = this.context;
  console.log(athletes, lifts)
  const eventId = this.props.event;
  const filteredAthletes = athletes.filter(athlete => athlete.event === eventId)
  //Filtered lifts returning empty value. May need to move remove lift component, and just move these functions back into Overview.
  return lifts.filter(lifts => lifts.athlete === filteredAthletes.event);
}