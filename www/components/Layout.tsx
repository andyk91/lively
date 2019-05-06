import React from "react";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import { Image, Button } from "rebass";
import { deleteSessionFrontend } from "../lib/session";
import Login from "./Login";
import Drawer from "./Drawer";
import ClassList from "./ClassList";
import { useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";

const HeaderStyles = styled.header`
  display: flex;
  justify-content: space-around;
  height: 3rem;
  padding: 1rem;
  box-shadow: 0 0.25rem 0.25rem grey;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  align-items: center;
  z-index: 10;
`;

const Logo = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-70%, -40%);
  left: 50%;
  z-index: 11;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-evenly;
`;

interface Props {
  hasSession: boolean;
}

const Layout: React.FunctionComponent<Props> = props => {
  const logout = useMutation(gql`
    mutation LogOutMute {
      logout {
        id
      }
    }
  `);

  let child;
  if (props.hasSession) {
    child = (
      <div>
        <HeaderStyles>
          <ButtonsContainer>
            <Drawer>
              <ClassList />
            </Drawer>
          </ButtonsContainer>
          <Logo>
            <Link href="/">
              <img height="48" src="/static/lively@2x.png" alt="lively" />
            </Link>
          </Logo>
          <ButtonsContainer>
            <Link href="/settings">
              <button>Settings</button>
            </Link>
            <Button
              onClick={() => {
                logout().finally(() => {
                  deleteSessionFrontend();
                  window.location.reload(true);
                });
              }}
            >
              Logout
            </Button>
          </ButtonsContainer>
        </HeaderStyles>

        <main style={{ paddingTop: "5rem" }}>{props.children}</main>
      </div>
    );
  } else {
    child = <Login />;
  }

  return (
    <>
      <Head>
        <title>Lively Classes</title>
      </Head>
      {child}
    </>
  );
};

export default Layout;
