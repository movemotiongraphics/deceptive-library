import { AppShell, Navbar, Header, Group, Flex, Stack } from '@mantine/core';
import axios, { all } from 'axios';
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

const useStyles = createStyles((theme) => ({
  chart: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

}));


export default function HomePage() {
  const { classes } = useStyles();
  const [originalRecords, setOrignalRecords] = useState([]);
  const [strategyRecords, setStrategyRecords] = useState([]);
  const [insightRecords, setInsightRecords] = useState([]);
  const [scenarioRecords, setScenarioRecords] = useState([]);
  
  async function retrieveRecords() {
    const { data } = await axios.get('https://eoyeceylz6rbgls.m.pipedream.net');
    // console.log(data)
    setOrignalRecords(data);

    //get only fields
    let onlyFields = data.map((record, index) => (record.fields));
    setScenarioRecords(onlyFields);


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

      //find different insights
      let differentInsights = onlyFields.map((e, i) => e["Insight (from Observation)"]).filter(item => item).filter(findDistinct).flat(1);
      setInsightRecords(differentInsights)
    })

    setStrategyRecords(strategyArray)
    console.log(strategyArray)

  }

  useEffect(() => {
    retrieveRecords();
  }, [])

  return (
    <Container>
      <HeroTitle></HeroTitle>

      <Stack spacing={20}>
        <div>
          <h2>Charts</h2>
          <p>This chart shows how deceptive each interface is. Remember, every type of user has their own appetite, so look around to find interesting ones that might fit yours.</p>
        </div>
        <div className={classes.chart}>
          <DeceptiveChart scenarios={scenarioRecords}></DeceptiveChart>
        </div>
      </Stack>

      <Stack spacing={20}>
        <div>
          <h2>Insights</h2>
          <p>Find interesting insights from these experiments</p>
        </div>
        <Flex
          gap={10}
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          {insightRecords.map((insight, index) => <InsightCard key={"insight" + index} insight={insight}>test</InsightCard>)}
        </Flex> 
      </Stack>

      <Stack spacing={20}>
        <div>
          <h2>Deceptive Strategies</h2>
          <p>Deceptive strategies are ideas that can guide how you might want to design your choices. They contain examples, considerations and insights to help you make your own interface.</p>
        </div>
        <Flex
          mih={50}
          gap={10}
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          {strategyRecords.map((strategies, index) => (<StrategyCard key={"strategy" + index} strategyName={strategies.strategyName} strategyScenarios={strategies.strategyScenarios}></StrategyCard>))} 
        </Flex>
      </Stack>

      <Stack spacing={20}>
        <div>
          <h2>Scenarios</h2>
          <p>Scenarios are specific examples that are tested. These may give you inspiration to come up with your own deceptive interface.</p>
        </div>
        <Flex
        mih={50}
        gap={10}
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
          {originalRecords.map((record, index) => (<DeceptiveCard key={"scenario" + index} {...record}/>))} 
        </Flex>
      </Stack>

    </Container>
  );
}
