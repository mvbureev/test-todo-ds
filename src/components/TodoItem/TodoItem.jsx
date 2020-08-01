import React from 'react';
import PropTypes from 'prop-types';
import If from 'react-if';
import { observer } from 'mobx-react';
import { Checkbox, Input, Button, List } from 'antd';
import DeleteTodoModal from '../DeleteTodoModal';

@observer
class Todo extends React.Component {
  render() {
    const { completed, deleteSelf, depth, id, node, text, toggle, update } = this.props;

    return (
      <List.Item style={{ marginLeft: `${(depth - 1) * 24}px` }}>
        <Checkbox checked={completed} onClick={toggle} style={{ margin: 8 }} />
        <Input
          size="small"
          bordered={false}
          id={`${node.id}textfield`}
          value={text}
          ref={(input) => {
            this.textFieldRef = input;
          }}
          disabled={completed}
          onChange={(e, newValue) => update(newValue)}
          style={{ margin: 8 }}
          className="input"
        />
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
