'use strict';

var React = require('react'),
    PropTypes = require('prop-types'),
    createSideEffect = require('react-side-effect');

var _serverStatus = 200;

function getStatusFromPropsList(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.code;
  }
}

var NestedStatus = createSideEffect(function handleChange(propsList) {
  var status = getStatusFromPropsList(propsList);
  _serverStatus = status || 200;
}, {
  displayName: 'NestedStatus',

  propTypes: {
    code: PropTypes.number.isRequired
  },

  statics: {
    peek: function () {
      return _serverStatus;
    },

    rewind: function () {
      var status = _serverStatus;
      this.dispose();
      return status;
    }
  }
});

module.exports = NestedStatus;