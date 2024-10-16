import { Dispatch, SetStateAction, useState } from 'react'
import SearchIcon from '@/assets/icons/MagnifyGlassIcon.svg?react'
import CloseIcon from '@/assets/icons/CloseIcon.svg?react'

type InputProps = {
  inputType: "INPUT" | "PASSWORD" | "SEARCH";
  placeholder: string;
  onChange: Dispatch<SetStateAction<string>>;
  canDelete: boolean;
}

const inputStyler = (status: string) => {
  switch (status) {
    case "DISABLED":
      return "shadow-sm border-[#eae9f6] text-[#bdbdbd]"
    case "TYPING":
      return "shadow-sm border-black text-black"
    case "INVALID":
      return "shadow-sm border-[#FF6F61] text-[#FF6F61]"
  }
}

const Input = ({inputType, placeholder, onChange, canDelete}: InputProps) => {
  const [currentStatus, setCurrentStatus] = useState<"DISABLED" | "TYPING" | "INVALID">("DISABLED")
  const handleType = (input: string) => {
    setCurrentStatus("TYPING");
    onChange(input)
  }
  return (
    <div className={`w-full flex items-center justify-between text-left text-sm font-[Pretendard] border rounded-xl ${inputStyler(currentStatus)} bg-white py-[10px] pl-4 pr-[14px]`}>
      {inputType === "SEARCH" && <SearchIcon />}
      <input
        placeholder={placeholder}
        className={"w-full"}
        onChange={(e) => handleType(e.target.value)}
        type={inputType === "PASSWORD" ? 'password': "text"}
      />
      {inputType === "PASSWORD" && <input placeholder={placeholder} />}
      {canDelete && <CloseIcon />}
    </div>
  )
}

export default Input