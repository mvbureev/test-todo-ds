/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

class DeleteTodoModal extends React.Component {
  state = { visible: false };

  openModal = () => {
    this.setState({
      visible: true,
    });
  };

  closeModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { onDelete, trigger } = this.props;

    const showDeleteConfirm = () => {
      confirm({
        title: 'Вы уверены, что хотите удалить эту задачу?',
        icon: <ExclamationCircleOutlined />,
        okText: 'Ага',
        okType: 'danger',
        cancelText: 'Не-а',
        onOk() {
          onDelete();
        },
      });
    };

    return <div onClick={showDeleteConfirm}>{trigger}</div>;
  }
}

DeleteTodoModal.propTypes = {
  onDelete: PropTypes.func,
  trigger: PropTypes.node,
};

DeleteTodoModal.defaultProps = {
  onDelete: () => {},
  trigger: null,
};

export default DeleteTodoModal;
