const {irAlSuper, buscarReceta, elaboracionPizza} = require("./procesos");
async function main(){
    console.time("Tiempo total de ejecucion");
    const result = await Promise.all([irAlSuper(), buscarReceta()]);
    const elaboracion = await elaboracionPizza();
    console.timeEnd("Tiempo total de ejecucion");
    console.log(result[0]);
    console.log(result[1]);
    console.log(elaboracion);
};
main()