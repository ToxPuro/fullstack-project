import React, {  useState } from "react"
import * as dateFns from "date-fns"
import "../App.css"
import CalendarHeader from "./CalendarHeader"
import CalendarDays from "./CalendarDays"
const EventCalendar = ({ dates, votes, setVotes }) => {
  console.log(dates)
  const [ month, setMonth ] = useState(new Date())
  return(
    <div className="calendar">
      <CalendarHeader month={month} setMonth={setMonth}/>
      <CalendarDays month={month}/>
      <Cells month={month} dates={dates} votes={votes} setVotes={setVotes}/>
    </div>
  )
}

const Cells = ({ month, dates, setVotes, votes }) => {

  const monthStart = dateFns.startOfMonth(month)
  const monthEnd = dateFns.endOfMonth(monthStart)
  const startDate = dateFns.startOfWeek(monthStart)
  const endDate = dateFns.endOfWeek(monthEnd)

  const dateFormat = "d"
  const rows = []

  let days = []
  let day = startDate
  let formattedDate = ""

  while(day <= endDate){
    for(let i = 0; i<7; i++){
      formattedDate = dateFns.format(day, dateFormat)
      const cloneDay = day
      days.push(
        <CalendarDate key={cloneDay} formattedDate = {formattedDate} day={cloneDay} monthStart={monthStart} dates={dates} setVotes={setVotes} votes={votes}/>
      )
      day = dateFns.addDays(day, 1)
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    )
    days=[]
  }

  return(
    <div className="body">{rows}</div>
  )

}


const CalendarDate = ({ formattedDate, day, monthStart, dates, votes, setVotes }) => {
  console.log(votes, setVotes)
  const checkDates = dates.map(date => dateFns.format(date, "d"))
  let style = ""
  if(checkDates.includes(dateFns.format(day, "d"))){
    style="green"
  }
  if(!dateFns.isSameMonth(day, monthStart)){
    style="disabled"
  }
  return(
    <div
      className={`col cell ${style}`}
      key={day}
    >
      <span className="number">{formattedDate}</span>
      <span className="bg">{formattedDate}</span>
    </div>
  )
}

export default EventCalendar