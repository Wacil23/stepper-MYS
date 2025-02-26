import { GrSecure } from "react-icons/gr";
import { TbCreditCardRefund, TbTruckDelivery } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const Reassurance = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col my-8 gap-7">
      <div className="  w-full  rounded-xl items-center gap-4">
        <div className="flex  items-center gap-4 rounded-xl bg-white">
          <GrSecure className="text-secondary w-[10%]" size={24} />
          <div className="flex flex-col  gap-1 w-[90%]">
            <p className="text-base font-semibold text-xs">
              {t("reassurance.title_paiement")}
            </p>
            <span className="text-[10px]">
              {t("reassurance.description_paiement")}
            </span>
          </div>
        </div>
      </div>
      <div className="  rounded-xl items-center gap-4">
        <div className="flex items-center gap-4 rounded-xl bg-white">
          <TbTruckDelivery className="text-secondary w-[10%]" size={24} />
          <div className="flex flex-col gap-1 w-[90%]">
            <p className="text-base font-semibold text-xs">
              {t("reassurance.title_livraison")}
            </p>
            <span className="text-[10px]">
              {t("reassurance.description_livraison")}
            </span>
          </div>
        </div>
      </div>
      <div className="  rounded-xl items-center gap-4">
        <div className="flex items-center gap-4 rounded-xl bg-white">
          <TbCreditCardRefund className="text-secondary w-[10%]" size={24} />
          <div className="flex flex-col gap-1 w-[90%]">
            <p className="text-base font-semibold text-xs">
              {t("reassurance.title_satisfaction")}
            </p>
            <span className="text-[10px]">
              {t("reassurance.description_satisfaction")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reassurance;
