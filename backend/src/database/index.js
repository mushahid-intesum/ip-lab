/* eslint-disable quotes */
const mysql = require("mysql2");

const host = "localhost";
const user = "root";
const password = "MySQLTala135.";
const database = "project_management";

// const host = "containers-us-west-192.railway.app";
// const user = "root";
// const password = "IAaCuFLZFPCMwgsDskxf";
// const database = "railway";
// const port = 5669

var pool = mysql.createPool({
	host: host,
	user: user,
	password: password,
	database: database,
	debug: false,
	multipleStatements: true,
});

module.exports = {
	query: function () {
		var sql_args = [];
		var args = [];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
		var callback = args[args.length - 1]; //last arg is callback
		pool.getConnection(function (err, connection) {
			if (err) {
				console.log(err);
				return callback(err);
			}
			if (args.length > 2) {
				sql_args = args[1];
			}
			connection.query(args[0], sql_args, function (err, results) {
				connection.release(); // always put connection back in pool after last query
				if (err) {
					console.log(err);
					return callback(err);
				}
				callback(null, results);
			});
		});
	},
};
