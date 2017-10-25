'use strict';

var React = require('react'),
    PropTypes = require('prop-types'),
    withSideEffect = require('react-side-effect');

function reducePropsToState(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.code;
  }
}

function handleStateChangeOnClient(code) {
  return code;
}

function NestedStatus() {}
NestedStatus.prototype = Object.create(React.Component.prototype);

NestedStatus.displayName = 'NestedStatus';
NestedStatus.propTypes = {
  code: PropTypes.number.isRequired
};

NestedStatus.prototype.render = function () {
  if (this.props.children) {
    return React.Children.only(this.props.children);
  } else {
    return null;
  }
};

var sideEffected = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(NestedStatus);

var getState = sideEffected.peek;
var getFinalState = sideEffected.rewind;

sideEffected.peek = function() {
  return getState() || 200;
};

sideEffected.rewind = function() {
  return getFinalState() || 200;
};

module.exports = sideEffected;