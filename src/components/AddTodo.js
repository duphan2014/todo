import React from "react";

class AddToDo extends React.Component{
    state = {
        title: ""
    }

    onInputChange = e => {
        this.setState({
            title: e.target.value
        })
    }

    addTodo = e => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({
            title:""
        })
    }

    render() {
        return (
            <form className="form-container" onSubmit={this.addTodo}>
                <input 
                    type="text" 
                    placeholder="Add Todo..." 
                    className="input-text" 
                    value={this.state.title}
                    onChange={this.onInputChange}
                />
                <input type="submit" value="submit" className="input-submit"/>
            </form>
        )
    }
}
export default AddToDo;