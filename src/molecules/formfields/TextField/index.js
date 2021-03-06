import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import classnames from 'classnames';
import omit from 'lodash/omit';

import Icon from 'atoms/Icon';
import Tooltip from 'atoms/Tooltip';
import ErrorMessage from 'atoms/ErrorMessage';

import styles from './text_field.module.scss';

function renderTooltip(tooltip, className) {
  if (typeof tooltip === 'string') {
    return <Tooltip className={styles[className]}>{tooltip}</Tooltip>;
  }

  return <Tooltip className={styles[className]} onClick={tooltip} />;
}

function TextField( props ) {
  const {
    className,
    htmlFor,
    input,
    label,
    mask,
    maskChar,
    meta,
    noBaseStyle,
    placeholder,
    secure,
    id,
    tooltip,
    inputTooltip,
    type,
    maskVal,
    prefix,
    activeValidation,
  } = props;

  const classes = [
    !noBaseStyle && styles['text-field'],
    meta && meta.active && !noBaseStyle && styles['focused'],
    meta && meta.touched && meta.error && !meta.active && styles['hasError'],
    className,
  ];

  let message;

  if (activeValidation) {
    message = meta && (meta.dirty || meta.touched) && (meta.error || meta.warning);
  } else {
    message = meta && meta.touched && !meta.active && (meta.error || meta.warning);
  }

  return (
    <div>
      <div className={classnames(...classes)}>
        { label &&
          <div className={classnames(styles['header'])}>
            <label className={styles['label']} htmlFor={htmlFor}>{ label }</label>
            { secure && <Icon className={styles['icon-lock']} icon='lock' /> }
            { tooltip && renderTooltip(tooltip, 'tooltip') }
          </div>
        }
        <span
          data-prefix={prefix}
          className={classnames(styles['input-wrapper'], prefix && styles['prefix'])}
        >
          { mask ?
            <InputMask
              className={styles['input']}
              type='text'
              placeholder={placeholder}
              mask={mask}
              maskChar={maskChar}
              id={id}
              {...input}
            />
            :
            <input
              className={styles['input']}
              type={type}
              placeholder={placeholder}
              id={id}
              value={maskVal(input.value)}
              {...omit(input, [ 'value' ])}
            />
          }
          {inputTooltip && renderTooltip(inputTooltip, 'input-tooltip')}
        </span>
      </div>

      <ErrorMessage
        condition={!!message}
        message={message}
        type={meta && meta.warning ? 'warning' : 'error'}
      />
    </div>
  );
}

TextField.propTypes = {
  /**
   * set to true to allow validation errors/warnings to occur `onChange`
   */
  activeValidation: PropTypes.bool,

  /**
   * Label is optional. If not provided, component will reorganize accordingly.
   */
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /**
   * `for` prop on label
   */
  htmlFor: PropTypes.string,

  /**
   * Will append new classname to classSet
   */
  className: PropTypes.string,

  /**
   * placeholder text for text field
   */
  placeholder: PropTypes.string,

  /**
   * object with all necessary props for input
   */
  input: PropTypes.object,
  /**
   * The props under the meta key are metadata about the state of this field that `redux-form` tracks.
   */
  meta: PropTypes.object,
  /**
   * Passing `noBaseStyle=true` will omit the base class style
   * Fields may at times be wrapped up as a collection. In this case, the wrapper would control the styling for those fields as a group.
   */
  noBaseStyle: PropTypes.bool,
  /**
   * Mask the input
   */
  mask: PropTypes.string,

  /**
   * Specific the maskChar (must have `mask` set for this to be applied)
   */
  maskChar: PropTypes.string,

  /**
   * Function to mask the actual input value
   *
   * Provides for more specific customization over the `mask` prop
   */
  maskVal: PropTypes.func,

  /**
   * Adds a lock to the label.
   */
  secure: PropTypes.bool,

  /**
   * id added to the `input` node
   */
  id: PropTypes.string,
  /**
   * either a handler for clicking the tooltip, or text to go in the tooltip for the label
   */
  tooltip: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  /**
   * either a handler for clicking the tooltip, or text to go in the tooltip for the input
   */
  inputTooltip: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),

  /**
   * HTML type for input node; when used with `mask` it always defaults to 'text'
   */
  type: PropTypes.oneOf([
    'text',
    'password',
  ]),

  /**
   * provides a prefix for the input
   */
  prefix: PropTypes.oneOf([
    '$',
  ]),
};

TextField.defaultProps = {
  placeholder: 'Placeholder',
  errorMessage: false,
  type: 'text',
  maskVal: val => val,
};

export default TextField;
