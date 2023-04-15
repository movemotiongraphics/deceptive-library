import { Group, Flex, Stack, Container, createStyles, Image, Badge, Text, Grid } from '@mantine/core';
import DeceptiveChart from '../components/DeceptiveChart';
import { useState, useEffect } from 'react' 

const BREAKPOINT = '@media (max-width: 755px)';

//static data
import ScenarioData from '../components/Data/Scenarios-Grid.json';
import ObservationData from '../components/Data/Observation-Grid.json';
import SeenBeforeData from '../components/Data/Inspirations-Grid.json';

const useStyles = createStyles((theme) => ({
  
  title: {
    fontFamily: 'Inter Tight',
    fontSize: '3rem',
    fontWeight: 400,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: "80%",

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },

  },

  headerTitle: {
    fontFamily: 'Inter Tight',
    fontSize: theme.fontSizes.xl,
    fontWeight: 400,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: "80%",
    lineHeight: 1.1,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },

  },

  chart: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  subTitle: {
    fontFamily: "Space Mono",
  },

  greyBackground: {
    backgroundColor: theme.colors.gray[2],
  },
  
  greyBackgroundAlternate: {
    backgroundColor: theme.colors.gray[0],
  },

  scenarioIcon: {
    display: "inline-block",
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: theme.colors.green[5],
  }

}));

const ChartsPage = () => {
  const { classes } = useStyles();
  const [scenarioRecords, setScenarioRecords] = useState([]);
  const [strategyRecords, setStrategyRecords] = useState([]);


  function retrieveRecords() {

    //get only fields
    let onlyFields = ScenarioData;
    setScenarioRecords(onlyFields);
    console.log(onlyFields);

    //find distinct strategies
    const findDistinct = (value, index, self) => {
      return self.indexOf(value) === index;
    }
    let differentStrategies = onlyFields.map((e, i) => e.Strategy).filter(item => item).filter(findDistinct);
    

    //push different strategies into each array
    const strategyArray = [];
    differentStrategies.map((strategy, i) => {
      const currentStrategyObject = {};
      currentStrategyObject.strategyName = strategy;
      currentStrategyObject.strategyScenarios = [];

      onlyFields.forEach((scenario) => {
        if (scenario.Strategy == strategy) {
          currentStrategyObject.strategyScenarios.push(scenario)
        }
      })

      strategyArray.push(currentStrategyObject);
    })

    setStrategyRecords(strategyArray)

  }

  useEffect(() => {
    retrieveRecords();
  }, [])

    return (
      <Container size="xl" px={30}>
          <Group mt={130} mb={170} position="center" alignItems="center">
            <h1 className={classes.headerTitle} style={{ textAlign: "center"}}>
              The deception score measures 
            </h1>
          </Group>

          <Stack my={200} align="center" w="100%">
                <Group maw={800}>
                  <Text fz="xs" className={classes.subTitle}>Where these insights come from</Text>
                  <Stack mt="auto">
                      <Text fz="md">The framework consists of four libraries that are designed to be considered in sequence. Each step consists of examples and guides that you can adopt in your own design. Follow the guide to make your own deceptive interface.</Text>
                  </Stack>
                </Group>
          </Stack>

          <Stack spacing={20}>
            <Group mt={100} mb={100}>
            <h1 className={classes.title}>Follow some of these strategies.</h1>
            <Group position="left" spacing="xs" className={classes.helperText}>
              Click on these 
              <span className={classes.scenarioIcon}></span> 
              scenarios to learn more.
            </Group>
            </Group>

            <div className={classes.chart}>
              <DeceptiveChart scenarios={scenarioRecords} strategies={strategyRecords}></DeceptiveChart>
            </div>
          </Stack>
      </Container>
    )
}

export default ChartsPage