import React, {  useState, useEffect } from "react"
import * as dateFns from "date-fns"
import "../App.css"
import CalendarHeader from "./CalendarHeader"
import CalendarDays from "./CalendarDays"
const EventCalendar = ({ dates, votes, setVotes, currentVote, setCurrentVote }) => {
  const [ month, setMonth ] = useState(new Date())
  return(
    <div className="calendar">
      <CalendarHeader month={month} setMonth={setMonth}/>
      <CalendarDays month={month}/>
      <Cells month={month} dates={dates} votes={votes} setVotes={setVotes} currentVote={currentVote} setCurrentVote={setCurrentVote}/>
    </div>
  )
}

const Cells = ({ month, dates, setVotes, votes, currentVote, setCurrentVote }) => {

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
        <CalendarDate key={cloneDay} formattedDate = {formattedDate} day={cloneDay} monthStart={monthStart} dates={dates} setVotes={setVotes} votes={votes} currentVote={currentVote} setCurrentVote={setCurrentVote}/>
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


const CalendarDate = ({ formattedDate, day, monthStart, dates, votes, setVotes, currentVote, setCurrentVote }) => {
  const checkDates = dates.map(date => dateFns.format(date, "d"))
  let style = ""
  if(checkDates.includes(dateFns.format(day, "d"))){
    return <VoteDate setVotes={setVotes} votes={votes} day={day} formattedDate = {formattedDate} currentVote={currentVote} setCurrentVote={setCurrentVote}/>
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

const VoteDate = ({ day, formattedDate, votes, setVotes, currentVote, setCurrentVote }) => {
  const [vote, setVote] = useState(null)
  const cloneVotes = [...votes]
  const dayIndex = cloneVotes.findIndex(vote => dateFns.format(vote.date, "DDD") === dateFns.format(day, "DDD"))
  useEffect(() => {
    if(cloneVotes[dayIndex]){
      setVote(cloneVotes[dayIndex].vote)
    }
  }, [dayIndex])
  const onClick = () => {
    console.log(currentVote)
    let result = currentVote
    if(result>votes.length){
      result = ""
    }
    setVote(result)
    cloneVotes[dayIndex].vote = result
    setVotes(cloneVotes)
    if(result===""){
      setCurrentVote(1)
    } else{
      setCurrentVote(result+1)
    }

  }
  return(
    <div onClick={() => onClick()}
      id={`dates-${formattedDate}`}
      className="col cell"
      key={day}>
      <span className="number">{formattedDate}</span>
      <span className="bg">{formattedDate}</span>
      {vote}
    </div>
  )
}


export default EventCalendar