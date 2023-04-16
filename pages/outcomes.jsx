import { Button, Group, Flex, Stack, Container, createStyles, Image, Badge, Text, Grid, Divider } from '@mantine/core';
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
    height: 400,
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
              <Divider my="sm"/>
              <Group spacing={0}>
                  <div className={classes.badgeLight}><Text fz="xs" className={classes.subTitle}>0</Text></div>
                  <div className={classes.badgeDark}><Text fz="xs" className={classes.subTitle}>Articles</Text></div>
              </Group>
            </Stack>

            <Group w={"100%"}>
              <Grid gutter={20}>
                <Grid.Col span={12} md={4} sm={6}>
                  <Stack>
                    <Stack className={classes.greyBackground}>
                      <div className={classes.imageBorder}>
                        <RiveAnimation scenarioNumber={0} />
                      </div>
                    </Stack>

                    <Stack>
                      <Text fz="xs" className={classes.subTitle}>Insight 1</Text>
                      <Stack mt="auto">
                          <Text fz="md">The attractiveness of using a chance mechanism that wears out fast.</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid.Col>

                <Grid.Col span={12} md={4} sm={6} xs={12}>
                  <Stack>
                    <Stack className={classes.greyBackground}>
                      <div className={classes.imageBorder}>
                        <RiveAnimation scenarioNumber={1} />
                      </div>
                    </Stack>

                    <Stack>
                      <Text fz="xs" className={classes.subTitle}>Insight 2</Text>
                      <Stack mt="auto">
                          <Text fz="md">A lack of control over the donation amount deters people from donating, even if it's an amount they might usually donate.</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid.Col>

                <Grid.Col span={12} md={4} sm={6} xs={12}>
                  <Stack>
                    <Stack className={classes.greyBackground}>
                      <div className={classes.imageBorder}>
                        <RiveAnimation scenarioNumber={2} />
                      </div>
                    </Stack>

                    <Stack>
                      <Text fz="xs" className={classes.subTitle}>Insight 3</Text>
                      <Stack mt="auto">
                          <Text fz="md">People find it hard to commit to a unpredictable amount of reward.</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid.Col>


              </Grid>
            </Group>


          </Stack>


      </Container>
    )
}

export default ChartsPage