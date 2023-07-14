import { PropsWithChildren } from 'react';
import cls from './Box.module.css';

function Box(props: PropsWithChildren) {
  return (
    <div className={cls.box}>
        {props.children}
    </div>
  )
}
export default Box;