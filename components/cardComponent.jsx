import { createStyles, Paper, Text, Title, Button, Badge, Stack, Group } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    height: "100%",
    transition: "0.3s ease all",
  },

  elementsOnCard: {
    padding: "20px",
  },

  alternateText: {
    fontFamily: "Space Mono",
  },

  badgeLight: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: theme.colors.gray[2],
    color: theme.colors.gray[5],
    width: 50,
    display: "flex",
    justifyContent: "center",
  },

  badgeDark: {
    padding: "10px 15px 10px 15px",
    borderRadius: 100,
    backgroundColor: theme.colors.gray[7],
    color: theme.colors.gray[1],
  },
}));

const CardComponent = ({ number, type, title, description, children }) => {
  const { classes } = useStyles();

  return (
    <>  
        <div className={classes.card}>
            <Stack className={classes.elementsOnCard} mih={"100%"} justify="space-between">
                <Group spacing={0}>
                    { number ? <div className={classes.badgeLight}><Text fz="xs" className={classes.alternateText}>{number}</Text></div>: '' }
                    { type ? <div className={classes.badgeDark}><Text fz="xs" className={classes.alternateText}>{type}</Text></div> : '' }
                </Group>
                <Stack mt="auto" mx="auto">
                  { children }
                </Stack>
                <Stack mt="auto" spacing={0}>
                  <Text fz="sm" fw={600} mb={5}>{title}</Text>
                  <Text fz="sm">{description}</Text>
                </Stack>
            </Stack>



        </div>
    </>
  );
}

export default CardComponent;