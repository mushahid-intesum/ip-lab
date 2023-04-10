const uuid = require("uuid");
const bcrypt = require("bcrypt");
const dbConnection = require("../database");
const { ServerEnum } = require("../../ServerEnum");

async function login(req, res) {
    try {
        const { userEmail, userPassword } = req.body;

        const user = await new Promise((resolve, reject) => {
            dbConnection.query(
                "SELECT * FROM user_table WHERE userEmail = ? and deleted = ?",
                [userEmail, "NO"],
                (error, result, field) => {
                    if (error) {
                        return res.status(401).json({ message: error });
                    }
                    if (result.length == 0) {
                        return res.send({
                            status: false,
                            responseMessage: "User does not exist",
                        });
                    }
                    resolve(result);
                }
            );
        });

        bcrypt.compare(userPassword, user.userPassword, (err, result) => {
            if (result) {
                delete user.userPassword;
                return res.send({
                    user: admin,
                    status: true,
                    responseMessage: "Login Successful",
                });
            }
            return res.send({
                status: false,
                responseMessage: "Password is incorrect",
            });
        });
    }

    catch (error) {
        console.log(error)
    }
}

async function createNewUser(req, res) {
    try {
        const { userName, userRole, userEmail, userPassword } = req.body;
        const userId = uuid.v1();

        const verify = await getDeletedUser(req);

        if (!verify) {
            const user = await new Promise((resolve, reject) => {
                dbConnection.query(
                    "SELECT * FROM user_table WHERE userEmail = ?",
                    [userEmail],
                    (error, result, field) => {
                        if (error) {
                            return res.status(401).json({ message: error });
                        }
                        if (result.length > 0) {
                            return res.send({
                                status: false,
                                responseMessage: "User already exists",
                            });
                        }
                        resolve(result);
                    }
                );
            });

            await new Promise((resolve, reject) => {
                bcrypt.hash(userPassword, 10, (err, hash) => {
                    dbConnection.query(
                        `INSERT INTO user_table
                    (userId, userName, userEmail, userPassword, userRole)
                    VALUES (?,?,?,?,?) `,
                        [userId, userName, userEmail, hash, userRole],
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
                    responseMessage: "user created",
                });
            });
        }

        else
        {
            return res.send({
                status: true,
                responseMessage: "user reactivated",
            });
        }
    }
    

    catch (error) {
        console.log(error)
    }
}

async function getDeletedUser(req) {
    const { userName, userRole, userEmail, userPassword } = req.body;

    const response = await new Promise((resolve, reject) => {
        dbConnection.query(
            "SELECT * FROM user_table WHERE userEmail = ? and deleted = ?",
            [userEmail, "YES"],
            (error, result, field) => {
                if (error) {
                    return false;
                }
                console.log(result);

                if (result.length > 0) {
                    dbConnection.query(
                        "UPDATE user_table SET userName = ?, and deleted = ?, userRole = ? WHERE userEmail = ? ",
                        [userName, "NO", userRole, userEmail],
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

async function getAllUsers(req, res) {
    try {
        let list = await new Promise((resolve, reject) => {
            dbConnection.query(
                "SELECT * from user_table WHERE deleted = ?",
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
            userList: list,
            status: true,
            responseMessage: "User list sent",
        });
    } catch (e) {
        console.log(e);
    }
}

async function getUsersWithRole(req, res) {
    try {

        const { userRole } = req.body;
        const list = await new Promise((resolve, reject) => {
            dbConnection.query(
                "SELECT * from user_table WHERE userRole = ? and deleted = ?",
                [userRole, "NO"],
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
            userList: list,
            status: true,
            responseMessage: "User list sent",
        });
    } catch (e) {
        console.log(e);
    }
}

async function getUser(req, res) {
    try {
        const { userId } = req.body;
        const list = await new Promise((resolve, reject) => {
            dbConnection.query(
                "SELECT * from user_table WHERE userId = ? AND deleted = ?",
                [userId, "NO"],
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
            userList: list,
            status: true,
            responseMessage: "User sent",
        });
    } catch (e) {
        console.log(e);
    }
}

async function updateUser(req, res) {
    try {
        const { userId, userName, userRole } = req.body;
        await new Promise((resolve, reject) => {
            dbConnection.query(
                "UPDATE user_table SET userName = ?, userRole = ? WHERE userId = ? and deleted = ?",
                [userName, userRole, userId, "NO"],
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
                responseMessage: "Update Successful",
            });
        });
    } catch (e) {
        console.log(e);
    }
}

async function deleteUser(req, res) {
    try {
        const { userId } = req.body;
        await new Promise((resolve, reject) => {
            dbConnection.query(
                "UPDATE user_table SET deleted = ? WHERE userId = ? ",
                ["YES", userId],
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
	login,
	getUser,
	updateUser,
	deleteUser,
    getUsersWithRole,
    getAllUsers,
    createNewUser,
};