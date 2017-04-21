import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './text_component.module.scss';

function setWeight( { semibold, light } ) {
  if ( semibold ) {
    return styles.semibold;
  } else if ( light ) {
    return styles.light;
  }

  return styles.regular;

}

function TextComponent( props ) {
  const {
    tag,
    children,
    type,
    className,
  } = props;

  return React.createElement(
    tag,
    { className: classnames(
      styles[`typography-${type}`],
      setWeight( props ),
      className
    ) },
    [ ...children ]
  );
}

TextComponent.propTypes = {
  /**
   * You can use any html element text tag
   */
  tag: PropTypes.string,

  /**
   * determines typography class
   */
  type: PropTypes.number,

  /**
   * Font weight: 300
   */
  light: PropTypes.bool,

  /**
   * Font weight: 400
   */
  regular: PropTypes.bool,

  /**
   * Font weight: 600
   */
  semibold: PropTypes.bool,

  /**
   * adds class name to class set
   */
  className: PropTypes.string
};

TextComponent.defaultProps = {
  tag: 'p',
  type: 6
};

export default TextComponent;