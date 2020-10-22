import React from 'react';
import styled from 'styled-components';
import {NavLink} from "react-router-dom";
import {NavHeight} from "../../utils/dimentions";
import {colors} from "../../utils/colors";
import {Logo} from "../../images/Logo";
import {IconButton} from "@material-ui/core";
import {AssignmentRounded, PhotoLibraryRounded} from "@material-ui/icons";

export const Navbar: React.FC = () => {
    return (
        <NavbarContainer>
            <LogoContainer exact to={'/'}>
                <Logo/>
            </LogoContainer>
            <Menu>
                <MenuItem to={'/brukermanual/'}>
                    <StyledIconButton aria-label="Bruksanvisning">
                        <AssignmentRounded fontSize="large"/>
                    </StyledIconButton>
                </MenuItem>
                <MenuItem to={'/bildegalleri/'}>
                    <StyledIconButton aria-label="Bruker manual">
                        <PhotoLibraryRounded fontSize="large"/>
                    </StyledIconButton></MenuItem>
            </Menu>
        </NavbarContainer>
    );
};


const NavbarContainer = styled.div`
  height: ${NavHeight};
  box-shadow: 0 0 10px 2px ${colors.shadowCore} ;
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${colors.navbarBackground};
  display: flex;
  z-index: 2;
`;

const LogoContainer = styled(NavLink)`
    margin: 1.5rem 1rem;
    position: absolute;
    left: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledIconButton = styled(IconButton)`
    &:hover{
      color: ${colors.iconCore}
    };
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 1rem;
`;

const MenuItem = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &.active {
    svg > path{
      fill: ${colors.iconCore};
    }
    &::after {
        content: '';
        height: 2px;
        width: 100%;
        background-color: ${colors.iconCore};
        position: absolute;
        bottom: 0;
        border-radius: 2rem;
     }
  }
`;
