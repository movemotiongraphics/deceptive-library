import { Group, Flex, Stack, Container, createStyles, Image, Badge, Text, Grid, Button } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';
import { Plus } from 'tabler-icons-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useListState } from '@mantine/hooks';

import ScenarioData from '../components/Data/Scenarios-Grid.json';
import ObservationData from '../components/Data/Observation-Grid.json';
import InspirationData from '../components/Data/Inspirations-Grid.json'

let componentData = ["Input Area", "Slider", "Buttons", "Checkboxes", "Spinners"]

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

    alternateText: {
      fontFamily: "Space Mono",
    },

    headerTitle: {
      fontFamily: 'Inter Tight',
      fontSize: theme.fontSizes.xl,
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

    greyBackground: {
      backgroundColor: theme.colors.gray[2],
    },
    
    greyBackgroundAlternate: {
      backgroundColor: theme.colors.gray[0],
    },
    
    cardContainer: {
      padding: 2,
      height: 500,
      overflowY: "hidden",
      borderRadius: "10px",
      border: "1px solid rgba(0,0,0,0)",
      transition: "0.3s ease all",
    },

    draggableCard: {
      padding: 10,
      backgroundColor: theme.colors.gray[0],
      borderRadius: "10px",
      display: "inline-block",
    },
  
    plusIcon: {
      color: theme.colors.gray[4],
    },

    itemDragging: {
      transition: "0.3s ease all",
      boxShadow: "1px 10px 29px 0px rgba(0,0,0,0.33)",
    },

    containerDragging: {
      border: "1px solid rgba(0,0,0,0.33)",
      transition: "0.3s ease all",
    },

    solutionCorner: {
      border: "1px solid rgba(0,0,0,0.33)",
      padding: 30,
    },

    recommendationCorner: {
      backgroundColor: theme.colors.gray[1],
    },

}));

const CardPrompt = ({ index, category, element, children }) => {
  const { classes, cx } = useStyles();
  const [ isCurrentlyDragging, setDragging ] = useState(false)

  return <Draggable key={category + index} draggableId={category + index} index={index}>
    {(provided, snapshot) => {
      return <Stack 
      className={cx(classes.draggableCard, { [classes.itemDragging]: snapshot.isDragging })}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      justify="space-around"
      >
        <Text c="dimmed" fz="xs" className={classes.alternateText}>{category}</Text>
        <Text fz="sm" className={classes.alternateText}>{element}</Text>
        {children}
      </Stack>
    }}
  </Draggable>
}


const Scenario = ({ scenario }) => {
  return <div>{scenario.text}</div>;
};

const StudyPage = () => {
  const { classes, cx } = useStyles();
  const [ contextArray, setAllContexts ] = useState([]);

  const [ outcomeArray, setAllOutcomes ] = useState([]);
  const [ inspirationArray, setAllInspiration] = useState([]);
  const [ scenarioArray, setAllScenario] = useState([]);
  const [ componentArray, setAllComponent] = useState([]);

  const [ recommendationArray, setRecommendationArray] = useState([])

  //cards
  const [selectedSolution, setSelectedSolution] = useState([]);

  //get data
  function retrieveRecords() {

    setAllComponent(componentData);

    //find distinct strategies
    const findDistinct = (value, index, self) => {
      return self.indexOf(value) === index;
    }

    let onlyFields = ScenarioData;
    
    //find different scenarios
    let differentScenarios = [...new Set(onlyFields.map((e, i) => e.Scenario).filter(item => item).filter(findDistinct).flat(1))];
    setAllScenario(differentScenarios)

    //find different outcomes
    let differentOutcome = [...new Set(onlyFields.map((e, i) => e["Actionable (from Observation)"]).filter(item => item).filter(findDistinct).flat(1))];
    setAllOutcomes(differentOutcome)

    //find different inspirations
    let inspirationArray = []
    InspirationData.map((element, index) => {
      inspirationArray.push(element.InspirationName)
    })
    setAllInspiration(inspirationArray)
    console.log(inspirationArray)


    //find different contexts, outcomes and their inspirations
    let differentContexts = [...new Set(onlyFields.map((e, i) => e["EffectiveIn (from Observation)"]).filter(item => item).filter(findDistinct).flat(1))];

    const contextArray = [];
    differentContexts.map((context, i) => {
        const currentContextObject = {};
        currentContextObject.contextName = context;
        currentContextObject.outcome = [];
        currentContextObject.inspirations = [];
        currentContextObject.scenarios = [];
        currentContextObject.componentList = [];

        onlyFields.forEach((scenario) => {
          if (scenario["EffectiveIn (from Observation)"] == context) {
            if (scenario["Actionable (from Observation)"]) {
              currentContextObject.outcome.push(scenario["Actionable (from Observation)"])
            }
            if (scenario.SeenBefore) {
              let splitArray = scenario.SeenBefore.split(",")
              currentContextObject.inspirations.push(splitArray);
            }
            if (scenario.componentList) {
              currentContextObject.componentList.push(scenario.componentList);
            }
            currentContextObject.scenarios.push(scenario);
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

  const checkScenarioMatch = (element, searchCategory) => {

    let scenario;

    //check where card is from
    if ( searchCategory === 'outcomesList' ) {
      scenario = contextArray.find((scenario) => {
        return scenario.outcome.includes(element);
      });
    } else if ( searchCategory === 'solutionList') {
      return;
    } else if ( searchCategory === 'inspirationList') {
      scenario = contextArray.find((scenario) => {
        return scenario.inspirations.includes(element);
      });
    } else if ( searchCategory === 'componentList') {
      scenario = contextArray.find((scenario) => {
        return scenario.componentList.includes(element);
      });
    }

    console.log(scenario)

    if (scenario != null) {
      setRecommendationArray([scenario]);
    } else {
      return;
    }

    console.log(recommendationArray);
  };

  //reset drag drop
  const handleReset = () => {
    setRecommendationArray([]);
    retrieveRecords();
    setSelectedSolution([]);
  };

  //dragging and dropping rearrange
  const handleOutcomeDrop = (result) => {
    const { destination, source, draggableId } = result
    console.log(result)

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = source.droppableId
    const finish = destination.droppableId

    //check which state function to use
    let setArray = (array, currentList) => {
      if (currentList === 'outcomesList') {
        setAllOutcomes([...array]);
      } else if ( currentList === 'solutionList') {
        setSelectedSolution([...array]);
      } else if ( currentList === 'inspirationList') {
        setAllInspiration([...array])
      } else if ( currentList === 'componentList') {
        setAllComponent([...array])
      }
    };

    //check starting array
    let startArray;
    let endArray;

    if ( start === 'outcomesList' ) {
      startArray = outcomeArray;
    } else if ( start === 'solutionList') {
      startArray = selectedSolution;
    } else if ( start === 'inspirationList') {
      startArray = inspirationArray;
    } else if ( start === 'componentList') {
      startArray = componentArray;
    }

    if ( finish === 'outcomesList') {
      endArray = outcomeArray;
    } else if ( finish === 'solutionList') {
      endArray = selectedSolution;
    } else if ( finish === 'inspirationList') {
      endArray = inspirationArray;
    } else if ( finish === 'componentList') {
      endArray = componentArray;
    }

    if ( start === finish ) {
        // Make a copy of the original array before modifying it
        let oldArray = Array.from(startArray);

        // Remove the item from the oldArray and insert it back at a specific index
        let currentItem = oldArray[source.index];
        oldArray.splice(source.index, 1);
        oldArray.splice(destination.index, 0, currentItem);

        // Update the state with the rearranged array
        setArray(oldArray, start);
    } else {
      //add to new array
      let newArray = Array.from(endArray);
      newArray.splice(destination.index, 0, startArray[source.index]);
  
      setArray(newArray, finish);

      //reduce old array
      let oldArray = Array.from(startArray);
      oldArray.splice(source.index, 1);
      setArray(oldArray, start)
    }

    if ( finish === 'solutionList') {
      //get current card
      let currentCard = startArray[source.index]
      
      //check for the cards dropped and see if theres a solution
      checkScenarioMatch(currentCard, start)
    }
 
  };



    return (
      <Container size="xl" px={30}>
          <Group mt={130} mb={170} position="center" align="center">
            <h1 className={classes.headerTitle} style={{ textAlign: "center"}}>
              Build your own deceptive interface with card prompts.
            </h1>
          </Group>

          <Stack spacing={20} mt={20}>
            <DragDropContext onDragEnd={handleOutcomeDrop}>

            <Stack p={50}>
                <Grid mih={500} className={classes.solutionCorner}>
                  <Grid.Col span={6}>
                    <div>
                      <Group position="apart">
                        <Text fz="xs" className={classes.alternateText} pb={20}>Drop some cards here!</Text>
                        <Button color="gray" radius="xl" size="xs" onClick={handleReset}>Clear</Button>
                      </Group>
                      <Stack>
                          <Droppable droppableId="solutionList" direction="vertical">
                            {(provided, snapshot) => (
                                <Stack 
                                ref={provided.innerRef}
                                className={cx(classes.cardContainer, { [classes.containerDragging]: snapshot.isDraggingOver })}
                                {...provided.droppableProps}>
                                  { selectedSolution ? selectedSolution.map((element, index) => (
                                        <CardPrompt key={"solution" + index} index={index} category={"solution"} element={element}/>
                                )) : "no"}
                                {provided.placeholder}
                                </Stack>
                            )}
                          </Droppable>
                      </Stack>
                    </div>
                  </Grid.Col>

                  <Grid.Col span={6} className={classes.recommendationCorner}>
                    <div>
                      <Text fz="xs" className={classes.alternateText} pb={20}>Your Recommendations!</Text>
                      <Stack>
                          { recommendationArray.length > 0 ? recommendationArray.map((element, index) => (
                                        <div>Imagine you are {element.contextName} to {(element.outcome[0]).toLowerCase()}, you can {(element.scenarios[0].Instruction).toLowerCase()}</div>
                            )) : "Start by dragging some cards over to the left."}
                      </Stack>
                    </div>
                  </Grid.Col>
                </Grid>
              </Stack>


            {/* <Stack>
              <Stack className={classes.greyBackground} position="left" align="flex-start"  p={50}>
              <Text fz="xs" className={classes.alternateText}>Your Cards</Text>
              <h1 className={classes.title}>Pick a few cards to generate your own deceptive interface!</h1>
              </Stack>
            </Stack> */}
            
            <Group grow style={{ justifyContent: "flex-start", alignItems: "flex-start" }} p={50}>
              <div style={{ display: "block" }}>
                <Text fz="xs" className={classes.alternateText} pb={20}>Outcomes</Text>
                    <Droppable droppableId="outcomesList" direction="vertical">
                      {(provided, snapshot) => (
                          <Stack 
                          ref={provided.innerRef}
                          className={cx(classes.cardContainer, { [classes.containerDragging]: snapshot.isDraggingOver })}
                          {...provided.droppableProps}>
                            { outcomeArray ? outcomeArray.map((element, index) => (
                                  <CardPrompt key={"outcomes" + index} index={index} category={"outcomes"} element={element}/>
                          )) : "no"}
                          {provided.placeholder}
                          </Stack>
                      )}
                    </Droppable>
                </div>

                <div style={{ display: "block" }}>
                <Text fz="xs" className={classes.alternateText} pb={20}>Inspiration</Text>
                    <Droppable droppableId="inspirationList" direction="vertical">
                      {(provided, snapshot) => (
                          <Stack 
                          ref={provided.innerRef}
                          className={cx(classes.cardContainer, { [classes.containerDragging]: snapshot.isDraggingOver })}
                          {...provided.droppableProps}>
                            { inspirationArray ? inspirationArray.map((element, index) => (
                                  <CardPrompt key={"inspiration" + index} index={index} category={"inspiration"} element={element}/>
                          )) : "no"}
                          {provided.placeholder}
                          </Stack>
                      )}
                    </Droppable>
                </div>

                <div style={{ display: "block" }}>
                <Text fz="xs" className={classes.alternateText} pb={20}>Components</Text>
                    <Droppable droppableId="componentList" direction="vertical">
                      {(provided, snapshot) => (
                          <Stack 
                          ref={provided.innerRef}
                          className={cx(classes.cardContainer, { [classes.containerDragging]: snapshot.isDraggingOver })}
                          {...provided.droppableProps}>
                            { componentArray ? componentArray.map((element, index) => (
                                  <CardPrompt key={"component" + index} index={index} category={"component"} element={element}/>
                          )) : "no"}
                          {provided.placeholder}
                          </Stack>
                      )}
                    </Droppable>
                </div>
            </Group>

          </DragDropContext>
          </Stack>
          
      </Container>
    )
}

export default StudyPage