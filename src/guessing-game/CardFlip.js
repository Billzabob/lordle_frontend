import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

export default function CardFlip({ children, delay, animate }) {
  const [flipped, setFlipped] = useState(false)
  useEffect(() => {
    setTimeout(() => setFlipped(true), delay)
  })

  return (
    animate ?
      <div className="card-container" onClick={() => setFlipped(!flipped)}>
        <CSSTransition
          in={!flipped}
          timeout={1000}
          classNames="front-face-transition"
        >
          <div
            className="card-front">
            <img src='https://lor-card-images.s3.us-west-1.amazonaws.com/cardback.webp' alt='cardback' style={{ width: '128px', height: '193px' }} />
          </div>
        </CSSTransition>
        <CSSTransition
          in={flipped}
          timeout={1000}
          classNames="back-face-transition"
        >
          <div
            className="card-back">
            {children}
          </div>
        </CSSTransition>
      </div>
      : children
  )
}