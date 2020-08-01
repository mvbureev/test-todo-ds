/* eslint-disable class-methods-use-this */
import { observable, computed, action } from 'mobx';
import TodoStore from './TodoStore';

export class TodoListStore {
  // can be SHOW_ALL, SHOW_ACTIVE or SHOW_COMPLETED
  @observable visibilityFilter = 'SHOW_ALL';

  @observable demoMode = true;

  @observable todoRoot;

  constructor() {
    this.todoRoot = new TodoStore();
  }

  @computed get todos() {
    const flattenChildren = (startNode) => {
      let result = [];

      if (!startNode.isRoot) {
        result.push(startNode);
      }
      for (const n of startNode.children) {
        result = result.concat(flattenChildren(n));
      }
      return result;
    };
    return flattenChildren(this.todoRoot);
  }

  @computed get filteredTodos() {
    switch (this.visibilityFilter) {
      case 'SHOW_ALL':
        return this.todos;
      case 'SHOW_ACTIVE':
        return this.todos.filter((t) => t.completed === false);
      case 'SHOW_COMPLETED':
        return this.todos.filter((t) => t.completed === true);
      default:
        throw new Error('Invalid filter.');
    }
  }

  @action.bound
  findNodeById(id, startNode = this.todoRoot) {
    for (const n of startNode.children) {
      if (n.id === id) {
        return n;
      }
      // Recurse down into n's children
      const result = this.findNodeById(id, n);
      if (result) {
        // if result is not undefined
        return result;
      }
    }
    return undefined;
  }

  @action.bound
  findNodeByIdSafe(id) {
    const node = this.findNodeById(id);
    if (typeof node === 'undefined') {
      throw new Error(`No TodoStore with id ${id}`);
    }
    return node;
  }

  @action.bound
  addTodo(text = '') {
    const newNode = new TodoStore(this.todoRoot, text);
    this.todoRoot.children.push(newNode);
    return newNode;
  }

  @action.bound
  addTodoAfter(id, text = '') {
    const node = this.findNodeByIdSafe(Number(id));
    const newNode = new TodoStore(node, text);
    node.children.push(newNode);
    return newNode;
  }

  @action.bound
  deleteTodo(id) {
    const node = this.findNodeByIdSafe(id);
    node.parent.children.remove(node);
  }
}

export default TodoListStore;
