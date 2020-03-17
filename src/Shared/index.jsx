import styled from 'styled-components';

export const FlexContainer = styled.div`
    margin: ${({ margin }) => margin || '0px'};
    padding: ${({ padding }) => padding || '0px'};
    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => height || 'auto'};
    display: flex;
    flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
    justify-content: ${({ justifyContent }) => justifyContent || 'center'};
    align-items: ${({ alignItems }) => alignItems || 'center'};
`;

export const GridContainer = styled.div`
    margin: ${({ margin }) => margin || '0px'};
    padding: ${({ padding }) => padding || '0px'};
    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => height || 'auto'};
    display: grid;
    grid-template-columns: ${({ columns }) => columns || '1fr'};
    grid-template-rows: ${({ rows }) => rows || '1fr'};
    grid-column-gap: ${({ columnGap }) => columnGap || 0};
    grid-row-gap: ${({ rowGap }) => rowGap || 0};
`;

export const GridArea = styled(FlexContainer)`
    grid-area: ${({ gridArea }) => gridArea || 'auto'};
`;

export const GradientBackground = styled.div`
    width: 100%;
    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
`;
