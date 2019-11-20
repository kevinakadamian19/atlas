export const calculateWilksScore = (obj) => {
    for(let i = 0; i < obj.length; i++) {
        if(obj.i.gender === 'male') {
            const x = obj.i.weight;
            const a = -216.0475144;
            const b = 16.2606339 * x;
            const c = -0.002388645 * x;
            const d = -0.00113732 * x;
            const e = 0.00000701863 * x;
            const f = -0.00000001291 * x;
            const wilksScore = (obj.i.lifts[0].total * 500) / (a + b + Math.pow(c,2) + Math.pow(d, 3) + Math.pow(e,4) + Math.pow(f, 5));
            obj.i.score = wilksScore;
        }
        if(obj[i].gender === 'female') {
            const x = obj.i.weight;
            const a = 594.31747775582;
            const b = -27.23842536447 * x;
            const c = 0.82112226871 * x;
            const d = -0.00930733913 * x;
            const e = 0.00004731582 * x;
            const f = -0.00000009054 * x;
            const wilksScore = (obj.i.lifts[0].total * 500) / (a + b + Math.pow(c,2) + Math.pow(d, 3) + Math.pow(e,4) + Math.pow(f, 5));
            obj.i.score = wilksScore
        }
        return obj;
    }
}