import React, { Component } from 'react'
import axios from 'axios'

import { key } from './config/keys'
import TicketTable from './TicketTable'
import TicketForm from './TicketForm'
import TicketSearch from './TicketSearch'
import TicketBtnGrp from './TicketBtnGrp'

class App extends Component {

  constructor(){
    super()
    this.state = {
      tickets: [],
      filteredTickets: []
    }
  }

  handleSubmit = (ticket) => {
    this.setState((prevState) => ({
      tickets: prevState.tickets.concat(ticket),
      filteredTickets: prevState.tickets.concat(ticket)
    }))
  }

  handleRemove = (ticket) => {
    axios.delete(`http://dct-api-data.herokuapp.com/tickets/${ticket.ticket_code}?api_key=${key}`)
      .then(response => {
        if(response.data.notice){
          this.setState((prevState) => ({
            tickets: prevState.tickets.filter(ticketItem => ticketItem.ticket_code !== ticket.ticket_code ),
            filteredTickets: prevState.tickets.filter(ticketItem => ticketItem.ticket_code !== ticket.ticket_code )
          }))
        }
      })
      .catch(err => console.log(err))
  }

  handleChecked = (ticket) => {
    axios.put(`http://dct-api-data.herokuapp.com/tickets/${ticket.ticket_code}?api_key=${key}`,{
      status: ticket.status == 'open' ? 'completed' : 'open'
    })
      .then(response => {
        console.log(response.data)
        this.setState((prevState) => ({
          tickets: prevState.tickets.map(ticketItem => {
            if(ticketItem.ticket_code === ticket.ticket_code){
              return Object.assign(ticketItem, response.data)
            }else{
              return ticketItem
            }
          }),
          filteredTickets: prevState.tickets.map(ticketItem => {
            if(ticketItem.ticket_code === ticket.ticket_code){
              return Object.assign(ticketItem, response.data)
            }else{
              return ticketItem
            }
          })
      }))
    })
    .catch(err => console.log(err))
  }

  handleSearch = (search) => {
    this.setState((prevState) => ({
      filteredTickets: prevState.tickets.filter(ticket => 
        (ticket.ticket_code.toLowerCase().includes(search.toLowerCase())) || 
        (ticket.name.toLowerCase().includes(search.toLowerCase())))
    }))
  }

  handleClick = (priority) => {
    if(priority === 'All'){
      this.setState((prevState) => ({
        filteredTickets: [].concat(prevState.tickets)
      }))
    }else{
      this.setState((prevState) => ({
        filteredTickets: prevState.tickets.filter(ticket => ticket.priority === priority)
      }))
    }
  }

  //before render
  componentWillMount(){
    
  }

  //after render
  componentDidMount(){
    axios.get(`http://dct-api-data.herokuapp.com/tickets?api_key=${key}`)
      .then(response => this.setState(() => ({ tickets: response.data, filteredTickets: response.data })))
      .catch(err => console.log(err))
  }

  render(){
    return (
      <div className="container">
        <h1 className="text-center">Tickets</h1>
        
        <div className="row">
          <div className="col-lg-8">
              <h2>Listing Tickets - 
                <small> showing {this.state.filteredTickets.length} of { this.state.tickets.length} </small>
              </h2>

            <div className="row mb-3">
              <div className="col-lg-6">

                  <TicketSearch handleSearch={this.handleSearch} />
                
              </div>
              <div className="col-lg-6"> 

                <TicketBtnGrp handleClick={this.handleClick} />  
                             
              </div>
            </div>
            
            { this.state.tickets.length === 0 ? ( <p>No tickets found</p> ):
            ( <div>
                <TicketTable handleChecked={this.handleChecked} handleRemove={this.handleRemove} tickets={this.state.filteredTickets} /> 
              </div>
            )}
          </div>
          <div className="col-lg-4">
            <h2>Add Ticket </h2>
            <TicketForm handleSubmit={this.handleSubmit}/>
          </div>
        </div>
        
      </div>
    )
  }
}

export default App
