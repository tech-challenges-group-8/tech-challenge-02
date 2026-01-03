import { CircularProgress } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import StyledButton from "./Button";

export interface LoadingButtonProps extends ButtonProps {
  isSubmitting?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

/**
 * LoadingButton - Button with loading state
 */
export default function LoadingButton({
  isSubmitting = false,
  loadingText = "Loading...",
  children,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <StyledButton
      variant="contained"
      disabled={isSubmitting || disabled}
      {...props}
      sx={{
        width: { xs: "100%", sm: "250px" },
        ...props.sx,
      }}
    >
      {isSubmitting ? (
        <>
          <CircularProgress size={20} sx={{ mr: 1, color: "inherit" }} />
          {loadingText}
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
}
