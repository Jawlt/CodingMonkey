import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useThemeContext } from '../hooks/useTheme';
import DataTable from 'react-data-table-component';

const Leaderboard: React.FC = () => {
  const { systemTheme } = useThemeContext();

  // Columns for the table
  const columns = [
    {
      name: 'Name',
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: 'Score',
      selector: (row: any) => row.score,
      sortable: true,
      id: 'score',
    },
    {
      name: 'Time',
      selector: (row: any) => row.time,
      sortable: true,
    },
    {
      name: 'Accuracy',
      selector: (row: any) => row.accuracy,
      sortable: true,
    },
    {
      name: 'WPM',
      selector: (row: any) => row.wpm,
      sortable: true,
    },
  ];

  const customStyles = {
    header: {
      style: {
        backgroundColor: systemTheme.background.primary,
        color: systemTheme.text.title,
      },
    },
    rows: {
      style: {
        backgroundColor: systemTheme.background.primary,
        color: systemTheme.text.primary,
      },
    },
    headCells: {
      style: {
        backgroundColor: systemTheme.background.secondary,
        color: systemTheme.text.title,
      },
    },
    pagination: {
      style: {
        backgroundColor: systemTheme.background.primary,
        color: systemTheme.text.primary,
      },
    },
  };


  // Example data
  const data = [
    { name: 'Alice', score: 150, time: '2:00', accuracy: '95%', wpm: 80 },
    { name: 'Bob', score: 140, time: '2:15', accuracy: '90%', wpm: 75 },
    { name: 'Charlie', score: 180, time: '1:50', accuracy: '97%', wpm: 85 },
  ];

  return (
    <div
      className="flex flex-col min-h-screen w-full px-4 lg:px-20"
      style={{
        backgroundColor: systemTheme.background.primary,
        color: systemTheme.text.primary,
      }}
    >
      <Header />
      <div className="w-full max-w-6xl self-center">
        <DataTable
          title="Top Bananas"
          columns={columns}
          data={data}
          defaultSortFieldId="score"
          defaultSortAsc={false}
          pagination
          highlightOnHover
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default Leaderboard;
