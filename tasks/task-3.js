const meta = {
  title: 'Design Singly Linked List',
  link: 'https://neetcode.io/problems/singlyLinkedList/question',
  difficulty: 'Easy',
  tags: ['LinkedList', 'Design'],
};

// ─── Option B: design / class-based ──────────────────────────────────────────

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Solution {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  get(index) {
    if (index < 0 || index >= this.length) return -1;
    let cur = this.head;
    for (let i = 0; i < index; i++) cur = cur.next;
    return cur.val;
  }

  insertHead(val) {
    const node = new Node(val);
    node.next = this.head;
    this.head = node;
    this.length++;
  }

  insertTail(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
    } else {
      let cur = this.head;
      while (cur.next) cur = cur.next;
      cur.next = node;
    }
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return false;
    if (index === 0) {
      this.head = this.head.next;
    } else {
      let cur = this.head;
      for (let i = 0; i < index - 1; i++) cur = cur.next;
      cur.next = cur.next.next;
    }
    this.length--;
    return true;
  }

  getValues() {
    const result = [];
    let cur = this.head;
    while (cur) {
      result.push(cur.val);
      cur = cur.next;
    }
    return result;
  }
}

// ─── Tests ────────────────────────────────────────────────────────────────────

function tests() {
  return {
    type: 'class',
    factory: () => new Solution(),
    cases: [
      [
        { method: 'insertHead', args: [1], expected: undefined },
        { method: 'insertTail', args: [2], expected: undefined },
        { method: 'insertTail', args: [3], expected: undefined },
        { method: 'get', args: [0], expected: 1 },
        { method: 'get', args: [1], expected: 2 },
        { method: 'get', args: [2], expected: 3 },
        { method: 'remove', args: [1], expected: true },
        { method: 'getValues', args: [], expected: [1, 3] },
        { method: 'get', args: [5], expected: -1 },
      ],
    ],
  };
}

module.exports = { meta, tests };
