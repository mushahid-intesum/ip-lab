const uuid = require("uuid");
const bcrypt = require("bcrypt");
const dbConnection = require("../database");
const { ServerEnum } = require("../../ServerEnum");

async function createNewTask(req, res)
{
    try
    {
        const { taskName, summary, startDate, endDate, status, projectId} = req.body;
        
        const taskId = uuid.v1();

        await new Promise((resolve, reject) => {
                dbConnection.query(
                    `INSERT INTO tasks_table
                    (taskId, summary, taskName, startDate, endDate, status, projectId)
                    VALUES (?,?,?,?,?,?,?) `,
                    [taskId, summary, taskName, startDate, endDate, status, projectId],
                    (error, result, field) => {
                        if (error) {
                            res.status(401).json({ message: error });
                            return;
                        }
                        resolve();
                    }
                );
            return res.send({
                status: true,
                responseMessage: "task created",
            });
        });

    } catch (e) {
        console.log(e);
    }
}

async function getAllTasks(req, res)
{
    try {
        const list = await new Promise((resolve, reject) => {
            dbConnection.query(
                "SELECT * from tasks_table WHERE deleted = ?",
                ["NO"],
                (error, result, field) => {
                    if (error) {
                        res.status(401).json({ message: error });
                        return;
                    }
                    resolve(result);
                }
            );
        });
        return res.json({
            tasksList: list,
            status: true,
            responseMessage: "task list sent",
        });
    } catch (e) {
        console.log(e);
    }
}

async function getTask(req, res)
{
    try {
        const {taskId} = req.body;
        const list = await new Promise((resolve, reject) => {
            dbConnection.query(
                "SELECT * from tasks_table WHERE taskId = ? AND deleted = ?",
                [taskId, "NO"],
                (error, result, field) => {
                    if (error) {
                        res.status(401).json({ message: error });
                        return;
                    }
                    resolve(result);
                }
            );
        });
        return res.send({
            taskList: list,
            status: true,
            responseMessage: "task list sent",
        });
    } catch (e) {
        console.log(e);
    }
}

async function updateTask(req, res)
{
    try
    {
        const { taskId, taskName, summary, startDate, endDate, status} = req.body;
        
        await new Promise((resolve, reject) => {
                dbConnection.query(
                    `UPDATE tasks_table SET
                    taskName = ?, summary = ?, startDate = ?, endDate = ?, status = ? WHERE taskId = ?`,
                    [taskName, summary, startDate, endDate, status, taskId],
                    (error, result, field) => {
                        if (error) {
                            res.status(401).json({ message: error });
                            return;
                        }
                        resolve();
                    }
                );
            });
            return res.send({
                status: true,
                responseMessage: "task updated",
            });

    } catch (e) {
        console.log(e);
    }
}

async function deleteTask(req, res)
{
    try {
        const { taskId } = req.body;
        await new Promise((resolve, reject) => {
            dbConnection.query(
                "UPDATE tasks_table SET deleted = ? WHERE taskId = ? ",
                ["YES", taskId],
                (error, result, field) => {
                    if (error) {
                        res.status(401).json({
                            message: error,
                        });
                        return;
                    }
                    resolve();
                }
            );
            return res.send({
                status: true,
                responseMessage: "task deleted",
            });
        });
    } catch (e) {
        console.log(e);
    }
}

async function getProjectTasks(req, res) {
    try {
        const { projectId } = req.body;
        const tasks = await new Promise((resolve, reject) => {
            dbConnection.query(
                "SELECT tasks from projects_table WHERE projectId = ? AND deleted = ?",
                [projectId, "NO"],
                (error, result, field) => {
                    if (error) {
                        res.status(401).json({ message: error });
                        return;
                    }
                    console.log(result);
                    resolve(result);
                }
            );
        });

        tasks = JSON.parse(tasks)

        taskList = []

        for (let i = 0; i < tasks.length; i++) {
            let task = await new Promise((resolve, reject) => {
                dbConnection.query(
                    "SELECT * from tasks_table WHERE taskId = ? AND deleted = ?",
                    [tasks[i], "NO"],
                    (error, result, field) => {
                        if (error) {
                            res.status(401).json({ message: error });
                            return;
                        }
                        console.log(result);
                        resolve(result);
                    }
                );
            });

            taskList.push(task)
        }

        return res.send({
            taskList: taskList, 
            status: true,
            responseMessage: "task list for project sent",
        });
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    createNewTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask
}