import assert from 'assert';
import pgPromise from 'pg-promise';
import queries from '../services/database.js';
import waiters from '../waiters.js';

const pgp = pgPromise()

const connectionString = process.env.DATABASE_URL || 'postgres://ncmlcbqz:SXVviMgE6Vt3-ssTYfVB6Wsj42Tw4t0N@trumpet.db.elephantsql.com/ncmlcbqz?ssl=true'

const db = pgp(connectionString)

const data = queries(db);

describe('The addName query test', function(){
    

    beforeEach(async function(){
       
        // clean the tables before each test run
        await data.reset()
    })

    it('It should remove a name of waiter on a particular day',async function(){
        let waiter = waiters()
        let Wdays = ['Monday','Sunday','Wednesday','Thursday']
        
        for (const day of Wdays ){
            await data.addName('Jerry', day)
        }

        const idData = await data.getDayId('Thursday')
        const id = idData.id
        await data.removeNameForDay('Jerry',id) 

            assert.deepEqual([
                {
                  daysofweek: 'Monday',
                  waiters_name: 'Jerry'
                },
                {
                  daysofweek: 'Wednesday',
                  waiters_name: 'Jerry'
                },
                {
                  daysofweek: 'Sunday',
                  waiters_name: 'Jerry'
                }
              ]
              , await data.waitersSchedule('Jerry'))
    })
})