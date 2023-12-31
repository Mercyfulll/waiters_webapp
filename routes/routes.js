export default function routes(data, waiter){
    
    async function home(req,res){
        const allDays = await data.days()
        res.render("index",{allDays})
    }
                
    async function waiterPage(req,res){
        try{
            const waiters_Name = req.body.uName
            const daysOfTheWeek = req.body.daysOfWeek; 
            const specialCharacters = /\W/
            const numbersVal = /\d/
            const alpha = specialCharacters.test(waiters_Name)
            const numb = numbersVal.test(waiters_Name)
            const checkNameExists = await data.checkName(waiter.nameValidation(waiters_Name))           
            
                if(alpha){
                    req.flash('error','Enter a name without special characters')
                }
                else if(numb){
                    req.flash('error','Enter a name without numeric values')
                }
                else if(daysOfTheWeek === undefined && waiters_Name === ''){
                    req.flash('error','Empty entries, please enter a name and select days')
                }
                else if(daysOfTheWeek !== undefined && !waiters_Name ){
                    req.flash('error','Enter a name of a stuff member')
                }
                else if(daysOfTheWeek === undefined && waiters_Name){
                    req.flash('error','Please select days for work')
                }
                else if(waiters_Name!=='' && typeof daysOfTheWeek === 'string' || daysOfTheWeek.length <= 1){
                    req.flash('error1','Select minimum of 2 days')
                }
                else if(waiters_Name!=='' && daysOfTheWeek.length > 1 && checkNameExists.length === 0){
                    
                    // Insert the days into the schedule table and link to workdays table
                    for (const dayOfWeek of daysOfTheWeek) {
                        await data.addName(waiter.nameValidation(waiters_Name),dayOfWeek)            
                    }
                    req.flash('success','Name and days added to schedule successfully')
                }
                else if(checkNameExists.length > 0 && daysOfTheWeek.length > 1 && waiters_Name!=='') {
                    await data.deleteName(waiter.nameValidation(waiters_Name))
                    
                    for (const dayOfWeek of daysOfTheWeek) {
                        await data.addName(waiter.nameValidation(waiters_Name),dayOfWeek)
                    }
                    req.flash('success','You updated the schedule successfully');
                } 
        }       
        catch(err){
            console.log(err)
        }
        
        // Redirect or respond as needed
         res.redirect("/");
    } 

    async function adminPage(req,res){
       
        const names = await data.getWaitersNames()
        const schedule = await data.waitersSchedule();
        const mergedData = waiter.mergeObject(await data.waitersSchedule())
        console.log(schedule)

        
    
        res.render("admin", {names,schedule, mergedData})
    }

    async function adminPageFunctionality(req,res){
        try {
            const nameOfWaiter = req.body.waiterNames
            const weekdays = req.body.daysOfWeek
           

            if(typeof weekdays === 'string' ){
                req.flash('error2','Select minimum of 2 days')
            }
            else if(weekdays === undefined){
                req.flash('error2','No days selected')
            }
            else if(nameOfWaiter === ''){
                req.flash('error2','Select waiters name')
            }
            else if(weekdays.length > 1){
                await data.deleteName(nameOfWaiter)
            // Insert the days into the schedule table and link to workdays table
            for (const dayOfWeek of weekdays) {
                await data.addName(nameOfWaiter,dayOfWeek)            
            }
            req.flash('success2','Rescheduled successfully')
        }

        } catch (err) {
            console.log(err)
        }
        res.redirect("/days")
    }

    async function adminPageRemove(req,res){
        try {
            const waiterName = req.body.waitersNames
            const dayToDelete = req.body.days
            console.log(waiterName)
            console.log(dayToDelete)

            if(waiterName && dayToDelete && dayToDelete !== 'All'){
                const idData = await data.getDayId(dayToDelete)
                const id = idData.id
                await data.removeNameForDay(waiterName,id)
                req.flash('success3','Name and day removed')
            }
            else if(waiterName && dayToDelete === 'All'){
                await data.removeWaiterName(waiterName)
                req.flash('success3','Person removed from schedule')
            }
            else if(waiterName && dayToDelete === ''){
                req.flash('error3','Choose a day to remove')
            }
            else if(waiterName =='' && dayToDelete === ''){
                req.flash('error3','Choose waiter and day')
            }

        } catch (err) {
            console.log(err)
        }
        res.redirect("/days")
    }

    async function reset(req,res){
        try {
            await data.reset()
            req.flash('error1','Data cleared successfully')
        } catch (err) {
            console.log(err)
        }

        res.redirect('/days')    
    }
    return{
        home,
        adminPage,
        waiterPage,
        adminPageFunctionality,
        adminPageRemove,
        reset
    }
}