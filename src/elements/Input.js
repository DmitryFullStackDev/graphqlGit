import styled from 'styled-components'

export const Input = styled.input`
  box-sizing: border-box;
  width: 400px;
  height: 35px;
  border-radius: 0;
  border: gray 1px solid;
  outline: none;
  border-right: none;
  padding: 5px;

  &:focus {
    border-color: cornflowerblue;
  }
`
