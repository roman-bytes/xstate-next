import React from 'react'

const AddFlow: React.FC<AddFlowProps> = ({ currentStep }) => {
  return (
    <h1 data-testid="main-heading-h1" className="text-xl text-gray-900">
      Add
      {currentStep?.value === 'one' && <h3>Step one</h3>}
      {currentStep?.value === 'two' && <h3>Step two</h3>}
      {currentStep?.value === 'three' && <h3>Step three</h3>}
    </h1>
  )
}

interface AddFlowProps {
  currentStep?: {
    value?: string
  }
}

export default AddFlow
