import React from 'react'
import axios from 'axios'
import {key} from './config/keys'

class TicketForm extends React.Component{
    constructor(){
        super()
        //state needs to maintained - single source
        this.state = {
            name: "",
            department: "",
            priority: "",
            message: "",
            notice: ""
        }
    }
    
    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        const formData = {
            name: this.state.name,
            department: this.state.department,
            priority: this.state.priority,
            message: this.state.message
        }

        axios.post(`http://dct-api-data.herokuapp.com/tickets?api_key=${key}`, formData)
            .then(response => {

                this.props.handleSubmit(response.data)
                
                this.setState(() => ({
                    name: '',
                    department: '',
                    priority: '',
                    message: '',
                    notice: 'Successfully submitted the ticket.'
                }))
                setTimeout(() => {
                    this.setState(() => ({
                        notice: ''
                    }))
                },2000)
            })
            .catch(err => console.log(err))
    }

    render(){

        return (

            <div>

                {this.state.notice && <p className="text-success">{ this.state.notice }</p>}

                <form className="ticketForm" onSubmit={ this.handleSubmit }>
                    <input className="form-control mb-3" type="text" name="name" value={ this.state.name } onChange={ this.handleChange } placeholder="Enter Name" />

                    <select className="form-control mb-3" name="department" value={ this.state.department } onChange={ this.handleChange }>
                        <option value="">Select Department</option>
                        <option value="Technical">Technical</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                    </select>

                    <select className="form-control mb-3" name="priority" value={ this.state.priority } onChange={ this.handleChange }>
                        <option value="">Select Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    
                    <textarea rows="5" className="form-control mb-3" name="message" value={ this.state.message } onChange={ this.handleChange } placeholder="Enter Message"></textarea>
                    
                    <div className="custom">
                        <button className="btn btn-primary" type="submit">Add Ticket</button>
                    </div>
                </form>

            </div>

        )
    }
}

export default TicketForm