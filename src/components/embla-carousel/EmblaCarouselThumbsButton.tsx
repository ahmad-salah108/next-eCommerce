import React from 'react'

type PropType = {
  selected: boolean
  slide: React.ReactNode
  onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, slide, onClick } = props

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        {slide}
      </button>
    </div>
  )
}
