export default function waiters(){
    var reg = '';
    var msg = '';
    var id = 0;
    

    function nameValidation(name){

        var alphabets = /^[A-Za-z]+$/
        var alpha = alphabets.test(name)
            if(alpha && name !== ''){
                    reg = name.toLowerCase()      
            }
            return reg
    }

    function mergeObject(data) {
        const mergedData = {};

        data.forEach(entry => {
            const { daysofweek, waiters_name } = entry;
    
            if (!mergedData[daysofweek]) {
                mergedData[daysofweek] = [];
            }
    
            mergedData[daysofweek].push(waiters_name);
        });
    
        const transformedData = Object.entries(mergedData).map(([daysofweek, waiters_name]) => ({
            daysofweek,
            waiters_name: waiters_name.join(', ') // Convert the array to a comma-separated string
        }));
    
        return transformedData;
    }
    

    return{
        nameValidation,
        mergeObject
    }
}