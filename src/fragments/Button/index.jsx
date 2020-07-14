import React from 'react';
import styled from 'styled-components';
import { TextFragment } from '../Text';

const ButtonFragment = TextFragment;

const Button = props => <ButtonFragment as="button" {...props} />;

export default Button;
