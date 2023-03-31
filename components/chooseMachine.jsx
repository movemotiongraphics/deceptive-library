import { createStyles, Card, Image, Text, Group, RingProgress, Badge, Container, Stack, Paper, Title, Button } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useState, useEffect } from 'react';

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
        fontWeight: 700,
        textTransform: 'uppercase',
      }

}));

const CardSlides = ({ title, category }) => {
    const { classes } = useStyles();

    return (
        <Paper
          shadow="md"
          p="xl"
          radius="md"
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
        <CardSlides title={item.contextName} category={"context"}/>
      </Carousel.Slide>

    ))

    let outcomeSlides = (currentContext) => {
      let outcomes = currentContext.outcome;
      return outcomes.map((item, index) => {
        // console.log(item)
        return <Carousel.Slide key={index + 'outcome'} h={400}>
                  <CardSlides title={item} category={"outcome"}/>
               </Carousel.Slide>
      })
    }

    let inspirationSlides = (currentContext) => {
      let inspirations = currentContext.inspirations;
      return inspirations.map((item, index) => {
        // console.log(item)
        return <Carousel.Slide key={index + 'inspiration'} h={400}>
                  <CardSlides title={item} category={"inspiration"}/>
               </Carousel.Slide>
      })
    }


    // useEffect(() => {
    //     console.log(contextArray[currentContextIndex]);
        
    // }, [currentContextIndex])
  
    return(
        <Stack>
          <Group>
            <Stack>
            <Text fz="sm" >You might be designing for...</Text>
            <Carousel 
              maw={320} 
              slideGap="md"
              withIndicators
              onSlideChange={
                (index) => {
                  setContextIndex(index);
                }
              }>
                { contextSlides }
            </Carousel>
            </Stack>
    
            <Stack>
            <Text fz="sm" >and you want to </Text>
            <Carousel maw={320} withIndicators slideGap="md">
              { contextArray[currentContextIndex] ? outcomeSlides(contextArray[currentContextIndex]) : "no" }
            </Carousel>
            </Stack>

            <Stack>
            <Text fz="sm" >It's just like</Text>
            <Carousel maw={320} withIndicators slideGap="md">
              { contextArray[currentContextIndex] ? inspirationSlides(contextArray[currentContextIndex]) : "no" }
            </Carousel>
            </Stack>
    
          </Group>
        </Stack>
        )
}

export default ChooseMachine;