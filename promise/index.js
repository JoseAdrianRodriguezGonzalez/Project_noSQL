const asyncFuncion=async(menganito)=>{
    const promise=new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(`Hola ${menganito} uwu`)
        },5000)
    })
    const response=await promise;
    console.log(response);
}
asyncFuncion("Jose")








console.log("Después de una función asincrona!!")






/**
 * With old promises
 */
function funcion(menganito){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(`hola ${menganito}` );
        },5000)
    });
}
funcion("jose adrian rodriguez gonzalez, te puedo decir algo???").then(
    function(value){
        console.log(value);
    }
);
console.log("Despues de una funcion asincrona!!");