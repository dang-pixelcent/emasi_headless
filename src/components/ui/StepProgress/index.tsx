import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

const StepProgress = ({
  step,
  totalStep,
  ...progressProps
}: LinearProgressProps & { step: number; totalStep: number }) => {
  const normalizedStep = useMemo(() => {
    if (totalStep <= 0) {
      return 0;
    }

    return Math.min(Math.max(step, 0), totalStep);
  }, [step, totalStep]);

  const percentValue = useMemo(() => {
    if (totalStep <= 0) {
      return 0;
    }

    return (normalizedStep / totalStep) * 100;
  }, [normalizedStep, totalStep]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Box sx={{ width: {
        xs: "100%",
        md: "370px",
      } }}>
        <LinearProgress
          variant="determinate"
          value={percentValue}
          sx={{
            height: "10px",
            borderRadius: "40px",
            color: "#1F2164",
          }}
          color="inherit"
          {...progressProps}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography className="text-sm text-[#707174] font-normal font-body">
          Step {normalizedStep} of {totalStep}
        </Typography>
      </Box>
    </Box>
  );
};
export default StepProgress;
