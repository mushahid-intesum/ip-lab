import React from 'react'
import { Header } from '../components';

const GitReport = () => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="GitReport" title= "Report Summary" />
        <p className="font text-lg text-black">
            This portion will contain a summary of the last few git commits.
        </p>
    </div>
  )
}

export default GitReport