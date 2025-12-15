import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import presenteIcon from "../../assets/home/icone-presente.svg";
import bodyBanner from "../../assets/home/body-banner.svg";
import ButtonsAccount from "./ButtonsAccount";
import AdvantageCard from "./AdvantageCard";
// tokens are mapped into the MUI theme in `src/styles/theme.ts`

const advantages = (t: (key: string) => string) => [
  {
    title: t("bodyHome.advantage1Title"),
    description: t("bodyHome.advantage1Description"),
  },
  {
    title: t("bodyHome.advantage2Title"),
    description: t("bodyHome.advantage2Description"),
  },
  {
    title: t("bodyHome.advantage3Title"),
    description: t("bodyHome.advantage3Description"),
  },
  {
    title: t("bodyHome.advantage4Title"),
    description: t("bodyHome.advantage4Description"),
  },
];

export default function BodyHome() {
  const { t } = useTranslation();
  const theme = useTheme();
  const adv = advantages(t);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.background.paper} 100%)`,
        paddingBottom: theme.spacing(12),
      }}
    >
      <Box
        sx={{
          display: { xs: "flex", sm: "flex", md: "flex" },
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
          maxWidth: "1200px",
          padding: theme.spacing(2),
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            gap: theme.spacing(5),
          }}
        >
          <Typography
            component="p"
            sx={{
              fontSize: { xs: "25px", sm: "28px" },
              lineHeight: { xs: "29px", sm: "32px" },
              fontWeight: { xs: "bold", sm: "600" },
              color: theme.palette.text.primary,
              maxWidth: "434px",
              width: "100%",
              textAlign: { xs: "center", lg: "left" },
            }}
          >
            {t("bodyHome.mainText")}
          </Typography>
          <Box
            sx={{
              width: "90%",
              maxWidth: "660px",
              position: "relative",
              aspectRatio: "660 / 410",
            }}
          >
            <img src={bodyBanner} alt="banner" style={{ objectFit: "contain" }} />
          </Box>
        </Box>
        <Box sx={{ display: { xs: "block", sm: "none", lg: "none" }, margin: `${theme.spacing(2)} 0` }}>
          <ButtonsAccount />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: `${theme.spacing(5)} ${theme.spacing(1.25)}`,
          }}
        >
          <Typography
            component="p"
            sx={{
              fontSize: { xs: "20px", sm: "25px" },
              lineHeight: { xs: "24px", sm: "29px" },
              fontWeight: "bold",
              color: theme.palette.text.primary,
              width: "100%",
              textAlign: "center",
            }}
          >
            {t("bodyHome.advantagesTitle")}
          </Typography>
          {adv.map((item, idx) => (
            <AdvantageCard key={idx} icon={presenteIcon} title={item.title} description={item.description} alt={`vantagem-${idx + 1}`} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
