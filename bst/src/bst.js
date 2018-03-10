var bst = (function () {
  "use strict";

  /**
   * Performs adding a node.
   * @param {number} node
  **/
  function _add (node, value) {
    var __node = this._root;
    while (true) {
      if (__node.key == null) {
        __node.key   = node;
        __node.value = value;
        break;
      } else if (node > __node.key) {
        if (__node.right == null) {
          __node.right = {};
        }
        __node = __node.right;
      } else if (node < __node.key) {
        if (__node.left == null) {
          __node.left = {};
        }
        __node = __node.left;
      }
    }
  }

  /**
   * Deletes the `node` from the tree starting from `index`.
   * @param {number}
   * @param {number}
   * @return {number}
  **/
  function _del (key) {
    var
    __node       = this._root,
    __nodeParent = this;

    while (true) {
      if (__node == null) {
        return null;
      } else if (key == __node.key) {
        /**
         * A leaf.
        **/
        if (__node.left == null && __node.right == null) {
          var __result = __node.key;
          delete __nodeParent[_getChild(__node, __nodeParent)];
          return __result;
        /**
         * Has 2 children.
        **/
        } else if (__node.left != null && __node.right != null) {
          return _del_both.call(this, __node, __nodeParent);
        /**
         * Has only one child.
        **/
        } else {
          return _del_one.call(this, __node, __nodeParent);
        }
      } else if (key < __node.key) {
        __nodeParent = __node;
        __node = __node.left;
      } else {
        __nodeParent = __node;
        __node = __node.right;
      }
    }
  }

  /**
   * Performs deleting node with only one child.
   * @param {object} node
   * @param {object} nodeParent
   * @return {number}
  **/
  function _del_one (node, nodeParent) {
    var
    __deleted    = node.key,
    __node       = node.left != null ? node.left : node.right,
    __nodeParent = node;

    nodeParent[_getChild(node, nodeParent)] = __nodeParent[_getChild(__node, __nodeParent)];

    return __deleted;
  }

  /**
   * Performs deleting node with 2 children.
   * @param {object} node
   * @param {object} nodeParent
   * @return {number}
  **/
  function _del_both (node, nodeParent) {
    var
    __child      = _getChild(node, nodeParent),
    __deleted    = node.key,
    __node       = node.right,
    __nodeParent = node,
    __minMax     = node.right.key;

    /**
     * Getting minimum maximum value.
    **/
    while (true) {
      if (__node.key < node.right.key && __node.key < __minMax) {
        __minMax = __node.key;
      } else if (__node.left != null) {
        __nodeParent = __node;
        __node = __node.left;
      } else if (__node.right != null) {
        __nodeParent = __node;
        __node = __node.right;
      } else {
        break;
      }
    }

    nodeParent[__child].key = __node.key;

    return _del_one.call(this, __node, __nodeParent), __deleted;
  }

  /**
   * Returns value of passed key if it exists.
   * @param {number} key
   * @return {any}
  **/
  function _get (key) {
    var __node = this._root;
    while (true) {
      if (__node == null || key == __node.key) {
        return __node;
      } else if (key < __node.key) {
        __node = __node.left;
      } else if (key > __node.key) {
        __node = __node.right;
      }
    }
  }

  /**
   * Returns string with name of branch.
   * @param {object} node
   * @param {object} nodeParent
   * @return {string}
  **/
  function _getChild (node, nodeParent) {
    var __child;
    if (nodeParent.left && nodeParent.left.key == node.key) {
      __child = "left";
    } else if (nodeParent.left && nodeParent.left.key == node.key) {
      __child = "right";
    } else {
      __child = "_root";
    }
    return __child;
  }

  /*=============================================================================
   * Class | bst.
   *=============================================================================
  */

  class bst {
    /**
     * @param {number|number[]}
     * @param {any|any[]}
     * @return {this}
    **/
    constructor (key, value) {
      this._root = {};
      this.add(key,value);
    }

    /**
     * Adds a node to the tree.
     * @param {number|number[]}
     * @param {any|any[]}
    **/
    add (key, value) {
      if (typeof key == "number") {
        _add.call(this, key, value);
      } else if (Array.isArray(key)) {
        var __x = -1;
        while (++__x < key.length) {
          if (typeof key[__x] == "number") {
            _add.call(this, key[__x], value[__x]);
          }
        }
      }
    }

    /**
     * Deletes node or array of nodes and returns it.
     * @param {array|number} data
     * @return {null|number}
    **/
    del (key) {
      if (typeof key == "number") {
        return _del.call(this, key);
      } else if (Array.isArray(key)) {
        var
        __x = 0,
        __result = [];
        while (__x < key.length) {
          if (typeof key[__x] == "number") {
            __result.push(_del.call(this, key[__x++]));
          }
        }
        return __result;
      }
    }

    /**
     * Returns a node if it exists.
     * @param {number}
     * @return {null|number}
    **/
    get (key) {
      var __result = null;
      if (typeof key == "number") {
        __result = _get.call(this, key);
        if (__result != null) {
          __result = __result.value;
        }
      }
      return __result;
    }

    /**
     * Returns existence of element by passed key.
     * @param {number} key
     * @return {boolean}
    **/
    has (key) {
      var __result = false;
      if (typeof key == "number") {
        __result = _get.call(this, key) != null;
      }
      return __result;
    }
  }

  return bst;
})();