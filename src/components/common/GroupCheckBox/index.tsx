import FormControl from "@mui/material/FormControl";
import React, { useId } from "react";
import { Typography, FormControlLabel, Box, Checkbox } from "@mui/material";
import { cn } from "@/utils/clsx";
import { Controller } from "react-hook-form";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
type Props<T> = {
  title?: string;
  name: string;
  required?: boolean;
  errorMessage?: string;
  subTitle?: string;
  control: any;
  checkboxOptions?: { label: string; value: string }[];
  classNameContent?: string;
};

const GroupCheckBox = <T,>({
  title,
  required,
  errorMessage,
  checkboxOptions,
  subTitle,
  control,
  name,
  classNameContent,
}: Props<T>) => {
  const baseId = useId();
  return (
    <FormControl fullWidth className="flex flex-col gap-3 w-full">
      <div
        className={cn("flex flex-col", {
          "hidden!": !title && !subTitle,
        })}
      >
        <Typography
          component={"label"}
          htmlFor={name}
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
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const values:
            | string[]
            | {
                label: string;
                description: string;
              } = Array.isArray(field.value) ? field.value : [];

          const toggleOnly = (value: string) => {
            const next = values.includes(value)
              ? values.filter((v) => v !== value)
              : [...values, value];
            field.onChange(next);
          };

          return (
            <Box
              className={cn(
                "grid w-full grid-cols-1 md:grid-cols-[6fr_6fr] gap-4",
                classNameContent,
              )}
            >
              {checkboxOptions?.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option.value}
                  control={
                    <Checkbox
                      inputProps={{
                        id: `${baseId}-${name}-${index}`,
                      }}
                      checked={values.includes(option.value)}
                      onChange={() => toggleOnly(option.value)}
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<RadioButtonCheckedIcon />}
                    />
                  }
                  label={option.label}
                  sx={{
                    margin: 0,
                    padding: "12px 20px",
                    border: values.includes(option.value)
                      ? "1px solid #1F2164"
                      : "1px solid #DBDBDC",
                    background: "#FFFFFF",
                    borderRadius: "4px",
                    "& .Mui-checked": {
                      color: "#1F2164",
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
                          "text-[#1E1E1E]!": values.includes(option.value),
                        },
                      ),
                    },
                  }}
                />
              ))}
            </Box>
          );
        }}
      />
      {errorMessage && (
        <Typography color="error" variant="caption">
          {errorMessage}
        </Typography>
      )}
    </FormControl>
  );
};

export default GroupCheckBox;
