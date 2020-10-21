import React from 'react';
import {Navbar as NavbarComp} from "./components/navbar/Navbar";
import styled from "styled-components";
import {BrowserRouter, Route} from 'react-router-dom';
import {AllUserGuide} from "./components/AllUserGuide";
import {OneUserGuide} from "./components/OneUserGuide";
import {NavHeight} from "./utils/dimentions";
import {createMuiTheme, responsiveFontSizes, ThemeProvider} from "@material-ui/core";
import {colors} from "./utils/colors";

let theme = createMuiTheme(
    {
        palette: {
            primary: {
                main: colors.blue300,
            },
            secondary: {
                main: colors.iconSecondary,
            },
        },
        typography: {
            htmlFontSize: 10,
        },
    }
);
theme = responsiveFontSizes(theme);

function App() {
    return (
        <BrowserRouter>
                <Navbar/>
            <ThemeProvider theme={theme}>
                <Content>
                    <Route path={'/'} exact component={() => <div>hei</div>}/>
                    <Route path={'/brukermanual/'} exact component={AllUserGuide}/>
                    <Route path={'/brukermanual/:slug'} component={OneUserGuide}/>
                </Content>
            </ThemeProvider>
        </BrowserRouter>
    );
}

const Content = styled.div`
  position: relative;
  top: 0;
  margin-bottom: ${NavHeight};
  min-height: calc(100vh - ${NavHeight});
`

const Navbar = styled(NavbarComp)`
  position: fixed;
`

export default App;
