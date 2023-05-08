const uuid = require("uuid");
const dbConnection = require("../database");
const bcrypt = require("bcrypt");


async function dropTables() {
	try {
		const response = await new Promise((resolve, reject) => {
			dbConnection.query(
				// "DROP TABLE IF EXISTS user_table;"+
				// "DROP TABLE IF EXISTS projects_table;"+
				// "DROP TABLE IF EXISTS git_repo_table;"+
				// "DROP TABLE IF EXISTS tasks_table;"+
				// "DROP TABLE IF EXISTS kanban_table;",
				// "DROP TABLE IF EXISTS calendar_table;",
				"DROP TABLE IF EXISTS work_hours_table;",
				// "DROP TABLE IF EXISTS project_user_table;",
				// "DROP TABLE IF EXISTS task_user_table;",
				(error, result, field) => {
					if (error) {
						console.log(error);
						return;
					}
					resolve(result);
				}
			);
		});
	} catch (e) {
		console.log(e);
	}
}

async function createUserTable()
{
	try {
		const response = await new Promise((resolve, reject) => {
			dbConnection.query(
				"CREATE TABLE IF NOT EXISTS user_table (" +
				"userId VARCHAR(250) NOT NULL," +
				"userName VARCHAR(250)," +
				"userEmail VARCHAR(250)," +
				"userPassword VARCHAR(250)," +
				"userPhone VARCHAR(250)," +
				"deleted VARCHAR(250) DEFAULT 'NO', "+
				"PRIMARY KEY (userId)) " +
				"Engine = Innodb DEFAULT CHARSET=utf8;",
							(error, result, field) => {
					if (error) {
						console.log(error);
						return;
					}
					resolve(result);
				}
			);
		});
	} catch (e) {
		console.log(e);
	}
}


async function createProjectUserTable()
{
	try {
		const response = await new Promise((resolve, reject) => {
			dbConnection.query(
				"CREATE TABLE IF NOT EXISTS project_user_table (" +
				"userId VARCHAR(250) NOT NULL," +
				"projectId VARCHAR(250) NOT NULL," +
				"userRole VARCHAR(250), " +
				"deleted VARCHAR(250) DEFAULT 'NO', "+
				"PRIMARY KEY (userId, projectId)) " +
				"Engine = Innodb DEFAULT CHARSET=utf8;",
							(error, result, field) => {
					if (error) {
						console.log(error);
						return;
					}
					resolve(result);
				}
			);
		});
	} catch (e) {
		console.log(e);
	}
}

async function createProjectsTable()
{
	try {
		const response = await new Promise((resolve, reject) => {
			dbConnection.query(
				"CREATE TABLE IF NOT EXISTS projects_table (" +
				"projectId VARCHAR(250) NOT NULL," +
				"projectName VARCHAR(250)," +
				"description VARCHAR(250)," +
				"startDate DATETIME," +
				"endDate DATETIME," +
				"projectManagerId VARCHAR(250)," +
				"deleted VARCHAR(250) DEFAULT 'NO', "+
				"PRIMARY KEY (projectId)) " +
				"Engine = Innodb DEFAULT CHARSET=utf8;",
							(error, result, field) => {
					if (error) {
						console.log(error);
						return;
					}
					resolve(result);
				}
			);
		});
	} catch (e) {
		console.log(e);
	}
}

async function createGitRepoTable()
{
	try {
		const response = await new Promise((resolve, reject) => {
			dbConnection.query(
				"CREATE TABLE IF NOT EXISTS git_repo_table (" +
				"repoId VARCHAR(250) NOT NULL," +
				"repoName VARCHAR(250)," +
				"repoUrl VARCHAR(250)," +
				"repoBranch VARCHAR(250)," +
				"projectId VARCHAR(250) NOT NULL," +
				"deleted VARCHAR(250) DEFAULT 'NO', "+
				"PRIMARY KEY (repoId)) " +
				"Engine = Innodb DEFAULT CHARSET=utf8;",
							(error, result, field) => {
					if (error) {
						console.log(error);
						return;
					}
					resolve(result);
				}
			);
		});
	} catch (e) {
		console.log(e);
	}
}

async function createTasksTable()
{
	try {
		const response = await new Promise((resolve, reject) => {
			dbConnection.query(
				"CREATE TABLE IF NOT EXISTS tasks_table (" +
				"taskId VARCHAR(250) NOT NULL," +
				"taskName VARCHAR(250)," +
				"summary VARCHAR(250)," +
				"startDate DATETIME," +
				"endDate DATETIME," +
				"projectId VARCHAR(250) NOT NULL," +
				"status VARCHAR(250)," +
				"deleted VARCHAR(250) DEFAULT 'NO', "+
				"PRIMARY KEY (taskId)) " +
				"Engine = Innodb DEFAULT CHARSET=utf8;",
							(error, result, field) => {
					if (error) {
						console.log(error);
						return;
					}
					resolve(result);
				}
			);
		});
	} catch (e) {
		console.log(e);
	}
}

async function createTaskUserTable()
{
	try {
		const response = await new Promise((resolve, reject) => {
			dbConnection.query(
				"CREATE TABLE IF NOT EXISTS task_user_table (" +
				"userId VARCHAR(250) NOT NULL," +
				"taskId VARCHAR(250) NOT NULL," +
				"deleted VARCHAR(250) DEFAULT 'NO', "+
				"PRIMARY KEY (userId, taskId)) " +
				"Engine = Innodb DEFAULT CHARSET=utf8;",
							(error, result, field) => {
					if (error) {
						console.log(error);
						return;
					}
					resolve(result);
				}
			);
		});
	} catch (e) {
		console.log(e);
	}
}

async function createKanbanTable()
{
	try {
		const response = await new Promise((resolve, reject) => {
			dbConnection.query(
				"CREATE TABLE IF NOT EXISTS kanban_table (" +
				"kanbanId VARCHAR(250) NOT NULL," +
				"kanbanName VARCHAR(250), "+
				"projectId VARCHAR(250) NOT NULL," +
				"createdBy VARCHAR(250), "+
				"createdDate DATETIME, "+
				"deleted VARCHAR(250) DEFAULT 'NO', "+
				"PRIMARY KEY (kanbanId)) " +
				"Engine = Innodb DEFAULT CHARSET=utf8;",
							(error, result, field) => {
					if (error) {
						console.log(error);
						return;
					}
					resolve(result);
				}
			);
		});
	} catch (e) {
		console.log(e);
	}
}

async function createCalendarTable()
{
	try {
		const response = await new Promise((resolve, reject) => {
			dbConnection.query(
				"CREATE TABLE IF NOT EXISTS calendar_table (" +
				"calendarId VARCHAR(250) NOT NULL," +
				"projectId VARCHAR(250) NOT NULL," +
				"details JSON," +
				"deleted VARCHAR(250) DEFAULT 'NO', "+
				"PRIMARY KEY (calendarId)) " +
				"Engine = Innodb DEFAULT CHARSET=utf8;",
							(error, result, field) => {
					if (error) {
						console.log(error);
						return;
					}
					resolve(result);
				}
			);
		});
	} catch (e) {
		console.log(e);
	}
}

async function createGitReportRecipientsTable()
{
	try {
		const response = await new Promise((resolve, reject) => {
			dbConnection.query(
				"CREATE TABLE IF NOT EXISTS git_report_recipient_table (" +
				"reportId VARCHAR(250) NOT NULL," +
				"userId VARCHAR(250)," +
				"repoId VARCHAR(250)," +
				"commitCount INTEGER," +
				"deleted VARCHAR(250) DEFAULT 'NO', "+
				"PRIMARY KEY (reportId)) " +
				"Engine = Innodb DEFAULT CHARSET=utf8;",
							(error, result, field) => {
					if (error) {
						console.log(error);
						return;
					}
					resolve(result);
				}
			);
		});
	} catch (e) {
		console.log(e);
	}
}

async function createWorkHoursTable()
{
	try {
		const response = await new Promise((resolve, reject) => {
			dbConnection.query(
				"CREATE TABLE IF NOT EXISTS work_hours_table (" +
				"workHourId VARCHAR(250) NOT NULL,"+
				"userId VARCHAR(250),"+
				"projectId VARCHAR(250),"+
				"startTime VARCHAR(250),"+
				"endTime VARCHAR(250),"+
				"date VARCHAR(250), "+
				"totalTime VARCHAR(250), "+
				"deleted VARCHAR(250) DEFAULT 'NO', "+
				"PRIMARY KEY (workHourId)) " +
				"Engine = Innodb DEFAULT CHARSET=utf8;",
							(error, result, field) => {
					if (error) {
						console.log(error);
						return;
					}
					resolve(result);
				}
			);
		});
	} catch (e) {
		console.log(e);
	}
}

async function addUsers()
{
	let users = [
		["kader", "k@a.com", "123123"],
		["ploy", "p@a.com", "123123"],
		["sonya", "s@a.com", "123123"],
		["naim", "n@a.com", "123123"],
		["babul", "b@a.com", "123123"],
		["fahim", "f@a.com", "123123"],
		["mamun", "m@a.com", "123123"],
		["latif", "l@a.com", "123123"],
		["tony", "t@a.com", "123123"],
		["ratul", "r@a.com", "123123"],
		["hasan", "h@a.com", "123123"],
	]

	for(let i = 0;i<users.length;i++)
	{
		const userId = uuid.v1();

		await new Promise((resolve, reject) => {
			bcrypt.hash(users[i][2], 10, (err, hash) => {
				dbConnection.query(
					`INSERT INTO user_table
				(userId, userName, userEmail, userPassword)
				VALUES (?,?,?,?) `,
					[userId, users[i][0], users[i][1], hash],
					(error, result, field) => {
						if (error) {
							res.status(401).json({ message: error });
							return;
						}
						resolve();
					}
				);
			});
		});
	}
}


async function databaseCommit(req, res) {
	try {
		await dropTables();
		createUserTable();
		createTasksTable();
		createProjectsTable();
		createKanbanTable();
		createGitReportRecipientsTable();
		createGitRepoTable();
		createCalendarTable();
		createWorkHoursTable();
		createProjectUserTable();
		createTaskUserTable();

		addUsers();

		// const adminId = uuid.v1();
		// const password = "123456";
		// const name = "ADMIN";
		// const role = "SUPER ADMIN"
		// const email = "admin@utilitool.com";

		// await new Promise((resolve, reject) => {
		// 	bcrypt.hash(password, 10, (err, hash) => {
		// 		dbConnection.query(
		// 			`INSERT INTO user_table 
        //     (userId, userName, userEmail, userPassword)
        //         VALUES (?,?,?,?) `,
		// 			[adminId, name, email, hash],
		// 			(error, result, field) => {
		// 				if (error) {
		// 					console.log(error);
		// 					return;
		// 				}
		// 				return res.send({
		// 					status: true,
		// 					responseMessage: "database commit",
		// 				});
		// 			}
		// 		);
		// 	});
		// });
		return res.send({
			status: true,
			responseMessage: "database commit",
		});
	} catch (e) {
		console.log(e);
	}
}

module.exports = {
	databaseCommit,
};
