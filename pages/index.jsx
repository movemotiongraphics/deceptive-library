import { AppShell, Navbar, Header, Group, Flex, Stack } from '@mantine/core';
// import axios, { all } from 'axios';
import { useState, useEffect } from 'react';
import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
} from '@mantine/core';

import DeceptiveCard from '../components/DeceptiveCard';
import StrategyCard from '../components/StrategyCard';
import HeroTitle from '../components/Intro';
import InsightCard from '../components/InsightCard';
import DeceptiveChart from '../components/DeceptiveChart';
import ChooseMachine from '../components/chooseMachine';


//static data
import ScenarioData from '../components/Data/Scenarios-Grid.json';
import ObservationData from '../components/Data/Observation-Grid.json';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  chart: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: 'Inter Tight',
    fontSize: theme.fontSizes.lg,
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

  scenarioIcon: {
    display: "inline-block",
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: theme.colors.green[5],
  },

  helperText: {
    fontSize: theme.fontSizes.xs,
  }

}));


export default function HomePage() {
  const { classes } = useStyles();
  const [originalRecords, setOrignalRecords] = useState([]);
  const [strategyRecords, setStrategyRecords] = useState([]);
  const [insightRecords, setInsightRecords] = useState([]);
  const [scenarioRecords, setScenarioRecords] = useState([]);
  const [contextRecords, setContextRecords] = useState([]);
  
  function retrieveRecords() {
    // const { data } = await axios.get('https://eoyeceylz6rbgls.m.pipedream.net');
    // console.log(data)
    // setOrignalRecords(data);

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

    //find different insights
    let differentInsights = onlyFields.map((e, i) => e["Insight (from Observation)"]).filter(item => item).filter(findDistinct).flat(1);
    setInsightRecords(differentInsights)

    //find different contexts, outcomes and their inspirations
    let differentContexts = [...new Set(onlyFields.map((e, i) => e["EffectiveIn (from Observation)"]).filter(item => item).filter(findDistinct).flat(1))];

    const contextArray = [];
    differentContexts.map((context, i) => {
      const currentContextObject = {};
      currentContextObject.contextName = context;
      currentContextObject.outcome = [];
      currentContextObject.inspirations = [];

      onlyFields.forEach((scenario) => {
        if (scenario["EffectiveIn (from Observation)"] == context) {
          if (scenario["Actionable (from Observation)"]) {
            currentContextObject.outcome.push(scenario["Actionable (from Observation)"])
          }
          if (scenario.SeenBefore) {
            currentContextObject.inspirations.push(scenario.SeenBefore);
          }
        }

        
      })

      currentContextObject.outcome = [...new Set(currentContextObject.outcome)];
      currentContextObject.inspirations = [...new Set(currentContextObject.inspirations)];
      contextArray.push(currentContextObject);
    })
    setContextRecords(contextArray);
    // console.log(contextArray);

    setStrategyRecords(strategyArray)

  }

  useEffect(() => {
    retrieveRecords();
  }, [])

  return (
    <Container size="xl" px={30}>
      <HeroTitle></HeroTitle>

      <Stack spacing={20}>
        <Stack mt={100} mb={100}>
        <h1 className={classes.title}>Here's how it works</h1>
          <Group position="left" spacing="xs" className={classes.helperText} mb={100} w={"50%"}>
          <Text fz="md">dasd</Text>
          </Group>
        </Stack>
      </Stack>

      <Stack spacing={20}>
        <Stack mt={100} mb={100}>
        <h1 className={classes.title}>Start off with a simple choice.</h1>
          <Group position="left" spacing="xs" className={classes.helperText} mb={100} w={"50%"}>
          <Text fz="md">Think about what you want people to do and the other choice should be what a user selects when he doesn't want to comply.</Text>
          </Group>
        </Stack>
      </Stack>

      <Stack spacing={20}>
        <Stack mt={100} mb={100}>
        <h1 className={classes.title}>Add these into your interfaces.</h1>
          <Group position="left" spacing="xs" className={classes.helperText} mb={100} w={"50%"}>
          <Text fz="md">A simple choice is a straightforward method of requesting something, but in certain circumstances, its effectiveness can be improved by prolonging and expanding the decision-making process.</Text>
          </Group>
          <Group >
          </Group>
        </Stack>
      </Stack>

      <Stack spacing={20}>
        <Stack mt={100} mb={100}>
        <h1 className={classes.title}>You're on your way!</h1>
          <Group position="left" spacing="xs" className={classes.helperText} mb={100} w={"50%"}>
          <Text fz="md">Let's convert that example into an interface, here are some real world examples of those interfaces being used.</Text>
          </Group>
          <Group >
            <ChooseMachine />
          </Group>
        </Stack>
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

      <Stack spacing={20}>
        <Stack mt={100} mb={100}>
        <h1 className={classes.title}>Do it like they did!</h1>
          <Group position="left" spacing="xs" className={classes.helperText} mb={100} w={"50%"}>
          <Text fz="md">dasdad.</Text>
          </Group>
          <Group >
          </Group>
        </Stack>
      </Stack>


    </Container>
  );
}