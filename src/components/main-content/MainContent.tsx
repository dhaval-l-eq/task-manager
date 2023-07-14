import Container from '../../Layout/Container';
import cls from './MainContent.module.css';
import Header from './header/Header';
import TaskList from './task-list/TaskList';

function MainContent() {
  return (
    <div className={cls.mainWrapper}>
        <Container>
            <Header />
            <TaskList />
        </Container>
    </div>
  )
}
export default MainContent