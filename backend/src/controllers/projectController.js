const uuid = require("uuid");
const bcrypt = require("bcrypt");
const dbConnection = require("../database");
const { ServerEnum } = require("../../ServerEnum");

async function createNewProject(req, res) {
    try {
        const { projectName, startDate, endDate, projectManagerId, projectUsers, tasks, status } = req.body;

        const projectId = uuid.v1();

        await new Promise((resolve, reject) => {
            dbConnection.query(
                `INSERT INTO projects_table
                    (projectId, projectName, startDate, endDate, projectManagerId, projectUsers, tasks, status)
                    VALUES (?,?,?,?,?,?,?,?) `,
                [projectId, projectName, startDate, endDate, projectManagerId, projectUsers, tasks, status],
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
        const list = await new Promise((resolve, reject) => {
            dbConnection.query(
                "SELECT * from projects_table WHERE deleted = ?",
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
        const { projectId, projectName, startDate, endDate, projectManagerId, projectUsers, tasks, status } = req.body;

        await new Promise((resolve, reject) => {
            dbConnection.query(
                `UPDATE projects_table SET
                    (projectName = ?, startDate = ?, endDate = ?, projectManagerId = ?, projectUsersv, tasksv, status = ? WHERE projectId = ? )`,
                [projectName, startDate, endDate, projectManagerId, projectUsers, tasks, status, projectId],
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
            return res.send({
                status: true,
                responseMessage: "Project deleted",
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

async function getProjectKanbanBoards(req, res)
{
    try {
        const { projectId } = req.body;
        const boards = await new Promise((resolve, reject) => {
            dbConnection.query(
                "SELECT kanbanBoards from projects_table WHERE projectId = ? AND deleted = ?",
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

        boards = JSON.parse(boards)

        taskList = []

        for (let i = 0; i < boards.length; i++) {
            let task = await new Promise((resolve, reject) => {
                dbConnection.query(
                    "SELECT * from kanban_table WHERE kanbanId = ? AND deleted = ?",
                    [boards[i], "NO"],
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
            responseMessage: "kanban list for project sent",
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
    getProjectTasks,
    getProjectKanbanBoards
}
