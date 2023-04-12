import { AppShell, Navbar, Header, Group, Flex, Stack, BackgroundImage, Divider, Grid, Badge, Image, Input, Slider, Checkbox  } from '@mantine/core';
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
    aspectRatio: '9 / 16',
    display: 'block',
    filter: 'grayscale(1)',
    overflow: "hidden",

    '&:hover': {
      filter: 'grayscale(0)',
    },
  },

  InspirationBoxesImage: {
    maxHeight: "400px",
    height: "100%",
    minWidth: "100%",
  },

  InspirationBoxesDiv: {
    width: "100%",
    height: "90%",
    marginBottom: "10px",
    borderRadius: '15px',
    overflow: "hidden",
  },

  alternateText: {
    fontFamily: "Space Mono",
  },

  greyBackground: {
    backgroundColor: theme.colors.gray[2],
  },

  uiBackground: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
  },

  stepsBoxes: {
    backgroundColor: theme.colors.gray[1],
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
            <div className={classes.badgeDark}><Text fz="xs" className={classes.alternateText}>Introduction</Text></div>
        </Group>
      </Stack>

      <Group mt={130} mb={150} className={classes.greyBackgroundAlternate} position="center" justifyContent="center" mih={600}>
          <Stack w="100%" align="center" >
            <Group mb={100} position="center">
            <Text fz="xs" className={classes.subTitle}>Yes! Make people do what you want them to, without suspicion!</Text>
            <h1 className={classes.title} style={{textAlign: "center"}}>
            The deceptive interfaces framework helps designers make socially acceptable deceptive interfaces in 4 simple steps.
            </h1>
            </Group>
            <Image mt={50} maw={200} src="../img/dif.svg"></Image>
          </Stack>
      </Group>

      <Group grow>
            <Group span={3} h={550} className={classes.stepsBoxes}>
              <CardComponent  number={1} type="Getting Inspiration" description="Getting inspiration from common deceptive schemes.">
                  <Image maw={400} style={{ filter: "grayscale(100%)" }} radius="md" src="../img/components/inspomixed.png"></Image>
              </CardComponent>
            </Group>
            <Group span={3} h={550} className={classes.stepsBoxes}>
              <CardComponent  number={2} type="Using Components" description="A list of ways that UI components influences our behaviour.">
                <Image maw={"100%"} radius="md" src="../img/components/mix.svg"></Image>
              </CardComponent>
            </Group>
            <Group span={3} h={550} className={classes.stepsBoxes}>
              <CardComponent  number={3} type="Picking Strategies" description="A collection of insights to help you bring these components together to create deceptive strategies.">
                <Image maw={"100%"} radius="md" src="../img/components/slider.svg"></Image>
              </CardComponent>
            </Group>
            <Group span={3} h={550} className={classes.stepsBoxes}>
              <CardComponent  number={4} type="Measurements" description="How do we measure how effective those interfaces are?">
              <Image maw={"100%"} radius="md" src="../img/components/testing.svg"></Image>
              </CardComponent>
            </Group>
      </Group>

      <Stack mt={200} mb={200}>
        <Stack>
          <Stack position="left" align="flex-start" spacing={20} >
          <Text fz="xs" className={classes.subTitle} grow>About the Deceptive Interfaes Framework</Text>
          <Grid mt="auto">
            <Grid.Col span={6}><Text fz="md" mb={0}>This set of instruction consists of four libraries that are designed to be considered in sequence. You can visit each of them by clicking on the cards above, or follow the guide to make your own deceptive interface.</Text></Grid.Col>

          </Grid>
          </Stack>
        </Stack>
      </Stack>

      <Stack>
        <Divider my="sm" />
        <Group spacing={0}>
            <div className={classes.badgeLight}><Text fz="xs" className={classes.alternateText}>1</Text></div>
            <div className={classes.badgeDark}><Text fz="xs" className={classes.alternateText}>Getting Inspiration</Text></div>
        </Group>
      </Stack>

      <Group mt={20} className={classes.greyBackgroundAlternate} position="center" justifyContent="center" mih={600}>
          <Stack w="100%" align="center" >
            <Text fz="xs" className={classes.subTitle}>We're learning from deceptive schemes!</Text>
            <Image maw={600} src="../img/chapter1.svg"></Image>
          </Stack>
      </Group>

      <Stack spacing={20} mt={20}>
        <Stack>
          <Stack position="left" align="flex-start" mih={600} mb={200}>
          <Text fz="xs" className={classes.subTitle} grow>A question to ask yourself</Text>
          <h1 className={classes.title}>When did you feel like you were influenced to participate in an activity?</h1>
          <Grid mt="auto">
              <Grid.Col span={4}>
              <Text fz="sm" mb={50}>Think back to a situation that made you feel cheated or when someone took advantage of your trust, it is likely that you’ve been through a deceptive scheme.</Text>
              </Grid.Col>
              <Grid.Col span={4}>
              <Text fz="sm" mb={50}>These deceptive schemes commonly leverage on human biases, which are common patterns that leverage the irrational decision-making of people. These patterns can be used as ideas to form a deceptive strategy.</Text>
              <Text fz="sm" mb={50}>Take a look at a few inspirations below submitted by the community.</Text>
              </Grid.Col>

            </Grid>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing={20}>
        <Stack>
          <Group position="left" spacing={0} className={classes.helperText}>
            <Grid p={0} m={0}>
              { SeenBeforeData ? SeenBeforeData.map((item) => (
                  <Grid.Col className={classes.InspirationBoxes} span={2}>
                    <div className={classes.InspirationBoxesDiv}>
                      <img className={classes.InspirationBoxesImage} src={item.ImageURL} ></img>
                    </div>
                    {item.InspirationName}
                  </Grid.Col>
                )) : ''}
                <Grid.Col span={2} className={classes.InspirationBoxes}>Felt anything similar?</Grid.Col>
            </Grid>
          </Group>
          <Group className={classes.greyBackground}>
            By thinking of a fraud as an activity, you can adapt the behaviour outcome... give 1 example
          </Group>
        </Stack>
      </Stack>

      <Group mt={20} className={classes.greyBackgroundAlternate} position="center" justifyContent="center" mih={600}>
          <Stack w="100%" align="center" >
            <Text fz="xs" className={classes.subTitle}>No more simple buttons and toggles!</Text>
            <Image maw={600} src="../img/chapter2.svg"></Image>
          </Stack>
      </Group>

      <Stack spacing={20} mt={20}>
        <Stack>
          <Stack className={classes.greyBackground} position="left" align="flex-start" mih={800} p={50}>
          <Text fz="xs" className={classes.subTitle} grow>2. Exploring Interface Components</Text>
          <h1 className={classes.title}>Make users think a little more before they make a decision.</h1>
          <Grid mt="auto">
              <Grid.Col span={4}>
              <Text fz="sm" mb={50}>A simple choice is a straightforward method of requesting something, but in certain circumstances, its effectiveness can be improved by prolonging and expanding the decision-making process.</Text>
              </Grid.Col>
              <Grid.Col span={4}>
              <Text fz="sm" mb={50}>Instead of relying on just a button, these UI components have various influences on decision making and make some information more important.</Text>
              <Text fz="sm" mb={50}>Here are 4 different UI components and their influences.</Text>
              </Grid.Col>
            </Grid>
          </Stack>
        </Stack>
      </Stack>

      <Stack p={0} m={0} spacing={0}>
        <Group className={classes.stepsBoxes} align="flex-start">
          <CardComponent number={1} type="Input Area" description="Used when you want confirmation and when you are sure users are confident to give a donation.">
            <Stack mt={50} mb={50} className={classes.uiBackground} maw={400}>
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
              <div className={classes.spinnerClass}>
                <Image maw={300} className={classes.spinnerBackground} style={{ transform: `rotate(${spinnerOn ? `1200deg` : `0deg`})`}} src="../img/components/Spinner.svg" ></Image>
                <Image maw={100} onClick={handleSpin} className={classes.spinnerHead} src="../img/components/SpinningHead.svg"></Image>
              </div>
            </Stack>
          </CardComponent>   
        </Group>
      </Stack>

      <Group mt={20} className={classes.greyBackgroundAlternate} position="center" justifyContent="center" mih={600}>
          <Stack w="100%" align="center" >
            <Text fz="xs" className={classes.subTitle}>Now we put those components into action!</Text>
            <Image maw={600} src="../img/chapter3.svg"></Image>
          </Stack>
      </Group>

      <Stack spacing={20} mt={20}>
        <Stack spacing={0}>
          <Stack className={classes.greyBackground} position="left" align="flex-start" mih={800} p={50}>
          <Text fz="xs" className={classes.subTitle} grow>3. Adopting a Strategy</Text>
          <h1 className={classes.title}>Think about who your users are</h1>
          <Grid mt="auto">
              <Grid.Col span={4}>
              <Text fz="sm" mb={50}>After understanding the influence of deceptive schemes and interface components, we can now formulate a unique interface for your specific audience. Think about who your users are and what you want to achieve.</Text>
              </Grid.Col>
              <Grid.Col span={4}>
              <Text fz="sm" mb={50}>Some strategies are more effective for specific scenarios. Swipe those cards to explore different combinations of possible strategies.</Text>
              </Grid.Col>
            </Grid>
          </Stack>
          <Stack className={classes.greyBackgroundAlternate} position="left" align="flex-start">
            <ChooseMachine />
          </Stack>

          <Stack className={classes.greyBackgroundAlternate} position="left" align="flex-start" mih={800} p={50}>
            <Text fz="xs" className={classes.subTitle} grow>3. Adopting a Strategy</Text>
            <h1 className={classes.title}>Do it like how they did it!</h1>
            </Stack>
        </Stack>
      </Stack>

      <Group mt={20} className={classes.greyBackgroundAlternate} position="center" justifyContent="center" mih={600}>
            <Stack w="100%" align="center" >
              <Text fz="xs" className={classes.subTitle}>Measuring the final outcome!</Text>
              <Image maw={600} src="../img/chapter4.svg"></Image>
            </Stack>
        </Group>

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

    </Container>
  );
}