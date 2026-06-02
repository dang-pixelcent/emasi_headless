import FormControl from "@mui/material/FormControl";
import React, { forwardRef } from "react";
import {
  Select as SelectMui,
  MenuItem,
  SelectProps,
  Typography,
} from "@mui/material";
import { cn } from "@/utils/clsx";

type Props<T> = SelectProps & {
  title?: string;
  required?: boolean;
  data: (T | any)[];
  placeholder?: string;
  errorMessage?: string;
};

const Select = forwardRef<HTMLSelectElement, Props<any>>(
  ({
    title,
    required,
    data = [],
    placeholder,
    errorMessage,
    ...props
  }, ref) => {
    return (
      <FormControl fullWidth className="flex flex-col gap-1 w-full">
        <Typography
          component={"label"}
          htmlFor={props?.name}
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
        <SelectMui
          {...props}
          id={props?.name}
          variant="outlined"
          displayEmpty
          inputRef={ref}
          renderValue={(selected: any) => {
            const isEmpty =
              selected === "" ||
              selected === null ||
              selected === undefined ||
              (Array.isArray(selected) && selected.length === 0);

            if (isEmpty) {
              return (
                <p className="text-[#6D6D6D] font-normal text-base">
                  {placeholder || "Placeholder"}
                </p>
              );
            }
            if (selected?.image) {
              return (
                <>
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-6 h-4 mr-2 inline-block"
                  />
                  {selected.name}
                </>
              );
            }

            return selected;
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 300,
                width: "218px",
              },
            },
          }}
          slotProps={{
            input: {
              sx: {
                background: "#F9F9F9",
                borderRadius: "4px",
                fontFamily: "inter",
              },
            },
            notchedOutline: {
              sx: {
                border: errorMessage ? "1px solid #ED0131" : "none",
              },
            },
          }}
          sx={{
            "& .MuiSelect-select": {
              padding: "12px",
            },
          }}
        >
          {placeholder && (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          )}
          {data.map((item, index) => (
            <MenuItem key={index} value={item["id"] || item}>
              {item["image"] && (
                <img
                  src={item["image"]}
                  alt={item["name"] || item}
                  className="w-6 h-4 mr-2 inline-block"
                />
              )}
              {item["name"] || item}
            </MenuItem>
          ))}
        </SelectMui>
        {errorMessage && (
          <Typography color="error" variant="caption">
            {errorMessage}
          </Typography>
        )}
      </FormControl>
    );
  },
);

Select.displayName = "Select";

export default Select;
