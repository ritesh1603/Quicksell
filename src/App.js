import React, { useEffect, useState } from 'react';
import { GlobalStateProvider, useGlobalState } from './GlobalStateProvider'; 
import DisplayOptions from './components/DisplayOptions'
import KanbanDashboard from './components/KanbanDashboard';
import './App.css'

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    }
    fetchData();
  }, []);

  return (
    <GlobalStateProvider>
      <div className="App">
        <DisplayOptions />
        <KanbanDashboard tickets={tickets} users={users} />
      </div>
    </GlobalStateProvider>
  );
}

export default App;

