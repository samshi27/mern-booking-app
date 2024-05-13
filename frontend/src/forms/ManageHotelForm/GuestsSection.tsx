import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>

      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300 rounded">
        <label className="text-gray-700 text-sm font-bold">
          Adults
          <input
            min={1}
            type="number"
            className="border border-gray-300 rounded w-full py-1 px-2 font-normal mt-1"
            {...register("adultCount", { required: "This field is required" })}
          />
          {errors.adultCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold">
          Children
          <input
            min={0}
            type="number"
            className="border border-gray-300 rounded w-full py-1 px-2 font-normal mt-1"
            {...register("childCount", { required: "This field is required" })}
          />
          {errors.childCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
