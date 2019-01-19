import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import Box from './Box'

// Shallow rendering
describe('<Box />', () => {
    it('renders the component', () => {
        const wrapper = shallow(<Box />)
        expect(wrapper).to.have.lengthOf(1)
    })
    it('renders the component children', () => {
        const wrapper = shallow((
            <Box>
                <div className="test" />
            </Box>
        ))
        expect(wrapper.contains(<div className="test" />)).to.equal(true)
    })
})

// Full DOM rendering
describe('<Box />', () => {
    it('allows us to set props', () => {
        const wrapper = mount(<Box align="left" />)
        expect(wrapper.props().align).to.equal('left')
    })
})