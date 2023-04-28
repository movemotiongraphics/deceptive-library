import { Group, Flex, Stack, Container, Button, createStyles, Image, Badge, Text, Grid } from '@mantine/core';
import DeceptiveChart from '../components/DeceptiveChart';
import { useState, useEffect } from 'react' 
import { ArrowNarrowRight, AppWindow } from 'tabler-icons-react';
import { RiveAnimation } from '../components/riveDonate'

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
  },

  strategyBoxes: {
    borderRadius: 20,
    backgroundColor: theme.colors.gray[0],
    overflow: "hidden",
  },

  strategyScenarioBoxes: {
    borderRadius: 20,
    aspectRatio: "10 / 13",
    margin: "20px 20px 0 0",
    width: 300,
    outline: "1px solid rgba(0,0,0,0.1)",
    overflow: "hidden",
    opacity: 1,
    transition: "0.3s ease all",
    backgroundColor: theme.colors.gray[1],
    transform: "translate(0px, 200px)",
    boxShadow: "0px 15px 32px 1px rgba(0,0,0,0.10)",

    '::before': {
      content: '"Go to Scenario"',
      fontFamily: "Space Mono",
      display: "flex",
      justifyItems: "center",
      textAlign: "center",
      alignItems: "center",
      position: "absolute",
      height: "100%",
      width: "100%",
      paddingLeft: "90px",
      backgroundColor: "rgba(0,0,0,0)",
      opacity: 0,
      transition: "0.3s ease all",
      pointerEvents: "none",
      color: "white",
      fontSize: "14px",
    },

    '&:hover': {
      opacity: 1,
      transition: "0.3s ease all",
      transform: "translate(0px, 0px)",
      boxShadow: "15px 15px 32px 1px rgba(0,0,0,0.10)",

      '::before': {
        backgroundColor: "rgba(0,0,0,0.8)",
        opacity: 1,
        transition: "0.3s ease all",
      }
    },

    [BREAKPOINT]: {
      transform: "translate(-5px, 200px)",
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
              Find some strategies to use!
            </h1>
          </Group>

          <Stack my={100} align="center" w="100%">
                <Group maw={800}>
                  <Text fz="xs" className={classes.subTitle}>Find based on Deception Score</Text>
                  <Stack mt="auto">
                      <Text fz="md">The deception score measures how socially acceptable a deceptive interface is. It is used to determine whether your deceptive interface is appropriate for your users. The chart below is a list of 12 scenarios charted against their deceptive score, take a look below to get some inspiration.</Text>
                  </Stack>
                </Group>
          </Stack>

          <Stack spacing={20}>
            <Group mb={20}>
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

        <Stack spacing={20} mt={50}>

          <Stack spacing={0}>
          

          <Grid p={0} m={0} justify='left'>
              <Grid.Col className={classes.strategyBoxes} md={12} sm={12} xs={12} p={20} mb={50}>

                  <Stack>
                    <Group className={classes.uiShell}>
                      <AppWindow
                          size={20}
                          strokeWidth={1}
                          color={'gray'}
                          style={{ marginLeft: 10 }}
                        />
                        <Text fz="xs" c="dimmed" className={classes.alternateText}>Strategy 1</Text>
                    </Group>
                    <Stack maw={500} spacing={30}>
                      <Text fz="sm" className={classes.alternateText}>Framing donation as a chance to win.</Text>
                      <Text fz="sm">In these examples, the donation choice is changed into a chance to win or donate. The probability of donating is always higher than winning.</Text>
                    </Stack>
                    <Group ml={"auto"} style={{ marginTop: "-150px" }}>
                      <Group>
                      <Stack>
                        <Text fz="xs" c="dimmed" className={ classes.alternateText } style={{ transform: "translate(0px,230px)"}}>Scenario 0</Text>
                        <a href="./scenario/0">
                        <Group className={classes.strategyScenarioBoxes}>
                          <RiveAnimation scenarioNumber={0} hoverToPlay/>
                        </Group>
                        </a>
                      </Stack>

                      <Stack>
                        <Text fz="xs" c="dimmed" className={ classes.alternateText } style={{ transform: "translate(0px,230px)"}}>Scenario 2</Text>
                        <a href="./scenario/2">
                        <Group className={classes.strategyScenarioBoxes}>
                          <RiveAnimation scenarioNumber={2} hoverToPlay/>
                        </Group>
                        </a>
                      </Stack>

                      <Stack>
                        <Text fz="xs" c="dimmed" className={ classes.alternateText } style={{ transform: "translate(0px,230px)"}}>Scenario 11</Text>
                        <a href="./scenario/11">
                        <Group className={classes.strategyScenarioBoxes}>
                          <RiveAnimation scenarioNumber={11} hoverToPlay/>
                        </Group>
                        </a>
                      </Stack>
                      </Group>
                    </Group>
                  </Stack>

              </Grid.Col>

              <Grid.Col className={classes.strategyBoxes} md={12} sm={12} xs={12} p={20} mb={50}>

                <Stack>
                  <Group className={classes.uiShell}>
                    <AppWindow
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                        style={{ marginLeft: 10 }}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Strategy 2</Text>
                  </Group>
                  <Stack maw={500} spacing={30}>
                    <Text fz="sm" className={classes.alternateText}>Attaching material value to donation to show  effort.</Text>
                    <Text fz="sm">In the study, participants felt that when gifts are attached to donations, it seemed like the organisation was putting in more effort. We can leverage onto this to create deceptive interfaces.</Text>
                  </Stack>
                  <Group ml={"auto"} style={{ marginTop: "-150px" }}>
                    <Group>
                    <Stack>
                      <Text fz="xs" c="dimmed" className={ classes.alternateText } style={{ transform: "translate(0px,230px)"}}>Scenario 3</Text>
                      <a href="./scenario/3">
                      <Group className={classes.strategyScenarioBoxes}>
                        <RiveAnimation scenarioNumber={3} hoverToPlay/>
                      </Group>
                      </a>
                    </Stack>

                    <Stack>
                      
                      <Text fz="xs" c="dimmed" className={ classes.alternateText } style={{ transform: "translate(0px,230px)"}}>Scenario 9</Text>
                      <a href="./scenario/9">
                      <Group className={classes.strategyScenarioBoxes}>
                        <RiveAnimation scenarioNumber={9} hoverToPlay/>
                      </Group>
                      </a>
                    </Stack>

                    </Group>
                  </Group>
                </Stack>

              </Grid.Col>

              <Grid.Col className={classes.strategyBoxes} md={12} sm={12} xs={12} p={20} mb={50}>

                <Stack>
                  <Group className={classes.uiShell}>
                    <AppWindow
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                        style={{ marginLeft: 10 }}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Strategy 3</Text>
                  </Group>
                  <Stack maw={500} spacing={30}>
                    <Text fz="sm" className={classes.alternateText}>Introducing individual social Influence to make people donate.</Text>
                    <Text fz="sm">It turns out that social influence is socially acceptable when it comes to donations, in fact, sometimes just one person is enough to influence someone to donate.</Text>
                  </Stack>
                  <Group ml={"auto"} style={{ marginTop: "-150px" }}>
                    <Group>
                    <Stack>
                      <Text fz="xs" c="dimmed" className={ classes.alternateText } style={{ transform: "translate(0px,230px)"}}>Scenario 4</Text>
                      <a href="./scenario/4">
                      <Group className={classes.strategyScenarioBoxes}>
                        <RiveAnimation scenarioNumber={4} hoverToPlay/>
                      </Group>
                      </a>
                    </Stack>

                    <Stack>
                      
                      <Text fz="xs" c="dimmed" className={ classes.alternateText } style={{ transform: "translate(0px,230px)"}}>Scenario 5</Text>
                      <a href="./scenario/5">
                      <Group className={classes.strategyScenarioBoxes}>
                        <RiveAnimation scenarioNumber={5} hoverToPlay/>
                      </Group>
                      </a>
                    </Stack>
                    
                    <Stack>
                      
                      <Text fz="xs" c="dimmed" className={ classes.alternateText } style={{ transform: "translate(0px,230px)"}}>Scenario 8</Text>
                      <a href="./scenario/8">
                      <Group className={classes.strategyScenarioBoxes}>
                        <RiveAnimation scenarioNumber={8} hoverToPlay/>
                      </Group>
                      </a>
                    </Stack>

                    </Group>
                  </Group>
                </Stack>

              </Grid.Col>

              <Grid.Col className={classes.strategyBoxes} md={12} sm={12} xs={12} p={20} mb={50}>

                <Stack>
                  <Group className={classes.uiShell}>
                    <AppWindow
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                        style={{ marginLeft: 10 }}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Strategy 4</Text>
                  </Group>
                  <Stack maw={500} spacing={30}>
                    <Text fz="sm" className={classes.alternateText}>Leveraging on consumer’s relationship with store to make people donate.</Text>
                    <Text fz="sm">If you finding donations from a strong community, you can also leverage onto those relationship to create deceptive interfaces.</Text>
                  </Stack>
                  <Group ml={"auto"} style={{ marginTop: "-150px" }}>
                    <Group>
                    <Stack>
                      <Text fz="xs" c="dimmed" className={ classes.alternateText } style={{ transform: "translate(0px,230px)"}}>Scenario 6</Text>
                      <a href="./scenario/6">
                      <Group className={classes.strategyScenarioBoxes}>
                        <RiveAnimation scenarioNumber={6} hoverToPlay/>
                      </Group>
                      </a>
                    </Stack>

                    <Stack>
                      <Text fz="xs" c="dimmed" className={ classes.alternateText } style={{ transform: "translate(0px,230px)"}}>Scenario 7</Text>
                      <a href="./scenario/7">
                      <Group className={classes.strategyScenarioBoxes}>
                        <RiveAnimation scenarioNumber={7} hoverToPlay/>
                      </Group>
                      </a>
                    </Stack>


                    </Group>
                  </Group>
                </Stack>

              </Grid.Col>


              <Grid.Col className={classes.strategyBoxes} md={12} sm={12} xs={12} p={20}>

                <Stack>
                  <Group className={classes.uiShell}>
                    <AppWindow
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                        style={{ marginLeft: 10 }}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Strategy 5</Text>
                  </Group>
                  <Stack maw={500} spacing={30}>
                    <Text fz="sm" className={classes.alternateText}>Adjusting defaults to fit various appetites by creating more choices.</Text>
                    <Text fz="sm">Sometimes, people are willing to pay if the default donation amount can be adjusted to fit their criteria, so we can use this to nudge for higher donations.</Text>
                  </Stack>
                  <Group ml={"auto"} style={{ marginTop: "-150px" }}>
                    <Group>
                    <Stack>
                      <Text fz="xs" c="dimmed" className={ classes.alternateText } style={{ transform: "translate(0px,230px)"}}>Scenario 7</Text>
                      <a href="./scenario/7">
                      <Group className={classes.strategyScenarioBoxes}>
                        <RiveAnimation scenarioNumber={7} hoverToPlay/>
                      </Group>
                      </a>
                    </Stack>

                    <Stack>
                      <Text fz="xs" c="dimmed" className={ classes.alternateText } style={{ transform: "translate(0px,230px)"}}>Scenario 10</Text>
                      <a href="./scenario/10">
                      <Group className={classes.strategyScenarioBoxes}>
                        <RiveAnimation scenarioNumber={10} hoverToPlay/>
                      </Group>
                      </a>
                    </Stack>


                    </Group>
                  </Group>
                </Stack>

              </Grid.Col>
          </Grid>



          <Stack align="center" w="100%" py={100}>
                <Stack position="left" maw={800}>
                  <Text fz="xs" className={classes.subTitle} grow>Make your own</Text>
                  <Stack mt="auto" mb={20}>
                      <Text fz="md">Start using the framework to make your own deceptive interface!</Text>
                  </Stack>
                  <a href={"./"}>
                        <Button uppercase rightIcon={<ArrowNarrowRight strokeWidth={1}/>} color="dark" radius={5} size="xl" style={{ fontSize: '14px', fontWeight: 400, fontFamily: "Space Mono" }}>Make Your Own</Button>
                      </a>
                </Stack>
          </Stack>


          </Stack>
        </Stack>

      </Container>
    )
}

export default ChartsPage