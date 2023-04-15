import { Group, Flex, Stack, Container, createStyles, Image, Badge, Text, Grid, Divider } from '@mantine/core';
import DeceptiveChart from '../components/DeceptiveChart';
import { useState, useEffect } from 'react' 
import { RiveAnimation } from '../components/riveDonate';

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
    lineHeight: 1.1,

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

  imageBorder: {
    backgroundColor: theme.colors.gray[1],
    height: 700,
  },

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
              16 interesting insights when making deceptive interfaces.
            </h1>
          </Group>

          <Stack mt={200} mb={200} align="center" w="100%">
                <Group maw={800}>
                  <Text fz="xs" className={classes.subTitle}>About the insights</Text>
                  <Stack mt="auto">
                      <Text fz="md">In this study, I explored different ways to make a typical donation interface more deceptive. The study involved 12 different deceptive interfaces that were measured and observed. These insights uncovers different interesting ways we can make our donation interfaces more deceptive, and their limitations.</Text>
                  </Stack>
                </Group>
          </Stack>

          <Stack>
            
            <Stack mb={100}>
              <Divider my="sm" />
              <Group spacing={0}>
                  <div className={classes.badgeLight}><Text fz="xs" className={classes.subTitle}>1</Text></div>
                  <div className={classes.badgeDark}><Text fz="xs" className={classes.subTitle}>Spinning Wheel</Text></div>
              </Group>
            </Stack>

            <Stack align="center">
              <Stack w={"100%"}>
                <div className={classes.imageBorder}>
                  <RiveAnimation scenarioNumber={0} />
                </div>
              </Stack>

              <Stack mt={50} mb={200} align="center" w="100%">
                <Stack maw={800}>
                  <Group mb={50}>
                    <Badge color="gray" size="lg" radius="sm">100% clicked donate</Badge>
                    <Badge color="gray" size="lg" radius="sm">560% average amount</Badge>
                    <Badge color="gray" size="lg" radius="sm">3.25 deception score</Badge>
                  </Group>
                  <Text fz="xs" className={classes.subTitle}>Spinning Wheel</Text>
                  <Stack mt="auto">
                      <Text fz="md">In this experiment, I changed the donate button into a spinning wheel that gives a chance to win a $5 discount or make a small $2 donation. The spinning wheel adds a chance of incentivisation to attract participation. Seems like people were initially motivated in participating, but soon found out about it's low winning probability.</Text>
                  </Stack>
                  <Text fz="xs" className={classes.subTitle}>Insight</Text>
                  <Stack mt="auto">
                      <Text fz="md">The attractiveness of using a chance mechanism that wears out fast, and becomes really suspicious.</Text>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>


          </Stack>


      </Container>
    )
}

export default ChartsPage