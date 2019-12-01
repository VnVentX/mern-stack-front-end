import React, { Component } from "react";
import axios from "axios";
import DataList from "./DataList";
import InputForm from "./InputForm";
import "./App.css";

const LOCATION = window.location.href;

export default class App extends Component {
  state = {
    user: [],
    username: "",
    description: "",
    id: ""
  };

  retrieveData = async () => {
    await axios.get(LOCATION + "user/").then(res => {
      const user = res.data;
      this.setState({ user });
    });
  };

  componentDidMount() {
    this.retrieveData();
  }

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  delete(currentUser) {
    let id = currentUser._id;
    let username = currentUser.username;
    axios
      .delete("http://localhost:4000/user/" + id)
      .then(res => {
        this.retrieveData();
        console.log("Deleted user: " + username);
      })
      .catch(err => console.log(err));
  }

  edit(currentUser) {
    let username = currentUser.username;
    let description = currentUser.description;
    let id = currentUser._id;
    this.setState({
      username,
      description,
      id
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const detail = {
      username: this.state.username,
      description: this.state.description,
      id: this.state.id
    };
    console.log(detail);
    if (detail.id) {
      const updateValue = {
        username: this.state.username,
        description: this.state.description
      };
      axios
        .patch("http://localhost:4000/user/" + detail.id, updateValue)
        .then(res => {
          console.log(res);
          console.log(`Edited user ${updateValue.username}`);
          this.retrieveData();
        });
      this.setState({
        username: "",
        description: "",
        id: ""
      });
    } else {
      axios.post("http://localhost:4000/user/", detail).then(res => {
        console.log(res);
        console.log(`Updated user ${detail.username}`);
        this.retrieveData();
      });
      this.setState({
        username: "",
        description: ""
      });
    }
  };

  todoList() {
    return this.state.user.map((currentUser, i) => {
      return (
        <DataList
          retrieveData={this.retrieveData}
          user={currentUser}
          key={i}
          onDelete={() => {
            this.delete(currentUser);
          }}
          onEdit={() => {
            this.edit(currentUser);
          }}
        />
      );
    });
  }

  render() {
    return (
      <div>
        {this.todoList().length > 0 ? (
          this.todoList()
        ) : (
          <h1>This List is currently empty!!!</h1>
        )}
        <InputForm
          delete={this.delete}
          handleUsernameChange={this.handleUsernameChange}
          username={this.state.username}
          handleDescriptionChange={this.handleDescriptionChange}
          description={this.state.description}
          id={this.state.id}
          onSubmit={this.onSubmit}
          idEdditing={this.state.isEdditing}
        />
      </div>
    );
  }
}
