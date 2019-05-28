import * as React from 'react'
import styled from 'styled-components'

export const Form = styled.form`
  position: absolute;
  padding: 1rem 1rem 1.25rem;
  width: 14rem;
  top: 1rem;
  right: 1rem;
  border-radius: 0.4rem;
  z-index: 100;
  background: white;
  box-shadow: 0 6px 12px 0px rgba(0,0,0,0.12);
  opacity: 0.6;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 1;
  }
`

export const Button = styled.button`
  width: 100%;
  color: white;
  background: tomato;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
`


const InputGroupContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > input {
    border: 1px solid rgba(0,0,0,0.12);
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
    text-align: right;
    width: 4rem;

    &:focus {
      border: 1px solid tomato;
    }
  }
` 

interface InputGroupProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  label: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({ id, label, ...props}) => (
  <InputGroupContainer>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      {...props}
    />
  </InputGroupContainer>
)