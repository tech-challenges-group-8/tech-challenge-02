import { Box, CircularProgress } from "@mui/material";

const PageLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        p: 4,
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};

export default PageLoader;
