import { PropsWithChildren } from "react"
import cls from './Card.module.css';

interface CardProps {
  button? : boolean;
}

function Card(props: PropsWithChildren<CardProps>) {
  return (
    <div className={`${cls.card} ${props.button && cls.btn}`}>{props.children}</div>
  )
}
export default Card