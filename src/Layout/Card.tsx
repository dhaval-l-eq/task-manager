import { PropsWithChildren } from "react"
import cls from './Card.module.css';

function Card(props: PropsWithChildren) {
  return (
    <div className={cls.card}>{props.children}</div>
  )
}
export default Card