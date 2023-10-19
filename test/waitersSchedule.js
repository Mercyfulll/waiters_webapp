import assert from 'assert';
import pgPromise from 'pg-promise';
import queries from '../services/database.js';
import waiters from '../waiters.js';

const pgp = pgPromise()

const connectionString = process.env.DATABASE_URL || 'postgres://ncmlcbqz:SXVviMgE6Vt3-ssTYfVB6Wsj42Tw4t0N@trumpet.db.elephantsql.com/ncmlcbqz?ssl=true'

const db = pgp(connectionString)

const data = queries(db);

describe('The waitersSchedule query test', function(){
    
    beforeEach(async function(){
       
        // clean the tables before each test run
        await data.reset()
    })

    it("It should return waiters that chose that specific day", async function(){
        // Increase the timeout to 5000ms (5 seconds)
        this.timeout(5000);
        let waiter = waiters()
        let Wdays = ['Monday','Sunday','Wednesday','Thursday']
        
        for (const day of Wdays ){
            await data.addName('Harry', day)
        }

        let Wedays = ['Monday','Sunday','Friday','Thursday']
        
        for (const day of Wedays ){
            await data.addName('Paul', day)
        }
        assert.deepEqual([
          {
            daysofweek: 'Monday',
            waiters_name: 'Harry'
          },
          {
            daysofweek: 'Sunday',
            waiters_name: 'Harry'
          },
          {
            daysofweek: 'Wednesday',
            waiters_name: 'Harry'
          },
          {
            daysofweek: 'Thursday',
            waiters_name: 'Harry'
          },
          {
            daysofweek: 'Monday',
            waiters_name: 'Paul'
          },
          {
            daysofweek: 'Sunday',
            waiters_name: 'Paul'
          },
          {
            daysofweek: 'Friday',
            waiters_name: 'Paul'
          },
          {
            daysofweek: 'Thursday',
            waiters_name: 'Paul'
          }
        ],await data.waitersSchedule())

    })

    after(async function () {
      // cleanup here
      await data.reset()
      //Close the database connection
      await db.$pool.end();
    });
})