const shell = require('shelljs');
const papa = require('papaparse');
const fs = require('fs');
/**
 * @author Aaron Olinger <aaron.olinger@gmail.com>
 */

/**
 * Initialize Object with name of access database file.
 * Accepts .mdb and .accdb files.
 * Requires [mdb-tools]{@link https://github.com/brianb/mdbtools} installed and available from the cli
 * @constructor
 * @param {String} file_location - File Location
 */
const mdb_parse = function(file_location){
    const extension = file_location.split('.').pop().toLowerCase();
    this.file_location = file_location;

    // Verify that file location exists
    if(!fs.existsSync(file_location)){
        throw "Could not veryify a file exists at '"+fs.realpathSync(file_location)+"'";
    }
    // Print waring if file is not a .mdb or .accdb
    else if(extension !== 'mdb' && extension !== 'accdb'){
        console.log('[mdb-parse] Warning: Could not verify file input is .accdb or .mdb');
    }
};

/**
 * Returns a Microsoft Access Table as an array of Objects
 * @param {String} table_name - MS Access table name
 * @returns {Object[]} - Table Data
 */
mdb_parse.prototype.table = function(table_name){
    const table_csv = shell.exec(
        "mdb-export '"+this.file_location+"' '"+table_name+"'",
        {silent:true}
    ).stdout; // ~$ mdb-export file_location table_name

    return papa.parse(table_csv, {header: true, skipEmptyLines: true}).data;
};

/**
 * Returns an Array of all Tables in the provided Access Database
 * @returns {Array} - Table names
 */
mdb_parse.prototype.list = function(){
    return shell.exec(
        "mdb-tables -d ',' '"+this.file_location+"'",
        {silent:true}
    ).stdout.split(',').filter(function(table_name){
        return table_name !== '\n' && !!table_name; // Empty strings return false
    });
};

module.exports = mdb_parse;