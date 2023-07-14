import { PropsWithChildren } from "react"
import cls from './Container.module.css';

function Container(props: PropsWithChildren) {
  return (
    <div className={cls.container}>{props.children}</div>
  )
}
export default Container