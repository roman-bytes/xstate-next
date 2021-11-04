import { Machine, assign } from 'xstate'

export const modalMachine = Machine({
  id: 'modal',
  initial: 'closed',
  context: {
    title: '',
  },
  states: {
    closed: {
      on: {
        OPEN: {
          target: 'open',
          actions: assign({ title: (_, e) => e.title }),
        },
      },
    },
    open: {
      on: {
        CLOSED: {
          target: 'closed',
        },
      },
    },
  },
})
