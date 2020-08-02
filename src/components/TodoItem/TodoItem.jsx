import React from 'react';
import PropTypes from 'prop-types';
import If from 'react-if';
import { observer } from 'mobx-react';
import { Checkbox, Button, List } from 'antd';
import DeleteTodoModal from '../DeleteTodoModal';

@observer
class Todo extends React.Component {
  render() {
    const { completed, deleteSelf, depth, node, text, toggle } = this.props;

    return (
      <List.Item style={{ marginLeft: `${(depth - 1) * 24}px` }}>
        <Checkbox
          className={completed ? 'task' : ''}
          id={`${node.id}textfield`}
          checked={completed}
          onClick={toggle}
          style={{ margin: 8 }}
        >
          {text}
        </Checkbox>
        <If condition={completed}>
          <DeleteTodoModal
            onDelete={() => {
              deleteSelf();
            }}
            trigger={
              <Button size="small" danger className="button--delete">
                Удалить
              </Button>
            }
          />
        </If>
      </List.Item>
    );
  }
}

Todo.propTypes = {
  completed: PropTypes.bool,
  deleteSelf: PropTypes.func,
  depth: PropTypes.number,
  id: PropTypes.number,
  node: PropTypes.objectOf(Object),
  text: PropTypes.string,
  toggle: PropTypes.func,
  update: PropTypes.func,
};

Todo.defaultProps = {
  completed: false,
  deleteSelf: () => {},
  depth: null,
  id: null,
  node: null,
  text: null,
  toggle: () => {},
  update: () => {},
};

export default Todo;
