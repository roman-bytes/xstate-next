import React from 'react'
import { useMachine } from '@xstate/react'
import { stepMachine } from '../../machines/stepMachine'

interface StepProps {
  onSubmit?: any
  title?: string
}

const Step: React.FC<StepProps> = ({ onSubmit, title }) => {
  const [current, send] = useMachine(stepMachine, {
    actions: {
      submit: (ctx) => {
        console.log('CTX: ', ctx)
        onSubmit(ctx.value)
      },
    },
  })

  const { value } = current.context

  const editing = current.matches('editing')
  const invalid = current.matches({ editing: 'invalid' })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        send('SUBMIT')
      }}
      className="mb-6"
    >
      <h3>{title}</h3>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      {invalid ? <div className="error">Sorry, that's invalid.</div> : null}
      <input
        className="border p-2"
        placeholder="only letters are valid"
        value={value}
        style={{
          borderColor: invalid ? 'red' : undefined,
        }}
        onChange={(e) => send('CHANGE', { value: e.target.value })}
        disabled={!editing}
        data-testid="input"
      />
      <button
        className="px-5 py-2 bg-gray-800 text-white"
        type="submit"
        disabled={!editing || invalid}
        data-testid="save-button"
      >
        Next / Save
      </button>
    </form>
  )
}

export default Step
