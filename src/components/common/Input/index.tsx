import { cn } from "@/utils/clsx";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { forwardRef } from "react";

type Props = TextFieldProps & {
  title?: string;
  errorMessage?: string;
  required?: boolean;
  classNameContainer?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ title, errorMessage, required, classNameContainer, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1 w-full", classNameContainer)}>
        <Typography
          component={"label"}
          htmlFor={props?.name}
          className={cn(
            "text-[16px]! text-[#0C1311] font-heading! font-semibold! leading-normal! tracking-[1%]!",
            {
              "hidden!": !title,
              "text-[#ED0131]!": !!errorMessage,
            },
          )}
        >
          {title}
          {required && <span className="text-[#ED0131] ml-1">*</span>}
        </Typography>
        <TextField
          {...props}
          inputRef={ref}
          autoFocus={props.autoFocus}
          id={props?.name}
          placeholder={props.placeholder || "Type here..."}
          variant="outlined"
          slotProps={{
            input: {
              sx: {
                background: "#F9F9F9",
                borderRadius: "4px",
                fontFamily: "inter ",
                  padding: 0,
              },
              endAdornment: props?.InputProps?.endAdornment,
            },
            root: {
              sx: {
                padding: 0,
                width: "100%",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: errorMessage ? "1px solid #FF0000" : "none",
                },
                "& .MuiInputBase-input": {
                  padding: "12px",
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              },
            },
          }}
        />
        {errorMessage && (
          <Typography color="error" variant="caption">
            {errorMessage}
          </Typography>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
