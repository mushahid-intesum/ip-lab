import React from 'react';
import { Header, Modal } from '../components';
import { useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: transparent;
  color: blue;
  margin-right: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const GitReport = () => {
  const [numCommits, setNumCommits] = useState(null);
  const [numReports, setNumReports] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

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

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="GitReport" title="Commit/Report Summary" />

      <div>
        <StyledButton onClick={handleCommitsClick}>Get Commits</StyledButton>
        {numCommits && <p>You want to retrieve {numCommits} commits.</p>}
      </div>
      <div>
        <StyledButton onClick={handleReportsClick}>Get Reports</StyledButton>
        {numReports && <p>You want to retrieve {numReports} reports.</p>}
      </div>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2>Please enter the number of {modalType}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const value = e.target.elements.value.value;
              handleModalSubmit(value);
            }}
          >
            <label style={{ display: "block", marginBottom: "15px" }}>
              <input
                type="number"
                name="value"
                style={{
                  backgroundColor: "#f7f7f7",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "8px",
                  fontSize: "25px",
                  color: "#333",
                }}
              />
            </label>
            <div className="flex justify-between" style={{ marginTop: "10px" }}>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                style={{ marginLeft: "10px" }}
              >
                Close
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default GitReport;
