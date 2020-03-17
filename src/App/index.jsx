import { ApolloProvider } from '@apollo/react-hooks';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import ApolloClient from 'apollo-boost';
import React from 'react';
import BritoLogo from '../Components/BritoLogo';
import LogoWithSubtitle from '../Components/LogoWithSubtitle';
import MainContainer from '../Components/MainContainer/styled';
import Title from '../Components/Title';
import { GradientBackground } from '../Shared';
import Card from '../Components/Card';
import Draw from '../Components/Draw';

function App() {
    const client = new ApolloClient({ uri: 'http://localhost:3001/graphql' });
    const theme = createMuiTheme({
        palette: {
            white: '#FFFFFE',
            black: '#000000',
            yellow: '#EBCA67',
            purple: '#764BA2',
            darkPurple: '#6F3BA3',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <ApolloProvider client={client}>
                <GradientBackground>
                    <MainContainer>
                        <LogoWithSubtitle />
                        <Title />
                        <Card />
                        <Draw />
                        <BritoLogo />
                    </MainContainer>
                </GradientBackground>
            </ApolloProvider>
        </ThemeProvider>
    );
}

export default App;
