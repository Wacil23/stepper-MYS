import { useEffect, useRef, useState } from "react";
import BeneficiaryForm from "../../components/beneficiary/BeneficiaryForm";
import FrameForm from "../../components/frame/FrameForm";
import { useFormContext } from "../../contexts/FormProvider";
import { BeneficiariesCreationModel } from "../../models/beneficiary/BeneficiaryCreationModel";
import { createCart } from "../../services/queries/cart/Cart.query";
import { ICartInput } from "../../models/cart/ICart";
import { useTranslation } from "react-i18next";
import { calculWheelchairPrice } from "../../utils/calculWheelchair";
import QuantityForm from "../../components/quantity/QuantityForm";

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 3;
  const { formik } = useFormContext();
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);
  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;
  const stepperRef = useRef<HTMLDivElement | null>(null);
  const headerHeight = 85;
  const { setTotalPrice, totalPrice, currentProduct, cadreProduct } =
    useFormContext();
  // const [priceWithoutDiscount, setPriceWithoutDiscount] = useState<number>(0);
  const { t } = useTranslation();

  const aMale = t("beneficiaries.fields.gender.options.aMale");
  const aFemale = t("beneficiaries.fields.gender.options.aFemale");
  const female = t(
    "beneficiaries.fields.gender.options.female",
  ).toLocaleLowerCase();
  const sick = t("beneficiaries.fields.status.options.sick");

  const handleValidateStep = async (step: number) => {
    const fieldsToValidate = getFieldsForStep(step);

    // First, mark fields as touched
    if (step === 1) {
      const touchedBeneficiaries = formik.values.beneficiaries.map(() => ({
        name: true,
        status: true,
        gender: true,
        wheelchairCount: true,
        frameType: true,
      }));

      await formik.setTouched({
        ...formik.touched,
        beneficiaries: touchedBeneficiaries,
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
        const firstErrorElement = document.getElementById(
          `beneficiaries[${errorIndexes[0]}].name`,
        );
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          firstErrorElement.focus({ preventScroll: true });
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
        const topPosition =
          stepperRef.current.getBoundingClientRect().top + window.scrollY;
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
      const productType = formik.values.productType;

      if (!isValid) return;

      formik.handleSubmit();
      const { beneficiaries } = formik.values;

      const wheelchairLines = beneficiaries.map((beneficiary) => {
        const isWheelchair =
          productType === "wheelchair" && "wheelchairCount" in beneficiary;
        const isQuran = productType === "quran" && "quranCount" in beneficiary;
        const isOmra = productType === "omra" && "omraCount" in beneficiary;
        const isOmraRamadan =
          productType === "omraRamadan" && "omraCount" in beneficiary;

        const genderValue = (gender: string) =>
          gender === female ? aFemale : aMale;
        const frameTypeValue = (frameType: string) =>
          frameType === "mail"
            ? t("checkout.attributes.frameTypeMail")
            : t("checkout.attributes.frameTypeQr");

        const wheelchairVariant = import.meta.env
          .VITE_WHEELCHAIR_VARIANT_PRODUCT;
        const quranVarian = import.meta.env.VITE_QURAN_VARIANT_PRODUCT;
        const omraVarian = import.meta.env.VITE_OMRA_VARIANT_PRODUCT;
        const omraRamadanVarian = import.meta.env
          .VITE_OMRA_RAMADAN_VARIANT_PRODUCT;
        const customOmraAttribute =
          (isOmra || isOmraRamadan) && beneficiary.fatherName
            ? [
                {
                  key: t("checkout.attributes.fatherOmra"),
                  value: beneficiary.fatherName,
                },
              ]
            : [];

        return {
          merchandiseId: isWheelchair
            ? wheelchairVariant
            : isQuran
              ? quranVarian
              : isOmra
                ? omraVarian
                : omraRamadanVarian,
          quantity: isWheelchair
            ? beneficiary.wheelchairCount
            : isQuran
              ? beneficiary.quranCount
              : isOmra || isOmraRamadan
                ? beneficiary.omraCount
                : 1,
          attributes: [
            {
              key: t("checkout.attributes.gender"),
              value: genderValue(beneficiary.gender),
            },
            { key: t("checkout.attributes.name"), value: beneficiary.name },
            {
              key: t("checkout.attributes.status"),
              value: beneficiary.status,
            },
            {
              key: t("checkout.attributes.proof"),
              value: frameTypeValue(beneficiary.frameType),
            },
            ...customOmraAttribute,
          ],
        };
      });

      const frameQrLines = beneficiaries
        .filter((beneficiary) => beneficiary.frameType === "qr")
        .map((beneficiary) => {
          return {
            merchandiseId: import.meta.env.VITE_FRAME_VARIANT_PRODUCT,
            quantity: 1,
            attributes: [
              {
                key: t("checkout.attributes.proofInName"),
                value: beneficiary.name,
              },
            ],
          };
        });

      const iftarLines = beneficiaries.map((beneficiary) => {
        const isWheelchair =
          productType === "wheelchair" && "wheelchairCount" in beneficiary;
        const isQuran = productType === "quran" && "quranCount" in beneficiary;
        const isOmra = productType === "omra" && "omraCount" in beneficiary;
        const isOmraRamadan =
          productType === "omraRamadan" && "omraCount" in beneficiary;
        return {
          merchandiseId: "gid://shopify/ProductVariant/49945517785430",
          quantity: isWheelchair
            ? beneficiary.wheelchairCount
            : isQuran
              ? beneficiary.quranCount
              : isOmra || isOmraRamadan
                ? beneficiary.omraCount
                : 1,
          attributes: [
            {
              key: t("checkout.attributes.iftar"),
              value: beneficiary.name,
            },
          ],
        };
      });

      const countryMapBySymbol: Record<string, string> = {
        "€": "FR",
        CHF: "CH",
        Lek: "AL",
        лв: "BG",
      };

      function getCountryCodeFromSymbol(symbol: string): string {
        return countryMapBySymbol[symbol] || "FR";
      }

      const getCountryCode = (): string => {
        const term = window.location.hostname.split(".")[1];
        if (term === "it") return "IT";
        if (term === "de") return "DE";
        if (term === "nl") return "NL";
        const symbol = currentProduct?.currentSymbol;
        return getCountryCodeFromSymbol(symbol);
      };

      getCountryCode();

      const input: ICartInput = {
        lines: [...wheelchairLines, ...frameQrLines, ...iftarLines],
        buyerIdentity: {
          countryCode: getCountryCode(),
        },
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

  const isWheelchair =
    formik.values.productType === "wheelchair" &&
    "wheelchairCount" in formik.values.beneficiaries[0];
  const isQuran =
    formik.values.productType === "quran" &&
    "quranCount" in formik.values.beneficiaries[0];
  const isOmra =
    formik.values.productType === "omra" &&
    "omraCount" in formik.values.beneficiaries[0];
  const isOmraRamadan =
    formik.values.productType === "omraRamadan" &&
    "omraCount" in formik.values.beneficiaries[0];
  let initialValue: BeneficiariesCreationModel["beneficiaries"][0] | null =
    null;

  if (isWheelchair) {
    initialValue = {
      name: "",
      gender: female,
      status: sick,
      wheelchairCount: 1,
      wheelchairSelection: 1,
      frameType: "mail",
      isValid: false,
      price: 0,
    };
  }

  if (isQuran) {
    initialValue = {
      name: "",
      gender: female,
      status: sick,
      quranCount: 1,
      quranSelection: 1,
      frameType: "mail",
      isValid: false,
      price: 0,
    };
  }

  if (isOmra || isOmraRamadan) {
    initialValue = {
      name: "",
      fatherName: "",
      gender: female,
      status: sick,
      omraCount: 1,
      omraSelection: 1,
      frameType: "mail",
      isValid: false,
      price: 0,
    };
  }
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
        formik.errors.beneficiaries &&
        formik.touched.beneficiaries?.[index] &&
        Array.isArray(formik.errors.beneficiaries)
          ? formik.errors.beneficiaries
              .map((err: any, i: number) => (err ? i : -1))
              .filter((i: number) => i !== -1)
          : [];

      return [...errorIndexes, index];
    });
  };

  useEffect(() => {
    const productType = formik.values.productType;
    const totalQuantity = formik.values.beneficiaries.reduce((acc, b) => {
      const isWheelchair =
        productType === "wheelchair" && "wheelchairCount" in b;
      const isQuran =
        formik.values.productType === "quran" && "quranCount" in b;
      const isOmra = formik.values.productType === "omra" && "omraCount" in b;
      const isOmraRamadan =
        formik.values.productType === "omraRamadan" && "omraCount" in b;
      const total =
        acc +
        (isWheelchair
          ? b.wheelchairCount
          : isQuran
            ? b.quranCount
            : isOmra || isOmraRamadan
              ? b.omraCount
              : 0);
      return total;
    }, 0);
    let reduction = 0;
    let promo = "0";
    if (isWheelchair) {
      if (totalQuantity === 2) promo = "5";
      else if (totalQuantity === 3) promo = "10";
      else if (totalQuantity >= 4) promo = "15";
    } else if (isQuran) {
      // if (totalQuantity === 1) reduction = 10.9;
      // if (totalQuantity === 2) reduction = 20.8;
      // else if (totalQuantity === 3) reduction = 30.7;
      // else if (totalQuantity === 4) reduction = 40.6;
      // else if (totalQuantity === 5) reduction = 50.5;
      // else if (totalQuantity === 6) reduction = 60.4;
      // else if (totalQuantity === 7) reduction = 70.3;
      // else if (totalQuantity === 8) reduction = 80.2;
      // else if (totalQuantity === 9) reduction = 90.1;
      // else if (totalQuantity === 10) reduction = 100;
      // else if (totalQuantity > 10) {reduction = 0; promo = "20";}
    }

    const { totalPrice } = calculWheelchairPrice(
      formik.values.productType,
      Number(currentProduct?.currentPrice),
      totalQuantity,
      reduction,
      Number(promo),
    );

    const framesCount = formik.values.beneficiaries.filter(
      (b) => b.frameType === "qr",
    ).length;
    const framesPrice =
      framesCount *
      (cadreProduct.cadrePrice ? cadreProduct.cadrePrice / 100 : 10.9);
    const finalPrice = totalPrice + framesPrice;
    const totalWithoutDecimal = finalPrice.toFixed(2).split(".");
    let totalFinalPrice = finalPrice;
    if (totalWithoutDecimal[1] === "00") {
      totalFinalPrice = Number(finalPrice.toFixed(0));
    } else {
      totalFinalPrice = Number(finalPrice.toFixed(2));
    }
    setTotalPrice(totalFinalPrice);
    // setPriceWithoutDiscount(priceWithoutDiscount);
  }, [formik.values.beneficiaries, currentProduct, setTotalPrice]);

  const steps = [
    {
      number: 1,
      value: t("steps.stepOne"),
      component: (
        <BeneficiaryForm
          openIndexes={openIndexes}
          onToggleBeneficiary={(index) => {
            const hasError =
              !!formik.errors.beneficiaries?.[index] &&
              !!formik.touched.beneficiaries?.[index];
            handleToggleBeneficiary(index, hasError);
          }}
        />
      ),
    },
    { number: 2, value: t("steps.stepTwo"), component: <QuantityForm /> },
    { number: 3, value: t("steps.stepThree"), component: <FrameForm /> },
  ];

  const totalProduct = formik.values.beneficiaries.reduce((acc, b) => {
    const isWheelchair =
      formik.values.productType === "wheelchair" && "wheelchairCount" in b;
    const isQuran = formik.values.productType === "quran" && "quranCount" in b;
    const isOmra = formik.values.productType === "omra" && "omraCount" in b;
    return (
      acc +
      (isWheelchair
        ? b.wheelchairCount
        : isQuran
          ? b.quranCount
          : isOmra
            ? b.omraCount
            : 0)
    );
  }, 0);

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
      <div className="my-7">
        <div className="p-4 border-l-red-500 border-r-black border-t-black border-b-green-800 border-2 rounded-xl flex items-center gap-[14px]">
          <img
            src="https://cdn.shopify.com/s/files/1/0793/7412/3350/files/iconpalestine.svg?v=1740573459"
            width={25}
          />
          <div className="flex flex-col gap-1 ">
            <p className="text-base text-pretty text-start font-semibold">
              {t("steps.infoTitle")}
            </p>
            <p className="text-xs text-pretty">{t("steps.infoDescription")}</p>
          </div>
        </div>
      </div>
      <div>{steps.find((step) => step.number === currentStep)?.component}</div>
      <div className="flex justify-between mt-4">
        {!isFirstStep ? (
          <button
            type="button"
            onClick={handlePrevious}
            className="text-primary text-base"
          >
            {t("steps.previous")}
          </button>
        ) : (
          <button
            type="button"
            className={`cursor-pointer px-6 py-4 rounded-full text-base text-secondary font-semibold`}
            onClick={() => handleAddBeneficiary()}
          >
            {t("beneficiaries.addBeneficiary")}
          </button>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-primary float-right text-white font-semibold text-base rounded-full px-6 py-4"
        >
          {isLastStep ? t("steps.submit") : t("steps.next")}
        </button>
      </div>
      <div className="mt-7">
        {(isLastStep || !isFirstStep) && (
          <div className="rounded-xl my-6 bg-dark-light p-2">
            <div className="bg-white p-4 flex items-center justify-between rounded-xl">
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold">{t("recap.total")}</p>
                <p className="text-xs font-light my-1">
                  {t("recap.total_description", {
                    number: totalProduct,
                  })}
                </p>
                {/* {ecoPrice > 0 && (
                  <p className="text-xs font-semibold mt-2">
                    Éconnomie total :
                  </p>
                )} */}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base font-bold">
                  {totalPrice.toFixed(2)} {currentProduct.currentSymbol}
                </p>
                <p className="text-base text-right font-medium my-1">
                  {t("recap.free")}
                </p>
                {/* {ecoPrice > 0 && (
                  <p className="text-xs font-bold mt-2 text-right">
                    {ecoPrice.toFixed(2)}
                    {currentProduct.currentSymbol}
                  </p>
                )} */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Stepper;
