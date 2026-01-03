import { List, ListItem, ListItemText, styled } from "@mui/material";

export const CustomListItem = styled(ListItem)(() => ({
  padding: "2px 0",
}));

type FooterListProps = {
  items: string[];
  maxWidth?: number | string;
};

export function FooterList({ items, maxWidth = 220 }: FooterListProps) {
  return (
    <List sx={{ width: "100%", maxWidth }}>
      {items.map((item, index) => (
        <CustomListItem key={`${index}-${item}`}>
          <ListItemText
            primary={item}
            primaryTypographyProps={{
              fontSize: "16px",
              fontWeight: index === 0 ? 700 : 400,
            }}
          />
        </CustomListItem>
      ))}
    </List>
  );
}

export default FooterList;
