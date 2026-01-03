import { Button, Box } from "@mui/material";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  theme: any;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  theme,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={2}
      gap={1}
      style={{ marginBottom: theme.spacing(1) }}
    >
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i + 1}
          variant={currentPage === i + 1 ? "contained" : "outlined"}
          onClick={() => onPageChange(i + 1)}
          sx={{ minWidth: 36, px: 0 }}
        >
          {i + 1}
        </Button>
      ))}
    </Box>
  );
}
