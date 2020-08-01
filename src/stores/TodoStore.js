import { observable, computed, action, toJS } from 'mobx';
import sortBy from 'lodash/sortBy';

let nextTodoId = 0;

class TodoStore {
  @observable text;

  @observable id;

  @observable completed;

  @observable getsFocus = false;

  @observable parent;

  @observable children = [];

  @computed get isRoot() {
    return typeof toJS(this.parent) === 'undefined';
  }

  @computed get index() {
    if (this.isRoot) {
      return undefined;
    }
    const result = this.parent.children.findIndex((n) => n.id === this.id);
    return result;
  }

  @computed get previous() {
    if (this.index === 0) {
      return undefined;
    }
    return this.parent.children[this.index - 1];
  }

  @computed get depth() {
    let n = this;
    let d = 0;
    while (!n.isRoot) {
      n = n.parent;
      d += 1;
    }
    return d;
  }

  @action.bound
  setStatus(newStatus) {
    this.completed = newStatus;
    for (const c of this.children) {
      c.setStatus(newStatus);
    }
    this.children = sortBy(this.children, 'completed');
  }

  @action.bound
  toggle() {
    let nextHigherNode;
    this.setStatus(!this.completed);
    if (this.completed === false) {
      nextHigherNode = this.parent;

      while (nextHigherNode.completed === true && !nextHigherNode.isRoot) {
        nextHigherNode.completed = false;
        nextHigherNode = nextHigherNode.parent;
      }
    }
  }

  @action.bound
  update(text) {
    this.text = text;
  }

  @action.bound
  delete() {
    this.parent.children.remove(this);
  }

  @action.bound
  indent() {
    if (!this.previous) {
      return;
    }
    const currentParent = this.parent;
    const newParent = this.previous;

    newParent.children.push(this);
    currentParent.children.remove(this);
    this.parent = newParent;
  }

  @action.bound
  unindent() {
    if (this.parent.isRoot) {
      return;
    }
    const currentParent = this.parent;
    const newParent = this.parent.parent;

    // insert this in just after the current parent.
    newParent.children.splice(currentParent.index + 1, 0, this);
    currentParent.children.remove(this);
    this.parent = newParent;
  }

  constructor(parent = undefined, text = '') {
    this.text = text;
    this.id = nextTodoId;
    nextTodoId += 1;
    this.completed = false;
    this.parent = parent;
  }
}

export default TodoStore;
