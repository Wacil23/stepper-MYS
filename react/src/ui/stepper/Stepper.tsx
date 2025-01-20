import { useRef, useState } from "react";
import BeneficiaryForm from "../../components/beneficiary/BeneficiaryForm";
import FrameForm from "../../components/frame/FrameForm";
import WheelchairForm from "../../components/wheelchair/WheelchairForm";
import { useFormContext } from "../../contexts/FormProvider";
import { BeneficiariesCreationModel } from "../../models/beneficiary/BeneficiaryCreationModel";
import { createCart } from "../../services/queries/cart/Cart.query";
import { ICartInput } from "../../models/cart/ICart";

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 3;
  const { formik } = useFormContext();
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);
  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;
  const stepperRef = useRef<HTMLDivElement | null>(null);
  const headerHeight = 85;

  const handleValidateStep = async (step: number) => {
    const fieldsToValidate = getFieldsForStep(step);

    // First, mark fields as touched
    if (step === 1) {
      const touchedBeneficiaries = formik.values.beneficiaries.map(() => ({
        name: true,
        status: true,
        gender: true,
        wheelchairCount: true,
        frameType: true
      }));

      await formik.setTouched({
        ...formik.touched,
        beneficiaries: touchedBeneficiaries
      });
    }

    // Then validate the form
    const errors = await formik.validateForm();

    // Handle beneficiary-specific errors
    if (step === 1 && errors.beneficiaries) {
      const errorIndexes = Array.isArray(errors.beneficiaries)
        ? errors.beneficiaries
            .map((err: any, i: number) => (err ? i : -1))
            .filter((i: number) => i !== -1)
        : [];

      setOpenIndexes(errorIndexes);

      // Scroll to first error if exists
      if (errorIndexes.length > 0) {
        const firstErrorElement = document.getElementById(`beneficiaries[${errorIndexes[0]}].name`);
        console.log(firstErrorElement)
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstErrorElement.focus({preventScroll: true})
        }
        return false;
      }
    }

    const stepErrors = getStepErrors(errors, fieldsToValidate);
    return Object.keys(stepErrors).length === 0;
  };



  const handleNext = async () => {
    const isValid = await handleValidateStep(currentStep);

    if (isValid) {
      if (stepperRef.current) {
        const topPosition = stepperRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: topPosition - headerHeight,
          behavior: "smooth",
        });
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (stepperRef.current) {
      const topPosition =
        stepperRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: topPosition - headerHeight,
        behavior: "smooth",
      });
    }
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (isLastStep) {
      const isValid = await handleValidateStep(currentStep);
      if (!isValid) return;
      formik.handleSubmit();
      const { beneficiaries } = formik.values;

      const wheelchairLines = beneficiaries.map((beneficiary) => {
        const genderValue = (gender: string) =>
          gender === "femme" ? "Une femme" : "Un homme";
        const frameTypeValue = (frameType: string) =>
          frameType === "mail" ? "Vidéo par mail" : "Cadre QR code";
        return {
          merchandiseId: "gid://shopify/ProductVariant/47610688274774",
          quantity: beneficiary.wheelchairCount,
          attributes: [
            { key: "Genre ", value: genderValue(beneficiary.gender) },
            { key: "Au nom de ", value: beneficiary.name },
            { key: "Status ", value: beneficiary.status },
            {
              key: "Preuve du dépôt ",
              value: frameTypeValue(beneficiary.frameType),
            },
          ],
        };
      });

      const frameQrLines = beneficiaries
        .filter((beneficiary) => beneficiary.frameType === "qr")
        .map((beneficiary) => {
          return {
            merchandiseId: "gid://shopify/ProductVariant/49016071651670",
            quantity: 1,
            attributes: [{ key: "Preuve au nom de ", value: beneficiary.name }],
          };
        });

      const input: ICartInput = {
        lines: [...wheelchairLines, ...frameQrLines],
      };

      const cartResponse = await createCart(input);
      if (cartResponse.cartCreate.cart.checkoutUrl) {
        window.location.href = cartResponse.cartCreate.cart.checkoutUrl;
      }
    } else {
      await handleNext();
    }
  };

  const getFieldsForStep = (step: number): string[] => {
    switch (step) {
      case 1:
        return ["beneficiaries"];
      case 2:
        return ["wheelchairs"];
      case 3:
        return ["proof"];
      default:
        return [];
    }
  };

  const getStepErrors = (errors: any, fields: string[]): any => {
    const stepErrors: any = {};
    fields.forEach((field) => {
      if (errors[field]) {
        stepErrors[field] = errors[field];
      }
    });
    return stepErrors;
  };

  const getStepStatus = (stepNumber: number) => {
    if (stepNumber < currentStep) return "completed";
    if (stepNumber === currentStep) return "active";
    return "upcoming";
  };

  const initialValue: BeneficiariesCreationModel["beneficiaries"][0] = {
    name: "",
    gender: "femme",
    status: "Malade",
    wheelchairCount: 1,
    wheelchairSelection: 1,
    frameType: "mail",
    isValid: false,
  };

  const handleAddBeneficiary = () => {
    const newBeneficiaries = [...formik.values.beneficiaries, initialValue];
    formik.setFieldValue("beneficiaries", newBeneficiaries, false);

    // Ouvre seulement la nouvelle carte
    const lastIndex = newBeneficiaries.length - 1;
    setOpenIndexes([lastIndex]);
  };

  const handleToggleBeneficiary = (index: number, hasError: boolean) => {
    setOpenIndexes((prev) => {
      if (prev.includes(index)) {
        if (hasError) {
          return prev;
        }
        return prev.filter((i) => i !== index);
      }

      const errorIndexes =
        formik.errors.beneficiaries && formik.touched.beneficiaries?.[index] &&
        Array.isArray(formik.errors.beneficiaries)
          ? formik.errors.beneficiaries
              .map((err: any, i: number) => (err ? i : -1))
              .filter((i: number) => i !== -1)
          : [];

      return [...errorIndexes, index];
    });
  };

  const steps = [
    {
      number: 1,
      value: "Bénéficiaires",
      component: (
        <BeneficiaryForm
          openIndexes={openIndexes}
          onToggleBeneficiary={(index) => {
            const hasError = !!formik.errors.beneficiaries?.[index] && !!formik.touched.beneficiaries?.[index]
            handleToggleBeneficiary(index, hasError);
          }}
        />
      ),
    },
    { number: 2, value: "Quantité", component: <WheelchairForm /> },
    { number: 3, value: "Preuve du dépôt ", component: <FrameForm /> },
  ];

  return (
    <>
      <div
        ref={stepperRef}
        className="flex items-center w-full gap-5  justify-between"
      >
        {steps.map((step) => {
          const status = getStepStatus(step.number);
          return (
            <div key={step.number} className="flex w-2/6 flex-col gap-1">
              <p
                className={`text-sm text-nowrap font-semibold transition-colors duration-300 ${
                  status === "completed"
                    ? "text-secondary"
                    : status === "active"
                      ? "text-secondary"
                      : "text-gray-500"
                }`}
              >
                {step.value}
              </p>
              <div
                className={`w-full h-1 rounded-full transition-colors duration-300 ${
                  status === "completed"
                    ? "bg-secondary text-white"
                    : status === "active"
                      ? "bg-secondary  text-white"
                      : "bg-gray-200"
                }`}
              >
                {" "}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-7">
        {steps.find((step) => step.number === currentStep)?.component}
      </div>
      <div className="flex justify-between mt-4">
        {!isFirstStep ? (
          <button
            type="button"
            onClick={handlePrevious}
            className="text-primary text-base"
          >
            Précédent
          </button>
        ) : (
          <button
            type="button"
            className={`cursor-pointer border border-secondary px-6 py-4 rounded-full text-base text-secondary font-semibold`}
            onClick={() => handleAddBeneficiary()}
          >
            + Ajouter un bénéficiaire
          </button>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-primary float-right text-white font-semibold text-base rounded-full px-6 py-4"
        >
          {isLastStep ? "Soumettre" : "Suivant"}
        </button>
      </div>
    </>
  );
};

export default Stepper;
