/* eslint-disable react/require-default-props */
import React, { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import AddFlow from '@src/components/addflow/addflow'
import { useMachine } from '@xstate/react'
import { subscriptionMachine } from '@src/machines/subscriptionMachine'
import Step from '@src/components/step/step'

interface SideBarProps {
  isOpen?: boolean
  onClose?: any
  context?: any
}

const Sidebar: React.FC<SideBarProps> = ({ isOpen, onClose, context }: SideBarProps) => {
  const [current, send] = useMachine(subscriptionMachine)

  console.log('current', current)
  const { title } = context
  // const currentAddStep = current.children
  const currentAddStep = current?.children?.[`${title.toLowerCase()}`]?.getSnapshot()

  console.log('currentAddStep', currentAddStep?.value)
  useEffect(() => {
    send(`${title.toUpperCase()}`)
  }, [])

  console.log('currentAddStep', currentAddStep)
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={onClose}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      onClick={onClose}
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <Dialog.Title className="text-lg font-medium text-gray-900">{title}</Dialog.Title>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {current.matches('complete') && <h1>We are all done.</h1>}
                    {current.matches('add') && (
                      <>
                        {currentAddStep?.value === 'one' && (
                          <>
                            <Step key="one" title="Step one" onSubmit={(value: any) => send('NEXT', { value })} />
                            <button type="button" onClick={() => send('NEXT')}>
                              Next
                            </button>
                          </>
                        )}
                        {currentAddStep?.value === 'two' && (
                          <>
                            <Step key="two" title="Step two" onSubmit={(value: any) => send('NEXT', { value })} />
                            <button type="button" onClick={() => send('NEXT')}>
                              Next
                            </button>
                          </>
                        )}
                        {currentAddStep?.value === 'three' && (
                          <>
                            <Step key="three" title="Step three" onSubmit={(value: any) => send('NEXT', { value })} />
                            <button type="button" onClick={() => send('NEXT')}>
                              Next
                            </button>
                          </>
                        )}
                        {currentAddStep?.value === 'loading' && (
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle className="opacity-25" cx={12} cy={12} r={10} stroke="#333" strokeWidth={4} />
                            <path
                              className="opacity-75"
                              fill="#ffffff"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        )}
                        {currentAddStep?.value === 'success' && <h3 className="text-green-700">All Good!</h3>}
                        {currentAddStep?.value === 'failure' && (
                          <h3 className="text-red-800">Whoops something went wrrong</h3>
                        )}
                      </>
                    )}
                    {current.matches('cancel') && (
                      <>
                        <AddFlow currentStep={currentAddStep} />
                        <button className="bg-blue-800 text-white" type="button" onClick={() => send('NEXT')}>
                          Next Step
                        </button>
                      </>
                    )}

                    <h3>Parent Machine:</h3>
                    <pre style={{ textAlign: 'left' }}>
                      {JSON.stringify({ value: current.value, context: current.context }, null, 2)}
                    </pre>
                    <h3>Child Machine:</h3>
                    <pre style={{ textAlign: 'left' }}>
                      {JSON.stringify({ value: currentAddStep?.value, context: currentAddStep?.context }, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Sidebar
