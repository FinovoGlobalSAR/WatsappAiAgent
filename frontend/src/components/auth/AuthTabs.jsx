import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function AuthInput({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
  required = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      <label className="text-[13px] font-semibold text-[#183d40]">
        {label}

        {required && (
          <span className="text-[#0c969a] ml-1">*</span>
        )}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            strokeWidth={1.7}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8aa0a3]"
          />
        )}

        <input
          type={
            isPassword && showPassword
              ? "text"
              : type
          }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            auth-input
            w-full
            h-[50px]
            rounded-xl
            border
            border-[#d8e4e5]
            bg-white
            text-[13px]
            text-[#183d40]
            placeholder:text-[#9aabad]
            transition-all
            ${Icon ? "pl-11" : "pl-4"}
            ${isPassword ? "pr-12" : "pr-4"}
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#84999c] hover:text-[#087f84]"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}