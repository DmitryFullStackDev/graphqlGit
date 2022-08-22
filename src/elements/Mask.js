import styled from 'styled-components'

export const Mask = styled.div`
  position: ${({ position }) => position || 'fixed'};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ zIndex }) => zIndex || '1000'};
  display: flex;
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'center'};
  overflow: hidden;
  background: ${({ dark }) =>
    dark ? 'rgb(0 0 0 / 0.7)' : 'rgb(255 255 255 / 0.7)'};
  -webkit-box-pack: end;
  -ms-flex-pack: end;

  animation: fadeInFromNone 0.2s ease-in !important;

  @keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }
    1% {
      display: flex;
      opacity: 0;
    }
    100% {
      display: flex;
      opacity: 1;
    }
  }
`
