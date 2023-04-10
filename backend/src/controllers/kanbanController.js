const uuid = require("uuid");
const bcrypt = require("bcrypt");
const dbConnection = require("../database");
const { ServerEnum } = require("../../ServerEnum");

async function createKanban(req, res)
{
    try {
        const { kanbanName, projectId, createdBy, createdDate} = req.body;

        const kanbanId = uuid.v1();

        await new Promise((resolve, reject) => {
            dbConnection.query(
                `INSERT INTO kanban_table
                    (kanbanId, kanbanName, projectId, createdBy, createdDate)
                    VALUES (?,?,?,?,?) `,
                [kanbanId, kanbanName, projectId, createdBy, createdDate],
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
                responseMessage: "kanban created",
            });
        });

    } catch (e) {
        console.log(e);
    }
}

async function editKanban(req, res)
{
    try {
        const { kanbanId, kanbanName } = req.body;

        await new Promise((resolve, reject) => {
            dbConnection.query(
                `UPDATE kanban_table SET
                    (kanbanName = ? WHERE kanbanId = ? )`,
                [kanbanName, kanbanId],
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
                responseMessage: "kanban updated",
            });
        });

    } catch (e) {
        console.log(e);
    }
}

async function getKanban(req, res)
{
    try {
        const { kanbanId } = req.body;
        const list = await new Promise((resolve, reject) => {
            dbConnection.query(
                "SELECT * from kanban_table WHERE kanbanId = ? AND deleted = ?",
                [kanbanId, "NO"],
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
            projectList: list,
            status: true,
            responseMessage: "kanban sent",
        });
    } catch (e) {
        console.log(e);
    }
}

async function deleteKanban(req, res)
{
    try {
        const { kanbanId } = req.body;
        await new Promise((resolve, reject) => {
            dbConnection.query(
                "UPDATE kanban_table SET deleted = ? WHERE kanbanId = ? ",
                ["YES", kanbanId],
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
                responseMessage: "Kanban deleted",
            });
        });
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    createKanban,
    editKanban,
    getKanban,
    deleteKanban
}