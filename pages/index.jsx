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
import { ArrowNarrowLeft, QuestionMark, AppWindow, Paperclip, Telescope, Artboard, OneTwoThree, LineDotted, ArrowNarrowRight } from 'tabler-icons-react';

import DeceptiveCard from '../components/DeceptiveCard';
import StrategyCard from '../components/StrategyCard';
import HeroTitle from '../components/Intro';
import InsightCard from '../components/InsightCard';
import DeceptiveChart from '../components/DeceptiveChart';
import ChooseMachine from '../components/chooseMachine';
import CardComponent from '../components/cardComponent';
import { RiveAnimation } from '../components/riveDonate';

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
      width: "100%",
      fontSize: 42,
      lineHeight: 1.1,
    },
  },

  headerSpacing: {
    marginTop: 100,
    marginBottom: 100,

    [BREAKPOINT]: {
      marginTop: 50,
      marginBottom: 50,
    },
  },

  stepIcons: {
    marginTop: 50,
    maxWidth: 100,

    [BREAKPOINT]: {
      marginTop: 0,
      maxWidth: 100,
      height: 0,
      visibility: "hidden",
    }
  },

  accentBackground: {
    backgroundColor: theme.colors.blue[5],
  },

  searchRecommendations: {
    borderRadius: 20,
    backgroundColor: theme.colors.gray[0],
  },

  instructionCard: {
    border: "1px solid rgba(0,0,0,0.22)",
    backgroundColor: theme.colors.gray[0],
    borderRadius: 5,
    overflow: "hidden",
    padding: 20,
    transition: "0.3s ease all",

    '&:hover': {
      backgroundColor: theme.colors.grape[0],
      cursor: "pointer",
      transition: "0.3s ease all",
    }
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
    maxHeight: 250,
    maxWidth: 250,
    width: "100%",
    filter: "grayscale(1)",
    objectFit: "contain",

    '&:hover': {
      filter: 'grayscale(0)',
      transition: '0.3s ease all',
    },
  },

  InspirationBoxesDiv: {
    borderRadius: 5,
    width: "100%",
    marginBottom: "10px",
    overflow: "hidden",
  },

  alternateText: {
    fontFamily: "Space Mono",

    [BREAKPOINT]: {
      fontSize: 12,
    },
  },

  greyBackground: {
    backgroundColor: theme.colors.gray[1],
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

    [BREAKPOINT]: {
      fontSize: 12,
    },
  },

  spinnerClass: {
    width: "250px",
    height: "250px",

    [BREAKPOINT]: {
      width: "250px",
      height: "250px",
    },
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
    borderRadius: "20px 0 0 20px",
    padding: "10px 0 10px 20px",
    margin: 0,
  },

  searchButton: {
    borderRadius: "0px 20px 20px 0px",
    height: "100%",
    margin: 0,
  },

  searchExamples: {
    fontFamily: "Space Mono",
    cursor: "pointer",
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

  currentPage: {
    opacity: 1,
    transition: "1s ease opacity",
  },

  hiddenPage: {
    opacity: 0,
    transition: "1s ease opacity",
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
  const [searchedInspirations, setSearchInspirations] = useState([]);

  const [currentSearchQuery, setSearchQuery] = useState('');

  const [currentRisk, setRisk] = useState(0);
  const [currentUncertainty, setUncertainty] = useState(0);
  const [currentPressure, setPressure] = useState(0);
  const [currentMotivation, setMotivation] = useState(0);
  const [currentDeceptiveScore, setDeceptiveScore] = useState(0);
  
  //interactiveComponents
  const [inputAmount, setInputAmount] = useState(0)
  const [sliderAmount, setSliderAmount] = useState(0)
  const [ currentCheckboxAmount, setCheckboxAmount] = useState(0)
  const [spinnerOn, setSpinner] = useState(false);

  //currentPage

  const [currentPage, setPage] = useState(1);
  
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

  function handleDeceptiveScore( risk, uncertainty, pressure, motivation ) {
    let finalScore = (risk + uncertainty + pressure + motivation) / 4
    setDeceptiveScore(finalScore);
  }

  function handleSearch( event ) {
    setSearchQuery(event.target.value)
  }

  const handlePageChange = (pageNumber) => {
    if (typeof document !== 'undefined') {
      const page = document.querySelector("#pageContainer");
      page.style.opacity = 0;

      setTimeout(() => {
        page.style.opacity = 1;
      }, 1000)
    }
    
    setTimeout(() => {
      setPage(pageNumber);
    }, 850)

    setTimeout(() => {
      if (typeof document !== 'undefined') {
        const part1 = document.querySelector(`#pageContainer`);
        if (part1) {
          part1.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 300);
  };

  function handleCheckbox(value) {
    if (value === true) {
      setCheckboxAmount(currentCheckboxAmount + 5) 
    } else {
      setCheckboxAmount(currentCheckboxAmount - 5)
    }
  }

  useEffect(() => {
    let searchedData = SeenBeforeData.filter((inspiration) =>
    inspiration.InspirationName.toLowerCase().includes(currentSearchQuery.toLowerCase())
  );

    setSearchInspirations(searchedData);

  }, [currentSearchQuery, SeenBeforeData])

  useEffect(() => {
    let finalScore = (currentRisk + currentUncertainty + currentPressure + currentMotivation)/4
    setDeceptiveScore(finalScore);
  }, [currentRisk, currentUncertainty, currentPressure, currentMotivation])

  useEffect(() => {
    retrieveRecords();
  }, [])

  const handleSpin = () => {
    setSpinner(!spinnerOn);
  };


  return (
    <Container size="xl" px={30}>
      <HeroTitle></HeroTitle>

      <Stack mt={200} mb={200} id="preface">
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
                      <Text fz="md">This framework is part of a study where Yuan Jie explores socially acceptable ways of designing interfaces that utilise deception as a method to influence behavior. Deception is defined as altering information through less transparency, creating pressure, and encouraging risk-taking to make people favor a decision that benefits the deceiver. This framework presents the outcomes the study as a instructional guide to help you make your own deceptive interface.  </Text>
                      <div>
                      </div>
                  </Stack>
                </Group>
      </Stack>

      <Stack className={classes.headerSpacing} pt={20} id="start">
        <Divider my="sm" />
        <Group spacing={0}>
            <div className={classes.badgeLight}><Text fz="xs" className={classes.alternateText}>0</Text></div>
            <div className={classes.badgeDark}><Text fz="xs" className={classes.alternateText}>Introduction</Text></div>
        </Group>
      </Stack>

      <Group className={classes.headerSpacing} position="center" justifyContent="center">
          <Stack w="100%" align="center" >
            <Group position="center">
            <Text fz="xs" className={classes.subTitle}>Yes! Make people do what you want them to digitally!</Text>
            <h1 className={classes.title} style={{textAlign: "center"}}>
            Make socially acceptable deceptive interfaces in 4 simple steps.
            </h1>
            </Group>
            <Image className={classes.stepIcons} src="../img/dif.svg"></Image>
          </Stack>
      </Group>

      <Stack my={100} align="center" w="100%">
                <Group maw={800} id="Page0">
                  <Text fz="xs" className={classes.subTitle}>About the Deceptive Interfaces Framework</Text>
                  <Stack mt="auto">
                      <Text fz="md">The framework consists of four libraries that are designed to be considered in sequence. Each step consists of examples and guides that you can adopt in your own design. Follow the guide to make your own deceptive interface in sequence.</Text>
                  </Stack>
                </Group>
      </Stack>

      <Stack align="center">
        <Grid m={0} p={0} maw={1000}>
              <Grid.Col md={12} sm={12} xs={12}>
                <Group>
                  <Badge color="grape" size="md" radius="sm" className={classes.alternateText}>Click on each step to learn more</Badge>
                </Group>
              </Grid.Col>
              <Grid.Col md={12} sm={12} xs={12}>
                <a onClick={() => handlePageChange(1)}>
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
                </a>
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
              <a onClick={() => handlePageChange(2)}>
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
              </a>
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
              <a onClick={() => handlePageChange(3)}>
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
                </a>
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
              <a onClick={() => handlePageChange(4)}>
              <Stack className={classes.instructionCard}>
                  <Group className={classes.uiShell}>
                    <OneTwoThree
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                        style={{ marginLeft: 10 }}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Step 4</Text>
                  </Group>
                  <Text fz="md" className={classes.alternateText}>Measuring Social Acceptability</Text>
                  <Group>
                  <Text fz="sm" c="dimmed">Deceptive interfaces have different social acceptability. Here we learn how to measure how effective those interfaces are.</Text>                  
                  </Group>
                </Stack>
              </a>
              </Grid.Col>

        </Grid>
      </Stack>
                  
      <Stack pt={20} id="pageContainer" style={{ transition: "1s ease opacity" }}>
      { currentPage == 1 && (
        <Stack>
          <Stack mt={50} id="Page1">
            <Divider my="sm" />
            <Group spacing={0}>
            <div className={classes.badgeLight}><Text fz="xs" className={classes.alternateText}>1</Text></div>
            <div className={classes.badgeDark}><Text fz="xs" className={classes.alternateText}>Getting Inspiration</Text></div>
            </Group>
          </Stack>
          
          <Group className={classes.headerSpacing} position="center" justifyContent="center">
            <Stack w="100%" align="center" >
              <Stack mb={100} align="center" position="center">
              <Text fz="xs" className={classes.subTitle}>A question to ask yourself</Text>
              <h1 className={classes.title} style={{textAlign: "center"}}>
              When did you feel like you were influenced to participate in an activity?
              </h1>
              </Stack>
              <Image className={classes.stepIcons} mt={50} maw={200} src="../img/chapter1.svg"></Image>
            </Stack>
          </Group>

        <Stack spacing={20} mt={20} mb={50}>
          <Stack>
            <Stack position="left" align="center" mb={50}>
            <Text fz="xs" className={classes.subTitle} grow>A question to ask yourself</Text>
            <Stack align="center" w="100%">
              <Text fz="md">When did you feel like you were influenced to participate in an activity?</Text>
                <Group mt={50} spacing={0} h={55} p={0} m={0} noWrap>
                  <div className={classes.inputArea}>
                      <Input
                          placeholder="I felt cheated at..."
                          radius="xl"
                          variant="unstyled"
                          w={200}
                          value={currentSearchQuery}
                          onChange={handleSearch}
                          className={classes.subTitle}
                        />
                    </div>
                    <Button className={classes.searchButton} color="dark" style={{ fontSize: '16px', fontWeight: 400 }}>Aw Man</Button>
                </Group>
                <Group py={20} px={20} className={classes.searchRecommendations}>
                  <Text fz="xs" c="dimmed">Popular Terms</Text>
                  <Badge color="grape" size="md" radius="sm" onClick={() => setSearchQuery("Shopee")} className={classes.searchExamples}>Shopee</Badge>
                  <Badge color="grape" size="md" radius="sm" onClick={() => setSearchQuery("Game")} className={classes.searchExamples}>Game</Badge>
                  <Badge color="grape" size="md" radius="sm" onClick={() => setSearchQuery("Donation")} className={classes.searchExamples}>Donation</Badge>
                </Group>
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
                <Text fz="xs" c="dimmed" className={classes.alternateText}>{SeenBeforeData.length} Community Observations </Text>
            </Group>
            <ScrollArea h={600} type="always" offsetScrollbars>
              <Group position="left" spacing={0} className={classes.helperText}>
                <Group p={0} m={0} align="flex-start">
                  { searchedInspirations ? (searchedInspirations.map((item, index) => (
                      <Stack className={classes.InspirationBoxes} spacing={20}>
                        <Group mb={15}>
                          <div className={classes.InspirationProfile}></div>
                          <div className={classes.InspirationDot}></div>
                          <Text style={{ marginLeft: "-10px" }} fz="xs" className={classes.alternateText}>Person {index + 1}</Text>
                        </Group>
                        <div className={classes.InspirationBoxesDiv}>
                          <img className={classes.InspirationBoxesImage} src={item.ImageURL} ></img>
                        </div>
                        <Text mt={20} fz="xs" className={classes.alternateText}>Person {index + 1} felt cheated at {item.InspirationName}.</Text>

                      </Stack>
                    ))) : (SeenBeforeData.map((item, index) => (
                      <Stack className={classes.InspirationBoxes} spacing={20}>
                        <Group mb={15}>
                          <div className={classes.InspirationProfile}></div>
                          <div className={classes.InspirationDot}></div>
                          <Text style={{ marginLeft: "-10px" }} fz="xs" className={classes.alternateText}>Person {index + 1}</Text>
                        </Group>
                        <div className={classes.InspirationBoxesDiv}>
                          <img className={classes.InspirationBoxesImage} src={item.ImageURL} ></img>
                        </div>
                        <Text mt={20} fz="xs" className={classes.alternateText}>Person {index + 1} felt cheated at {item.InspirationName}.</Text>

                      </Stack>
                    )))}
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
                          <Text fz="xs" className={classes.alternateText}>If I could recreate it...</Text>
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
                          <Text fz="xs" className={classes.alternateText}>If I could recreate it...</Text>
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

              <Group position="apart" w={"100%"}>
                <Grid p={0} m={0} w={"100%"}>
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
                          placeholder="I participated because..."
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
                          placeholder="I will..."
                          minRows="6"
                        />
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Group>

            </Stack>
          </Stack>
        </Stack>

        <Group noWrap position="apart">
          <a onClick={() => handlePageChange(0)}>
                        <Button uppercase leftIcon={<ArrowNarrowLeft strokeWidth={1}/>} color="grape" variant="light" radius={5} size="xl" style={{ fontSize: '14px', fontWeight: 400, fontFamily: "Space Mono" }}>Go Back</Button>
            </a>
            <a onClick={() => handlePageChange(2)}>
                        <Button uppercase rightIcon={<ArrowNarrowRight strokeWidth={1}/>} color="grape" variant="light" radius={5} size="xl" style={{ fontSize: '14px', fontWeight: 400, fontFamily: "Space Mono" }}> Next Step</Button>
            </a>
        </Group>
        </Stack>
      )}
      
      { currentPage == 2 && (
      <Stack>
      <Stack mt={50} id="Page2">
        <Divider my="sm" />
        <Group spacing={0}>
            <div className={classes.badgeLight}><Text fz="xs" className={classes.alternateText}>2</Text></div>
            <div className={classes.badgeDark}><Text fz="xs" className={classes.alternateText}>Exploring Components</Text></div>
        </Group>
      </Stack>

      <Group className={classes.headerSpacing} position="center" justifyContent="center">
          <Stack w="100%" align="center" >
            <Stack mb={100} align="center" position="center">
            <Text fz="xs" className={classes.subTitle}>A question to ask yourself</Text>
            <h1 className={classes.title} style={{textAlign: "center"}}>
            How can UI components make users think a little more before they make a decision?
            </h1>
            </Stack>
            <Image className={classes.stepIcons} mt={50} maw={200} src="../img/chapter2.svg"></Image>
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
                </Stack>
              </Group>
            </Stack>
        </Stack>
      </Stack>

      <Stack p={0} m={0} spacing={30} mb={200}>
        <Group className={classes.stepsBoxes} align="flex-start">
          <CardComponent number={1} type="Input Area">
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
              <Text fz="md" mb={30}>For example, an <span style={{ fontWeight: 600 }}>input</span> is used when we know users are confident enough to give an exact amount.</Text>
              <Text fz="xs">How much would you want to contribute?</Text>
              <Input 
              placeholder="Your Donation Amount"
              variant="filled"
              onChange={(e) => setInputAmount(e.target.value)}
              type="number"
              />
              <Text fz="xs" c='dimmed'>You will be contributing ${inputAmount ? inputAmount : '0'} to Animal Lovers League.</Text>
              <Text fz="xs" c='dimmed'>Halt! Don't forget about the terms, if you enter an amount, you are agreeing to those too.</Text>
            </Stack>
          </CardComponent>   
        </Group>
        <Group className={classes.stepsBoxes}>
          <CardComponent  number={2} type="Slider">
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
                <Text fz="md" mb={30}>A <span style={{ fontWeight: 600 }}>slider</span> can be used to show the relationship between 2 numbers, this makes it possible to highlight a value's importance.</Text>
                <Text fz="md" mb={50}>The shop will boost your donation amount by 50%.</Text>
                <Text fz="xs">Choose an amount. I will donate ${ sliderAmount ? sliderAmount : '0'}</Text>
                <Slider
                      w={"100%"}
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
                <Text fz="xs">The shop will then donate an extra ${ (sliderAmount * 0.5).toFixed(2)}. You are getting an extra <span style={{ fontWeight: 600 }}>${ ((sliderAmount * 0.5)).toFixed(2)} for free!</span> </Text>
                <Slider
                      style={{ pointerEvents: "none"}}
                      w={"100%"}
                      mb={50}
                      defaultValue={5}
                      min={0}
                      max={200}
                      marks={[
                        { value: 30, label: 'No-Boost' },
                        { value: 170, label: 'Boosted' },
                      ]}
                      color="dark"
                      value={sliderAmount * 2.5}
                  />
              </Stack>
          </CardComponent>   
        </Group>
        <Group className={classes.stepsBoxes}>
          <CardComponent  number={3} type="Checkboxes">
              <Stack maw={400} mt={50} mb={50} className={classes.uiBackground}>
              <Group className={classes.uiShell} style={{ width: "150%"}}>
                    <AppWindow
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                        style={{ marginLeft: 10 }}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Component</Text>
              </Group>
                <Text fz="md" mb={30}>A <span style={{ fontWeight: 600 }}>checkbox</span> can be used to slow down decision making because we can make some choices more important than others.</Text>
                <Text fz="xs">How much do you want to donate?</Text>
                <Checkbox 
                  label="$5"
                  color="dark"
                  onChange={(event) => handleCheckbox(event.target.checked)}
                />
                <Checkbox 
                  label="$5, and get a 2% off every purchase!"
                  color="dark"
                  onChange={(event) => handleCheckbox(event.target.checked)}
                />
                <Checkbox
                  label="$5, and get a 20% off in your next $50 purchase!"
                  color="dark"
                  onChange={(event) => handleCheckbox(event.target.checked)}
                />
                <Text fz="xs">You will donate a total of <span style={{ fontWeight: 600 }}>${currentCheckboxAmount}</span> </Text>
              </Stack>
          </CardComponent>   
        </Group>
        <Group className={classes.stepsBoxes}>
          <CardComponent  number={4} type="Spinners">
            <Stack maw={300} mt={50} mb={50} className={classes.uiBackground} w={"100%"} justify="center">
              <Group className={classes.uiShell}>
                    <AppWindow
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                        style={{ marginLeft: 10 }}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Component</Text>
              </Group>
              <Text fz="md" mb={30}>A <span style={{ fontWeight: 600 }}>spinner</span> can be used to add an element of chance to a decision. Gives an element of surprise & fun!</Text>
              <div className={classes.spinnerClass}>
                <Image maw={250} className={classes.spinnerBackground} style={{ transform: `rotate(${spinnerOn ? `1200deg` : `0deg`})`}} src="../img/components/Spinner.svg" ></Image>
                <Image maw={80} style={{ marginLeft: "-17px" }} onClick={handleSpin} className={classes.spinnerHead} src="../img/components/SpinningHead.svg"></Image>
              </div>
            </Stack>
          </CardComponent>   
        </Group>
      </Stack>

      <Group noWrap position="apart">
          <a onClick={() => handlePageChange(1)}>
                        <Button uppercase leftIcon={<ArrowNarrowLeft strokeWidth={1}/>} color="grape" variant="light" radius={5} size="xl" style={{ fontSize: '14px', fontWeight: 400, fontFamily: "Space Mono" }}>Go Back</Button>
            </a>
            <a onClick={() => handlePageChange(3)}>
                        <Button uppercase rightIcon={<ArrowNarrowRight strokeWidth={1}/>} color="grape" variant="light" radius={5} size="xl" style={{ fontSize: '14px', fontWeight: 400, fontFamily: "Space Mono" }}> Next Step</Button>
            </a>
        </Group>
      </Stack>)}
      
      { currentPage == 3 && (
      <Stack>
        <Stack mt={50} id="Page3">
        <Divider my="sm" />
        <Group spacing={0}>
            <div className={classes.badgeLight}><Text fz="xs" className={classes.alternateText}>3</Text></div>
            <div className={classes.badgeDark}><Text fz="xs" className={classes.alternateText}>Using a Strategy</Text></div>
        </Group>
      </Stack>

      <Group className={classes.headerSpacing}  position="center" justifyContent="center">
          <Stack w="100%" align="center" >
            <Stack mb={100} align="center" position="center">
            <Text fz="xs" className={classes.subTitle}>A question to ask yourself</Text>
            <h1 className={classes.title} style={{textAlign: "center"}}>
            What do I know about my target audience?
            </h1>
            </Stack>
            <Image className={classes.stepIcons} mt={50} maw={200} src="../img/chapter3.svg"></Image>
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
                      <Text fw={500} fz="md" className={classes.alternateText}>Strategy - Framing donation as a chance to win.</Text>
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
                    <Text fw={500} fz="md" className={classes.alternateText}>Strategy - Attaching material value to donation to show  effort.</Text>
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
                    <Text fw={500} fz="md" className={classes.alternateText}>Strategy - Introducing individual social Influence to make people donate.</Text>
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
                    <Text fz="md" fw={500} className={classes.alternateText}>Strategy - Leveraging on consumer’s relationship with store to make people donate.</Text>
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
                    <Text fz="md" fw={500}  className={classes.alternateText}>Strategy - Adjusting defaults to fit various appetites by creating more choices.</Text>
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


        </Stack>

        <Group noWrap position="apart">
          <a onClick={() => handlePageChange(2)}>
                        <Button uppercase leftIcon={<ArrowNarrowLeft strokeWidth={1}/>} color="grape" variant="light" radius={5} size="xl" style={{ fontSize: '14px', fontWeight: 400, fontFamily: "Space Mono" }}>Go Back</Button>
            </a>
            <a onClick={() => handlePageChange(4)}>
                        <Button uppercase rightIcon={<ArrowNarrowRight strokeWidth={1}/>} color="grape" variant="light" radius={5} size="xl" style={{ fontSize: '14px', fontWeight: 400, fontFamily: "Space Mono" }}> Next Step</Button>
            </a>
        </Group>
      </Stack>      
      </Stack>)}
      
      { currentPage == 4 && (
      <Stack>
        <Stack mt={50} id="Page4">
        <Divider my="sm" />
        <Group spacing={0}>
            <div className={classes.badgeLight}><Text fz="xs" className={classes.alternateText}>4</Text></div>
            <div className={classes.badgeDark}><Text fz="xs" className={classes.alternateText}>Measuring your Interface</Text></div>
        </Group>
      </Stack>

      <Group className={classes.headerSpacing} position="center" justifyContent="center">
          <Stack w="100%" align="center" >
            <Stack mb={100} align="center" position="center">
            <Text fz="xs" className={classes.subTitle}>A question to ask yourself</Text>
            <h1 className={classes.title} style={{textAlign: "center"}}>
            Is my interface socially acceptable?
            </h1>
            </Stack>
            <Image className={classes.stepIcons} mt={50} maw={200} src="../img/chapter4.svg"></Image>
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
            <Grid.Col md={6} sm={12} xs={12}>
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
                      min={1}
                      max={5}
                      precision={2}
                      step={0.1}
                      value={currentRisk}
                      onChange={setRisk}
                      marks={[
                        { value: 1.3, label: 'Not Risky' },
                        { value: 2, label: '' },
                        { value: 3, label: '' },
                        { value: 4, label: '' },
                        { value: 4.7, label: 'Very Risky' },
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

            <Grid.Col md={6} sm={12} xs={12}>
              <Group className={classes.stepsBoxes} align="flex-start">
                <CardComponent number={2}>
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
                      min={1}
                      max={5}
                      precision={2}
                      step={0.1}
                      value={currentUncertainty}
                      onChange={setUncertainty}
                      marks={[
                        { value: 1.3, label: 'Not Often' },
                        { value: 2, label: '' },
                        { value: 3, label: '' },
                        { value: 4, label: '' },
                        { value: 4.7, label: 'Very Often' },
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

            <Grid.Col md={6} sm={12} xs={12}>
              <Group className={classes.stepsBoxes} align="flex-start">
                <CardComponent number={3}>
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
                      min={1}
                      max={5}
                      precision={2}
                      step={0.1}
                      value={currentPressure}
                      onChange={setPressure}
                      marks={[
                        { value: 1.3, label: 'Not Pressuring' },
                        { value: 2, label: '' },
                        { value: 3, label: '' },
                        { value: 4, label: '' },
                        { value: 4.7, label: 'Very Pressuring' },
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

            <Grid.Col md={6} sm={12} xs={12}>
              <Group className={classes.stepsBoxes} align="flex-start">
                <CardComponent number={3}>
                  <Stack mt={50} mb={50} p={30} className={classes.uiBackground} maw={400}>
                  <Group className={classes.uiShell}>
                    <QuestionMark
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Question</Text>
                  </Group>
                    <Text fz="sm">On a scale of 1-5, how motivating was it to donate using this interface?</Text>
                    <Slider mb={30}
                      min={1}
                      max={5}
                      precision={2}
                      step={0.1}
                      value={currentMotivation}
                      onChange={setMotivation}
                      marks={[
                        { value: 1.3, label: 'Not Motivating' },
                        { value: 2, label: '' },
                        { value: 3, label: '' },
                        { value: 4, label: '' },
                        { value: 4.7, label: 'Motivating' },
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
          
          <Stack align="center" w="100%" mt={100}>
                <Group maw={800}>
                  <Text fz="xs" className={classes.subTitle}>Results</Text>
                  <Stack mt="auto" mb={100}>
                  <Group className={classes.postItsSpecial} mt={20}>
                        <Text fz="md">Your deception score is currently { currentDeceptiveScore.toFixed(2) } and your prototype might { currentDeceptiveScore < 2 ? 'be socially acceptable' : 'not be socially acceptable'}.</Text>
                  </Group>
                  </Stack>
                </Group>
          </Stack>

          <Group noWrap position="apart">
          <a onClick={() => handlePageChange(3)}>
                        <Button uppercase leftIcon={<ArrowNarrowLeft strokeWidth={1}/>} color="grape" variant="light" radius={5} size="xl" style={{ fontSize: '14px', fontWeight: 400, fontFamily: "Space Mono" }}>Go Back</Button>
            </a>
            <a href="./outcomes">
                        <Button uppercase rightIcon={<ArrowNarrowRight strokeWidth={1}/>} color="grape" variant="light" radius={5} size="xl" style={{ fontSize: '14px', fontWeight: 400, fontFamily: "Space Mono" }}>Insights</Button>
            </a>
        </Group>

      </Stack>      
      </Stack>)}
      </Stack>

    </Container>
  );
}