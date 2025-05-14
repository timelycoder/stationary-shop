import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TShippingAddress } from "@/redux/features/auth/authSlice";

type TFormErrors = Record<keyof TShippingAddress | "contactPhone", boolean>;

interface OrderFormProps {
  shippingAddress: TShippingAddress;
  setShippingAddress: React.Dispatch<React.SetStateAction<TShippingAddress>>;
  contactPhone: string;
  setContactPhone: React.Dispatch<React.SetStateAction<string>>;
  formErrors: TFormErrors;
  setFormErrors: React.Dispatch<React.SetStateAction<TFormErrors>>;
  onSubmit: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({
  shippingAddress,
  setShippingAddress,
  contactPhone,
  setContactPhone,
  formErrors,
  setFormErrors,
  onSubmit,
}) => {
  const handleInputChange = (field: keyof TShippingAddress, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setContactPhone(value);
    if (formErrors.contactPhone) {
      setFormErrors((prev) => ({ ...prev, contactPhone: false }));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4 mx-auto p-4 mb-5 border rounded-md shadow-sm bg-white"
    >
      <h2 className="text-xl font-bold mb-4">Shipping Details</h2>

      <Label htmlFor="street">Street</Label>
      <Input
        id="street"
        value={shippingAddress.street}
        onChange={(e) => handleInputChange("street", e.target.value)}
        placeholder="e.g Ga 124, Badda Road"
      />
      {formErrors.street && (
        <p className="text-red-500 text-sm">Street is required</p>
      )}

      <Label htmlFor="city">City</Label>
      <Input
        id="city"
        value={shippingAddress.city}
        onChange={(e) => handleInputChange("city", e.target.value)}
        placeholder="e.g Dhaka"
      />
      {formErrors.city && (
        <p className="text-red-500 text-sm">City is required</p>
      )}

      <Label htmlFor="postalCode">Postal Code</Label>
      <Input
        id="postalCode"
        value={shippingAddress.postalCode}
        onChange={(e) => handleInputChange("postalCode", e.target.value)}
        placeholder="e.g 1207"
      />
      {formErrors.postalCode && (
        <p className="text-red-500 text-sm">Postal Code is required</p>
      )}

      <Label htmlFor="country">Country</Label>
      <Input
        id="country"
        value={shippingAddress.country}
        onChange={(e) => handleInputChange("country", e.target.value)}
        placeholder="e.g Bangladesh"
      />
      {formErrors.country && (
        <p className="text-red-500 text-sm">Country is required</p>
      )}

      <Label htmlFor="contactPhone">Contact Phone</Label>
      <Input
        className="[placeholder:text-sm placeholder:text-red-200]"
        id="contactPhone"
        value={contactPhone}
        onChange={(e) => handlePhoneChange(e.target.value)}
        placeholder="e.g. +880123456789"
      />
      {formErrors.contactPhone && (
        <p className="text-red-500 text-sm">Contact Phone is required</p>
      )}
    </form>
  );
};

export default OrderForm;
