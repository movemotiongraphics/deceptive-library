import { AppShell, Navbar, Header, Group, Flex, Stack, BackgroundImage, Grid, Badge, Image } from '@mantine/core';
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
import CardComponent from '../components/cardComponent';

//static data
import ScenarioData from '../components/Data/Scenarios-Grid.json';
import ObservationData from '../components/Data/Observation-Grid.json';
import SeenBeforeData from '../components/Data/Inspirations-Grid.json';

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
    lineHeight: 1.1,

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
  },

  InspirationBoxes: {
    width: "150px",
    height: "150px",
    display: 'flex',
    backgroundColor: theme.colors.gray[1],
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '10px',
    backgroundSize: 'cover',
  },

  greyBackground: {
    backgroundColor: theme.colors.gray[2],
  },

  stepsBoxes: {
    backgroundColor: theme.colors.gray[1],
  },

  greyBackgroundAlternate: {
    backgroundColor: theme.colors.gray[0],
  },

  subTitle: {
    fontFamily: "Space Mono",
  }
}));


export default function HomePage() {
  const { classes } = useStyles();
  const [originalRecords, setOrignalRecords] = useState([]);
  const [strategyRecords, setStrategyRecords] = useState([]);
  const [insightRecords, setInsightRecords] = useState([]);
  const [scenarioRecords, setScenarioRecords] = useState([]);
  const [contextRecords, setContextRecords] = useState([]);
  const [seenBeforeRecords, setSeenBeforeRecords] = useState([])
  
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
    setInsightRecords(differentInsights);


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

      <Stack spacing={20} mt={20}>
        <Stack>
          <Group className={classes.greyBackgroundAlternate} position="center" justifyContent="center" mih={600}>
            <Image maw={600} src="../img/dif.svg"></Image>
          </Group>
          <Stack className={classes.greyBackground} position="left" align="flex-start" mih={600} p={20}>
          <Text fz="xs" className={classes.subTitle} grow>About the Deceptive Interfaes Framework</Text>
          <h1 className={classes.title}>The deceptive interfaces framework is a set of instructions and inspiration for designers to design effective choices.</h1>
          <Grid mt="auto">
            <Grid.Col span={6}><Text fz="sm" mb={0}>This set of instruction consists of four libraries that are designed to be considered in sequence. You can visit each of them by clicking on it here, or follow the guide to make your own deceptive interface.</Text></Grid.Col>
          </Grid>
          </Stack>
        </Stack>
      </Stack>

      <Grid p={0} m={0} gutter={0}>
            <Grid.Col span={3} mih={200} className={classes.stepsBoxes}>
              <CardComponent  number={1} type="Inspiration" description="Getting inspiration from common behavioural influence experiences."/>
            </Grid.Col>
            <Grid.Col span={3} mih={200} className={classes.stepsBoxes}>
            <CardComponent  number={2} type="Components" description="A look into how different UI components influences our behaviour."/>
            </Grid.Col>
            <Grid.Col span={3} mih={200} className={classes.stepsBoxes}>
            <CardComponent  number={3} type="Strategy" description="A look into how we can use human biases and these components to create strategies."/>
            </Grid.Col>
            <Grid.Col span={3} mih={200} className={classes.stepsBoxes}>
            <CardComponent  number={4} type="Measurements" description="How do we measure how effective those interfaces are?"/>
            </Grid.Col>
      </Grid>

      <Stack spacing={20} mt={100}>
        <Stack>
        <Stack mb={100}>
          <Text fz="xs" className={classes.subTitle}>Influence Area 1</Text>
          <h1 className={classes.title}>Inspiration</h1>
        </Stack>

          <Group position="left" spacing="xs" className={classes.helperText} mb={100}>
            <Grid mb={100}>
              <Grid.Col span={4}>
              <Text fz="md" mb={50}>Think back to a situation that made you feel cheated or when someone took advantage of your trust, it is likely that you’ve been through a deceptive scheme.</Text>
              </Grid.Col>
              <Grid.Col span={4}>
              <Text fz="md" mb={50}>These deceptive schemes commonly leverage on human biases, which are common patterns that leverage the irrational decision-making of people. These patterns can be used as ideas to form a deceptive strategy.</Text>
              <Text fz="md" mb={50}>Take a look at a few inspirations below submitted by the community.</Text>
              </Grid.Col>

            </Grid>
            <Group>
              { SeenBeforeData ? SeenBeforeData.map((item) => (
                <div className={classes.InspirationBoxes}>
                  {item.InspirationName}
                </div>
              )) : ''}
              <div className={classes.InspirationBoxes}>Felt anything similar?</div>
            </Group>
          </Group>
        </Stack>
      </Stack>

      <Stack spacing={20}>
        <Stack mt={100} mb={100}>
        <h1 className={classes.title}>Components</h1>
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