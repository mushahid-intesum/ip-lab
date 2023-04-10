const uuid = require("uuid");
const bcrypt = require("bcrypt");
const dbConnection = require("../database");
const { ServerEnum } = require("../../ServerEnum");

async function createNewTask(req, res)
{
    try
    {
        const { taskName, summary, startDate, endDate, assignedUsers, status} = req.body;
        
        const taskId = uuid.v1();

        await new Promise((resolve, reject) => {
                dbConnection.query(
                    `INSERT INTO tasks_table
                    (taskId, summary, taskName, startDate, endDate, assignedUsers, status)
                    VALUES (?,?,?,?,?,?,?) `,
                    [taskId, summary, taskName, startDate, endDate, assignedUsers, status],
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
                    console.log(result);
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
                    console.log(result);
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
        const { taskId, taskName, summary, startDate, endDate, assignedUsers, status} = req.body;
        
        await new Promise((resolve, reject) => {
                dbConnection.query(
                    `UPDATE tasks_table SET
                    taskName = ?, summary = ?, startDate = ?, endDate = ?, assignedUsers = ?, status = ? WHERE taskId = ?`,
                    [taskName, summary, startDate, endDate, assignedUsers, status, taskId],
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

module.exports = {
    createNewTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask
}