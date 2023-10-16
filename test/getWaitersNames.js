import assert from 'assert';
import pgPromise from 'pg-promise';
import queries from '../services/database.js';
import waiters from '../waiters.js';

const pgp = pgPromise()

const connectionString = process.env.DATABASE_URL || 'postgres://ncmlcbqz:SXVviMgE6Vt3-ssTYfVB6Wsj42Tw4t0N@trumpet.db.elephantsql.com/ncmlcbqz?ssl=true'

const db = pgp(connectionString)

const data = queries(db);

describe('The getWaitersNames query test', function(){
    

    beforeEach(async function(){
       
        // clean the tables before each test run
        await data.reset()
    })

    it('It should return names of waiters',async function(){
        let waiter = waiters()
        let tdays = ['Monday','Saturday','Friday','Thursday']
        
        for (const day of tdays ){
            await data.addName('Finn', day)
        }

        let ydays = ['Monday','Saturday','Friday','Thursday']
        
        for (const day of ydays ){
            await data.addName('Kade', day)
        }

        assert.deepEqual([
            {
              waiters_name: 'Finn'
            },
            {
              waiters_name: 'Kade'
            }
          ], await data.getWaitersNames())
    })
})