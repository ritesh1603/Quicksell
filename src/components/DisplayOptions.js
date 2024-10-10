import React , {useState } from 'react';
import { useGlobalState } from '../GlobalStateProvider';
import { ReactComponent as DisplayLogo } from '../assets/Display.svg';
import { ReactComponent as DownArrow } from '../assets/down.svg';

const DisplayOptions = () => {
  const { state, dispatch } = useGlobalState();
  const [isVisible, setIsVisible] = useState(false); 

  const handleGroupByChange = (event) => {
    dispatch({ type: 'SET_GROUP_BY', payload: event.target.value });
  };

  const togglevisibilty = () => {setIsVisible(!isVisible);}

  
  const handleSortByChange = (event) => {
    dispatch({ type: 'SET_SORT_BY', payload: event.target.value });
  };

  return (
    <div className="display-options">
      <div className="display-button">
      <DisplayLogo/>
      <h3>Display</h3>
      <DownArrow style={{cursor: "pointer"}} onClick={togglevisibilty}></DownArrow>  
      </div>

      { isVisible && (
        <div className="display-dropdown">
        <div style={{display:"flex",flexDirection:"row"}}>
        <h3>Group By:</h3>
        <select value={state.groupBy} onChange={handleGroupByChange}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
        </div>
        <div style={{display:"flex",flexDirection:"row"}}>
        <h3>Sort By:</h3>
        <select value={state.sortBy} onChange={handleSortByChange}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select> 
        </div>
      </div>
      )}
        </div>
  );
};

export default DisplayOptions;
