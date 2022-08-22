import React, { useEffect, useRef } from 'react'
import { Box } from './'

export const OutsiderClicker = ({ children, func, justify, width }) => {
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        func()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [wrapperRef])

  return (
    <Box
      width={width || '100%'}
      justify={justify || 'flex-start'}
      ref={wrapperRef}
    >
      {children}
    </Box>
  )
}
