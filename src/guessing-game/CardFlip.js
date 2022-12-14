import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

export default function CardFlip({ children, delay, animate, run, onEntered }) {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    if (run) setTimeout(() => setFlipped(true), delay)
  })

  return (
    animate ?
      <div className='card-container'>
        <CSSTransition
          in={!flipped}
          timeout={1000}
          classNames='front-face-transition'
        >
          <div
            className='card-front'>
            <img
              src='https://lor-card-images.s3.us-west-1.amazonaws.com/cardback.webp'
              alt='cardback'
              style={{ width: '100%', aspectRatio: 0.664, filter: 'drop-shadow(5px 5px 5px black)' }} />
          </div>
        </CSSTransition>
        <CSSTransition
          in={flipped}
          timeout={1000}
          classNames='back-face-transition'
          onEntered={() => onEntered && onEntered()}
        >
          <div
            className='card-back'>
            {children}
          </div>
        </CSSTransition>
      </div>
      : children
  )
}