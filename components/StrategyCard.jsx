import { createStyles, Paper, Text, Title, Button, Badge, Stack } from '@mantine/core';

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
    fontWeight: 600,
    color: theme.black,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
    marginBottom: 30,
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
        <Badge size="lg" radius="xs" mb={10}>{props.strategyScenarios.length} Scenarios</Badge>
        {props.strategyScenarios.map((e, i) => {
            return <Badge size="lg" radius="xs" mb={10} color="gray">{e.Scenario}</Badge>
        })}
      
    
    </Paper>
  );
}

export default StrategyCard;