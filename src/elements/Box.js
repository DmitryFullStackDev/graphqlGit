import styled from 'styled-components'

export const Box = styled.div`
  display: ${({ display }) => display || 'flex'};
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'initial'};
  align-self: ${({ alignSelf }) => alignSelf || 'initial'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};

  height: ${({ height }) => (height ? height : 'auto')};
  min-height: ${({ minHeight }) => minHeight};
  width: ${({ width }) => (width ? `${width}` : 'auto')};
  min-width: ${({ minWidth }) => minWidth || ''};
  max-height: ${({ maxHeight }) => maxHeight};

  background: ${({ background }) => background};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  overflow: ${({ overflow }) => overflow};

  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  border-bottom: ${({ borderBottom }) => borderBottom};

  cursor: ${({ cursor }) => cursor};

  &:hover {
    background-image: url(${({ img }) => img});
  }
`
