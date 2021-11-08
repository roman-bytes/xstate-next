import { Machine, send } from 'xstate'
import { addMachine } from '@src/machines/addMachine'
import { cancelMachine } from '@src/machines/cancelMachine'

export const subscriptionMachine = Machine({
  id: 'subscription',
  initial: 'idle',
  context: {
    path: '',
  },
  states: {
    idle: {
      on: {
        ADD: 'add',
        CANCEL: 'cancel',
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
          actions: [
            (ctx, e) => console.log('e.payload', e.value),
            send(
              (ctx, e) => ({
                type: 'NEXT',
                value: e.value,
              }),
              {
                to: 'add',
              },
            ),
          ],
        },
      },
    },
    cancel: {
      invoke: {
        id: 'cancel',
        src: cancelMachine,
        onDone: 'complete',
      },
      on: {
        NEXT: {
          actions: [
            send(
              (ctx, e) => ({
                type: 'NEXT',
                value: e.value,
              }),
              {
                to: 'cancel',
              },
            ),
          ],
        },
      },
    },
    complete: {},
  },
})
