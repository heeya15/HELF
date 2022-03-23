import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import styled from "styled-components";
import './MyDiet.css';



const openModal = (id) => {
}

const clickDay = () => {
    alert("clicked!");
}

function MyDiet(props) {
    return (
        <div className="MyDiet">
            <div>
                <FullCalendar
                    className="calendar"
                    headerToolbar={{
                        start: 'today',
                        center: 'title',
                        end: 'prev,next',
                    }}
                    height='80vh'
                    plugins={[ dayGridPlugin ]}
                    initialView = "dayGridMonth"
                    // eventClick = {(info) => {
                    //     openModal(info.event.id)
                    // }}
                    
                />
                <AddBtn>
                    <Fab color="primary" aria-label="add" variant="extended" onClick = {() => {
                        props.history.push('/MyDietRegister')}}>
                    <AddIcon /><Word>일정추가</Word>
                    </Fab>
                </AddBtn>
            </div>
        </div>
    );
}

const AddBtn = styled.div`
    position: fixed;
    right: 10px;
    bottom: 100px;
    z-index: 10;
`

const Word = styled.span`
    @media (max-width:425px){
    display: none
    }
`


export default MyDiet;