import React from 'react'

const AddFlow: React.FC<AddFlowProps> = ({ currentStep }) => {
  return (
    <h1 data-testid="main-heading-h1" className="text-xl text-gray-900">
      Add
      {currentStep?.value === 'two' && <h3>Step two</h3>}
      {currentStep?.value === 'three' && <h3>Step three</h3>}
      {currentStep?.value === 'loading' && (
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
      {currentStep?.value === 'success' && <h3 className="text-green-700">All Good!</h3>}
      {currentStep?.value === 'failure' && <h3 className="text-red-800">Whoops something went wrrong</h3>}
    </h1>
  )
}

interface AddFlowProps {
  currentStep?: {
    value?: string
  }
}

export default AddFlow
