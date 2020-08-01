/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Select, Input, Button, Row, Col } from 'antd';
import { Formik, Field, Form } from 'formik';
import { PlusOutlined } from '@ant-design/icons';
import uuid from '../../utils/uuid';

class AddTodoModal extends React.Component {
  state = { visible: false, items: null };

  componentDidMount() {
    this.updateItems();
  }

  updateItems() {
    this.setState({
      items: this.props.store.todoRoot.children,
    });
  }

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

  renderSelectOption(item) {
    const index = uuid();
    return (
      <Select.Option key={index} value={item.id}>
        {item.text}
      </Select.Option>
    );
  }

  render() {
    const { trigger, store } = this.props;
    const { items } = this.state;
    return (
      <>
        <div onClick={this.openModal}>{trigger}</div>
        <Modal title="Добавить элемент" visible={this.state.visible} onCancel={this.closeModal} footer={null}>
          <Formik
            initialValues={{ parent: null, text: null }}
            onSubmit={(values) => {
              if (values.parent) {
                store.addTodoAfter(values.parent, values.text);
              } else {
                store.addTodo(values.text);
              }
              this.updateItems();
              this.closeModal();
            }}
            render={(form) => {
              const { values, setFieldValue, submitForm } = form;
              return (
                <Form className="form">
                  <Row gutter={[16, 16]}>
                    <Col span={12} className="form-item">
                      <label htmlFor="parent" key="parent" style={{ textAlign: 'end' }}>
                        Родительский элемент
                      </label>
                    </Col>
                    <Col span={12}>
                      <Field
                        id="parent"
                        name="parent"
                        key="parent"
                        placeholder="Родитель"
                        as={Select}
                        style={{ width: '100%' }}
                        value={values.parent}
                        onChange={(value) => {
                          setFieldValue('parent', value);
                        }}
                      >
                        <Select.Option value={null}>Без родителя</Select.Option>
                        {items.map((item, index) => {
                          if (item.children.length > 0) {
                            return (
                              <>
                                {() => this.renderSelectOption(item, index)}
                                <Select.OptGroup label={`подзадачи ${item.text}`}>
                                  {item.children.map((subitems, subindex) =>
                                    this.renderSelectOption(subitems, subindex),
                                  )}
                                </Select.OptGroup>
                              </>
                            );
                          }
                          return this.renderSelectOption(item, index);
                        })}
                      </Field>
                    </Col>
                  </Row>

                  <Row gutter={[16, 16]}>
                    <Col span={12} className="form-item">
                      <label htmlFor="text" key="text">
                        Заголовок
                      </label>
                    </Col>
                    <Col span={12}>
                      <Field id="text" name="text" key="text" placeholder="Заголовок" as={Input} value={values.text} />
                    </Col>
                  </Row>

                  <Button type="submit" onClick={submitForm} icon={<PlusOutlined />}>
                    Добавить
                  </Button>
                </Form>
              );
            }}
          />
        </Modal>
      </>
    );
  }
}

AddTodoModal.propTypes = {
  trigger: PropTypes.node,
  store: PropTypes.objectOf(Object),
};

AddTodoModal.defaultProps = {
  trigger: null,
  store: null,
};

export default AddTodoModal;
