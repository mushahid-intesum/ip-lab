const uuid = require("uuid");
const bcrypt = require("bcrypt");
const dbConnection = require("../database");
const { ServerEnum } = require("../../ServerEnum");

async function createWorkHour(req, res) {
    try {
        const { userId, projectId, startTime, endTime, totalTime, date } = req.body;
        const workHourId = uuid.v1();

        await new Promise((resolve, reject) => {
            dbConnection.query(
                `INSERT INTO work_hours_table
                    (workHourId, userId, projectId, startTime, endTime, totalTime, date)
                    VALUES (?,?,?,?,?,?,?) `,
                [workHourId, userId, projectId, startTime, endTime, totalTime, date],
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
                responseMessage: "work hour created",
            });
        });
    }

    catch (error) {
        console.log(error)
    }
}

async function updateWorkHour(req, res) {
    try {
        const { workHourId, userId, projectId, updatedAt } = req.body;

        await new Promise((resolve, reject) => {
            dbConnection.query(
                `UPDATE work_hours_table SET
                    updatedAt = ? WHERE workHourId = ? AND userID = ? AND projectId = ?`,
                [updatedAt, workHourId, userId, projectId],
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
            responseMessage: "work hour updated",
        });

    } catch (e) {
        console.log(e);
    }
}

async function getWorkHourListForUser(req, res) {
    try {
        const { userId } = req.body;

        let list = await new Promise((resolve, reject) => {
            dbConnection.query(
                "SELECT * from work_hours_table WHERE deleted = ? AND userId = ?",
                ["NO", userId],
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
            userList: list,
            status: true,
            responseMessage: "Work hours list sent",
        });
    } catch (e) {
        console.log(e);
    }
}

async function getTotalWorkHourForUser(req, res) {

}

async function getWorkHourListForProject(req, res) {
    try {
        const { userId, projectId } = req.body;

        let list = await new Promise((resolve, reject) => {
            dbConnection.query(
                "SELECT * from work_hours_table WHERE deleted = ? AND projectId = ? AND userId = ?",
                ["NO", projectId, userId],
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
            userList: list,
            status: true,
            responseMessage: "Work hours list sent",
        });
    } catch (e) {
        console.log(e);
    }
}

async function deleteWorkHour(req, res) {
    try {
        const { workHourId } = req.body;
        await new Promise((resolve, reject) => {
            dbConnection.query(
                "UPDATE work_hours_table SET deleted = ? WHERE workHourId = ? ",
                ["YES", workHourId],
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
                responseMessage: "User Deleted",
            });
        });
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    createWorkHour,
    updateWorkHour,
    getWorkHourListForUser,
    getTotalWorkHourForUser,
    getWorkHourListForProject,
    deleteWorkHour
}