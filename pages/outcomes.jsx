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
    borderRadius: 20,
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
    opacity: 0.3,
    transition: "0.3s ease all",

    '&:hover': {
      opacity: 1,
      transition: "0.3s ease all",
    },
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
              12 interesting insights when making deceptive interfaces.
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

              <Grid gutter={20} mb={80}>
                <Grid.Col md={4} sm={6} xs={12}>
                  <Stack>
                    <Stack className={classes.greyBackground}>
                      <div className={classes.imageBorder}>
                        <RiveAnimation scenarioNumber={0} hoverToPlay/>
                      </div>
                    </Stack>

                    <Stack>
                      <Text fz="xs" className={classes.subTitle}>Insight 1</Text>
                      <Stack>
                          <Text fz="md">Chance mechanisms lose their appeal over time.</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid.Col>

                <Grid.Col md={4} sm={6} xs={12}>
                  <Stack>
                    <Stack className={classes.greyBackground}>
                      <div className={classes.imageBorder}>
                        <RiveAnimation scenarioNumber={1} hoverToPlay/>
                      </div>
                    </Stack>

                    <Stack>
                      <Text fz="xs" className={classes.subTitle}>Insight 2</Text>
                      <Stack mt="auto">
                          <Text fz="md">When people lack control over the donation amount, they won't donate, even if they would normally do so.</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid.Col>

                <Grid.Col md={4} sm={6} xs={12}>
                  <Stack>
                    <Stack className={classes.greyBackground}>
                      <div className={classes.imageBorder}>
                        <RiveAnimation scenarioNumber={2} hoverToPlay/>
                      </div>
                    </Stack>

                    <Stack>
                      <Text fz="xs" className={classes.subTitle}>Insight 3</Text>
                      <Stack mt="auto">
                          <Text fz="md">It is difficult to commit to a reward that is unpredictable.</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid.Col>
              </Grid>

              <Grid gutter={20} mb={80}>
                <Grid.Col md={4} sm={6}>
                  <Stack>
                    <Stack className={classes.greyBackground}>
                      <div className={classes.imageBorder}>
                        <RiveAnimation scenarioNumber={4} hoverToPlay/>
                      </div>
                    </Stack>

                    <Stack>
                      <Text fz="xs" className={classes.subTitle}>Insight 4</Text>
                      <Stack>
                          <Text fz="md">In order to make people donate, closer friends are more influential.</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid.Col>

                <Grid.Col md={4} sm={6} xs={12}>
                  <Stack>
                    <Stack className={classes.greyBackground}>
                      <div className={classes.imageBorder}>
                        <RiveAnimation scenarioNumber={5} hoverToPlay/>
                      </div>
                    </Stack>

                    <Stack>
                      <Text fz="xs" className={classes.subTitle}>Insight 5</Text>
                      <Stack mt="auto">
                          <Text fz="md">People thought it was unlikely that everyone would do "good".</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid.Col>

                <Grid.Col md={4} sm={6} xs={12}>
                  <Stack>
                    <Stack className={classes.greyBackground}>
                      <div className={classes.imageBorder}>
                        <RiveAnimation scenarioNumber={6} hoverToPlay/>
                      </div>
                    </Stack>

                    <Stack>
                      <Text fz="xs" className={classes.subTitle}>Insight 6</Text>
                      <Stack mt="auto">
                          <Text fz="md">It is sometimes stressful when someone puts more effort into donating than you do.</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid.Col>
              </Grid>

              <Grid gutter={20} mb={80}>
                <Grid.Col md={4} sm={6} xs={12}>
                  <Stack>
                    <Stack className={classes.greyBackground}>
                      <div className={classes.imageBorder}>
                        <RiveAnimation scenarioNumber={8} hoverToPlay/>
                      </div>
                    </Stack>

                    <Stack>
                      <Text fz="xs" className={classes.subTitle}>Insight 7</Text>
                      <Stack>
                          <Text fz="md">Sometimes, it doesn't require a whole group but just one influence that explicitly explaining he donates.</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid.Col>

                <Grid.Col md={4} sm={6} xs={12}>
                  <Stack>
                    <Stack className={classes.greyBackground}>
                      <div className={classes.imageBorder}>
                        <RiveAnimation scenarioNumber={8} hoverToPlay/>
                      </div>
                    </Stack>

                    <Stack>
                      <Text fz="xs" className={classes.subTitle}>Insight 8</Text>
                      <Stack mt="auto">
                          <Text fz="md">Knowing that someone donated before you will make you feel more responsible to donate.</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid.Col>

                <Grid.Col md={4} sm={6} xs={12}>
                  <Stack>
                    <Stack className={classes.greyBackground}>
                      <div className={classes.imageBorder}>
                        <RiveAnimation scenarioNumber={9} hoverToPlay/>
                      </div>
                    </Stack>

                    <Stack>
                      <Text fz="xs" className={classes.subTitle}>Insight 9</Text>
                      <Stack mt="auto">
                          <Text fz="md">Choices can create is a sense of inferiority and a tendency to avoid easy options.</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid.Col>
              </Grid>

              <Grid gutter={20} mb={80}>
                <Grid.Col md={4} sm={6} xs={12}>
                  <Stack>
                    <Stack className={classes.greyBackground}>
                      <div className={classes.imageBorder}>
                        <RiveAnimation scenarioNumber={9} hoverToPlay/>
                      </div>
                    </Stack>

                    <Stack>
                      <Text fz="xs" className={classes.subTitle}>Insight 10</Text>
                      <Stack>
                          <Text fz="md">Adding a gift to a donation adds a sense of significance and effort.</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid.Col>

                <Grid.Col md={4} sm={6} xs={12}>
                  <Stack>
                    <Stack className={classes.greyBackground}>
                      <div className={classes.imageBorder}>
                        <RiveAnimation scenarioNumber={10} hoverToPlay/>
                      </div>
                    </Stack>

                    <Stack>
                      <Text fz="xs" className={classes.subTitle}>Insight 12</Text>
                      <Stack mt="auto">
                          <Text fz="md">Defaults are known as "acceptable" donations.</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid.Col>

                <Grid.Col md={4} sm={6} xs={12}>
                  <Stack>
                    <Stack className={classes.greyBackground}>
                      <div className={classes.imageBorder}>
                        <RiveAnimation scenarioNumber={4} hoverToPlay/>
                      </div>
                    </Stack>

                    <Stack>
                      <Text fz="xs" className={classes.subTitle}>Insight 13</Text>
                      <Stack>
                          <Text fz="md">People want to predict what will happen to their money.</Text>
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