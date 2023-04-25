import { createStyles, Flex, Card, Image, Text, Group, Grid, RingProgress, Badge, Container, Stack, Paper, Title, Button } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'tabler-icons-react';

import ScenarioData from '../components/Data/Scenarios-Grid.json';
import ObservationData from '../components/Data/Observation-Grid.json';

const useStyles = createStyles((theme) => ({

    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: theme.colors.gray[1],
        height: "100%",
        width: "100%",
      },
    
      title: {
        fontWeight: 600,
        color: theme.black,
        lineHeight: 1.2,
        marginTop: theme.spacing.xs,
      },
    
      category: {
        color: theme.black,
        opacity: 0.7,
        fontWeight: 500,
        fontFamily: "Space Mono",
      }

}));

const CardSlides = ({ title, category }) => {
    const { classes } = useStyles();

    return (
        <Paper
          shadow="md"
          p="xl"
          className={classes.card}
        >
          <div>
            <Text size="xs" className={classes.category}> 
              {category}
            </Text>
            <Title order={3} className={classes.title}>
              {title}
            </Title>
          </div>
        </Paper>
    )
}
  
const ChooseMachine = () => {
    const { classes } = useStyles();
    const [ currentContextIndex, setContextIndex ] = useState(0);
    const [ contextArray, setAllContexts ] = useState([]);

    function retrieveRecords() {

      
    //find distinct strategies
    const findDistinct = (value, index, self) => {
      return self.indexOf(value) === index;
    }

    let onlyFields = ScenarioData;
    
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
              let splitArray = scenario.SeenBefore.split(",")
              currentContextObject.inspirations.push(splitArray);
            }
          }
        })

        currentContextObject.outcome = [...new Set(currentContextObject.outcome)];
        currentContextObject.inspirations = [...new Set(currentContextObject.inspirations.flat(1))];
        contextArray.push(currentContextObject);
      })

      setAllContexts(contextArray);
      console.log(contextArray);
    }

    useEffect(() => {
      retrieveRecords();
    },[])

    const contextSlides = contextArray.map((item) => (

      <Carousel.Slide key={item.Scenario} h={400}>
        <CardSlides title={item.contextName} category={"You might be"}/>
      </Carousel.Slide>

    ))

    let outcomeSlides = (currentContext) => {
      let outcomes = currentContext.outcome;
      return outcomes.map((item, index) => {
        // console.log(item)
        return <Carousel.Slide key={index + 'outcome'} h={400}>
                  <CardSlides title={item} category={"With some strategies, you can"}/>
               </Carousel.Slide>
      })
    }

    let inspirationSlides = (currentContext) => {
      let inspirations = currentContext.inspirations;
      return inspirations.map((item, index) => {
        // console.log(item)
        return <Carousel.Slide key={index + 'inspiration'} h={400}>
                  <CardSlides title={item} category={"Just like"}/>
               </Carousel.Slide>
      })
    }


    // useEffect(() => {
    //     console.log(contextArray[currentContextIndex]);
        
    // }, [currentContextIndex])
  
    return(
        <Stack w={"100%"}>
          <Grid gutter={20} style={{ justifyContent: "flex-start"}}>
            <Grid.Col md={4} sm={12} xs={12} spacing={30} >
              <Carousel 
                slideGap="md"
                onSlideChange={
                  (index) => {
                    setContextIndex(index);
                  }
                }
                styles={{
                  control: {
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",

                    '&[data-inactive]': {
                      opacity: 0,
                      cursor: 'default',
                    },
                  },
                }}
                nextControlIcon={<ChevronRight size={50} strokeWidth={1} />}
                previousControlIcon={<ChevronLeft size={50} strokeWidth={1} />}
                >
                  { contextSlides }
              </Carousel>
            </Grid.Col>
    
            <Grid.Col md={4} sm={12} xs={12}>
              <Carousel 
                slideGap="md"
                styles={{
                  control: {
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",

                    '&[data-inactive]': {
                      opacity: 0,
                      cursor: 'default',
                    },
                  },
                }}
                nextControlIcon={<ChevronRight size={50} strokeWidth={1} />}
                previousControlIcon={<ChevronLeft size={50} strokeWidth={1} />}
              >
                { contextArray[currentContextIndex] ? outcomeSlides(contextArray[currentContextIndex]) : "no" }
              </Carousel>
            </Grid.Col>

            <Grid.Col md={4} sm={12} xs={12} >
              <Carousel 
                slideGap="md"
                styles={{
                  control: {
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",

                    '&[data-inactive]': {
                      opacity: 0,
                      cursor: 'default',
                    },
                  },
                }}
                nextControlIcon={<ChevronRight size={50} strokeWidth={1} />}
                previousControlIcon={<ChevronLeft size={50} strokeWidth={1} />}
              >
                { contextArray[currentContextIndex] ? inspirationSlides(contextArray[currentContextIndex]) : "no" }
              </Carousel>
            </Grid.Col>
    
          </Grid>
        </Stack>
        )
}

export default ChooseMachine;