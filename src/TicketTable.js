import React from 'react'

const TicketTable = (props) => {
    return (
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-stripped">
          <thead className="thead-dark">
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Department</th>
              <th>Priority</th>
              <th>Message</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              props.tickets.map(ticket => {
                return (
                  <tr key={ ticket.ticket_code }>
                    <td>{ ticket.ticket_code }</td>
                    <td>{ ticket.name }</td>
                    <td>{ ticket.department }</td>
                    <td>{ ticket.priority }</td>
                    <td>{ ticket.message }</td>
                    <td className="text-center">
                      <div className="custom-control custom-switch">
                        <input id={ticket.ticket_code} className="custom-control-input" type="checkbox" checked={ ticket.status === 'completed' ? true : false } 
                          onChange={() => props.handleChecked(ticket)} />
                          <label className="custom-control-label" htmlFor={ticket.ticket_code}></label>
                      </div>                      
                    </td>
                    <td className="text-center">
                      <button className="btn delete" onClick={() => {
                        if(window.confirm("Are you sure")){
                          props.handleRemove(ticket)
                        }
                      }}> Delete
                      {/* <i className="fas fa-trash-alt"></i> */}
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
}

export default TicketTable