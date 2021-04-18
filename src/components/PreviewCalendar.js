import React, { useState } from "react"
import * as dateFns from "date-fns"
import "../App.css"
import { useHistory } from "react-router-dom"

const PreviewCalendar = ({ events }) => {
  console.log(events)
  const dates = events.filter(event => event.status === "done").map(event => ({ date: event.finalDate, name: event.name, id: event.id }))
  console.log(dates)
  const [ month, setMonth ] = useState(new Date())
  return(
    <div className="calendar">
      <Header month={month} setMonth={setMonth}/>
      <Days month={month}/>
      <Cells month={month} dates={dates}/>
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
        <CalendarDate key={cloneDay} formattedDate = {formattedDate} day={cloneDay} monthStart={monthStart} dates={dates}/>
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
  const history = useHistory()
  const test = dateFns.format(day, "DDD")
  console.log(test)
  if(dates[0]){
    const secondTest = dateFns.format( new Date(dates[0].date), "DDD")
    console.log(secondTest)
  }
  const onClick = () => {
    if(event){
      history.push(`events/${event.id}`)
    }
  }
  const event = dates.find(date => dateFns.format( new Date(date.date), "DDD") === dateFns.format(day, "DDD"))
  return(
    <div
      onClick = {onClick}
      id={`dates-${formattedDate}`}
      className={`col cell ${!dateFns.isSameMonth(day, monthStart) ? "disabled" : ""}`}
      key={day}
    >
      <span className="number">{formattedDate}</span>
      <span className="bg">{formattedDate}</span>
      <div>
        {event ? event.name : null}
      </div>
    </div>
  )
}

export default PreviewCalendar