import { createStyles, Card, Image, Text, Group, RingProgress, Badge, Container, Stack } from '@mantine/core';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { ChartBubble, BrandHeadlessui } from 'tabler-icons-react';

const circleWidth = 30;
const labelMaxWidth = 150;

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
    chart: {
      width: "100%",
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      borderRadius: 20,
      overflow: "hidden",
      padding: 20,
      border: "1px solid rgba(0,0,0,0.22)"
    },

    alternateText: {
      fontFamily: "Space Mono",
    },

    uiShell: {
      borderBottom: "1px solid rgba(0,0,0,0.22)",
      marginLeft: "-30px",
      paddingLeft: 20,
      paddingBottom: 20,
      width: "140%",
    },

    list: {
      listStyle: "none",
      display: "block",
      position: "relative",
      padding: 0,
      width: "100%",
      marginTop: "5em",

      [BREAKPOINT]: {
        display: "none",
      },
    },

    bulletMobile: {
      borderRadius: 8,
      backgroundColor: theme.colors.grape[2],
      border: "1px solid rgba(0,0,0,0.22)",
      width: circleWidth * 2,
      height: circleWidth * 2,
    },

    bullet: {
      borderRadius: 8,
      backgroundColor: theme.colors.grape[2],
      border: "1px solid rgba(0,0,0,0.22)",
      width: circleWidth,
      height: circleWidth,
      display: "inline-block",
      position: "absolute",
      transition: "0.3s ease all",

      '&:hover': {
        backgroundColor: theme.colors.grape[3],
        boxShadow: "3px 3px 15px 0px rgba(201,156,221,0.42)",
        transition: "0.3s ease all",
      },

    },

    insideBullet: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      padding: 5,
      height: "100%",
    },

    label: {
      backgroundColor: theme.colors.green[5],
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
    },

    line: {
      width: 2,
      display: "block",
      backgroundColor: theme.colors.green[5],
      marginLeft: circleWidth/2,
    },

    axisLine: {
      width: "90%",
      backgroundColor: theme.colors.gray[4],
      height: 1,
      marginTop: circleWidth/2,
    },

    circleLine: {
      width: 10,
      height: 10,
      borderRadius: 20,
      backgroundColor: theme.colors.gray[3],
      transform: "translate(0, 8px)",
    },

    selected: {
      backgroundColor: theme.colors.green[1],
    },

    hiddenWhenMobile: {
      [BREAKPOINT]: {
        display: "none",
      },
    },

    showWhenMobile: {
      display: "none",
      [BREAKPOINT]: {
        display: "block",
      },
    },

    descriptionDiv: {
      border: "1px solid rgba(0,0,0,0.22)",
      backgroundColor: "white",
      borderRadius: 5,
      padding: 20,
      overflow: "hidden",
      textDecoration: "none",
      transition: "0.3s ease all",

      '&:hover': {
        backgroundColor: theme.colors.grape[1],
        boxShadow: "3px 3px 15px 0px rgba(201,156,221,0.22)",
        transition: "0.3s ease all",
      },
    },
}))
  
const DeceptiveChart = ({ scenarios, strategies }) => {

    console.log( scenarios )
    const [currentlySelected, setSelected] = useState(0);
    const [classSelected, setClassSelect] = useState(false);
    const { classes } = useStyles();

    let handleSelect = (scenarioNumber) => {
      setSelected(scenarioNumber)
    };

    const sortedScenarios = [...scenarios].sort((a, b) => a.DeceptiveScore - b.DeceptiveScore );

    return(
      <div className={classes.chart}>
        <Stack justify="space-between">
          <Group className={classes.uiShell}>
              <ChartBubble
                  size={20}
                  strokeWidth={1}
                  color={'gray'}
                  style={{ marginLeft: 10 }}
                />
                <Text fz="xs" c="dimmed" className={classes.alternateText}>Scenarios vs Deceptive Score</Text>
          </Group>
          <Stack>
            <div>
                <div className={classes.list}>
                  {scenarios.map((e, i) => 
                    <Link href={`/scenario/${e.Number}`}>
                    <div id={`bullet`+e.Number} onClick={handleSelect} className={classes.bullet} style={{ marginLeft: `${((e.DeceptiveScore/3.5) * 100 - 45) * 1.7}%` }}>
                      {/* <div className={classes.line} style={{ height: `60px` }}></div> */}
                    </div>
                    </Link>)
                  }
                </div>

                <Group className={classes.showWhenMobile}>
                  <Text my={10} fz="xs" c="dimmed" className={classes.alternateText}>Low to High Score (Top Down, Left to Right)</Text>
                  <Group>
                    {sortedScenarios.map((e, i) => 
                        <Link href={`/scenario/${e.Number}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <Stack align="center" justify="center" id={`bullet`+e.Number} onClick={handleSelect} className={classes.bulletMobile}>
                          {e.DeceptiveScore}
                        </Stack>
                        </Link>)
                      }
                  </Group> 
                </Group>
                <div className={classes.hiddenWhenMobile}>
                  <Group spacing={0} justify="center">
                  <div justify="flex-end" className={classes.circleLine}></div>
                  <div justify="center" className={classes.axisLine} style={{ flexGrow: 2 }}></div> 
                  <div justify="flex-end" className={classes.circleLine}></div>
                  </Group>
                  <Group position="apart" mt={60}>
                    <div><Text fz="xs" c="dimmed" className={classes.alternateText}>Socially Acceptable (Low Deceptive Score)</Text></div>
                    <div><Text fz="xs" c="dimmed" className={classes.alternateText}>Less Socially Acceptable (High Deceptive Score)</Text></div>
                  </Group>
                </div>
                
            </div>
          </Stack>

          <Group className={classes.hiddenWhenMobile} mt={50}>
            <Group align="flex-start">
              {sortedScenarios.map((e,i) => 
                <a href={`/scenario/${e.Number}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Stack className={classes.descriptionDiv} maw={200}>
                  <Group className={classes.uiShell}>
                    <BrandHeadlessui
                        size={20}
                        strokeWidth={1}
                        color={'gray'}
                        style={{ marginLeft: 10 }}
                      />
                      <Text fz="xs" c="dimmed" className={classes.alternateText}>Scenario {e.Number}</Text>
                  </Group>
                  <Text fz="xs">{e.Instruction}</Text>
                  <Text fz="xs" c="dimmed" className={classes.alternateText}>Score: {e.DeceptiveScore}</Text>
                </Stack>
                </a>
              )}
            </Group>
          </Group>

        </Stack>
      
      </div>
    )
}

export default DeceptiveChart;