import React from 'react';
import { Header, Modal } from '../components';
import styled from 'styled-components';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Selection, Search, Toolbar, CommandColumn, Edit, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { customersData, customersGrid } from '../data/dummy';
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useNavigate } from 'react-router-dom'

// import ProjectService from '../services/ProjectService';
import ProjectService from "../services/ProjectService";
import { ServerConfig } from '../config/ServerConfig'



const StyledButton = styled.button`
  background-color: transparent;
  color: blue;
  margin-right: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const GitReport = () => {

  const navigate = useNavigate()

  const [numCommits, setNumCommits] = useState(null);
  const [numReports, setNumReports] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const [id, setId] = useState('')
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [report, setReport] = useState("");

  const [scroll, setScroll] = React.useState('paper');

  const [data, setData] = useState([]);

  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);

  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const handleEditModalOpen = () => setEditModalOpen(true);
  const handleEditModalClose = () => {
    setName('')
    setId('')
    setUrl('')
    setEditModalOpen(false);
  }

  const [openProgressBar, setProgressBarOpen] = React.useState(false);
  const handleProgressBarOpen = () => setProgressBarOpen(true);
  const handleProgressBarClose = () => setProgressBarOpen(false);

  const [reportModalOpen, setReportModalOpen] = React.useState(false);
  const handleReportModalOpen = () => setReportModalOpen(true);
  const handleReportModalClose = () => setReportModalOpen(false);


  useEffect(() => {
    const currentUser = localStorage.getItem("user")

    if(currentUser === "")
    {
      navigate("/signin");
    }
    const currentProject = localStorage.getItem("currentProject");

    if(currentProject === "")
    {
      alert("Please select a project")
      navigate("/home");
    }
    fetchGitRepoList()
  }, [])


  const fetchGitRepoList = async () => {
    handleProgressBarClose()
    const response = await ProjectService.instance.getRepoList()
    console.log(response)
    if (response.status) {
      setData(response.repoList)
    }
  }

  const handleCommitsClick = () => {
    setModalType('commits');
    setModalOpen(true);
  };

  const handleReportsClick = () => {
    setModalType('reports');
    setModalOpen(true);
  };

  const handleModalSubmit = (value) => {
    if (modalType === 'commits') {
      setNumCommits(value);


    } else if (modalType === 'reports') {
      setNumReports(value);
    }
    setModalOpen(false);
  };


  const handleAddNewGitRepo = async () => {

    const payload = {
      repoName: name,
      repoUrl: url
    }
    const response = await ProjectService.instance.addRepo(payload)
    console.log(response)
    if (response.status) {
      setName('')
      setUrl('')
      fetchGitRepoList()
      handleAddModalClose()

    }
  }

  const handleEdit = async () => {
    const payload = {
      repoId: id,
      repoName: name,
      repoUrl: url
    }
    const response = await ProjectService.instance.editRepo(payload)
    console.log(response)
    if (response.status) {
      setName('')
      setUrl('')

      fetchGitRepoList()
      handleEditModalClose()

    }
  }

  const handleDelete = async () => {
    const payload = {
      repoId: id
    }

    const response = await ProjectService.instance.deleteRepo(payload)
    console.log(response)
    if (response.status) {
      setName('')
      setUrl('')

      fetchGitRepoList()
      handleEditModalClose()
    }
  }

  const handleReport = async () => {
    handleEditModalClose()
    handleProgressBarOpen()
    const payload = {
      repoId: id
    }

    const response = await ProjectService.instance.getRepoReport(payload)
    console.log(response)
    if (response.status) {
      handleReportModalOpen()
      handleProgressBarClose()
      setReport(response.gitReport.body.summary);
    }
  }

  const handleReportClose = async () => {
    setReport('');
    handleReportModalClose()
  }

  const rowSelected = (args) => {
    const repo = args.data;
    setId(repo['repoId'])
    setName(repo['repoName'])
    setUrl(repo['repoUrl'])

    console.log(repo)

    handleEditModalOpen()
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Git Repo" title="Git Repositories" />
      <Button onClick={handleAddModalOpen}>Add Git Repo</Button>
      <GridComponent
        dataSource={data}
        allowPaging
        allowSorting
        editSettings={{ allowDeleting: false, allowEditing: false, allowAdding: false }}
        width="auto"
        allowFiltering
        rowSelected={rowSelected}
      >
        <ColumnsDirective>
          <ColumnDirective field='repoId' width='100' />
          <ColumnDirective field='repoName' width='100' />
          <ColumnDirective field='repoUrl' width='100' />
          {/* <ColumnDirective field='assignedUsers' width='100' /> */}

        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, Selection, Edit, Sort, CommandColumn, Filter]} />
      </GridComponent>


      <div>
        <Dialog
          open={addModalOpen}
          keepMounted
          // fullScreen
          onClose={handleAddModalClose}
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description" component="form">
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    form
                    id="outlined-disabled"
                    label="Repo Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    form
                    id="outlined-password-input"
                    label="Repo Url"
                    multiline
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddNewGitRepo}>Add new repo</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={editModalOpen}
          keepMounted
          onClose={handleEditModalClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  form
                  id="outlined-disabled"
                  label="Project Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  form
                  id="outlined-password-input"
                  label="url"
                  multiline
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleReport}>Get Git Commit Report</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={reportModalOpen}
          keepMounted
          onClose={handleReportModalOpen}
          aria-describedby="alert-dialog-slide-description"
          scroll='paper'
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <DialogTitle id="scroll-dialog-title">Git report</DialogTitle>
          <DialogContent>
          <DialogContentText>

          </DialogContentText>
              {report}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReportClose}>Close</Button>
            {/* <Button onClick={handleReport}>Get Git Commit Report</Button> */}
          </DialogActions>
        </Dialog>
      </div>

      <div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openProgressBar}
        onClick={handleProgressBarClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      </div>
    </div>
  );
};

export default GitReport;
