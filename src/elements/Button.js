import styled from 'styled-components'

export const Button = styled.button`
  box-sizing: border-box;
  border: none;
  background-color: ${({ disabled, backgroundColor }) =>
    disabled ? 'grey' : backgroundColor || 'cornflowerblue'};
  color: white;
  height: ${({ height }) => height || '35px'};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`
