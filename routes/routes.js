export default function routes(data, waiter){

    async function waiterPage(req,res){
    
        try{
            const waiters_Name = waiter.nameValidation(req.body.uName)
            const daysOfTheWeek = req.body.daysOfWeek; 
            const checkNameExists = await data.checkDuplicates(waiters_Name)
               
            if(daysOfTheWeek === undefined && waiters_Name === ''){
                req.flash('error','Empty entries, please enter a name and select days')
            }
            else if(waiters_Name === '' && daysOfTheWeek ){
                req.flash('error','Enter a name of a stuff member')
            }
            else if(daysOfTheWeek == undefined){
                req.flash('error','Please select days for work')
            }
            else if(waiters_Name!=='' && typeof daysOfTheWeek === 'string' || daysOfTheWeek.length <= 3){
                req.flash('error1','Select minimum of 4 days')
                // res.redirect('/')
            }
            else if(waiters_Name!=='' && daysOfTheWeek.length >= 3 && checkNameExists.length == 0){
    
                // Insert the days into the schedule table and link to workdays table
                for (const dayOfWeek of daysOfTheWeek) {
                await data.addName(waiters_Name,dayOfWeek)
                // db.none('INSERT INTO schedule (waiters_name, days_id) VALUES ($1, (SELECT id FROM workdays WHERE daysOfWeek = $2))', [waiters_Name, dayOfWeek]);
                }
                req.flash('success','Name and days added to schedule successfully')
                
            }
            else if(checkNameExists.length > 0 && daysOfTheWeek.length >= 3) {
                await data.deleteName(waiters_Name)
                
                for (const dayOfWeek of daysOfTheWeek) {
                    await data.addName(waiters_Name,dayOfWeek)
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

    async function adminPage(req,res){
        const scheduled = await data.waitersSchedule()
        const days = waiter.getUniqueDayNames(scheduled)
        console.log(days)
    
        res.render("admin", {scheduled, days})
    }

    async function reset(req,res){
            await data.reset
            req.flash('error1','Data cleared successfully')
            res.render('admin')
    }
    return{
        adminPage,
        waiterPage,
        reset
    }
}