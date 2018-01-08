# MDB Parse
A simple package for importing Microsoft Access tables into Node.

## Installation
```sh
npm install mdb-parse
```

## Requirements
This package requires [mdbtools](https://github.com/brianb/mdbtools) installed on the host system. 
Currently it only uses the `mdb-export` and `mdb-tables` commands. 
These commands must be accessible in the shell for this package to work.  

## Usage
### Initialization
Accepts .mdb files and some .accdb files (2010 and earlier)
```javascript
// Import module
var mdb_parse = require('mdb-parse');
// Create parser object. Initialize with the name of your database
var fruit_database = new mdb_parse('./test/fruit.mdb');
```
### list()
```javascript
var tables = fruit_database.list();
console.log(tables);
// => [ 'Fruit','Fruit Salad','Veggie Salad','Muffin/Bread','Dried'] 
```

### table(<table_name>)
```javascript
var fruit_table = fruit_database.table("Fruit");
console.log(fruit_table[1]);
// => {
//      Fruit: "Apricot",
//      Fiber: "2",
//      Fat: "0",
//      Protien: "1", // This spelling mistake is in the database
//      Sugar: "8",
//      'Vit A': "420",
//      'Vit C': "5",
//      'Vit B1': "0",
//      'Vit B2': "0",
//      'Vit B6': "0",
//      'Vit E': "0"
//  };
```
# Caveats
This package is untested on Windows & Mac but it will probably work as long as you can get 
[mdbtools](https://github.com/brianb/mdbtools) installed successfully. 
I also haven't done any testing for compatibility with earlier versions of papaparse and shelljs.

# Future Development
None unless asked for. The less I have to interact with MS Access the better.

# Acknowledgments
Sample database used for tests and examples is from [mdb](https://github.com/maxogden/node-mdb), 
which is a more complete implementation of mdb-tools in Node but also has not been updated since 2013.