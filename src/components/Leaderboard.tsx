import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useThemeContext } from '../hooks/useTheme';
import DataTable from 'react-data-table-component';

const Leaderboard: React.FC = () => {
  const { systemTheme } = useThemeContext();

  // Columns for the table
  const columns = [
    {
      name: 'Rank',
      selector: (row: any) => row.rank,
      sortable: true,
    },
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
    { rank: 1, name: 'Alice', score: 150, time: '2:00', accuracy: '95%', wpm: 80 },
    { rank: 2, name: 'Bob', score: 140, time: '2:15', accuracy: '90%', wpm: 75 },
    { rank: 3, name: 'Charlie', score: 180, time: '1:50', accuracy: '97%', wpm: 85 },
  ];

  return (
    <div
      className="min-h-screen w-full px-60"
      style={{
        backgroundColor: systemTheme.background.primary,
        color: systemTheme.text.primary,
      }}
    >
      <Header />
      <div className="p-1 px-4" 
      >
      <DataTable
        title="Top Monkies"
        columns={columns}
        data={data}
        defaultSortFieldId="score" // Sort by 'score' column by default
        defaultSortAsc={false} // Descending order (highest score first)
        pagination
        highlightOnHover
        customStyles = {customStyles} 
      />
      </div>
    </div>
  );
};

export default Leaderboard;
