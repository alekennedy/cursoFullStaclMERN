const util = require('util');
const sleep = util.promisify(setTimeout);
module.exports = {
    
    async irAlSuper(){
        try {
            await sleep(2000);
            return "Ida al super concluida";    
        } catch (error) {
            console.error(error);
        }
        
    },

    async buscarReceta(){
        try {
            await sleep(1000);
            return "Lectura de recetas concluida";    
        } catch (error) {
            console.error(error)
        }
        
    },

    async elaboracionPizza(){
        try {
            await sleep(7000);
            return "Pizza Lista";    
        } catch (error) {
            console.error(error);
        }
        
    }
}