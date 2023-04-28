import { useRouter } from 'next/router'
import { Group, Flex, Stack, Slider, Container, createStyles, Image, Badge, Text, Grid } from '@mantine/core';
import axios, { all } from 'axios';
import { RiveAnimation } from '../../components/riveDonate';
import { useEffect, useState } from 'react';
import CardComponent from '../../components/cardComponent';
import { AppWindow, H1, QuestionMark } from 'tabler-icons-react';

const BREAKPOINT = '@media (max-width: 755px)';

//static data
import ScenarioData from '../../components/Data/Scenarios-Grid.json';
import ObservationData from '../../components/Data/Observation-Grid.json';
import SeenBeforeData from '../../components/Data/Inspirations-Grid.json';

const ScoreData = [
    { 
      scenarioNumber: 0, 
      riskScore: 3.666666667,
      uncertaintyScore: 2,
      pressureScore: 2.666666667,
      motivationScore: 3.666666667,
    },{ 
      scenarioNumber: 1, 
      riskScore: 3.75,
      uncertaintyScore: 4,
      pressureScore: 1.5,
      motivationScore: 2.75,
    },{ 
      scenarioNumber: 2, 
      riskScore: 4,
      uncertaintyScore: 1.833333333,
      pressureScore: 2,
      motivationScore: 1.833333333,
    },{ 
      scenarioNumber: 3, 
      riskScore: 2.333333333,
      uncertaintyScore: 4,
      pressureScore: 1,
      motivationScore: 2.666666667,
    },{ 
      scenarioNumber: 4, 
      riskScore: 2,
      uncertaintyScore: 4.333,
      pressureScore: 3,
      motivationScore: 4,
    },{ 
      scenarioNumber: 5, 
      riskScore: 5,
      uncertaintyScore: 1,
      pressureScore: 3.33,
      motivationScore: 1,
    },{ 
      scenarioNumber: 6, 
      riskScore: 2.222,
      uncertaintyScore: 3.222,
      pressureScore: 2.666,
      motivationScore: 3.444,
    },{ 
      scenarioNumber: 7, 
      riskScore: 2.222,
      uncertaintyScore: 2.777,
      pressureScore: 3.111,
      motivationScore: 2.6667,
    },{ 
      scenarioNumber: 8, 
      riskScore: 3.428,
      uncertaintyScore: 2.4285,
      pressureScore: 2.142,
      motivationScore: 2.428,
    },{ 
      scenarioNumber: 9, 
      riskScore: 2,
      uncertaintyScore: 3.4,
      pressureScore: 2.2,
      motivationScore: 3,
    },{ 
      scenarioNumber: 10, 
      riskScore: 3,
      uncertaintyScore: 2.666,
      pressureScore: 2.666,
      motivationScore: 2.666,
    },{ 
      scenarioNumber: 11, 
      riskScore: 4.333,
      uncertaintyScore: 1.6667,
      pressureScore: 1.6667,
      motivationScore: 2.6667,
    }
  ]

const useStyles = createStyles((theme) => ({
  
    title: {
        fontFamily: 'Inter Tight',
        fontWeight: 400,
        margin: 0,
        padding: 0,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        width: "80%",
        lineHeight: 1.1,
    
        [BREAKPOINT]: {
          width: "100%",
          fontSize: 32,
          lineHeight: 1.1,
        },
      },

        uiShell: {
            borderBottom: "1px solid rgba(0,0,0,0.22)",
            marginLeft: "-30px",
            paddingLeft: 20,
            paddingBottom: 20,
            width: "120%",
        },

        scenarioBorder: {
            backgroundColor: "white",
            overflow: "hidden",
        }, 
    
        imageBorder: {
        height: 500,
        backgroundColor: theme.colors.gray[1],
        borderRadius: 20,

        [BREAKPOINT]: {
          height: 400,
          width: 325,
          },
        },
    
        description: {

        [BREAKPOINT]: {
            width: '100%',
            },
      },

      alternateText: {
        fontFamily: "Space Mono",
      },

      titleSmall: {
        width: '80%',

        [BREAKPOINT]: {
            width: '100%',
            },
      },

      stepsBoxes: {
        borderLeft: "1px dotted #D0D0D0",
      },


      quotes: {
        backgroundColor: theme.colors.gray[1],
      },

      strategyPill: {
        padding: 10,
        borderRadius: 20,
        border: "1px solid black",
      },

      uiBackground: {
        backgroundColor: theme.colors.gray[0],
        borderRadius: "10px",
        padding: 20,
        boxShadow: "11px 19px 40px 0px rgba(0,0,0,0.10)",
        border: "1px solid rgba(0,0,0,0.22)",
        overflow: "hidden",
    
      },

      seenBeforeBox: {
        backgroundColor: theme.colors.gray[1],
        borderRadius: 20,
        border: "1px solid rgba(0,0,0,0.22)",
        padding: 30,
        overflow: "hidden",
      },

      seenBeforeIndividual: {
        backgroundColor: theme.colors.gray[0],
        borderRadius: 20,
        border: "1px solid rgba(0,0,0,0.22)",
        padding: 10,
        overflow: "hidden",
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
        outline: "3px solid #F8F9FA"
      },
}))

const scenarioPage = ({ currentScenario }) => {

    console.log(currentScenario)
    const [seenBeforeRecords, setSeenBeforeRecords] = useState([]);

    let currentScores = ScoreData.find(element => element.scenarioNumber === currentScenario.Number)

    const { classes } = useStyles();
    const router = useRouter()
    const { id } = router.query

  return (
  <>
    <Container size="xl" px={30}>
        <Stack>
            <Stack mb={100} maw={600}>
                <Text fz="md" className={classes.alternateText}>In this scenario, I { currentScenario.Instruction.toLowerCase() } { currentScenario['Insight (from Observation)'] ? `I found out that ${currentScenario['Insight (from Observation)'].split(",")[0].toLowerCase()}` : 'The result was similar to the typical interface.' }</Text>
            </Stack>
            <Grid mb={100} gutterSm={50} gutterXs={50} gutterMd={20}> 
                <Grid.Col md={6} sm={12} xs={12}>
                    <Stack className={classes.scenarioBorder}>
                            <Group position="apart">
                              <Text fz="xs" c="dimmed" className={classes.alternateText}>Typical Interface</Text>
                              <Badge color="gray" size="md" radius="sm" className={classes.alternateText} >33% clicked donate</Badge>
                            </Group>
                            <Group className={classes.imageBorder}>
                                <RiveAnimation scenarioNumber={99} />
                            </Group>
                            <Text fz="sm" className={classes.description}>This is a typical choice that is seen in our normal checkout user flow in digital experiences. The drawback of this technique is that it might be hard to predict how much control the user wants to donate or their donation appetite.</Text>
                    </Stack>
                </Grid.Col>
                <Grid.Col md={6} sm={12} xs={12}>
                <Stack className={classes.scenarioBorder}>
                        <Group position="apart">
                          <Text fz="xs" c="dimmed" className={classes.alternateText}>Scenario { currentScenario.Number }</Text>
                          <Badge color={ (Number(currentScenario.ParticipationRate.replace("%",''))).toFixed(2) < 33 ? 'red' : 'green' } size="md" radius="sm" className={classes.alternateText} >{(Number(currentScenario.ParticipationRate.replace("%",''))).toFixed(2)}% clicked donate</Badge>
                        </Group>
                        
                            <Group className={classes.imageBorder}>
                                <RiveAnimation scenarioNumber={currentScenario.Number} />
                            </Group>
                            <Text fz="sm" className={classes.description}>{ currentScenario.Description}</Text>
                    </Stack>
                </Grid.Col>
            </Grid>

            <Stack mb={50} mt={100} align="center">
                <Stack maw={1000} align="center">
                    <Text fz="xs" className={classes.alternateText}>Strategy</Text>
                    <h1 className={classes.title} style={{textAlign: "center"}}>
                    { currentScenario.Strategy ? `What happens when we try ${currentScenario.Strategy.toLowerCase().replace(".",'')}?` : ''}
                    </h1>
                </Stack>
            </Stack>

            <Stack align="flex-start" justify="flex-start" mb={50} className={classes.seenBeforeBox}>
            <Group className={classes.uiShell}>
                    <AppWindow
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                        style={{ marginLeft: 10 }}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Comments</Text>
            </Group>
            <Text fz="sm" maw={400}>{ currentScenario["Summary (from Observation)"] } Here's what some people felt!</Text>

            <Group align="flex-start" justify="flex-start">
                <Group align="left" justify="flex-start">
                    { currentScenario["Observation (from Observation)"].split(",").map((e, i) => {
                            return <Stack className={classes.seenBeforeIndividual} maw={200}>
                            <Group mb={15}>
                                <div className={classes.InspirationProfile}></div>
                                <div className={classes.InspirationDot}></div>
                                <Text style={{ marginLeft: "-10px" }} fz="xs" className={classes.alternateText}>Person {i + 1}</Text>
                            </Group>
                            <Text fz="xs" className={classes.alternateText}>{e}</Text>
                            </Stack>
                        }) }
                </Group>
            </Group>

            </Stack>

            <Stack mt={130} mb={50} align="center">
                <Stack maw={1000} align="center">
                    <Text fz="xs" className={classes.alternateText}>Inspiration</Text>
                    <h1 className={classes.title} style={{textAlign: "center"}}>
                    You've probably seen this around you before.
                    </h1>
                </Stack>
            </Stack>

            <Group position="center">
                    { currentScenario.SeenBefore.split(",").map((e, i) => {
                           return <Stack justify="space-between" className={classes.seenBeforeIndividual} maw={200} p={20} mih={200}>
                           <Group mb={15}>
                               <Text fz="xs" c="dimmed" className={classes.alternateText}>Inspiration {i}</Text>
                           </Group>
                           <Text fz="xs" className={classes.alternateText}>{e}</Text>
                           </Stack>                 
                        }) }
            </Group>

            <Stack mt={130} mb={50} align="center">
                <Stack maw={1000} align="center">
                    <Text fz="xs" className={classes.alternateText}>Measurements</Text>
                    <h1 className={classes.title} style={{textAlign: "center"}}>
                    After measuring, people felt that this interface was { currentScenario.DeceptiveScore < 2.5 ? 'socially acceptable' : 'not socially acceptable' } based on a deception score of { currentScenario.DeceptiveScore }/3.5.
                    </h1>
                </Stack>
            </Stack>

            <Grid style={{ pointerEvents: "none" }}>
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
                    labelAlwaysOn
                    defaultValue={ currentScores.riskScore }
                    min={1}
                    max={5}  
                    marks={[
                        { value: 1, label: 'Not Risky' },
                        { value: 2, label: '' },
                        { value: 3, label: '' },
                        { value: 4, label: '' },
                        { value: 5, label: 'Very Risky' },
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
                    labelAlwaysOn
                    defaultValue={ 5 - (currentScores.uncertaintyScore) }
                    min={1}
                    max={5}  
                    marks={[
                        { value: 1, label: 'Not Often' },
                        { value: 2, label: '' },
                        { value: 3, label: '' },
                        { value: 4, label: '' },
                        { value: 5, label: 'Very Often' },
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
                    labelAlwaysOn
                      defaultValue={ currentScores.pressureScore }
                      min={1}
                      max={5}
                      marks={[
                        { value: 1.0, label: 'Not Pressuring' },
                        { value: 2.0, label: '' },
                        { value: 3.0, label: '' },
                        { value: 4.0, label: '' },
                        { value: 5.0, label: 'Pressuring' },
                      ]}
                      styles={{
                        pointerEvents: "none",
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
                <CardComponent number={4}>
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
                    labelAlwaysOn
                      defaultValue={ currentScores.motivationScore}
                      min={1}
                      max={5}
                      marks={[
                        { value: 1.0, label: 'Not Motivating' },
                        { value: 2, label: '' },
                        { value: 3, label: '' },
                        { value: 4, label: '' },
                        { value: 5, label: 'Motivating' },
                      ]}
                      styles={{
                        pointerEvents: "none",
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

          <Stack mt={130} mb={50}  align="center">
                <Stack maw={1000} spacing={30} align="center">
                    <Text fz="xs" className={classes.alternateText}>Conclusion</Text>
                    <h1 className={classes.title} style={{textAlign: "center"}}>
                    Since people felt that this interface was { currentScenario.DeceptiveScore < 2.5 ? 'socially acceptable, we can probably adopt this interface.' : 'not socially acceptable, we should probably not adopt this interface.' }
                    </h1>
                    <h1 className={classes.title} style={{textAlign: "center"}}>
                    { currentScenario['Insight (from Observation)'] ? `In this experiment, ${currentScenario['Insight (from Observation)'].toLowerCase()}` : ''  }
                    </h1>
                    <h1 className={classes.title} style={{textAlign: "center"}}>
                    { currentScenario['Actionable (from Observation)'] ? ` You can probably use this to ${currentScenario['Actionable (from Observation)'].toLowerCase()}.` : ' We can use this insight to create more interfaces!'  }
                    </h1>
                    
                </Stack>
            </Stack>

        </Stack>
    </Container>
  </>
  )
}

export default scenarioPage

export async function getStaticPaths() {
    // const { data } = await axios.get('https://eoyeceylz6rbgls.m.pipedream.net');
    // console.log(data)
    let onlyFields = ScenarioData

    const paths = onlyFields.map((e, i) => ({
        params: { id: e.Number.toString() }
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    // const { data } = await axios.get('https://eoyeceylz6rbgls.m.pipedream.net');
    let onlyFields = ScenarioData;

    let currentScenario = onlyFields.find((element) => element.Number == params.id )

    return {
        props: {
            currentScenario,
        }
    }
}