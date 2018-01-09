const Mdb = require("../");
const assert = require('assert');

describe('mdb-parse', function(){
    var fruits;
    it('should create a new object', function(){
        fruits = new Mdb("./test/fruit.mdb");
        assert(fruits instanceof Mdb);
    });
    describe('#list', function(){
        it('should return correct array of table names', function(){
            const table_names = [ 'Fruit',
                'Fruit Salad',
                'Veggie Salad',
                'Muffin/Bread',
                'Dried'];
            assert.deepStrictEqual(fruits.list(), table_names);
        });
    });
    describe('#table', function(){
        it('should return correct object', function(){
            const doc = {
                Fruit: "Apricot",
                Fiber: "2",
                Fat: "0",
                Protien: "1", // This spelling mistake is actually in the database and I can't change it
                Sugar: "8",
                'Vit A': "420",
                'Vit C': "5",
                'Vit B1': "0",
                'Vit B2': "0",
                'Vit B6': "0",
                'Vit E': "0"
            };
            assert.deepStrictEqual(fruits.table('Fruit')[1], doc);
        });
    })
});
