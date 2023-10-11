import assert from 'assert';
import pgPromise from 'pg-promise';
import queries from '../services/database.js';
import waiters from '../waiters.js';

var pgp = pgPromise()

var connectionString = process.env.DATABASE_URL || 'postgres://ncmlcbqz:SXVviMgE6Vt3-ssTYfVB6Wsj42Tw4t0N@trumpet.db.elephantsql.com/ncmlcbqz?ssl=true'

var db = pgp(connectionString)

var data = queries(db);

describe('The addName query test', async function(){
    

    beforeEach(async function(){
        // clean the tables before each test run
        await data.reset()
    })

    it("It should be able to add name to a schedule",async function(){
        let waiter = waiters()

        
    })
})