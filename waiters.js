export default function waiters(){
    var reg = '';
    var msg = '';
    

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

    function getUniqueDayNames(records) {
        // Create an empty Set to store unique day names
        const uniqueDayNames = new Set();
      
        // Iterate through each record in the 'records' array
        records.forEach(record => {
          // Add the 'day' property of each record to the Set
          uniqueDayNames.add(record.daysofweek);
        });
      
        // Convert the Set to an array and return it
        return Array.from(uniqueDayNames);
      }

      function getDays (){
        
      }
   
    return{
        nameValidation,
        validationErrors,
        getUniqueDayNames
    }
}