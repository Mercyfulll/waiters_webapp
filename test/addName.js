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

    it("It should be able to add name to a schedule",async function(){
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
          ]
          ,await data.checkName('Tom'))
    })

    it("It should not add name should it have special characters",async function(){
        let waiter = waiters()
        let wdays = ['Monday','Tuesday','Wednesday','Saturday']
        
        for (const day of wdays ){
            await data.addName(waiter.nameValidation('@Precious'), day)
        }
        

        assert.deepEqual([],await data.checkName('@Precious'))
    })

    it("It should not add name should it have numeric values",async function(){
        let waiter = waiters()
        let wdays = ['Monday','Tuesday','Wednesday','Saturday']
        
        for (const day of wdays ){
            await data.addName(waiter.nameValidation('Mike34'), day)
        }
        

        assert.deepEqual([],await data.checkName('Mike34'))
        
    })


})