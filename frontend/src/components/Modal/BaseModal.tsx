import { Box, Modal } from "@mui/material";

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number | string;
}

export default function BaseModal({
  open,
  onClose,
  children,
  width = "35%",
}: BaseModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: {
            xs: "calc(100% - 40px)",
            sm: "80%",
            md: width,
          },
          maxHeight: {
            xs: "92dvh",
            md: "90vh",
          },
          overflowY: "auto",
          bgcolor: "background.paper",
          borderRadius: { xs: 5, md: 5 },
          boxShadow: 24,
          p: { xs: 2.5, md: 5 },
          outline: "none",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}
