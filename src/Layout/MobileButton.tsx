import { EventHandler, PropsWithChildren } from 'react';
import cls from './MobileButton.module.css';

interface MobileBtnProps {
    onClick?: EventHandler<React.SyntheticEvent>;
    position: 'left' | 'right';
}

function MobileButton(props: PropsWithChildren<MobileBtnProps>) {
  return (
    <div onClick={props.onClick} className={`${cls.btn} ${cls[`btn--${props.position}`]}`}>{props.children}</div>
  )
}
export default MobileButton