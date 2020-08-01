import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { List, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Todo from '../../components/TodoItem';
import AddTodoModal from '../../components/AddTodoModal';

@observer
class HomePage extends React.Component {
  componentDidMount() {
    this.cheesyDemo();
  }

  cheesyDemo() {
    function setTimeouts(arrayOfFunctions, period) {
      let counter = 0;
      // queues up functions every `period` milliseconds
      for (const f of arrayOfFunctions) {
        setTimeout(f, counter);
        counter += period;
      }
    }

    const { addTodo } = this.props.todoListStore;

    setTimeouts(
      [
        () => {
          addTodo('Покормить кошку');
        },
        () => {
          addTodo('Выполнить ТЗ');
        },
        () => {
          addTodo('Настроить сборку').indent();
        },
        () => {
          addTodo('Найти аналог на GitHub').indent();
        },
        () => {
          addTodo('Переписать на другом ui-фреймворке').indent();
        },
        () => {
          const n = addTodo('Выбрать ui-фреймворк');
          n.indent();
          n.indent();
        },
        () => {
          addTodo('Переписать и написать новую логику в соответствии с заданием').indent();
        },
        () => {
          addTodo('Запушить в репу и heroku').indent();
        },
        () => {
          addTodo('Покушац');
        },
        () => {
          addTodo('Написал на скорую руку, но постарался качественно.');
        },
      ],
      100,
    );
  }

  render() {
    const { todoListStore } = this.props;
    const { filteredTodos = [], addTodoAfter } = todoListStore;
    // if (!filteredTodos.length) return null;
    const items = filteredTodos.map((todo, index) => (
      <Todo
        key={todo.id}
        store={todoListStore}
        addAfter={() => addTodoAfter(todo)}
        arrayIndex={index}
        completed={todo.completed}
        deleteSelf={todo.delete}
        depth={todo.depth}
        getsFocus={todo.getsFocus}
        id={todo.id}
        indent={todo.indent}
        node={todo}
        text={todo.text}
        toggle={todo.toggle}
        unindent={todo.unindent}
        update={todo.update}
      />
    ));
    return (
      <>
        <List>{items}</List>
        <AddTodoModal
          store={todoListStore}
          trigger={
            <Button type="primary" icon={<PlusOutlined />}>
              Добавить элемент
            </Button>
          }
        />
      </>
    );
  }
}

HomePage.propTypes = {
  todoListStore: PropTypes.shape({
    filteredTodos: PropTypes.arrayOf(PropTypes.node),
    addTodo: PropTypes.func,
    addTodoAfter: PropTypes.func,
  }),
};

HomePage.defaultProps = {
  todoListStore: {},
};

export default inject('todoListStore')(observer(HomePage));
