import { AppShell, Navbar, Header, Group, Flex, Stack, Button, BackgroundImage, Divider, Grid, Badge, Image, Input, Slider, Checkbox, Textarea, ScrollArea  } from '@mantine/core';
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
import { QuestionMark, AppWindow, Paperclip, Telescope, Artboard, OneTwoThree, LineDotted, ArrowNarrowRight } from 'tabler-icons-react';

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

  accentBackground: {
    backgroundColor: theme.colors.blue[5],
  },

  instructionCard: {
    border: "1px solid rgba(0,0,0,0.22)",
    backgroundColor: theme.colors.gray[0],
    borderRadius: 5,
    overflow: "hidden",
    padding: 20,
    boxShadow: "0px 1px 0px 0px rgba(0,0,0,0.22)",

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
    maxHeight: 400,
    display: 'block',
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.22)",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 15,
    width: 250,
    transition: '0.3s ease all',

    '&:hover': {
      boxShadow: "14px 13px 41px 0px rgba(0,0,0,0.18)",
    },

  },

  InspirationProfile: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: theme.colors.grape[2],

  },

  InspirationDot: {
    width: 8,
    height: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.green[5],
    marginLeft: "-20px",
    marginTop: "25px",
    outline: "3px solid white"
  },

  InspirationBoxesImage: {
    maxHeight: 200,
    minWidth: "100%",
    filter: "grayscale(1)",

    '&:hover': {
      filter: 'grayscale(0)',
      transition: '0.3s ease all',
    },
  },

  InspirationBoxesDiv: {
    borderRadius: 5,
    width: "100%",
    height: "70%",
    marginBottom: "10px",
    overflow: "hidden",
  },

  alternateText: {
    fontFamily: "Space Mono",
  },

  greyBackground: {
    backgroundColor: theme.colors.gray[2],
  },

  uiBackground: {
    backgroundColor: theme.colors.gray[0],
    borderRadius: "10px",
    padding: 20,
    boxShadow: "11px 19px 40px 0px rgba(0,0,0,0.10)",
    border: "1px solid rgba(0,0,0,0.22)",
    overflow: "hidden",

  },
  
  uiShell: {
    borderBottom: "1px solid rgba(0,0,0,0.22)",
    marginLeft: "-30px",
    paddingLeft: 20,
    paddingBottom: 20,
    width: "120%",
  },

  stepsBoxes: {
    borderLeft: "1px dotted #D0D0D0",
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

  greyBackgroundAlternate: {
    backgroundColor: "transparent",
  },

  subTitle: {
    fontFamily: "Space Mono",
    textAlign: "center",
  },

  spinnerClass: {
    width: "300px",
    height: "300px"
  },

  spinnerHead: {
    zIndex: "100",
    transform: "translate(100px, 0px)",

    '&:hover': {
      filter: "brightness(1.2)",
    },
  },

  spinnerBackground: {
    transition: "2s ease all",
    position: "absolute",
    transform: "translate(0px, 0px)",
    zIndex: "0",
  },

  inputArea: {
    backgroundColor: theme.colors.gray[1],
    borderRadius: 5,
    padding: "10px 0 10px 20px",
  },

  postIts: {
    border: "1px solid rgba(0,0,0,0.22)",
    borderRadius: 20,
    padding: 20,
    overflow: "hidden",
  },

  postItsSpecial: {
    border: "1px solid rgba(0,0,0,0.22)",
    borderRadius: 20,
    padding: 20,
    overflow: "hidden",
    backgroundColor: theme.colors.grape[0],
    boxShadow: "18px 10px 48px 1px rgba(201,156,221,0.22)",
  },

  communityResponse: {
    borderRadius: 20,
    backgroundColor: theme.colors.gray[0],
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.22)",
  }

}));


export default function HomePage() {
  const { classes } = useStyles();
  const [originalRecords, setOrignalRecords] = useState([]);
  const [strategyRecords, setStrategyRecords] = useState([]);
  const [insightRecords, setInsightRecords] = useState([]);
  const [scenarioRecords, setScenarioRecords] = useState([]);
  const [contextRecords, setContextRecords] = useState([]);
  const [seenBeforeRecords, setSeenBeforeRecords] = useState([]);
  
  //interactiveComponents
  const [inputAmount, setInputAmount] = useState(0)
  const [sliderAmount, setSliderAmount] = useState(0)
  const [spinnerOn, setSpinner] = useState(false);
  
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
    console.log(strategyArray);

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

  const handleSpin = () => {
    setSpinner(!spinnerOn);
  };


  return (
    <Container size="xl" px={30}>
      <HeroTitle></HeroTitle>

      <Stack mt={200} mb={200}>
        <Divider my="sm" />
        <Group spacing={0}>
            <div className={classes.badgeLight}><Text fz="xs" className={classes.alternateText}>0</Text></div>
            <div className={classes.badgeDark}><Text fz="xs" className={classes.alternateText}>Preface</Text></div>
        </Group>
      </Stack>

      <Stack my={200} align="center" w="100%">
                <Group maw={800}>
                  <Text fz="xs" className={classes.subTitle}>Deception and User Interfaces</Text>
                  <Stack mt="auto" spacing={50}>
                      <Text fz="md">This framework is developed as a part of my study in design school. In this study, deception is defined as a method to alter information by creating hidden points of comparisons through being less transparent, creating pressure and encouraging risk-taking. This allows the deceiver to make people favour a decision that benefits the themselves.</Text>
                      <Text fz="md">I wonder if deception can be used by designers as a strategy to further influence behaviour for altruistic outcomes? This framework is the summarised outcome of how I designed socially-acceptable deceptive interfaces for my study.</Text>
                      <div>
                      <a href={"./about"}>
                        <Button uppercase rightIcon={<ArrowNarrowRight strokeWidth={1}/>} color="dark" radius={5} size="xl" style={{ fontSize: '14px', fontWeight: 400, fontFamily: "Space Mono" }}>More about this project</Button>
                      </a>
                      </div>
                  </Stack>
                </Group>
      </Stack>

      <Stack mt={200} mb={200}>
        <Divider my="sm" />
        <Group spacing={0}>
            <div className={classes.badgeLight}><Text fz="xs" className={classes.alternateText}>0</Text></div>
            <div className={classes.badgeDark}><Text fz="xs" className={classes.alternateText}>Introduction</Text></div>
        </Group>
      </Stack>

      <Group mt={130} mb={150} className={classes.greyBackgroundAlternate} position="center" justifyContent="center" mih={600}>
          <Stack w="100%" align="center" >
            <Group mb={100} position="center">
            <Text fz="xs" className={classes.subTitle}>Yes! Make people do what you want them to digitally!</Text>
            <h1 className={classes.title} style={{textAlign: "center"}}>
            Make socially acceptable deceptive interfaces in 4 simple steps.
            </h1>
            </Group>
            <Image mt={50} maw={200} src="../img/dif.svg"></Image>
          </Stack>
      </Group>

      <Stack my={200} align="center" w="100%">
                <Group maw={800}>
                  <Text fz="xs" className={classes.subTitle}>About the Deceptive Interfaes Framework</Text>
                  <Stack mt="auto">
                      <Text fz="md">The framework consists of four libraries that are designed to be considered in sequence. Each step consists of examples and guides that you can adopt in your own design. Follow the guide to make your own deceptive interface.</Text>
                  </Stack>
                </Group>
      </Stack>

      <Stack align="center">
        <Grid m={0} p={0} maw={1000}>
              <Grid.Col md={12} sm={12} xs={12}>
                <Stack className={classes.instructionCard}>
                  <Group className={classes.uiShell}>
                    <OneTwoThree
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                        style={{ marginLeft: 10 }}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Step 1</Text>
                  </Group>
                  <Text fz="md" className={classes.alternateText}>Getting Inspiration</Text>
                  <Group>
                  <Text fz="sm" c="dimmed">The idea is to get inspiration from common deceptive schemes. A good question to ask ourselves is “When did you feel like you were influenced to participate in an activity?”. This helps to make human biases easy to replicate and understand.</Text>                  
                  </Group>
                </Stack>
              </Grid.Col>

              <Grid.Col md={12} sm={12} xs={12}>
                <Stack align="center">
                  <LineDotted
                    size={28}
                    strokeWidth={2}
                    color={'black'}
                  />
                </Stack>
              </Grid.Col>

              <Grid.Col md={12} sm={12} xs={12}>
              <Stack className={classes.instructionCard}>
                  <Group className={classes.uiShell}>
                    <OneTwoThree
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                        style={{ marginLeft: 10 }}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Step 2</Text>
                  </Group>
                  <Text fz="md" className={classes.alternateText}>Using Components</Text>
                  <Group>
                  <Text fz="sm" c="dimmed">Different UI components can make people make decisions faster or slower. Craft the perfect interface using the right components after thinking about your target audience.</Text>                  
                  </Group>
                </Stack>
              </Grid.Col>

              <Grid.Col md={12} sm={12} xs={12}>
                <Stack align="center">
                  <LineDotted
                    size={28}
                    strokeWidth={2}
                    color={'black'}
                  />
                </Stack>
              </Grid.Col>

              <Grid.Col md={12} sm={12} xs={12}>
              <Stack className={classes.instructionCard}>
                  <Group className={classes.uiShell}>
                    <OneTwoThree
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                        style={{ marginLeft: 10 }}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Step 3</Text>
                  </Group>
                  <Text fz="md" className={classes.alternateText}>Picking Strategies</Text>
                  <Group>
                  <Text fz="sm" c="dimmed">Turning a deceptive scheme into a strategy can help you place different components into your interface. The study contains a collection of insights and strategies to help you bring different components together, to make a deceptive interface.</Text>                  
                  </Group>
                </Stack>
              </Grid.Col>

              <Grid.Col md={12} sm={12} xs={12}>
                <Stack align="center">
                  <LineDotted
                    size={28}
                    strokeWidth={2}
                    color={'black'}
                  />
                </Stack>
              </Grid.Col>

              <Grid.Col md={12} sm={12} xs={12}>
              <Stack className={classes.instructionCard}>
                  <Group className={classes.uiShell}>
                    <OneTwoThree
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                        style={{ marginLeft: 10 }}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Step 3</Text>
                  </Group>
                  <Text fz="md" className={classes.alternateText}>Measuring Social Acceptability</Text>
                  <Group>
                  <Text fz="sm" c="dimmed">Deceptive interfaces have different social acceptability. Here we learn how to measure how effective those interfaces are.</Text>                  
                  </Group>
                </Stack>
              </Grid.Col>

        </Grid>
      </Stack>

      <Stack mt={50}>
        <Divider my="sm" />
        <Group spacing={0}>
            <div className={classes.badgeLight}><Text fz="xs" className={classes.alternateText}>1</Text></div>
            <div className={classes.badgeDark}><Text fz="xs" className={classes.alternateText}>Getting Inspiration</Text></div>
        </Group>
      </Stack>

      <Group mt={130} mb={150} className={classes.greyBackgroundAlternate} position="center" justifyContent="center" mih={600}>
          <Stack w="100%" align="center" >
            <Stack mb={100} align="center" position="center">
            <Text fz="xs" className={classes.subTitle}>A question to ask yourself</Text>
            <h1 className={classes.title} style={{textAlign: "center"}}>
            When did you feel like you were influenced to participate in an activity?
            </h1>
            </Stack>
            <Image mt={50} maw={200} src="../img/chapter1.svg"></Image>
          </Stack>
      </Group>

      <Stack spacing={20} mt={20} mb={50}>
        <Stack>
          <Stack position="left" align="center" mb={50}>
          <Text fz="xs" className={classes.subTitle} grow>A question to ask yourself</Text>
          <Stack align="center" w="100%">
            <Text fz="md">When did you feel like you were influenced to participate in an activity?</Text>
              <Grid>
                <Grid.Col md={10} sm={12}>
                <div className={classes.inputArea}>
                  <Input
                      placeholder="Try finding one here"
                      radius="xl"
                      variant="unstyled"
                      size="md"
                      w={"100%"}
                      className={classes.subTitle}
                    />
                </div>
                </Grid.Col>
                <Grid.Col md={2}>
                <Button color="dark" radius="xl" size="xl" style={{ fontSize: '16px', fontWeight: 400 }}>Enter</Button>
                </Grid.Col>
              </Grid>
          </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing={20} className={classes.communityResponse} p={30} mb={100}>
        <Stack>
          <Group className={classes.uiShell}>
            <Telescope
                size={20}
                strokeWidth={1}
                color={'gray'}
                style={{ marginLeft: 10 }}
              />
              <Text fz="xs" c="dimmed" className={classes.alternateText}>Community Observations</Text>
          </Group>
          <ScrollArea h={600} type="always" offsetScrollbars>
            <Group position="left" spacing={0} className={classes.helperText}>
              <Group p={0} m={0} align="flex-start">
                { SeenBeforeData ? SeenBeforeData.map((item, index) => (
                    <Stack className={classes.InspirationBoxes} spacing={20}>
                      <Group mb={15}>
                        <div className={classes.InspirationProfile}></div>
                        <div className={classes.InspirationDot}></div>
                        <Text style={{ marginLeft: "-10px" }} fz="xs" className={classes.alternateText}>Person {index}</Text>
                      </Group>
                      <div className={classes.InspirationBoxesDiv}>
                        <img className={classes.InspirationBoxesImage} src={item.ImageURL} ></img>
                      </div>
                      <Text mt={20} fz="xs" className={classes.alternateText}>Person {index} felt cheated at {item.InspirationName}.</Text>

                    </Stack>
                  )) : ''}
              </Group>
            </Group>
          </ScrollArea>
        </Stack>
      </Stack>

      <Stack spacing={20}>
        <Stack>
          <Stack position="left" align="flex-start" mb={200}>
          <Stack align="center" w="100%">
            <Group maw={800}>
              <Text fz="xs" className={classes.subTitle} grow>Inspiration from Activities</Text>
              <Stack mt="auto" mb={100}>
                  <Text fz="md">A scam is a deceptive scheme used to get an unfair advantage over a situation to get things from people.</Text>
                  <Text fz="md">Think back to a situation that made you feel cheated or when someone took advantage of your trust, it is likely that you’ve been through a deceptive scheme.</Text>
                  <Text fz="md">These activities commonly leverage on human biases, which are common patterns that leverage the irrational decision-making of people. These patterns can be used as ideas to form a deceptive strategy.</Text>
                  <Text fz="md">Let's take a look at a few examples of how deceptive schemes can be turned into strategies.</Text>
              </Stack>
            </Group>
          </Stack>

            <Group mb={50}>
              <Grid p={0} m={0}>
                <Grid.Col md={4} sm={12} xs={12} h={"100%"}>
                  <Stack className={classes.postIts}>
                    <Group className={classes.uiShell}>
                          <Paperclip
                              size={20}
                              strokeWidth={1}
                              color={'gray'}
                              style={{ marginLeft: 10 }}
                            />
                            <Text fz="xs" c="dimmed" className={classes.alternateText}>Post It Thoughts</Text>
                    </Group>
                    {/* <Image mx="auto" maw={"100%"} radius="md" src="../img/inspo/tissueAuntie.jpg"></Image> */}
                    <Text fz="xs" className={classes.alternateText}>I felt cheated...</Text>
                    <Text fz="sm">On Kickstarter when I was convinced to participate in their fundraiser.</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col md={4} sm={12} xs={12} h={"100%"}>
                  <Stack className={classes.postIts}>
                      <Group className={classes.uiShell}>
                            <Paperclip
                                size={20}
                                strokeWidth={1}
                                color={'gray'}
                                style={{ marginLeft: 10 }}
                              />
                              <Text fz="xs" c="dimmed" className={classes.alternateText}>Post It Thoughts</Text>
                      </Group>
                      <Text fz="xs" className={classes.alternateText}>I participated because...</Text>
                      <Text fz="sm">I made the decisions believing that other people did the same.</Text>
                    </Stack>
                </Grid.Col>
                <Grid.Col md={4} sm={12} xs={12} h={"100%"}>
                  <Stack className={classes.postItsSpecial}>
                        <Group className={classes.uiShell}>
                              <Artboard
                                  size={20}
                                  strokeWidth={1}
                                  color={'gray'}
                                  style={{ marginLeft: 10 }}
                                />
                                <Text fz="xs" c="dimmed" className={classes.alternateText}>Strategy</Text>
                        </Group>
                        <Text fz="xs" className={classes.alternateText}>If I could receate it...</Text>
                        <Text fz="sm">I will want to make a huge audience believe in each other to donate together.</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Group>

            <Group mb={50}>
              <Grid p={0} m={0}>
                <Grid.Col md={4} sm={12} xs={12} h={"100%"}>
                  <Stack className={classes.postIts}>
                    <Group className={classes.uiShell}>
                          <Paperclip
                              size={20}
                              strokeWidth={1}
                              color={'gray'}
                              style={{ marginLeft: 10 }}
                            />
                            <Text fz="xs" c="dimmed" className={classes.alternateText}>Post It Thoughts</Text>
                    </Group>
                    {/* <Image mx="auto" maw={"100%"} radius="md" src="../img/inspo/tissueAuntie.jpg"></Image> */}
                    <Text fz="xs" className={classes.alternateText}>I felt cheated...</Text>
                    <Text fz="sm">When I bought tissues from the auntie down the street.</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col md={4} sm={12} xs={12} h={"100%"}>
                  <Stack className={classes.postIts}>
                      <Group className={classes.uiShell}>
                            <Paperclip
                                size={20}
                                strokeWidth={1}
                                color={'gray'}
                                style={{ marginLeft: 10 }}
                              />
                              <Text fz="xs" c="dimmed" className={classes.alternateText}>Post It Thoughts</Text>
                      </Group>
                      <Text fz="xs" className={classes.alternateText}>I participated because...</Text>
                      <Text fz="sm">I felt bad if I didn't get the tissue because the auntie is directly selling to me.</Text>
                    </Stack>
                </Grid.Col>
                <Grid.Col md={4} sm={12} xs={12} h={"100%"}>
                  <Stack className={classes.postItsSpecial}>
                        <Group className={classes.uiShell}>
                              <Artboard
                                  size={20}
                                  strokeWidth={1}
                                  color={'gray'}
                                  style={{ marginLeft: 10 }}
                                />
                                <Text fz="xs" c="dimmed" className={classes.alternateText}>Strategy</Text>
                        </Group>
                        <Text fz="xs" className={classes.alternateText}>If I could receate it...</Text>
                        <Text fz="sm">I will want to let one person convince the next person to donate.</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Group>

            <Stack align="center" w="100%">
            <Group maw={800}>
              <Text fz="xs" className={classes.subTitle} grow>Try it yourself</Text>
              <Stack mt="auto" mb={100}>
                  <Text fz="md">Have you been through a deceptive scheme? Try this one yourself! Think back to a situation that made you feel cheated or when someone took advantage of your trust.</Text>
              </Stack>
            </Group>
          </Stack>

            <Group>
              <Grid p={0} m={0} >
                <Grid.Col md={4} sm={12} xs={12} h={"100%"}>
                  <Stack className={classes.postIts}>
                    <Group className={classes.uiShell}>
                          <Paperclip
                              size={20}
                              strokeWidth={1}
                              color={'gray'}
                              style={{ marginLeft: 10 }}
                            />
                            <Text fz="xs" c="dimmed" className={classes.alternateText}>Post It Thoughts</Text>
                    </Group>
                    <Text fz="xs" className={classes.alternateText}>I felt cheated...</Text>
                      <Textarea
                        placeholder="I felt cheated when..."
                        variant="filled"
                        minRows="6"
                      />
                  </Stack>
                </Grid.Col>
                <Grid.Col md={4} sm={12} xs={12} h={"100%"}>
                  <Stack className={classes.postIts}>
                      <Group className={classes.uiShell}>
                            <Paperclip
                                size={20}
                                strokeWidth={1}
                                color={'gray'}
                                style={{ marginLeft: 10 }}
                              />
                              <Text fz="xs" c="dimmed" className={classes.alternateText}>Post It Thoughts</Text>
                      </Group>
                      <Text fz="xs" className={classes.alternateText}>I participated because...</Text>
                      <Textarea
                        placeholder="I felt cheated when..."
                        variant="filled"
                        minRows="6"
                      />
                    </Stack>
                </Grid.Col>
                <Grid.Col md={4} sm={12} xs={12} h={"100%"}>
                  <Stack className={classes.postItsSpecial}>
                        <Group className={classes.uiShell}>
                              <Paperclip
                                  size={20}
                                  strokeWidth={1}
                                  color={'gray'}
                                  style={{ marginLeft: 10 }}
                                />
                                <Text fz="xs" c="dimmed" className={classes.alternateText}>Post It Thoughts</Text>
                        </Group>
                        <Text fz="xs" className={classes.alternateText}>If I could receate it...</Text>
                        <Textarea
                        placeholder="I felt cheated when..."
                        minRows="6"
                      />
                  </Stack>
                </Grid.Col>
              </Grid>
            </Group>

          </Stack>
        </Stack>
      </Stack>

      <Stack>
        <Divider my="sm" />
        <Group spacing={0}>
            <div className={classes.badgeLight}><Text fz="xs" className={classes.alternateText}>2</Text></div>
            <div className={classes.badgeDark}><Text fz="xs" className={classes.alternateText}>Exploring Components</Text></div>
        </Group>
      </Stack>

      <Group mt={130} mb={150} className={classes.greyBackgroundAlternate} position="center" justifyContent="center" mih={600}>
          <Stack w="100%" align="center" >
            <Stack mb={100} align="center" position="center">
            <Text fz="xs" className={classes.subTitle}>A question to ask yourself</Text>
            <h1 className={classes.title} style={{textAlign: "center"}}>
            How can we make users think a little more before they make a decision?
            </h1>
            </Stack>
            <Image mt={50} maw={200} src="../img/chapter2.svg"></Image>
          </Stack>
      </Group>

      <Stack spacing={20} mt={20}>
        <Stack>
          <Stack align="center" w="100%">
              <Group maw={800}>
                <Text fz="xs" className={classes.subTitle} grow>Components and Decision Making</Text>
                <Stack mt="auto" mb={100}>
                    <Text fz="md">A simple choice is a straightforward method of requesting something, but in certain circumstances, its effectiveness can be improved by prolonging and expanding the decision-making process.</Text>
                    <Text fz="md">Instead of relying on just a button, these UI components have various influences on decision making and make some information more important.</Text>
                    <Text fz="md">Here are 4 different UI components and their influences.</Text>
                </Stack>
              </Group>
            </Stack>
        </Stack>
      </Stack>

      <Stack p={0} m={0} spacing={30} mb={200}>
        <Group className={classes.stepsBoxes} align="flex-start">
          <CardComponent number={1} type="Input Area" description="Used when you want confirmation and when you are sure users are confident to give a donation.">
            <Stack mt={50} mb={50} className={classes.uiBackground} maw={400}>
              <Group className={classes.uiShell}>
                        <AppWindow
                            size={20}
                            strokeWidth={1}
                            color={'gray'}
                            style={{ marginLeft: 10 }}
                          />
                          <Text fz="xs" c="dimmed" className={classes.alternateText}>Component</Text>
                  </Group>
              <Text fz="sm">How much would you want to contribute?</Text>
              <Input 
              placeholder="Your Donation Amount"
              variant="filled"
              onChange={(e) => setInputAmount(e.target.value)}
              type="number"
              />
              <Text fz="xs" c='dimmed'>You will be contributing ${inputAmount ? inputAmount : '0'} to Animal Lovers League.</Text>
            </Stack>
          </CardComponent>   
        </Group>
        <Group className={classes.stepsBoxes}>
          <CardComponent  number={2} type="Slider" description="Used to show relevance/relationship between 2 numbers to highlight a value's importance.">
              <Stack mt={50} mb={50} maw={400} className={classes.uiBackground}>
                <Group className={classes.uiShell}>
                      <AppWindow
                          size={20}
                          strokeWidth={1}
                          color={'gray'}
                          style={{ marginLeft: 10 }}
                        />
                        <Text fz="xs" c="dimmed" className={classes.alternateText}>Component</Text>
                </Group>
                <Text fz="sm" mb={50}>The shop will boost your donation by 50%</Text>
                <Text fz="xs">You will donate ${ sliderAmount ? sliderAmount : '0'}</Text>
                <Slider
                      w={300}
                      mb={50}
                      defaultValue={10}
                      min={0}
                      max={200}
                      marks={[
                        { value: 0, label: '$0' },
                        { value: 200, label: '$200' },
                      ]}
                      color="dark"
                      onChange={setSliderAmount}
                  />
                <Text fz="xs">The shop will then donate an extra ${ (sliderAmount * 0.5).toFixed(2)} to make the total donation ${ (sliderAmount * 1.5).toFixed(2)}</Text>
                <Slider
                      style={{ pointerEvents: "none"}}
                      w={300}
                      mb={50}
                      defaultValue={5}
                      min={0}
                      max={200}
                      marks={[
                        { value: 30, label: 'No-Boost' },
                        { value: 500, label: 'Boosted' },
                      ]}
                      color="dark"
                      value={sliderAmount * 2.5}
                  />
              </Stack>
          </CardComponent>   
        </Group>
        <Group className={classes.stepsBoxes}>
          <CardComponent  number={3} type="Checkboxes (Multiple Choices)" description="Used to slow down decision making and make some choices more important than the other.">
              <Stack mt={50} mb={50} className={classes.uiBackground}>
              <Group className={classes.uiShell} style={{ width: "150%"}}>
                    <AppWindow
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                        style={{ marginLeft: 10 }}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Component</Text>
              </Group>
                <Checkbox 
                  label="Add This Donation"
                  color="dark"
                />
                <Checkbox 
                  label="Add This Too"
                  color="dark"
                />
                <Checkbox
                  label="How about this?"
                  color="dark"
                />
              </Stack>
          </CardComponent>   
        </Group>
        <Group className={classes.stepsBoxes}>
          <CardComponent  number={4} type="Spinners" description="Used when adding an element of chance to a decision. Gives an element of surprise & fun!">
            <Stack mt={50} mb={50} className={classes.uiBackground}>
              <Group className={classes.uiShell}>
                    <AppWindow
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                        style={{ marginLeft: 10 }}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Component</Text>
              </Group>
              
              <div className={classes.spinnerClass}>
                <Image maw={300} className={classes.spinnerBackground} style={{ transform: `rotate(${spinnerOn ? `1200deg` : `0deg`})`}} src="../img/components/Spinner.svg" ></Image>
                <Image maw={100} onClick={handleSpin} className={classes.spinnerHead} src="../img/components/SpinningHead.svg"></Image>
              </div>
            </Stack>
          </CardComponent>   
        </Group>
      </Stack>

      <Stack>
        <Divider my="sm" />
        <Group spacing={0}>
            <div className={classes.badgeLight}><Text fz="xs" className={classes.alternateText}>3</Text></div>
            <div className={classes.badgeDark}><Text fz="xs" className={classes.alternateText}>Using a Strategy</Text></div>
        </Group>
      </Stack>

      <Group mt={130} mb={150} className={classes.greyBackgroundAlternate} position="center" justifyContent="center" mih={600}>
          <Stack w="100%" align="center" >
            <Stack mb={100} align="center" position="center">
            <Text fz="xs" className={classes.subTitle}>A question to ask yourself</Text>
            <h1 className={classes.title} style={{textAlign: "center"}}>
            What do I know about my target audience?
            </h1>
            </Stack>
            <Image mt={50} maw={200} src="../img/chapter3.svg"></Image>
          </Stack>
      </Group>

      <Stack spacing={20} mt={20}>
        <Stack spacing={0}>
          
          <Stack align="center" w="100%">
                <Group maw={800}>
                  <Text fz="xs" className={classes.subTitle}>Limitations of a Deceptive Strategy</Text>
                  <Stack mt="auto" mb={100}>
                      <Text fz="md">After understanding the influence of deceptive schemes and interface components, we can now formulate a unique interface for your specific audience. Think about who your users are and what you want to achieve. Here are a few strategies and their limitations.</Text>
                  </Stack>
                </Group>
          </Stack>

          <Grid p={0} m={0} justify='left'>
              <Grid.Col className={classes.stepsBoxes} md={6} sm={12} xs={12} h={200} p={20}>
                   <Stack>
                    <Text fz="xs" className={classes.alternateText}>Strategy 1</Text>
                    <Text fz="md">Framing donation as a chance to win.</Text>
                   </Stack>
              </Grid.Col>
              <Grid.Col className={classes.stepsBoxes} md={6} sm={12} xs={12} h={200} p={20}>
                   <Stack>
                   <Text fz="xs" className={classes.alternateText}>Strategy 2</Text>
                   <Text fz="md">Attaching material value to donation.</Text>
                   </Stack>
              </Grid.Col>
              <Grid.Col className={classes.stepsBoxes} md={6} sm={12} xs={12} h={200} p={20}>
                   <Stack>
                   <Text fz="xs" className={classes.alternateText}>Strategy 3</Text>
                   <Text fz="md">Introducing social Influence to make people donate.</Text>
                   </Stack>
              </Grid.Col>
              <Grid.Col className={classes.stepsBoxes} md={6} sm={12} xs={12} h={200} p={20}>
                   <Stack>
                   <Text fz="xs" className={classes.alternateText}>Strategy 4</Text>
                   <Text fz="md">Leveraging on consumer’s relationship with store to make people donate.</Text>
                   </Stack>
              </Grid.Col>
              <Grid.Col className={classes.stepsBoxes} md={6} sm={12} xs={12} h={200} p={20}>
                   <Stack>
                   <Text fz="xs" className={classes.alternateText}>Strategy 5</Text>
                   <Text fz="md">Adjusting defaults to fit various appetites.</Text>
                   </Stack>
              </Grid.Col>
          </Grid>



          <Stack align="center" w="100%" pb={100} pt={170} mt={100} className={classes.greyBackground} style={{ borderRadius: "20px" }}>
                <Group maw={800} mb={50}>
                  <Text fz="xs" className={classes.subTitle} grow>Inspirations</Text>
                  <Stack mt="auto" mb={20}>
                      <Text fz="md">We've compiled some strategies based on common target audiences! Visit the inspiration tab to search for some.</Text>
                  </Stack>
                  <a href={"./inspiration"}>
                        <Button uppercase rightIcon={<ArrowNarrowRight strokeWidth={1}/>} color="dark" radius={5} size="xl" style={{ fontSize: '14px', fontWeight: 400, fontFamily: "Space Mono" }}>Get more inspiration</Button>
                      </a>
                </Group>
          </Stack>


        </Stack>
      </Stack>

      <Stack>
        <Divider my="sm" />
        <Group spacing={0}>
            <div className={classes.badgeLight}><Text fz="xs" className={classes.alternateText}>4</Text></div>
            <div className={classes.badgeDark}><Text fz="xs" className={classes.alternateText}>Measuring your Interface</Text></div>
        </Group>
      </Stack>

      <Group mt={130} mb={150} className={classes.greyBackgroundAlternate} position="center" justifyContent="center" mih={600}>
          <Stack w="100%" align="center" >
            <Stack mb={100} align="center" position="center">
            <Text fz="xs" className={classes.subTitle}>A question to ask yourself</Text>
            <h1 className={classes.title} style={{textAlign: "center"}}>
            Is my interface socially acceptable?
            </h1>
            </Stack>
            <Image mt={50} maw={200} src="../img/chapter4.svg"></Image>
          </Stack>
      </Group>

      <Stack>
        <Stack align="center" w="100%">
                <Group maw={800}>
                  <Text fz="xs" className={classes.subTitle}>Measuring your outcome</Text>
                  <Stack mt="auto" mb={100}>
                      <Text fz="md">In my time observing a few deceptive schemes, I noticed that there are a few parameters used to create deception. These parameters are common methods that deceptive schemes try to achieve. As such, we can use them to measure how "shady" our interfaces are.</Text>
                  </Stack>
                </Group>
          </Stack>

          <Group>
              <Grid >
                <Grid.Col md={4} sm={12} xs={12} className={classes.stepsBoxes} h={"100%"}>
                  <CardComponent  number={1} title="Transparency" description="Hiding the deceiver's intentions to distract users. The deceiver aims to reveal just enough information and consider how aware the targets are at a given time while being in a deceptive scheme, a common way to measure how suspicious people are.
">

                  </CardComponent>
                </Grid.Col>
                <Grid.Col md={4} sm={12} xs={12} className={classes.stepsBoxes} h={"100%"}>
                  <CardComponent  number={2} title="Situational Pressure" description="The deceiver aims to create enough situational pressure to make people act faster. This is done through multiple techniques, an example is how a victim got placed in a group full of people pressuring him to act.
">
                  </CardComponent>
                </Grid.Col>
                <Grid.Col md={4} sm={12} xs={12} className={classes.stepsBoxes} h={"100%"}>
                  <CardComponent  number={3} title="Risk" description="The deceiver aims to encourage people to take risks through incentivisation or promises.">
                  </CardComponent>
                </Grid.Col>
              </Grid>
            </Group>

            <Stack align="center" w="100%" mt={200}>
                <Group maw={800}>
                  <Text fz="xs" className={classes.subTitle}>In practical scenarios</Text>
                  <Stack mt="auto" mb={100}>
                      <Text fz="md">In my experiments, I gathered those measurements using surveys that asked questions like these. After getting their results, we can tabulate this into a score, which we can use to determine how socially acceptable our interfaces are. Try it below!</Text>
                  </Stack>
                </Group>
          </Stack>

          <Grid>
            <Grid.Col md={4} sm={12} xs={12}>
              <Group className={classes.stepsBoxes} align="flex-start">
                <CardComponent number={1}>
                  <Stack mt={50} mb={50} p={30} className={classes.uiBackground} maw={400}>
                  <Group className={classes.uiShell}>
                    <QuestionMark
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Question</Text>
                  </Group>
                    <Text fz="sm">How much of a risk was it to donate in this scenario?</Text>
                    <Slider mb={30}
                      marks={[
                        { value: 8, label: 'Not Risky' },
                        { value: 25, label: '' },
                        { value: 50, label: '' },
                        { value: 75, label: '' },
                        { value: 90, label: 'Very Risky' },
                      ]}
                      styles={{
                        markLabel: {
                          textAlign: "left",
                          fontFamily: "Space Mono",
                          fontSize: 12,
                          marginTop: 10
                        }
                      }}
                    />
                  </Stack>
                </CardComponent>   
              </Group>
            </Grid.Col>

            <Grid.Col md={4} sm={12} xs={12}>
              <Group className={classes.stepsBoxes} align="flex-start">
                <CardComponent number={1}>
                  <Stack mt={50} mb={50} p={30} className={classes.uiBackground} maw={400}>
                  <Group className={classes.uiShell}>
                    <QuestionMark
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Question</Text>
                  </Group>
                    <Text fz="sm">When using this interface, how often do you feel unsure or uncertain about the outcome that will be given to you?</Text>
                    <Slider mb={30}
                      marks={[
                        { value: 9, label: 'Not Often' },
                        { value: 25, label: '' },
                        { value: 50, label: '' },
                        { value: 75, label: '' },
                        { value: 90, label: 'Very Often' },
                      ]}
                      styles={{
                        markLabel: {
                          textAlign: "left",
                          fontFamily: "Space Mono",
                          fontSize: 12,
                          marginTop: 10
                        }
                      }}
                    />
                  </Stack>
                </CardComponent>   
              </Group>
            </Grid.Col>

            <Grid.Col md={4} sm={12} xs={12}>
              <Group className={classes.stepsBoxes} align="flex-start">
                <CardComponent number={1}>
                  <Stack mt={50} mb={50} p={30} className={classes.uiBackground} maw={400}>
                  <Group className={classes.uiShell}>
                    <QuestionMark
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Question</Text>
                  </Group>
                    <Text fz="sm">On a scale of 1-5, how pressuring was the experience in asking you to donate?</Text>
                    <Slider mb={30}
                      marks={[
                        { value: 13, label: 'Not Pressuring' },
                        { value: 25, label: '' },
                        { value: 50, label: '' },
                        { value: 75, label: '' },
                        { value: 90, label: 'Pressuring' },
                      ]}
                      styles={{
                        markLabel: {
                          textAlign: "left",
                          fontFamily: "Space Mono",
                          fontSize: 12,
                          marginTop: 10
                        }
                      }}
                    />
                  </Stack>
                </CardComponent>   
              </Group>
            </Grid.Col>
          </Grid>
      </Stack>

    </Container>
  );
}