import { createStyles, Card, Image, Text, Group, RingProgress, Badge, Container, Stack } from '@mantine/core';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { ChartBubble } from 'tabler-icons-react';

const circleWidth = 100;
const labelMaxWidth = 150;

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
      width: "120%",
    },

    list: {
      listStyle: "none",
      display: "block",
      position: "relative",
      padding: 0,
      width: "100%",
      marginTop: "5em",
    },

    bullet: {
      borderRadius: 5,
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.22)",
      width: 150,
      height: 100,
      display: "inline-block",
      position: "absolute",

      '&:hover': {
        backgroundColor: theme.colors.gray[1],

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
      transform: "translate(0, 25px)",
    },

    selected: {
      backgroundColor: theme.colors.green[1],
    }
}))
  
const DeceptiveChart = ({ scenarios, strategies }) => {

    console.log( scenarios )
    const [currentlySelected, setSelected] = useState([]);
    const [classSelected, setClassSelect] = useState(false);
    const { classes } = useStyles();


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
          <Stack h={300}>
            <div>
                <div className={classes.list}>
                  {scenarios.map((e, i) => 
                    <Link href={`/scenario/${e.Number}`}>
                    <div id={`bullet`+e.Number} className={classes.bullet} style={{ marginLeft: `${((e.DeceptiveScore/3.5) * 100 - 45) * 1.7}%` }}>
                      {/* <div className={classes.line} style={{ height: `60px` }}></div> */}
                      <Stack className={classes.insideBullet}>
                        <Text fz="xs" c="dimmed" className={classes.alternateText}>Scenario {e.Number}</Text>

                      </Stack>
                    </div>
                    </Link>)
                  }
                </div>
                <div>
                  <Group spacing={0} justify="center">
                  <div justify="flex-end" className={classes.circleLine}></div>
                  <div justify="center" className={classes.axisLine} style={{ flexGrow: 2 }}></div> 
                  <div justify="flex-end" className={classes.circleLine}></div>
                  </Group>
                  <Group position="apart" mt={60}>
                    <div><Text fz="xs" c="dimmed" className={classes.alternateText}>Less Deceptive</Text></div>
                    <div><Text fz="xs" c="dimmed" className={classes.alternateText}>Socially Acceptable</Text></div>
                    <div><Text fz="xs" c="dimmed" className={classes.alternateText}>More Deceptive</Text></div>
                  </Group>
                </div>
                
            </div>
          </Stack>
        </Stack>
      
      </div>
    )
}

export default DeceptiveChart;