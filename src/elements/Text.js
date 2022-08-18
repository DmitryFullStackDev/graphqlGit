import React from 'react'
import styled from 'styled-components'

export const Text = styled.div`
  width: ${({ width }) => width};

  color: ${({ color }) => color};
  margin: ${({ margin }) => margin};
  text-align: ${({ textAlign }) => textAlign};
  font-style: normal;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
`
