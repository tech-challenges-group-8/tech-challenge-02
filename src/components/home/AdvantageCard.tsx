import { Box, Typography, useTheme } from "@mui/material";

type AdvantageCardProps = {
  icon: string;
  title: string;
  description: string;
  alt?: string;
};

export default function AdvantageCard({ icon, title, description, alt }: AdvantageCardProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "282px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: theme.spacing(2),
        textAlign: "center",
      }}
    >
      <img src={icon} alt={alt ?? "advantage-icon"} width={73} height={56} />
      <Typography
        component="p"
        sx={{
          fontSize: theme.typography.h2?.fontSize || "20px",
          lineHeight: "24px",
          fontWeight: theme.typography.h2?.fontWeight || 600,
          color: theme.palette.action.active,
          width: "100%",
        }}
      >
        {title}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: theme.typography.body1?.fontSize || "16px",
          lineHeight: "20px",
          fontWeight: theme.typography.body1?.fontWeight || 400,
          color: theme.palette.text.disabled,
          maxWidth: "434px",
          width: "100%",
          padding: "0 5px",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
