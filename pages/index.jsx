import { AppShell, Navbar, Header, Group, Flex, Stack, Button, BackgroundImage, Divider, Grid, Badge, Image, Input, Slider, Checkbox  } from '@mantine/core';
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
    width: 100,
    transition: '0.3s ease all',

    '&:hover': {
      filter: 'grayscale(0)',
      transition: '0.3s ease all',
    },
  },

  InspirationBoxesImage: {
    maxHeight: "400px",
    height: "100%",
    minWidth: "100%",
  },

  InspirationBoxesDiv: {
    width: "100%",
    height: "70%",
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
  },

  inputArea: {
    backgroundColor: theme.colors.gray[1],
    borderRadius: 5,
    padding: "10px 0 10px 20px",
  },

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
            <Text fz="xs" className={classes.subTitle}>Yes! Make people do what you want them to digitally!</Text>
            <h1 className={classes.title} style={{textAlign: "center"}}>
            This framework helps designers make socially acceptable deceptive interfaces in 4 simple steps.
            </h1>
            </Group>
            <Image mt={50} maw={200} src="../img/dif.svg"></Image>
          </Stack>
      </Group>

      <Stack my={200} align="center" w="100%">
                <Group maw={800}>
                  <Text fz="xs" className={classes.subTitle}>About the Deceptive Interfaes Framework</Text>
                  <Stack mt="auto">
                      <Text fz="md">This set of instruction consists of four libraries that are designed to be considered in sequence. You can visit each of them by clicking on the cards above, or follow the guide to make your own deceptive interface.</Text>
                  </Stack>
                </Group>
      </Stack>

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

      <Stack my={200} align="center" w="100%">
                <Group maw={800}>
                  <Stack mt="auto">
                      <Text fz="md">The Deceptive Interface Framework is a quick research done by Yuan Jie for his thesis in NUS!</Text>
                  </Stack>
                </Group>
      </Stack>

      <Stack>
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
              <Group>
                <div className={classes.inputArea}>
                  <Input
                      placeholder="Try finding one here"
                      radius="xl"
                      variant="unstyled"
                      size="md"
                      w={500}
                      className={classes.subTitle}
                    />
                </div>
                <Button color="dark" radius="xl" size="xl" style={{ fontSize: '16px', fontWeight: 400 }}>Enter</Button>
              </Group>
          </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing={20} className={classes.greyBackground} p={30} mb={100}>
        <Stack>
          <Text fz="xs" className={classes.subTitle} grow>Community Responses</Text>
          <Group position="left" spacing={0} className={classes.helperText} style={{ overflowY: "hidden", overflowX: "hidden" }}>
            <Group p={0} m={0} align="flex-start">
              { SeenBeforeData ? SeenBeforeData.map((item) => (
                  <Stack className={classes.InspirationBoxes} span={2}>
                    <div className={classes.InspirationBoxesDiv}>
                      <img className={classes.InspirationBoxesImage} src={item.ImageURL} ></img>
                    </div>
                    {item.InspirationName}
                  </Stack>
                )) : ''}
            </Group>
          </Group>
        </Stack>
      </Stack>

      <Stack spacing={20}>
        <Stack>
          <Stack position="left" align="flex-start" mb={200}>
          <Stack align="center" w="100%">
            <Group maw={800}>
              <Text fz="xs" className={classes.subTitle} grow>Inspiration from Activities</Text>
              <Stack mt="auto" mb={100}>
                  <Text fz="md">Think back to a situation that made you feel cheated or when someone took advantage of your trust, it is likely that you’ve been through a deceptive scheme.</Text>
                  <Text fz="md">These activities commonly leverage on human biases, which are common patterns that leverage the irrational decision-making of people. These patterns can be used as ideas to form a deceptive strategy.</Text>
                  <Text fz="md">Let's take a look at a few examples.</Text>
              </Stack>
            </Group>
          </Stack>

            <Group>
              <Group grow h={700}>
                <Group className={classes.stepsBoxes} h={"100%"}>
                  <CardComponent  number={1} title="I felt cheated..." type="Experience" description="On Kickstarter when I was convinced to participate in their fundraiser.">
                    <Image mx="auto" maw={"80%"} radius="md" src="../img/inspo/kickstarter.png"></Image>
                  </CardComponent>
                </Group>
                <Group className={classes.stepsBoxes} h={"100%"}>
                  <CardComponent  number={1} title="I participated because..." type="Human Bias" description="I made the decisions believing that other people did the same.">
                    <Image maw={"100%"} radius="md" src="../img/examples/example1-bandwagoneffect.svg"></Image>
                  </CardComponent>
                </Group>
                <Group className={classes.stepsBoxes} h={"100%"}>
                  <CardComponent  number={1} title="If I could receate it..." type="Deceptive Strategy" description="I will want to make a huge audience believe in each other to donate together.">
                    <Image maw={"100%"} radius="md" src="../img/examples/example1-outcome.svg"></Image>
                  </CardComponent>
                </Group>
              </Group>
            </Group>

            <Group>
              <Group grow h={700}>
                <Group className={classes.stepsBoxes} h={"100%"}>
                  <CardComponent  number={2} title="I felt cheated..." type="Experience" description="When I bought tissues from the auntie down the street.">
                    <Image mx="auto" maw={"80%"} radius="md" src="../img/inspo/tissueAuntie.jpg"></Image>
                  </CardComponent>
                </Group>
                <Group className={classes.stepsBoxes} h={"100%"}>
                  <CardComponent  number={2} title="I participated because..." type="Human Bias" description="I felt bad if I didn't get the tissue because the auntie is directly selling to me.">
                    <Image maw={"100%"} radius="md" src="../img/examples/example2-victimeffect.svg"></Image>
                  </CardComponent>
                </Group>
                <Group className={classes.stepsBoxes} h={"100%"}>
                  <CardComponent  number={2} title="If I could receate it..." type="Deceptive Strategy" description="I will want to let one person convince the next person to donate.">
                    <Image mx="auto" maw={"80%"} radius="md" src="../img/examples/example2-outcome.svg"></Image>
                  </CardComponent>
                </Group>
              </Group>
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
                      <Text fz="md">After understanding the influence of deceptive schemes and interface components, we can now formulate a unique interface for your specific audience. Think about who your users are and what you want to achieve. Here are a few strategies and their limitatioins.</Text>
                  </Stack>
                </Group>
          </Stack>

          <Stack>
            <Stack className={classes.greyBackground} p={30} >
              <Text fz="xs" c="dimmed" className={classes.subTitle}>Strategy 1</Text>
              <Text fz="md">Framing donation as a chance to win</Text>
            </Stack>
          </Stack>

          <Stack align="center" w="100%" mt={100}>
                <Group maw={800}>
                  <Text fz="xs" className={classes.subTitle} grow>Library</Text>
                  <Stack mt="auto" mb={100}>
                      <Text fz="md">We've compiled some strategies based on common target audiences!</Text>
                  </Stack>
                </Group>
          </Stack>

          <Stack className={classes.greyBackgroundAlternate} position="left" align="flex-start">
            <ChooseMachine />
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
            Did my interface become more effective*?
            </h1>
            </Stack>
            <Image mt={50} maw={200} src="../img/chapter4.svg"></Image>
          </Stack>
      </Group>

    </Container>
  );
}