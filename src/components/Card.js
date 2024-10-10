import React from 'react';
import { useGlobalState } from '../GlobalStateProvider';
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

const Card = ({ ticket, user }) => {
  const { state, dispatch } = useGlobalState();
  
  return (
    <div className="ticket-card" data-priority={ticket.priority}>
      <div className="ticket-id">
        <div style={{fontWeight: 'bold', fontSize: '16px'}}>{ticket.id}</div>
        <div className="ticket-user">
          <div className="ticket-user-initials" data-tooltip={`${user.name} - ${user.available ? 'Available' : 'Unavailable'}`}>
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
      <div className="ticket-title">
        { state.groupBy!=='status' &&
          (ticket.status==="Todo" ? <TodoLogo/>
          :
          (
            ticket.status==="In progress" ? <InprogressLogo/>
            :
            (
              ticket.status==="Backlog" ? <BacklogLogo/>
              :
              (
                ticket.status==="Done" ? <DoneLogo/>
                :
                (
                  <CancelledLogo/> 
                )
              )
            )
          ))
        }
        <div>{ticket.title}</div>
        </div>
      <div className="ticket-icons">
       {
        state.groupBy!=='priority' &&
       (ticket.priority=="1" ? <LowPriorityLogo/>
       :
       (
        ticket.priority=="2" ? <MediumPriorityLogo/>
        :
        (
          ticket.priority=="3" ? <HighLogo/>
          :
          (
            ticket.priority=="4" ? <UrgentLogo/>
          :
          <NoPriorityLogo/>
          )
        )
       ))}  
        <div>{ticket.tag}</div>
      </div>
      
     
    </div>
  );
};

export default Card;
