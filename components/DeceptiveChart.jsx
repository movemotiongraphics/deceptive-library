import { createStyles, Card, Image, Text, Group, RingProgress, Badge, Container, Stack } from '@mantine/core';

const circleWidth = 40;
const labelMaxWidth = 150;

const useStyles = createStyles((theme) => ({
    chart: {
      width: "100%",
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
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
      borderRadius: 10,
      backgroundColor: theme.colors.green[5],
      width: circleWidth,
      height: circleWidth,
      display: "inline-block",
      position: "absolute",
    },

    insideBullet: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
      width: "100%",
      backgroundColor: theme.colors.gray[7],
      height: 1,
      marginTop: circleWidth/2,
    }
}));
  
const DeceptiveChart = ({ scenarios, strategies }) => {
    const { classes } = useStyles();

    return(
      <div className={classes.chart}>
        <Stack justify="space-between">
          <Stack h={300}>
            <div>
                <div className={classes.list}>
                  {scenarios.map((e, i) => 
                    <div className={classes.bullet} style={{ marginLeft: `${((e.DeceptiveScore/3.5) * 100 - 45) * 1.7}%` }}>
                      {/* <div className={classes.line} style={{ height: `60px` }}></div> */}
                      <div className={classes.insideBullet}></div>
                    </div>)
                  }
                </div>
                <div>
                  <Group>
                  <div className={classes.axisLine}></div> 
                  </Group>
                  <Group position="apart" px={20} mt={10}>
                    <div><Text fz="xs">Less Deceptive</Text></div>
                    <div><Text fz="xs">More Deceptive</Text></div>
                  </Group>
                </div>
                
            </div>
          </Stack>

          <div>

            <Stack px={20} mt={10} mb={20}>
              <div><Text fz="xs">Strategies</Text></div>
              <Group position="left" >
                {
                  strategies.map((e, i) => 
                    <Badge color="gray" size="lg" radius="sm">{e.strategyName}</Badge>
                  )
                }
              </Group>
            </Stack>
            
            <Stack px={20} mt={10} mb={20}>
              <div><Text fz="xs">Scenarios</Text></div>
              <Group position="left" >
                {
                  scenarios.map((e, i) => 
                    <Badge color="gray" size="lg" radius="sm">{e.Scenario}</Badge>
                  )
                }
              </Group>
            </Stack>

          </div>
        </Stack>
      
      </div>
    )
}

export default DeceptiveChart;