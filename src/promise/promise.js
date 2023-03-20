const promise  = new Promise(function(resolve, reject){
    resolve('Hey!')
});

const cows = 1;

const countCows = new Promise(function(resolve,reject){
    if (cows>10) {
        resolve(`we have ${cows} cows on the farm`);        
    }else{
        reject("there is no cows on the farm");
    }
})

countCows.then((result)=>{
    console.log(result);
}).catch((error)=> {console.log(error)
}).finally(() => console.log("FINALIZADO"));



//nuevo promise
function delay (time,message){
    return new Promise ((resolve, reject)=>{
        setTimeout(() => {
            resolve(console.log(message));
        }, time);
    })
}

delay(5000, "hola");
