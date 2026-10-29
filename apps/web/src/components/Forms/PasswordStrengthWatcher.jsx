import { useWatch } from "react-hook-form";
import PasswordStrengthBar from "../PasswordStrengthBar/PasswordStrengthBar";

export default function PasswordStrengthWatcher({ name = "password" }) {
  const passwordValue = useWatch({ name }) || "";

  return <PasswordStrengthBar password={passwordValue} />;
}

