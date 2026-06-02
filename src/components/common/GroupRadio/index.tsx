import FormControl from "@mui/material/FormControl";
import React from "react";
import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  RadioGroupProps,
} from "@mui/material";
import { cn } from "@/utils/clsx";

type Props<T> = RadioGroupProps & {
  title?: string;
  required?: boolean;
  errorMessage?: string;
  subTitle?: string;
  radioOptions?: { label: string; value: string }[];
};

const GroupRadio = <T,>({
  title,
  required,
  errorMessage,
  radioOptions,
  subTitle,
  ...props
}: Props<T>) => {
  return (
    <FormControl fullWidth className="flex flex-col gap-3 w-full">
      <div
        className={cn("flex flex-col", {
          "hidden!": !title && !subTitle,
        })}
      >
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
        <p
          className={cn(
            "text-[14px] font-normal font-body leading-normal text-[#707174] ",
            {
              "hidden!": !subTitle,
            },
          )}
        >
          {subTitle}
        </p>
      </div>
      <RadioGroup
        {...props}
        value={props.value}
        onChange={props.onChange}
        sx={(radioOptions?.length ?? 0) % 2 === 0 ? {
          display: "grid",
          gridTemplateColumns: "6fr 6fr",
          gap: "16px",
        } : {
          display: "grid",
          gridTemplateColumns: "12fr",
          gap: "16px",
        }}
      >
        {radioOptions?.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            control={<Radio />}
            label={option.label}
            sx={{
              margin: 0,
              padding: "12px 20px",
              border:
                option.value === props.value
                  ? "1px solid #1F2164"
                  : "1px solid #DBDBDC",
              background: "#FFFFFF",
              borderRadius: "4px",
              "& .Mui-checked": {
                color: "#1F2164 !important",
              },
              "& .MuiButtonBase-root": {
                padding: 0,
              },
              "& .MuiSvgIcon-root": {
                width: "20px",
                height: "20px",
              },
            }}
            slotProps={{
              typography: {
                className: cn(
                  "text-[#707174] text-base font-body font-normal ml-3!",
                  {
                    "text-[#1E1E1E]!": option.value === props.value,
                  },
                ),
              },
            }}
          />
        ))}
      </RadioGroup>
      {errorMessage && (
        <Typography color="error" variant="caption">
          {errorMessage}
        </Typography>
      )}
    </FormControl>
  );
};

export default GroupRadio;
