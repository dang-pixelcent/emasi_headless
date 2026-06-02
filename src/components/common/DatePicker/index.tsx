import { cn } from "@/utils/clsx";
import { FormControl, Typography } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { DatePicker as DatePickerMui } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import moment from "moment";
type Props<T> = DatePickerProps & {
  name?: string;
  control?: any;
  title?: string;
  required?: boolean;
  placeholder?: string;
  errorMessage?: string;
};

const DatePicker = forwardRef<HTMLInputElement, Props<any>>(
  (
    {
      title,
      required,
      placeholder,
      errorMessage,
      slotProps,
      control,
      name,
      ...props
    },
    ref,
  ) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient) {
      return (
        <FormControl fullWidth className="flex flex-col gap-1 w-full">
          <Typography
            component={"label"}
            htmlFor={name}
            className={cn(
              "text-[16px]! font-heading! font-medium! leading-normal! tracking-[1%]!",
              {
                "hidden!": !title,
                "text-[#ED0131]!": !!errorMessage,
              },
            )}
          >
            {title}
            {required && <span className="text-[#ED0131] ml-1">*</span>}
          </Typography>
          <div className="h-[47px] rounded-[4px] bg-[#F9F9F9]" />
          {errorMessage && (
            <Typography color="error" variant="caption">
              {errorMessage}
            </Typography>
          )}
        </FormControl>
      );
    }
    return (
      <FormControl
        fullWidth
        className="flex flex-col gap-1 w-full"
        sx={{
          "& .MuiPickersSectionList-root": {
            padding: "12px 0 !important",
          },
        }}
      >
        <Typography
          component={"label"}
          htmlFor={name}
          className={cn(
            "text-[16px]! font-heading! font-medium! leading-normal! tracking-[1%]!",
            {
              "hidden!": !title,
              "text-[#ED0131]!": !!errorMessage,
            },
          )}
        >
          {title}
          {required && <span className="text-[#ED0131] ml-1">*</span>}
        </Typography>
        <Controller
          name={name as string}
          control={control}
          render={({ field }) => {
            const parsedValue = field.value
              ? moment.isMoment(field.value)
                ? field.value
                : moment(field.value, "DD/MM/YYYY").isValid()
                ? moment(field.value, "DD/MM/YYYY")
                : null
              : null;
            return (
              <DatePickerMui
                format="DD/MM/YYYY"
                value={parsedValue}
                onChange={(date) => {
                  if (!date) {
                    field.onChange("");
                    return;
                  }
                  if (moment.isMoment(date) && date.isValid()) {
                    const formatDate = moment(date).format("DD/MM/YYYY").toString();
                    field.onChange(formatDate);
                  }
                }}
                onAccept={(date) => {
                  if (date && moment.isMoment(date) && date.isValid()) {
                    const formatDate = moment(date).format("DD/MM/YYYY").toString();
                    field.onChange(formatDate);
                  }
                }}
                slotProps={{
                  ...slotProps,
                  textField: {
                    ...slotProps?.textField,
                    inputRef: ref,
                    placeholder: placeholder || "Select date",
                    variant: "outlined",
                    sx: {
                      "& .MuiPickersOutlinedInput-notchedOutline": {
                        border: errorMessage ? "1px solid #FF0000" : "none",
                      },
                      background: "#F9F9F9",
                      borderRadius: "4px",
                      fontFamily: "inter ",
                    },
                  },
                  field: {
                    ...slotProps?.field,
                    onBlur: (e: any) => {
                      const inputValue = e.target?.value;
                      if (inputValue) {
                        const parsedDate = moment(inputValue, "DD/MM/YYYY", false);
                        if (parsedDate.isValid()) {
                          field.onChange(parsedDate.format("DD/MM/YYYY"));
                        }
                      }
                      field.onBlur();
                    },
                  },
                }}
                sx={{
                  "& .MuiPickersInputBase-root": {
                    paddingInline: "12px",
                  },
                }}
                {...props}
              />
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
  },
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
