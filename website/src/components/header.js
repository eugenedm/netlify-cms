import React, { useState, useEffect } from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';


import Container from './container';
import Notifications from './notifications';


// import logo from '../img/netlify-cms-logo.svg';
import logo from '../img/dobry.png';


import theme from '../theme';
import { mq } from '../utils';

const StyledHeader = styled.header`
  background: ${theme.colors.darkerGray};
  padding-top: ${theme.space[3]};
  padding-bottom: ${theme.space[3]};
  transition: background 0.2s ease, padding 0.2s ease, box-shadow 0.2s ease;

  ${mq[2]} {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: ${theme.zIndexes.header};

    ${p =>
      !p.collapsed &&
      css`
        background: #2a2c24;
        padding-top: ${theme.space[5]};
        padding-bottom: ${theme.space[5]};
      `};

    ${p =>
      p.hasNotifications &&
      css`
        padding-top: 0;
      `};
  }
`;

const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const Logo = styled.div`
  flex: 1 0 50%;
  ${mq[1]} {
    flex: 0 0 auto;
    margin-right: ${theme.space[5]};
  }
`;

const MenuActions = styled.div`
  flex: 1 0 50%;
  display: flex;
  justify-content: flex-end;
  ${mq[1]} {
    display: none;
  }
`;

const MenuBtn = styled.button`
  background: none;
  border: 0;
  color: white;
  padding: ${theme.space[3]};
  font-size: ${theme.fontsize[4]};
  line-height: 1;
`;


const ToggleArea = styled.div`
  display: ${p => (p.open ? 'block' : 'none')};
  flex: 1;
  width: 100%;
  margin-top: ${theme.space[3]};

  ${mq[1]} {
    display: block;
    width: auto;
    margin-top: 0;
  }
`;



const Menu = styled(ToggleArea)`
  ${mq[1]} {
    flex: 0 0 auto;
    margin-left: auto;
  }
`;

const MenuList = styled.ul`
  ${mq[1]} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const MenuItem = styled.li`
  margin-bottom: ${theme.space[3]};
  ${mq[1]} {
    margin-bottom: 0;

    &:not(:last-child) {
      margin-right: ${theme.space[3]};
    }
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 600;
`;

const NOTIFS_QUERY = graphql`
  query notifs {
    file(relativePath: { regex: "/notifications/" }) {
      childDataYaml {
        notifications {
          published
          loud
          message
          url
        }
      }
    }
  }
`;

function Header({ hasHeroBelow }) {
  const [scrolled, setScrolled] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);

  useEffect(() => {
    // TODO: use raf to throttle events
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleScroll() {
    const currentWindowPos = document.documentElement.scrollTop || document.body.scrollTop;

    const scrolled = currentWindowPos > 0;

    setScrolled(scrolled);
  }

  function handleMenuBtnClick() {
    setNavOpen(s => !s);
  }



  return (
    <StaticQuery query={NOTIFS_QUERY}>
      {data => {
        const notifications = data.file.childDataYaml.notifications.filter(
          notif => notif.published,
        );
        const collapsed = !hasHeroBelow || scrolled;
        const hasNotifications = notifications.length > 0;
        return (
          <StyledHeader collapsed={collapsed} id="header" hasNotifications={hasNotifications}>
            <Notifications notifications={notifications} />
            <HeaderContainer>
              <Logo>
                <Link to="https://dobryvykup.cz">
                  <img src={logo} alt="Dobry Vykup Logo" />
                </Link>
              </Logo>
              <MenuActions>


                <MenuBtn onClick={handleMenuBtnClick}>
                  {isNavOpen ? <span>&times;</span> : <span>&#9776;</span>}
                </MenuBtn>
              </MenuActions>

              <Menu open={isNavOpen}>
                <MenuList>
 
                  <MenuItem>
                    <NavLink to="https://dobryvykup.cz">Domov</NavLink>
                  </MenuItem>

                  <MenuItem>
                    <NavLink to="https://dobryvykup.cz/blog/">Blog</NavLink>
                  </MenuItem>
                </MenuList>
              </Menu>
            </HeaderContainer>
          </StyledHeader>
        );
      }}
    </StaticQuery>
  );
}

export default Header;


