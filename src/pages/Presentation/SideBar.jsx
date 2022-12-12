import * as React from "react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  };
}

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  &.active {
    color: #584491 !important;
    font-size: 1.4rem;
    font-weight: 600;
  }
`;

export const SideBar = (props) => {
  const items = [
    getItem(<StyledNavLink to="/presentations">My Presentations</StyledNavLink>, "item1"),
    getItem(<StyledNavLink to="/templates">Templates</StyledNavLink>, "item2"),
    getItem(<StyledNavLink to="/tutorials">Tutorials</StyledNavLink>, "item3")
  ];

  return (
    <Sider
      {...props}
      width={200}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{
        borderRight: "2px solid rgb(231, 232, 235)",
        paddingTop: "1.6rem",
        backgroundColor: "white"
      }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{
          height: "100%",
          paddingTop: "0.8rem"
        }}
        items={items}
      />
    </Sider>
  );
};
