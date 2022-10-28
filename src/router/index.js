import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import _ from "lodash";

import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import CustomRoutes from "./CustomRoutes";

const httpLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // uri: process.env.REACT_APP_GRAPHQL_URI,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function Routers(props) {
  const { user, paymentPage } = props;
  const repeatedProps = {
    user,
    paymentPage: false,
    exact: true,
    forAdminOnly: false,
  };

  return (
    <Router>
      <ApolloProvider client={client}>
        <div>
          <ReactNotifications />

          <CustomRoutes {...props} />
        </div>
      </ApolloProvider>
    </Router>
  );
}

const mapStateToProps = ({ user }) => ({
  user,
});

const actions = {};

export default connect(mapStateToProps, actions)(Routers);
