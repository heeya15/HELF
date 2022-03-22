import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function MyDiet() {
    return (
        <div className="MyDiet">
            <FullCalendar
                defaultView = "dayGridMonth"
                plugins={[ dayGridPlugin ]}
            />
        </div>
    );
}


export default MyDiet;