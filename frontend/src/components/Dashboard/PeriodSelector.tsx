import type { PeriodOption } from "@/contexts/periodContext";
import { usePeriod } from "@/contexts/periodContext";
import { Box, Button } from "@mui/material";

const options: { label: string; value: PeriodOption }[] = [
  { label: "Último mês", value: "1m" },
  { label: "3 meses", value: "3m" },
  { label: "6 meses", value: "6m" },
  { label: "12 meses", value: "1y" },
];

export default function PeriodSelector() {
  const { period, setPeriod } = usePeriod();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        width: { xs: "100%", md: "auto" },
        flexWrap: { xs: "wrap", md: "nowrap" },
        mb: 0,
      }}
    >
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant={period === opt.value ? "contained" : "outlined"}
          onClick={() => setPeriod(opt.value)}
          size="small"
          sx={{
            flex: { xs: "1 1 calc(50% - 8px)", md: "none" },
            minWidth: { xs: 0, md: "auto" },
            whiteSpace: "nowrap",
          }}
        >
          {opt.label}
        </Button>
      ))}
    </Box>
  );
}
