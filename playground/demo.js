function MathCal(x){
    console.log("From math cal"+x);
    return function(y){
        console.log("From math return func"+x);
        console.log(x+y);
    }
    
};

const funVar = MathCal(5);
funVar(4);
funVar(14);
funVar(43);