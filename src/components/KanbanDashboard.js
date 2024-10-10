import React from 'react';
import { useGlobalState } from '../GlobalStateProvider';
import Card from './Card';
import { ReactComponent as NoPriorityLogo } from '../assets/No-priority.svg';
import { ReactComponent as LowPriorityLogo } from '../assets/Img - Low Priority.svg';
import { ReactComponent as MediumPriorityLogo } from '../assets/Img - Medium Priority.svg';
import { ReactComponent as HighLogo } from '../assets/Img - High Priority.svg';
import { ReactComponent as UrgentLogo } from '../assets/SVG - Urgent Priority grey.svg';
import { ReactComponent as BacklogLogo } from '../assets/Backlog.svg';
import { ReactComponent as CancelledLogo } from '../assets/Cancelled.svg';
import { ReactComponent as DoneLogo } from '../assets/Done.svg';
import { ReactComponent as InprogressLogo } from '../assets/in-progress.svg';
import { ReactComponent as TodoLogo } from '../assets/To-do.svg';

const KanbanDashboard = ({ tickets, users }) => {
  const { state } = useGlobalState();

  const priorityname = ["No priority","Low priority", "Medium priority", "High Priority", "Urgent Priority"];

  const getUserById = (userId) => users.find(user => user.id === userId);

  const groupedTickets = tickets.reduce((acc, ticket) => {
    const groupKey = state.groupBy === 'user' ? ticket.userId :
                     state.groupBy === 'priority' ? ticket.priority : ticket.status;
    
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(ticket);
    return acc;
  }, {});


  Object.keys(groupedTickets).forEach(group => {
    groupedTickets[group] = groupedTickets[group].sort((a, b) => {
      if (state.sortBy === 'priority') {
        return b.priority - a.priority;
      } else if (state.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  });

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((groupKey) => (
        <div key={groupKey} className="kanban-column">
          <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
          <div>
          {
        state.groupBy==='priority' ?
       (
        (groupKey==="1" ? <LowPriorityLogo/>
       :
       (
        groupKey==="2" ? <MediumPriorityLogo/>
        :
        (
          groupKey==="3" ? <HighLogo/>
          :
          (
            groupKey==="4" ? <UrgentLogo/>
          :
          <NoPriorityLogo/>
          )
        )
       ))
      )
       :
       ( state.groupBy==='status' &&
          (groupKey==="Todo" ? <TodoLogo/>
          :
          (
            groupKey==="In progress" ? <InprogressLogo/>
            :
            (
              groupKey==="Backlog" ? <BacklogLogo/>
              :
              (
                groupKey==="Done" ? <DoneLogo/>
                :
                (
                  <CancelledLogo/> 
                )
              )
            )
          ))
        )
        }  
       </div>
          <h2 >
        {state.groupBy === 'user' ? getUserById(groupKey).name : 
          (
            state.groupBy === 'priority' ?
            ( 
              groupKey === '0' ?priorityname.at(0)
              :
              (
                groupKey === '1' ? priorityname.at(1)
              :
              (
                groupKey === '2' ? priorityname.at(2)
                :
                (
                  groupKey === '3' ? priorityname.at(3)
                  :
                 priorityname.at(4) 
                )
              )
              )
            )
            : 
            groupKey
          )
        }
        </h2><div style={{fontSize:"20px"}}>{groupedTickets[groupKey].length}</div>
        
        </div>
          <div className="ticket-list">
            {groupedTickets[groupKey].map(ticket => (
              <Card key={ticket.id} ticket={ticket} user={getUserById(ticket.userId)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanDashboard;
