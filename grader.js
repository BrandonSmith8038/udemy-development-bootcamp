const average = (scores) => {
    let total = 0
    
    for(let i=0;i<scores.length;i++){
        total += scores[i]
    }
    
    
    const avrg = Math.ceil(total / scores.length)
    
    return avrg;
}

const scores = [90,98,89,100,100,86,94];
const scores2 = [40,65,77,82,80,54,73,63,95,49]

console.log(average(scores));
console.log(average(scores2));