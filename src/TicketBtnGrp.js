import React from 'react'

const TicketBtnGrp = (props) => {
    return (
        <div className="filterBtn custom">
            <button className="btn btn-primary" onClick={() => {
                props.handleClick('All')
            }}> All </button>
            <button className="btn btn-info" onClick={() => {
                props.handleClick('High')
            }}> High </button>
            <button className="btn btn-dark" onClick={() => {
                props.handleClick('Medium')
            }}> Medium </button>
            <button className="btn btn-secondary" onClick={() => {
                props.handleClick('Low')
            }}> Low </button>
        </div>
    )
}

export default TicketBtnGrp