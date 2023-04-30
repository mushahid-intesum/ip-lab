const uuid = require("uuid");
const bcrypt = require("bcrypt");
const dbConnection = require("../database");
const { ServerEnum } = require("../../ServerEnum");
const NodeGit = require('nodegit');
const fs = require("fs");
const simpleGit = require("simple-git");
// import * as fs from "fs";
const cohere = require('cohere-ai');
cohere.init('Kci545aQ7ap1AGS8qITx1FhTnRUAI1OjYShY5cYC')

async function addNewGitRepo(req, res) {
    try {
        const { repoName, repoUrl } = req.body;
        const repoId = uuid.v1();

        const verify = await getDeletedRepo(req);


        if (!verify) {
            const repo = await new Promise((resolve, reject) => {
                dbConnection.query(
                    "SELECT * FROM git_repo_table WHERE repoUrl = ?",
                    [repoUrl],
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

        else {
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

async function getDeletedRepo(req) {

    try {
        const { repoName, repoUrl } = req.body;
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
    }catch (e) {
        console.log(e)
    }

    return false;
}

async function deleteGitRepo(req, res) {
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

async function getReport(req, res) {
    try {
        const { repoId } = req.body;
        const repoUrl = await new Promise((resolve, reject) => {
            dbConnection.query(
                "SELECT repoUrl from git_repo_table WHERE repoId = ? AND deleted = ?",
                [repoId, "NO"],
                (error, result, field) => {
                    if (error) {
                        return [];
                    }
                    console.log(result);
                    resolve(result);
                }
            );
        });

        console.log("repoUrl", repoUrl[0]['repoUrl'])

        const tempDir = "git_report"

        const clone = await NodeGit.Clone(repoUrl[0]['repoUrl'], tempDir);
        const gitRepo = simpleGit(tempDir);

        gitRepo.log((err, log) => {
            if (err) {
                res.send({
                    gitReport: "response",
                    status: true,
                    responseMessage: "Error in report making",
                })
            }

            else {

                const allMessages = log['all'];
                const latestMessage = log['latest'];

                let messages = "";

                for (let i = 0; i < allMessages.length; i++) {
                    let message = allMessages[i];
                    messages += message['message'];
                    // let data = { "date": message['date'], "message": message['message'], "author": message['author_name'], "body": message['body'] }
                    // messages.push(data)
                }

                for (let i = 0; i < latestMessage.length; i++) {
                    let message = latestMessage[i];
                    messages += message['message'];
                    // let data = { "date": message['date'], "message": message['message'], "author": message['author_name'], "body": message['body'] }
                    // messages.push(data)
                }

                console.log(messages)
                fs.rmSync(tempDir, { recursive: true, force: true });

                // const response = cohere.summarize({
                //     text: messages,
                // });

                (async () => {
                    const response = await cohere.summarize({
                      text: messages,
                    });
                    res.send({
                        gitReport: response,
                        status: true,
                        responseMessage: "Git reports sent",
                    })
                  })();
            }
          });

    } catch (e) {
        console.log(e);
    }
}


// async function getGitCommits(req, res) {
//     try {
//         let text = await getGitCommits(req);
//         console.log("text", text)
//         const tempDir = "git_report"
//         fs.rmSync(tempDir, { recursive: true, force: true });




//         const response = await cohere.summarize({
//             text: text,
//         });
//         console.log(response);

//         res.send({
//             gitReport: response,
//             status: true,
//             responseMessage: "Git reports sent",
//         })

//     } catch (e) {
//         console.log(e);
//     }
// }


module.exports = {
    addNewGitRepo,
    deleteGitRepo,
    // getGitCommits,
    getReport
}