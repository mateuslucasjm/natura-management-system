import { Button } from "@mui/material";

interface CreateButtonProps {
  label: string;
  onClick: () => void;
  color?: "primary" | "secondary" | "success" | "error";
  size?: "small" | "medium" | "large";
}

export default function CreateButton({
  label,
  onClick,
  color = "primary",
  size = "large",
}: CreateButtonProps) {
  return (
    <Button
      size={size}
      variant="outlined"
      color={color}
      onClick={onClick}
      sx={{
        minWidth: { xs: "auto", md: 120 },
        px: { xs: 1.5, md: 2.5 },
        py: { xs: 0.5, md: 1 },
        fontSize: { xs: "0.75rem", md: "0.875rem" },
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Button>
  );
}
