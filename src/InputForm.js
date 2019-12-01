import React, { Component } from "react";

export default class InputForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={this.props.username}
            onChange={this.props.handleUsernameChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={this.props.description}
            onChange={this.props.handleDescriptionChange}
          />
        </label>
        <input
          type="text"
          value={this.props.id}
          readOnly={true}
          hidden={true}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}
