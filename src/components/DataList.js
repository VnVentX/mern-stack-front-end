import React, { Component } from "react";

export default class DataList extends Component {
  render() {
    return (
      <>
        <ul>
          <li>
            {this.props.user.username}: {this.props.user.description}
          </li>
          <button onClick={this.props.onDelete}>Delete</button>
          <button onClick={this.props.onEdit}>Edit</button>
        </ul>
      </>
    );
  }
}
