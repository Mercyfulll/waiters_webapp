export default function queries(db){

    async function checkDuplicates(waiters_Name){
        return await db.manyOrNone('SELECT waiters_name FROM schedule WHERE waiters_name =$1',[waiters_Name]) 
    }

    async function addName(waiters_Name,dayOfWeek){
    await db.none('INSERT INTO schedule (waiters_name, days_id) VALUES ($1, (SELECT id FROM workdays WHERE daysOfWeek = $2))', [waiters_Name, dayOfWeek])
    }

    async function deleteName(waiters_Name){
        await db.none('DELETE FROM schedule WHERE waiters_name =$1',[waiters_Name])
    }

    async function reset(){
        await db.none(' DELETE FROM schedule')
    }

    async function waitersSchedule(){
        return await db.manyOrNone(`SELECT schedule.waiters_name, workdays.daysofweek FROM workdays JOIN schedule ON schedule.days_id = workdays.id`)
    } 

    return{
        checkDuplicates,
        addName,
        deleteName,
        waitersSchedule,
        reset
    }
}