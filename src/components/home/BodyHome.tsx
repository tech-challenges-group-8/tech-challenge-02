import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import presenteIcon from "../../assets/home/icone-presente.svg";
import bodyBanner from "../../assets/home/body-banner.svg";
import ButtonsAccount from "./ButtonsAccount";

export default function BodyHome() {
    const { t } = useTranslation();
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          background: "linear-gradient(180deg, #004D61 0%, #FFFFFF 100%)",
          paddingBottom: "100px",
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", sm: "flex", md: "flex" },
            justifyContent: "center",
            flexWrap: "wrap",
            width: "100%",
            maxWidth: "1200px",
            padding: "20px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              gap: "40px",
            }}
          >
            <Typography
              component="p"
              sx={{
                fontSize: { xs: "25px", sm: "28px" },
                lineHeight: { xs: "29px", sm: "32px" },
                fontWeight: { xs: "bold", sm: "600" },
                color: "#000000",
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
              <img
                src={bodyBanner}
                alt="banner"
                style={{ objectFit: "contain" }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "block", sm: "none", lg: "none" },
              margin: "20px 0",
            }}
          >
            <ButtonsAccount />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "40px 10px",
            }}
          >
            <Typography
              component="p"
              sx={{
                fontSize: { xs: "20px", sm: "25px" },
                lineHeight: { xs: "24px", sm: "29px" },
                fontWeight: "bold",
                color: "#000000",
                width: "100%",
                textAlign: "center",
              }}
            >
              {t("bodyHome.advantagesTitle")}
            </Typography>
            <Box
              sx={{
                width: "100%",
                maxWidth: "282px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "15px",
                textAlign: "center",
              }}
            >
              <img src={presenteIcon} alt="vantagem-1" width={73} height={56} />
              <Typography
                component="p"
                sx={{
                  fontSize: "20px",
                  lineHeight: "24px",
                  fontWeight: "bold",
                  color: "#47A138",
                  width: "100%",
                }}
              >
                {t("bodyHome.advantage1Title")}
              </Typography>
              <Typography
                component="p"
                sx={{
                  fontSize: "16",
                  lineHeight: "20px",
                  fontWeight: "400",
                  color: "#767676",
                  maxWidth: "434px",
                  width: "100%",
                  padding: "0 5px",
                }}
              >
                {t("bodyHome.advantage1Description")}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                maxWidth: "282px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "15px",
                textAlign: "center",
              }}
            >
              <img
                src={presenteIcon}
                alt="vantagem-1"
                width={73}
                height={56}
              />
              <Typography
                component="p"
                sx={{
                  fontSize: "20px",
                  lineHeight: "24px",
                  fontWeight: "bold",
                  color: "#47A138",
                  width: "100%",
                }}
              >
                {t("bodyHome.advantage2Title")}
              </Typography>
              <Typography
                component="p"
                sx={{
                  fontSize: "16",
                  lineHeight: "20px",
                  fontWeight: "400",
                  color: "#767676",
                  maxWidth: "434px",
                  width: "100%",
                  padding: "0 5px",
                }}
              >
                {t("bodyHome.advantage2Description")}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                maxWidth: "282px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "15px",
                textAlign: "center",
              }}
            >
              <img
                src={presenteIcon}
                alt="vantagem-1"
                width={73}
                height={56}
              />
              <Typography
                component="p"
                sx={{
                  fontSize: "20px",
                  lineHeight: "24px",
                  fontWeight: "bold",
                  color: "#47A138",
                  width: "100%",
                }}
              >
                {t("bodyHome.advantage3Title")}
              </Typography>
              <Typography
                component="p"
                sx={{
                  fontSize: "16",
                  lineHeight: "20px",
                  fontWeight: "400",
                  color: "#767676",
                  maxWidth: "434px",
                  width: "100%",
                  padding: "0 5px",
                }}
              >
                {t("bodyHome.advantage3Description")}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                maxWidth: "282px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "15px",
                textAlign: "center",
              }}
            >
              <img
                src={presenteIcon}
                alt="vantagem-1"
                width={73}
                height={56}
              />
              <Typography
                component="p"
                sx={{
                  fontSize: "20px",
                  lineHeight: "24px",
                  fontWeight: "bold",
                  color: "#47A138",
                  width: "100%",
                }}
              >
                {t("bodyHome.advantage4Title")}
              </Typography>
              <Typography
                component="p"
                sx={{
                  fontSize: "16",
                  lineHeight: "20px",
                  fontWeight: "400",
                  color: "#767676",
                  maxWidth: "434px",
                  width: "100%",
                  padding: "0 5px",
                }}
              >
                {t("bodyHome.advantage4Description")}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
}
