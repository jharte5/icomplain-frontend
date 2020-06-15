import React, { Component } from "react";
import Axios from "../Services/Axios";

export const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS_SIGNED_IN":
      return {
        ...state,
        isAuth: {
          user: action.payload,
          auth: true,
        },
      };
    case "SUCCESS_SIGNED_OUT":
      return {
        ...state,
        isAuth: {
          user: null,
          auth: false,
        },
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    isAuth: {
      user: null,
      auth: false,
    },
    dispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
  };

  getUser = async () => {
    const token = localStorage.getItem("token");
    const result = await Axios.get("/api/users/get-user/"+token);
    this.setState({
      isAuth: {
        user: result.data,
        auth: true
      }
    })
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
