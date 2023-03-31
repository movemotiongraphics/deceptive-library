import { createStyles, Paper, Text, Title, Button, Badge, Stack, Group } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    border: `1px solid ${theme.colors.gray[1]}`,
    height: "100%",
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

const CardComponent = ({ number, type, title, description }) => {
  const { classes } = useStyles();

  return (
    <>  
        <div className={classes.card}>
            <Stack className={classes.elementsOnCard} h={"100%"} mih={300}>
                <Group spacing={0}>
                    <div className={classes.badgeLight}><Text fz="sm" className={classes.alternateText}>{number}</Text></div>
                    <div className={classes.badgeDark}><Text fz="sm" className={classes.alternateText}>{type}</Text></div>
                </Group>

                <Stack mt="auto" spacing={0}>
                <Text fz="xs" fw={600} mb={5}>{title}</Text>
                <Text fz="xs">{description}</Text>
                </Stack>
            </Stack>



        </div>
    </>
  );
}

export default CardComponent;