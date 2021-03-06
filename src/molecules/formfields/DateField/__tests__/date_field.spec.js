import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import DateField from 'molecules/formfields/DateField';

describe('<DateField />', () => {
  it('renders', () => {
    const wrapper = shallow(<DateField meta={{}} input={{ value: '01-17-1973' }} />);

    expect(wrapper.length).to.equal(1);
  });
});
