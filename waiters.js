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

    function validationErrors(name){

            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
            var num =  /^[0-9]/
            
            var alpha = format.test(name)
            var numb = num.test(name)
            
        if(alpha || numb){
            msg = "Invalid input, alphabets only"          
        }
            return msg
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
        validationErrors,
        mergeObject
    }
}