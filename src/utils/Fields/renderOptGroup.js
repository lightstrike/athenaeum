import React from 'react';
import renderOption from 'utils/Fields/renderOption';

export default function renderOptGroup( opt, idx, optStyles ) {
  return (
    <optgroup
      key={`optgroup-${idx}`}
      label={opt.group}
    >
      {
        opt.options.map((option, i) =>
          renderOption({
            label: option.label,
            value: option.value,
            key: `optgroup-${idx}-option-${i}`,
            className: optStyles,
          })
        )
      }
    </optgroup>
  );
}
