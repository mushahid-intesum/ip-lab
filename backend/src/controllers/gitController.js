const uuid = require("uuid");
const bcrypt = require("bcrypt");
const dbConnection = require("../database");
const { ServerEnum } = require("../../ServerEnum");
const git = require('simple-git')

async function addNewGitRepo(req, res)
{
    try {
        const { repoName, repoUrl } = req.body;
        const repoId = uuid.v1();

        const verify = await getDeletedRepo(req);

        if (!verify) {
            const repo = await new Promise((resolve, reject) => {
                dbConnection.query(
                    "SELECT * FROM git_repo_table WHERE repoUrl = ?",
                    [userEmail],
                    (error, result, field) => {
                        if (error) {
                            return res.status(401).json({ message: error });
                        }
                        if (result.length > 0) {
                            return res.send({
                                status: false,
                                responseMessage: "Repo already exists",
                            });
                        }
                        resolve(result);
                    }
                );
            });

            await new Promise((resolve, reject) => {
                    dbConnection.query(
                        `INSERT INTO git_repo_table
                    (repoId, repoName, repoUrl)
                    VALUES (?,?,?) `,
                        [repoId, repoName, repoUrl],
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
                    responseMessage: "repo created",
                });
            });
        }

        else
        {
            return res.send({
                status: true,
                responseMessage: "repo reactivated",
            });
        }
    }
    
    catch (error) {
        console.log(error)
    }
}

async function getDeletedRepo(repoUrl) {

    const response = await new Promise((resolve, reject) => {
        dbConnection.query(
            "SELECT * FROM git_repo_table WHERE repoUrl = ? AND deleted = ?",
            [repoUrl, "YES"],
            (error, result, field) => {
                if (error) {
                    return false;
                }
                console.log(result);

                if (result.length > 0) {
                    dbConnection.query(
                        "UPDATE git_repo_table SET deleted = ? WHERE repoUrl = ? ",
                        ["NO", repoUrl],
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
                    return true;
                }
                resolve(result[0]);
            }
        );
    });

    return false;
}

async function deleteGitRepo(req, res)
{
    try {
        const { repoId } = req.body;
        await new Promise((resolve, reject) => {
            dbConnection.query(
                "UPDATE git_repo_table SET deleted = ? WHERE repoId = ? ",
                ["YES", repoId],
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
                responseMessage: "Repo Deleted",
            });
        });
    } catch (e) {
        console.log(e);
    }
}

async function getGitCommits(req, res)
{
    try {
        const { repoId } = req.body;
        const repoUrl = await new Promise((resolve, reject) => {
            dbConnection.query(
                "SELECT repoUrl from git_repo_table WHERE repoId = ? AND deleted = ?",
                [repoId, "NO"],
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

        const repo = git(repoUrl);
        
        repo.log((err, log) => {
            if(err)
            {
                res.send({
                    status: false,
                    responseMessage: "error in git repo"
                })
            }

            else
            {
                res.send({
                    gitLog: log,
                    status: true,
                    responseMessage: "Git log sent",
                })
            }
        })

    } catch (e) {
        console.log(e);
    }
}

async function sendReport(req, res)
{

}

async function makeReport(req, res)
{
    
}

module.exports = {
    addNewGitRepo,
    deleteGitRepo,
    getGitCommits,
    sendReport,
    makeReport
}