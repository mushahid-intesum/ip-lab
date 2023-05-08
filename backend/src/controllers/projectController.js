const uuid = require("uuid");
const bcrypt = require("bcrypt");
const dbConnection = require("../database");
const { ServerEnum } = require("../../ServerEnum");

async function createNewProject(req, res) {
    try {
        const { projectName, startDate, endDate, projectManagerId, description } = req.body;

        const projectId = uuid.v1();

        await new Promise((resolve, reject) => {
            dbConnection.query(
                `INSERT INTO projects_table
                    (projectId, projectName, startDate, endDate, projectManagerId, description)
                    VALUES (?,?,?,?,?,?) `,
                [projectId, projectName, startDate, endDate, projectManagerId, description],
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
                responseMessage: "project created",
            });
        });

    } catch (e) {
        console.log(e);
    }
}

async function getAllProjects(req, res) {
    try {
        const { userId, userName, userEmail } = req.body;
        const list = await new Promise((resolve, reject) => {
            dbConnection.query(
                "SELECT * from projects_table WHERE deleted = ? AND projectManagerId = ?",
                ["NO", userId],
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
            responseMessage: "project list sent",
        });
    } catch (e) {
        console.log(e);
    }
}

async function getProject(req, res) {
    try {
        const { projectId } = req.body;
        const list = await new Promise((resolve, reject) => {
            dbConnection.query(
                "SELECT * from projects_table WHERE projectId = ? AND deleted = ?",
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
        return res.send({
            projectList: list,
            status: true,
            responseMessage: "project list sent",
        });
    } catch (e) {
        console.log(e);
    }
}

async function updateProject(req, res) {
    try {
        const { projectId, projectName, startDate, endDate, projectManagerId, description } = req.body;

        await new Promise((resolve, reject) => {
            dbConnection.query(
                `UPDATE projects_table SET
                    projectName = ?, startDate = ?, endDate = ?, projectManagerId = ?, description = ? WHERE projectId = ? `,
                [projectName, startDate, endDate, projectManagerId, description, projectId],
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
                responseMessage: "project updated",
            });
        });

    } catch (e) {
        console.log(e);
    }
}

async function deleteProject(req, res) {
    try {
        const { projectId } = req.body;
        await new Promise((resolve, reject) => {
            dbConnection.query(
                "UPDATE projects_table SET deleted = ? WHERE projectId = ? ",
                ["YES", projectId],
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

        });

        await new Promise((resolve, reject) => {
            dbConnection.query(
                "UPDATE project_user_table SET deleted = ? WHERE projectId = ? ",
                ["YES", projectId],
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

        });

        // await new Promise((resolve, reject) => {
        //     dbConnection.query(
        //         "UPDATE kanban_table SET deleted = ? WHERE projectId = ? ",
        //         ["YES", projectId],
        //         (error, result, field) => {
        //             if (error) {
        //                 res.status(401).json({
        //                     message: error,
        //                 });
        //                 return;
        //             }
        //             resolve();
        //         }
        //     );

        // });

        // await new Promise((resolve, reject) => {
        //     dbConnection.query(
        //         "UPDATE calendar_table SET deleted = ? WHERE projectId = ? ",
        //         ["YES", projectId],
        //         (error, result, field) => {
        //             if (error) {
        //                 res.status(401).json({
        //                     message: error,
        //                 });
        //                 return;
        //             }
        //             resolve();
        //         }
        //     );

        // });

        // await new Promise((resolve, reject) => {
        //     dbConnection.query(
        //         "UPDATE git_repo_table_table SET deleted = ? WHERE projectId = ? ",
        //         ["YES", projectId],
        //         (error, result, field) => {
        //             if (error) {
        //                 res.status(401).json({
        //                     message: error,
        //                 });
        //                 return;
        //             }
        //             resolve();
        //         }
        //     );

        // });

        return res.send({
            status: true,
            responseMessage: "Project deleted",
        });
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    createNewProject,
    getAllProjects,
    getProject,
    updateProject,
    deleteProject,
}
