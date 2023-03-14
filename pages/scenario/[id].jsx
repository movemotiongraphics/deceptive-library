import { useRouter } from 'next/router'
import { Group, Flex, Stack, Container, createStyles, Image, Badge, Text } from '@mantine/core';
import axios, { all } from 'axios';

const BREAKPOINT = '@media (max-width: 755px)';

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
    
    imageBorder: {
        backgroundColor: theme.colors.gray[1],
        padding: 50,
        height: 630,
      },
    
      description: {
        width: '60%',

        [BREAKPOINT]: {
            width: '100%',
            },
      },

      titleSmall: {
        width: '80%',

        [BREAKPOINT]: {
            width: '100%',
            },
      },


      quotes: {
        backgroundColor: theme.colors.gray[1],
      },

      strategyPill: {
        padding: 10,
        borderRadius: 20,
        border: "1px solid black",
      }
}))

const scenarioPage = ({ currentScenario }) => {
    console.log({ currentScenario })
    const { classes } = useStyles();
  const router = useRouter()
  const { id } = router.query

  return (
  <>
    <Container size="xl" px={30}>
        <Group mb={100}>
        <h1 className={classes.title}> 
        {
            id == 1 || id == 3 ? 'This is the typical donation interface we are used to seeing.' : `When the "${ currentScenario.Scenario }" interface is used to replace the typical one, we created sense of ${ currentScenario[`Insight (from Observation)`][0] }` 
        } 
        </h1>
        </Group>
        <Stack>
            <Group grow mb={200} align="flex-start"> 
                <Stack>
                <Group position="apart" align="end">
                <div>Typical</div>
                <Badge color="gray" size="lg" radius="sm">33% Participation</Badge>
                </Group>
                    <div className={classes.imageBorder}>
                        <Image maw={250} mx="auto" src="../img/typicalui.png" alt="Scenario Image"/>
                    </div>
                    <Text fz="xs" className={classes.description}>This is a typical choice that is seen in our normal checkout user flow in digital experiences. The drawback of this technique is that it might be hard to predict how much control the user wants to donate or their donation appetite.</Text>
                </Stack>
                <Stack>
                <Group position="apart" align="end">
                <div>Experiment</div>
                {
                    currentScenario.ParticipationRate < 34 ? <Badge color="green" size="lg" radius="sm">{ currentScenario.ParticipationRate * 100 }% Participation</Badge> : <Badge color="red" size="lg" radius="sm">{ currentScenario.ParticipationRate * 100 }% Participation</Badge> 
                }
                </Group>
                    <Stack className={classes.imageBorder} align="center" justify="center" >
                        <Image width={230} mx="auto" style={{  }}src={`${currentScenario.Thumbnail}`} alt="Scenario Image"/>
                    </Stack>
                <Text fz="xs" className={classes.description}>{ currentScenario.Description}</Text>
                </Stack>
            </Group>

            <Group grow align="flex-start" justify="flex-start" mb={50} className={classes.titleSmall}>
            <h1 className={classes.title}>In summary, this mechanism leveraged on the strategy { currentScenario.Strategy ? <span className={classes.strategyPill}>{currentScenario.Strategy}</span> : '' }.</h1>
            </Group>

            <Stack align="flex-start" justify="flex-start" mb={50}>
            <h1 className={classes.title}>People who tested it mentioned that...</h1>
            </Stack>

            <Group grow align="flex-start" justify="flex-start" mb={200}>
                <div></div>
                <Stack>
                    { currentScenario["Observation (from Observation)"].map((e, i) => {
                            return <Flex 
                            className={classes.quotes} spacing="sm"       
                            justify="flex-start"
                            align="flex-start"
                            direction="row">
                                <Stack h={100} w={100} justify="center" align="center">
                                    <Text fz="xl">{i}</Text>
                                </Stack>                              
                                <Stack align="flex-start" justify="flex-start">
                                <div>
                                    <Badge color="gray" size="xs" radius="sm">User Comment</Badge> 
                                </div>
                                <div>{e}</div>
                                </Stack>
                            </Flex>
                        }) }
                </Stack>
            </Group>

            <Group grow align="flex-start" justify="flex-start" mb={50}>
            <h1 className={classes.title}>Make your own!</h1>
            <Stack>
            </Stack>
            </Group>
        </Stack>
    </Container>
  </>
  )
}

export default scenarioPage

export async function getStaticPaths() {
    const { data } = await axios.get('https://eoyeceylz6rbgls.m.pipedream.net');
    // console.log(data)
    let onlyFields = data.map((record, index) => (record.fields));

    const paths = onlyFields.map((e, i) => ({
        params: { id: e.Number.toString() }
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const { data } = await axios.get('https://eoyeceylz6rbgls.m.pipedream.net');
    let onlyFields = data.map((record, index) => (record.fields));
    
    let currentScenario = onlyFields[params.id]
    return {
        props: {
            currentScenario,
        }
    }
}