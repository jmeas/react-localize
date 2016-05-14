import React, {Component, PropTypes} from 'react';
import defaultLocalizer from './util/localize-formatter';

export default (ComposedComponent, messages = {}, customLocalizer) => {
  class ConfigureLocalization extends Component {
    constructor(props) {
      super(props);
    }
    getChildContext() {
      return {
        localize: this.localize
      };
    }
    localize(key, values, defaultValue) {
      if(typeof customLocalizer === 'function') {
        return customLocalizer(messages, key, values, defaultValue);
      }
      return defaultLocalizer(messages, key, values, defaultValue);
    }
    render() {
      return <ComposedComponent {...this.props}/>;
    }
  }

  ConfigureLocalization.displayName = 'ConfigureLocalization';
  ConfigureLocalization.childContextTypes = {
    localize: PropTypes.func
  };
  return ConfigureLocalization;
}
