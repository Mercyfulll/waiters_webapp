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
       // Increase the timeout to 5000ms (5 seconds)
       this.timeout(5000);
        // clean the tables before each test run
        await data.reset()
    })

    it("It should be able to add name to a schedule",async function(){
        // Increase the timeout to 5000ms (5 seconds)
        this.timeout(5000);
        let waiter = waiters()
        let days = ['Monday','Sunday','Friday','Thursday']
        
        for (const day of days ){
            await data.addName('Tom', day)
        }
        

        assert.deepEqual([
            {
              waiters_name: 'Tom'
            },
            {
              waiters_name: 'Tom'
            },
            {
              waiters_name: 'Tom'
            },
            {
              waiters_name: 'Tom'
            }
          ],await data.checkName('Tom'))
          
    })

    after(async function () {
      // cleanup here
      await data.reset()
      //Close the database connection
      await db.$pool.end();
    });
})