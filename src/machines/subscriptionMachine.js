import { Machine, send } from 'xstate'
import { addMachine } from '@src/machines/addMachine'

export const subscriptionMachine = Machine(
  {
    id: 'subscription',
    initial: 'idle',
    context: {
      path: '',
    },
    states: {
      idle: {
        entry: 'goToStep',
        on: {
          ADD: 'add',
        },
      },
      add: {
        invoke: {
          id: 'add',
          src: addMachine,
          onDone: 'complete',
        },
        on: {
          NEXT: {
            actions: send('NEXT', {
              to: 'add',
            }),
          },
        },
      },
      complete: {},
    },
  },
  {
    actions: {
      goToStep: (context) => send({ to: context.path }),
    },
  },
)
