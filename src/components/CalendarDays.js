import React from "react"
import "../App.css"
import * as dateFns from "date-fns"
const CalendarDays = ({ month }) => {

  let startDate = dateFns.startOfWeek(month)

  const shortWeekDaysArray = Array.from(Array(7)).map((e, i) => (<div className="col col-center" key={i}>
    {dateFns.format(dateFns.addDays(startDate, i), "EEEEEE")}
  </div> ))

  return(
    <div className="days row">{shortWeekDaysArray}</div>
  )
}

export default CalendarDays