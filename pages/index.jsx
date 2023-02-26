import { AppShell, Navbar, Header, Group, Flex } from '@mantine/core';
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


export default function HomePage() {
  const [originalRecords, setOrignalRecords] = useState([]);
  const [strategyRecords, setStrategyRecords] = useState([]);
  
  async function retrieveRecords() {
    const { data } = await axios.get('https://eoyeceylz6rbgls.m.pipedream.net');
    console.log(data)
    setOrignalRecords(data);

    //get only fields
    let onlyFields = data.map((record, index) => (record.fields));

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
    console.log(strategyArray)

  }

  useEffect(() => {
    retrieveRecords();
  }, [])

  return (
    <Container>
      <HeroTitle></HeroTitle>

      <h2>Strategies</h2>
      <Flex
      mih={50}
      gap={10}
      justify="flex-start"
      align="flex-start"
      direction="row"
      wrap="wrap"
    >
        {strategyRecords.map((strategies, index) => (<StrategyCard key={index} strategyName={strategies.strategyName} strategyScenarios={strategies.strategyScenarios}></StrategyCard>))} 
      </Flex>

      <h2>Scenarios</h2>
      <Flex
      mih={50}
      gap={10}
      justify="flex-start"
      align="flex-start"
      direction="row"
      wrap="wrap"
    >
        {originalRecords.map((record, index) => (<DeceptiveCard key={index} {...record}/>))} 
      </Flex>
    </Container>
  );
}
