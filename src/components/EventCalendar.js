import React, { useEffect, useState } from "react"
import * as dateFns from "date-fns"
import "../App.css"

const EventCalendar = ({ dates, setVotes, votes }) => {


  const [ month, setMonth ] = useState(new Date())
  return(
    <div className="calendar">
      <Header month={month} setMonth={setMonth}/>
      <Days month={month}/>
      <Cells month={month} dates={dates} setVotes={setVotes} votes={votes}/>
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

const ChoiceDate = ({ day, formattedDate, votes, setVotes }) => {
  const [vote, setVote] = useState("")
  const cloneVotes = [...votes]
  const dayIndex = cloneVotes.findIndex(vote => vote.date === dateFns.format(day, "DDD"))
  useEffect(() => {
    if(cloneVotes[dayIndex]){
      setVote(cloneVotes[dayIndex].vote)
    }
  }, [dayIndex])
  const onClick = (vote) => {
    if(vote==="blue"){
      setVote("green")
      cloneVotes[dayIndex].vote = "green"
      console.log(day)
      console.log(dayIndex)
      console.log(cloneVotes)
      setVotes(cloneVotes)

    }
    else if(vote === "green"){
      setVote("red")
      cloneVotes[dayIndex].vote = "red"
      console.log(day)
      console.log(dayIndex)
      console.log(cloneVotes)
      setVotes(cloneVotes)
    }
    else{
      setVote("blue")
      cloneVotes[dayIndex].vote = "blue"
      console.log(day)
      console.log(dayIndex)
      console.log(cloneVotes)
      setVotes(cloneVotes)
    }
  }
  console.log(`dates-${formattedDate}`)
  return(
    <div onClick={() => onClick(vote)}
      id={`dates-${formattedDate}`}
      className={`col cell ${vote}`}
      key={day}>
      <span className="number">{formattedDate}</span>
      <span className="bg">{formattedDate}</span>
    </div>
  )
}

const CalendarDate = ({ formattedDate, day, monthStart, dates, setVotes, votes }) => {
  if(dates.includes(dateFns.format(day, "DDD"))){
    return(
      <ChoiceDate setVotes={setVotes} votes={votes} day={day} formattedDate = {formattedDate}/>

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