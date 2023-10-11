export default function routes(data, waiter){

    async function waiterPage(req,res){
        try{
            const waiters_Name = req.body.uName
            const daysOfTheWeek = req.body.daysOfWeek; 
            const checkNameExists = await data.checkName(waiter.nameValidation(waiters_Name))
            

                if(daysOfTheWeek === undefined && waiters_Name === ''){
                    req.flash('error','Empty entries, please enter a name and select days')
                }
                else if(daysOfTheWeek !== undefined && !waiters_Name ){
                    req.flash('error','Enter a name of a stuff member')
                }
                else if(daysOfTheWeek === undefined && waiters_Name){
                    req.flash('error','Please select days for work')
                }
                else if(waiters_Name!=='' && typeof daysOfTheWeek === 'string' || daysOfTheWeek.length <= 3){
                    req.flash('error1','Select minimum of 4 days')
                }
                else if(waiters_Name!=='' && daysOfTheWeek.length > 3 && checkNameExists.length === 0){
                    
                    // Insert the days into the schedule table and link to workdays table
                    for (const dayOfWeek of daysOfTheWeek) {
                        await data.addName(waiter.nameValidation(waiters_Name),dayOfWeek)            
                    }
                    req.flash('success','Name and days added to schedule successfully')
                }
                else if(checkNameExists.length > 0 && daysOfTheWeek.length > 3 && waiters_Name!=='') {
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
        res.redirect('/');
    } 

    // async function waiterPage(req, res) {
    //     try {
    //       const waiters_Name = waiter.nameValidation(req.body.uName);
    //       const daysOfTheWeek = req.body.daysOfWeek;
    //       const checkNameExists = await data.checkDuplicates(waiters_Name);
      
    //       if (!waiters_Name || !daysOfTheWeek) {
    //         req.flash('error', 'Please enter a name and select days');
    //       } else if (!waiters_Name) {
    //         req.flash('error', 'Enter a name of a staff member');
    //       } else if (!Array.isArray(daysOfTheWeek) || daysOfTheWeek.length < 4) {
    //         req.flash('error', 'Select a minimum of 4 days');
    //       } else {
    //         if (checkNameExists.length > 0) {
    //           await data.deleteName(waiters_Name);
    //         }
      
    //         for (const dayOfWeek of daysOfTheWeek) {
    //           await data.addName(waiters_Name, dayOfWeek);
    //         }
    //         req.flash('success', 'Schedule updated successfully');
    //       }
    //     } catch (err) {
    //       console.error(err);
    //       req.flash('error', 'An error occurred while processing your request');
    //     } finally {
    //       res.redirect('/'); // Redirect the user, adjust the path as needed
    //     }
    //   }
      


    async function adminPage(req,res){
        const names = await data.getWaitersNames()
        console.log(names)
        const mon = await data.getDayWorkersChose('Monday')
        const tue = await data.getDayWorkersChose('Tuesday')
        const wed = await data.getDayWorkersChose('Wednesday')
        const thur = await data.getDayWorkersChose('Thursday')
        const fri =  await data.getDayWorkersChose('Friday')
        const sat = await data.getDayWorkersChose('Saturday')
        const sun = await data.getDayWorkersChose('Sunday')
    
    
        res.render("admini", {names, mon,tue,wed,thur,fri,sat,sun})
    }

    async function adminPageFunctionality(req,res){
        try {
            const nameOfWaiter = req.body.waiterNames
            const weekdays = req.body.daysOfWeek
            console.log(nameOfWaiter)
            console.log(weekdays)

            if(typeof weekdays === 'string' ){
                req.flash('error2','Select minimum of 4 days')
            }
            else if(weekdays === undefined){
                req.flash('error2','No days selected')
            }
            else if(nameOfWaiter === ''){
                req.flash('error2','Select waiters name')
            }
            else if(weekdays.length > 3){
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
        adminPage,
        waiterPage,
        adminPageFunctionality,
        reset
    }
}