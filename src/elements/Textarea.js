import styled from 'styled-components'

export const Textarea = styled.textarea`
  box-sizing: border-box;
  width: ${({ width }) => width || '400px'};
  height: 100px;
  border-radius: 0;
  border: gray 1px solid;
  outline: none;
  border-right: ${({ borderRight }) => borderRight};
  padding: 5px;
  margin: ${({ margin }) => margin};

  &:focus {
    border-color: cornflowerblue;
  }
`
