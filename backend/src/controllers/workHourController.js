const uuid = require("uuid");
const bcrypt = require("bcrypt");
const dbConnection = require("../database");
const { ServerEnum } = require("../../ServerEnum");

async function createWorkHour(req, res)
{
    
}

async function logWorkHour(req, res)
{

}

async function getWorkHourListForUser(req, res)
{

}

async function getTotalWorkHourForUser(req, res)
{

}

async function getWorkHourListForProject(req, res)
{

}

module.exports = {
    createWorkHour,
    logWorkHour,
    getWorkHourListForUser,
    getTotalWorkHourForUser,
    getWorkHourListForProject
}