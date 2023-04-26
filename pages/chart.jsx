import { Group, Flex, Stack, Container, Button, createStyles, Image, Badge, Text, Grid } from '@mantine/core';
import DeceptiveChart from '../components/DeceptiveChart';
import { useState, useEffect } from 'react' 
import { ArrowNarrowRight } from 'tabler-icons-react';

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
    backgroundColor: theme.colors.grape[3],
  },

  alternateText: {
    fontFamily: "Space Mono",
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
              Find some strategies to use!
            </h1>
          </Group>

          <Stack my={150} align="center" w="100%">
                <Group maw={800}>
                  <Text fz="xs" className={classes.subTitle}>Find based on Deception Score</Text>
                  <Stack mt="auto">
                      <Text fz="md">The deception score measures how socially acceptable a deceptive interface is. It is used to determine whether your deceptive interface is appropriate for your users. The chart below is a list of 12 scenarios charted against their deceptive score, take a look below to get some inspiration.</Text>
                  </Stack>
                </Group>
          </Stack>

          <Stack spacing={20}>
            <Group mt={100} mb={20}>
            <Group position="left" spacing="xs">
              <Text fz="xs" className={classes.alternateText}>Click on these</Text> 
              <span className={classes.scenarioIcon}></span> 
              <Text fz="xs" className={classes.alternateText}>scenarios to learn more.</Text>
            </Group>
            </Group>

            <div className={classes.chart}>
              <DeceptiveChart scenarios={scenarioRecords} strategies={strategyRecords}></DeceptiveChart>
            </div>
          </Stack>

          <Stack align="center" w="100%" pt={100} mt={100}>
                <Group maw={800} mb={50}>
                  <Text fz="xs" className={classes.subTitle} grow>Make your own</Text>
                  <Stack mt="auto" mb={20}>
                      <Text fz="md">Start using the framework to make your own deceptive interface!</Text>
                  </Stack>
                  <a href={"./"}>
                        <Button uppercase rightIcon={<ArrowNarrowRight strokeWidth={1}/>} color="dark" radius={5} size="xl" style={{ fontSize: '14px', fontWeight: 400, fontFamily: "Space Mono" }}>Make Your Own</Button>
                      </a>
                </Group>
          </Stack>

      </Container>
    )
}

export default ChartsPage