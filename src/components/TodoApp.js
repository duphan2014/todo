import React from "react";
import Header from "./layout/Header";
import Todos from "./Todos";
import AddToDo from "./AddTodo";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

class TodoApp extends React.Component {
    state = {
        todos: [
            // {
            //     id: uuidv4(),
            //     title: "Setup development environment",
            //     completed: true
            // },
            // {
            //     id: uuidv4(),
            //     title: "Develop website and add content",
            //     completed: false,
            // },
            // {
            //     id: uuidv4(),
            //     title: "Deploy to live server",
            //     completed: false
            // }
        ]
    }

    handleCheckboxChange = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        });
    };

    deleteTodo = id => { 
        console.log("deleted", id);
        this.setState({
            todos: [
                ...this.state.todos.filter(todo => {
                    return todo.id !== id;
                })
            ]
        })
    };

    addTodo = title => {
        const newTodo = {
            id: uuidv4(),
            title: title,
            completed: false
        };
        this.setState({
            todos: [...this.state.todos, newTodo]
        });
    }

    // addTodo = title => {
    //     const todoData = {
    //         title: title,
    //         completed: false
    //     }
    //     axios.post("https://jsonplaceholder.typicode.com/todos", todoData).then(response => {
    //         console.log(response.data);
    //         this.setState({
    //             todos: [...this.state.todos, response.data]
    //         })
    //     });
    // };

    // deleteTodo = id => {
    //     axios.delete('https://jsonplaceholder.typicode.com/todos/${id}')
    //     .then(response => this.setState({
    //         todos: [
    //             ...this.state.todos.filter(todo => {
    //                 return todo.id !== id;
    //             })
    //         ]
    //     }));
    // };

    componentDidMount(){
        const config = {
            params: {
                _limit: 5
            }
        }
        axios.get("https://jsonplaceholder.typicode.com/todos", config).then(response => this.setState({todos: response.data}));
    }

    render() {
        return (
            <div className="container">
                <Header/>
                <AddToDo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos} 
                        handleChange={this.handleCheckboxChange}
                        deleteTodo={this.deleteTodo}/>
            </div>
        )
    }
}

export default TodoApp;