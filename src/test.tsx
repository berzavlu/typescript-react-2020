import React from 'react'

type CardProps = {
  title: string
  paragraph: string
}

const Count = ({ title, paragraph }: CardProps) => {
  return (
    <h1>
      {title} - {paragraph} dd
    </h1>
  )
}

export default Count
