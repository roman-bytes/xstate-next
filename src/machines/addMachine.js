import { Machine, assign } from 'xstate'
import { submit } from '../../utils'

export const addMachine = Machine({
  id: 'add',
  context: {
    one: '',
    two: '',
    three: '',
  },
  initial: 'one',
  states: {
    one: {
      on: {
        NEXT: {
          target: 'two',
          actions: assign({ one: (_, e) => e.value }),
        },
      },
    },
    two: {
      on: {
        NEXT: {
          target: 'three',
          actions: assign({ two: (_, e) => e.value }),
        },
      },
    },
    three: {
      on: {
        NEXT: {
          target: 'loading',
          actions: assign({ three: (_, e) => e.value }),
        },
      },
    },
    loading: {
      invoke: {
        id: 'submitting',
        src: (ctx) => submit(ctx),
        onDone: 'success',
        onError: 'failure',
      },
    },
    failure: {
      on: {
        RETRY: 'loading',
      },
    },
    success: {
      type: 'final',
    },
  },
})
