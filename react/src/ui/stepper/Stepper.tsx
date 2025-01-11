import Beneficiary from "../../components/beneficiary/form/BeneficiaryForm";

const Stepper = () => {
  const stepNumber = [
    { number: 1, value: "Vos bénéficiaires" },
    { number: 2, value: "Nombre de fauteuils" },
    { number: 3, value: "Preuve du dépôt " },
  ];
  return (
    <>
      <div className="flex items-center w-full gap-5  justify-between">
        {stepNumber.map((step, index) => (
          <div key={index}>
            <div className="flex flex-col relative">
              <div
                key={step.number}
                className={` text-center size-9 rounded-full ${
                  step.number === 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-900"
                } relative`}
              >
                <span className="absolute text-base -translate-x-1/2 -translate-y-1/2 font-bold left-1/2 top-1/2">
                  {step.number}
                </span>
              </div>
              <p className={`text-xs absolute -bottom-6 text-gray-500 text-nowrap font-thin ${step.number === 3 && 'right-0'} ${step.number === 2 && 'right-1/2 translate-x-1/2'} `}>{step.value}</p>
            </div>
            {step.number === 1 && (
              <div className="h-[2px] rounded-full w-1/2 bg-gray-300">&nbsp;</div>
            )}
            {step.number === 2 && (
              <div className="h-[2px] w-1/2 rounded-full bg-gray-300">&nbsp;</div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-12">
        <Beneficiary />
      </div>
    </>
  );
};

export default Stepper;
