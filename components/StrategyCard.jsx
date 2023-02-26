import { createStyles, Paper, Text, Title, Button, Badge } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontWeight: 900,
    color: theme.black,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
    marginBottom: 60,
  },

  category: {
    color: theme.black,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

const StrategyCard = (props) => {
  const { classes } = useStyles();

  return (
    <Paper
      withBorder
      p="xl"
      radius="md"
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
            Strategy
        </Text>
        <Title order={3} className={classes.title}>
            {props.strategyName}
        </Title>
      </div>
      <Button variant="black" color="dark">
        Learn More
      </Button>
    </Paper>
  );
}

export default StrategyCard;