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
    it("It should not add name should it have special characters",async function(){
        // Increase the timeout to 5000ms (5 seconds)
        this.timeout(5000);
        let waiter = waiters()
        let wdays = ['Monday','Tuesday','Wednesday','Saturday']
        
        for (const day of wdays ){
            await data.addName(waiter.nameValidation('@Precious'), day)
        }
        

        assert.deepEqual([],await data.checkName('@Precious'))
    })

    after(async function () {
        // cleanup here
        await data.reset()
        //Close the database connection
        await db.$pool.end();
      });
})