var bst = (function () {
  function _add (node, index) {
    while (true) {
      if (this._tree[index] == null) {
        this._tree[index] = node;
        break;
      } else if (node < this._tree[index]) {
        index = index * 2 + 1;
      } else {
        index = index * 2 + 2;
      }
    }
  }

  /**
   * Deletes the `node` from the tree starting from `index`.
   * @param {number}
   * @param {number}
   * @return {number}
  **/
  function _del (node, index) {
    while (true) {
      if (this._tree[index] == null) {
        return null;
      } else if (node == this._tree[index]) {
        /**
         * A leaf.
        **/
        if (this._tree[index * 2 + 1] == null && this._tree[index * 2 + 2] == null) {
          var __result = this._tree[index];
          delete this._tree[index];
        /**
         * Has 2 children.
        **/
        } else if (this._tree[index * 2 + 1] != null && this._tree[index * 2 + 2] != null) {
          return _del_both.call(this, index);
        /**
         * Has only one child.
        **/
        } else {
          return _del_one.call(this, index);
        }
      } else if (node < this._tree[index]) {
        index = index * 2 + 1;
      } else {
        index = index * 2 + 2;
      }
    }
  }

  /**
   * Is executed when it's going to be killed node with only one child.
  **/
  function _del_one (index) {
    var
    __index   = index,
    __deleted = this._tree[__index];
    delete this._tree[__index];
    while (true) {
      if (this._tree[__index * 2 + 1] != null) {
        this._tree[__index] = this._tree[__index * 2 + 1];
        __index = __index * 2 + 1;
        delete this._tree[__index];
      } else if (this._tree[__index * 2 + 2] != null) {
        this._tree[__index] = this._tree[__index * 2 + 2];
        __index = __index * 2 + 2;
        delete this._tree[__index];
      } else {
        return __deleted;
      }
    }
  }

  /**
   * Is executed when it's going to be killed node with exactly 2 children. Wait, what? Holy shit, 2 children...
   * Anyway, it does its work very well. Don't kill children.
   * @param {number}
   * @return {number}
  **/
  function _del_both (index) {
    var
    __index   = index * 2 + 2,
    __current = this._tree[__index],
    __minMax  = __current;

    while (true) {
      if (this._tree[__index] == null || __minMax >= this._tree[__index]) {
        break;
      } else if (__minMax < this._tree[__index]) {
        __minMax = this._tree[__index];
      } else {
        index = index * 2 + 1;
      }
    }

    this._tree[index] = __minMax;

    return _del.call(this, this._tree[__index], __index), __current;
  }

  /**
   * Returns index of passed `node`.
   * @param {number}
   * @param {number}
   * @return {null|number}
  **/
  function _get (node, index) {
    while (true) {
      if (this._tree[index] == null) {
        return null;
      } else if (this._tree[index] == node) {
        return index;
      } else if (node < this._tree[index]) {
        index = index * 2 + 1;
      } else {
        index = index * 2 + 2;
      }
    }
  }

  /*=============================================================================
   * Class | bst.
   *=============================================================================
  */

  class bst {
    constructor (data) {
      this._tree = {};
      this.add(data);
    }

    /**
     * Adds a node to the tree.
     * @param {number}
     * @return {number}
    **/
    add (data) {
      if (typeof data == "number") {
        _add.call(this, data, 0);
      } else if (Array.isArray(data)) {
        var __x = 0;
        while (__x < data.length) {
          if (typeof data[__x] == "number") {
            _add.call(this, data[__x++], 0);
          }
        }
      }
    }

    /**
     * Deletes node or array of nodes and returns it.
     * @param {array|number} data
     * @return {null|number}
    **/
    del (data) {
      if (typeof data == "number") {
        return _del.call(this, data, 0);
      } else if (Array.isArray(data)) {
        var
        __x = 0,
        __result = [];
        while (__x < data.length) {
          if (typeof data[__x] == "number") {
            __result.push(_del.call(this, data[__x++], 0));
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
    get (data) {
      var __index = _get.call(this, data, 0);
      return __index != null ? this._tree[__index] : null;
    }

    /**
     * Returns two children of given `index`.
     * @param {number}
     * @param {boolean} - will return string
     * @return {array}
    **/
    children (index, string) {
      return {
        "l" : {
          "i" : index * 2 + 1,
          "v" : this._tree[index * 2 + 1]
        },
        "r" : {
          "i" : index * 2 + 2,
          "v" : this._tree[index * 2 + 2]
        },
      }
    }

    /**
     * @param {number} node
     * @return {object}
    **/
    parent (node) {
      var __index = _get.call(this, node, 0);
      if (__index != null) {
        __index = Math.floor((__index - 1) / 2);
        node = {
          "i" : __index,
          "v" : this._tree[__index]
        };
      } else {
        node = __index;
      }
      return node;
    }
  }

  return bst;
})();