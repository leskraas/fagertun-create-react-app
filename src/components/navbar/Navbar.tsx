import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {NavHeight} from "../../utils/dimentions";
import {colors} from "../../utils/colors";
import {Logo} from "../../images/Logo";
import {IconButton} from "@material-ui/core";
import {AssignmentRounded, PhotoLibraryRounded} from "@material-ui/icons";

export const Navbar: React.FC = () => {
    return (
        <>
            <NavbarContainer>
                <LogoContainer to={'/'}>
                    <Logo/>
                </LogoContainer>
                <Menu>
                    <MenuItem to={'/brukermanual/'}>
                        <StyledIconButton aria-label="Bruksanvisning">
                            <AssignmentRounded fontSize="large"/>
                        </StyledIconButton>
                    </MenuItem>
                    <MenuItem to={'/brukermanual/'}>
                        <StyledIconButton aria-label="Bruker manual">
                            <PhotoLibraryRounded fontSize="large"/>
                        </StyledIconButton></MenuItem>
                </Menu>
            </NavbarContainer>
        </>
    );
};


const NavbarContainer = styled.div`
  height: ${NavHeight};
  box-shadow: 0 0 10px 2px ${colors.coreGray} ;
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${colors.navbarBackground};
  display: flex;
  z-index: 2;
  padding: 0 1.5rem;
`;

const LogoContainer = styled(Link)`
    margin: 1.5rem 1rem;
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
`;

const MenuItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  
  use {
    fill: ${colors.iconSecondary};
  }
`;
