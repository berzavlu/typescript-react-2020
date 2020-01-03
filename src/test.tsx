import React from 'react'
import style from './style.module.scss'

type CardProps = {
  title: string
  paragraph: string
}

const Count = ({ title, paragraph }: CardProps) => {
  return (
    <h1 className={style.errors}>
      {title} - {paragraph} dd4
    </h1>
  )
}

export default Count
