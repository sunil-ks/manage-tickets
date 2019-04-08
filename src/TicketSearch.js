import React from 'react'

class TicketSearch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            search: ""
        }
    }
    
    handleChange = (e) => {
        const search = e.target.value
        this.setState(() => ({ search }))
        this.props.handleSearch(search)
    }

    render(){

        return (
            <div>
                <form className="searchForm">                    
                    <input className="form-control" type="text" placeholder="Search here" value={this.state.search} onChange={this.handleChange} />
                </form>
            </div>

        )
    }
}

export default TicketSearch