import React, { Component } from "react";
import axios from "axios";
import DataList from "./components/DataList";
import InputForm from "./components/InputForm";
import "./App.css";

export default class App extends Component {
  state = {
    user: [],
    username: "",
    description: "",
    id: "",
    isEdditing: false
  };

  retrieveData = async () => {
    await axios
      .get("https://anhtt-mern-stack-server.herokuapp.com/user/")
      .then(res => {
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
      .delete("https://anhtt-mern-stack-server.herokuapp.com/user/" + id)
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
      id,
      isEdditing: true
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
    if (this.state.isEdditing) {
      const updateValue = {
        username: this.state.username,
        description: this.state.description
      };
      axios
        .patch(
          "https://anhtt-mern-stack-server.herokuapp.com/user/" + detail.id,
          updateValue
        )
        .then(res => {
          console.log(res);
          console.log(`Edited user ${updateValue.username}`);
          this.retrieveData();
        });
      this.setState({
        username: "",
        description: "",
        id: "",
        isEdditing: false
      });
    } else {
      axios
        .post("https://anhtt-mern-stack-server.herokuapp.com/user/", detail)
        .then(res => {
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

  userList = () => {
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
  };

  render() {
    return (
      <div>
        {this.userList().length > 0 ? (
          this.userList()
        ) : (
          <h1>This List is currently empty!!!</h1>
        )}
        <InputForm
          delete={this.delete}
          handleUsernameChange={this.handleUsernameChange}
          username={this.state.username}
          handleDescriptionChange={this.handleDescriptionChange}
          description={this.state.description}
          onSubmit={this.onSubmit}
          isEdditing={this.state.isEdditing}
        />
      </div>
    );
  }
}
