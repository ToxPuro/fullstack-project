import React, { useState } from "react"
import * as dateFns from "date-fns"
import "../App.css"

const EventCalendar = ({ dates }) => {


  const [ month, setMonth ] = useState(new Date())
  return(
    <div className="calendar">
      <Header month={month} setMonth={setMonth}/>
      <Days month={month}/>
      <Cells month={month} dates={dates}/>
      <ul>{dates}</ul>
    </div>
  )
}

const Header = ({ month, setMonth }) => {
  const dateFormat = "MMMM YYYYY"

  const nextMonth = () => {
    setMonth(dateFns.addMonths(month, 1))
  }

  const prevMonth = () => {
    setMonth(dateFns.subMonths(month,1))
  }

  return (
    <div className="header row flex-middle">
      <div className="col col-start">
        <div className="icon" onClick={prevMonth}>
          chevron_left
        </div>
      </div>
      <div className="col col-center">
        <span>
          {dateFns.format(month, dateFormat)}
        </span>
      </div>
      <div className="col col-end" onClick={nextMonth}>
        <div className="icon">chevron_right</div>
      </div>
    </div>
  )

}

const Days = ({ month }) => {

  let startDate = dateFns.startOfWeek(month)

  const shortWeekDaysArray = Array.from(Array(7)).map((e, i) => (<div className="col col-center" key={i}>
    {dateFns.format(dateFns.addDays(startDate, i), "EEEEEE")}
  </div> ))

  return(
    <div className="days row">{shortWeekDaysArray}</div>
  )
}

const Cells = ({ month, dates }) => {

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
        <CalendarDate formattedDate = {formattedDate} day={cloneDay} monthStart={monthStart} dates={dates}/>
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

const CalendarDate = ({ formattedDate, day, monthStart, dates }) => {
  if(dates.includes(dateFns.format(day, "DDD"))){
    return(
      <div
        className={"col cell clicked"}
        key={day}
      >
        <span className="number">{formattedDate}</span>
        <span className="bg">{formattedDate}</span>
      </div>
    )
  }

  return(
    <div
      className={`col cell ${!dateFns.isSameMonth(day, monthStart) ? "disabled" : ""}`}
      key={day}
    >
      <span className="number">{formattedDate}</span>
      <span className="bg">{formattedDate}</span>
    </div>
  )
}

export default EventCalendar