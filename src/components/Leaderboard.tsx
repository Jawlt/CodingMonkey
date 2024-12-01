import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useThemeContext } from '../hooks/useTheme';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const Leaderboard: React.FC = () => {
  const { systemTheme } = useThemeContext();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

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
  
  // Fetch data
  async function fetchData() {
    try {
      const url = 'http://localhost:3000/api/allUsers/';
      const res = await axios.get(url);

      // Map fetched data to the required structure
      const transformedData = res.data.map((item: any) => ({
        name: item.userId || 'Unknown', // Fallback for missing names
        score: item.topScore.score || item.topScore || 0, // Support both formats
        time: (item.topScore.timing)/1000 || 'N/A', // Default to 'N/A' if not provided
        accuracy: item.topScore.accuracy
          ? `${item.topScore.accuracy.toFixed(2)}%`
          : 'N/A',
        wpm: item.topScore.wpm || 'N/A',
      }));

      setData(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  

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
