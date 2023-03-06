import { createStyles, Card, Image, Text, Group, RingProgress, Badge, Container, Stack } from '@mantine/core';

const circleWidth = 20;
const labelMaxWidth = 150;

const useStyles = createStyles((theme) => ({
    chart: {
      width: "100%",
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
      height: 400,
      borderRadius: 10,
      paddingTop: 150,
    },

    list: {
      listStyle: "none",
      display: "block",
      position: "relative",
      padding: 0,
      width: "100%",
    },

    bullet: {
      borderRadius: 100,
      backgroundColor: theme.colors.blue[5],
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
      backgroundColor: theme.colors.blue[5],
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      width: labelMaxWidth,
      height: 20,
      marginLeft: `-${labelMaxWidth/2 - 15}px`,
      borderRadius: 100,
      overflow: "hidden",
      fontSize: 12,
    },

    line: {
      width: 2,
      display: "block",
      backgroundColor: theme.colors.blue[5],
      marginLeft: circleWidth/2,
    },

    axisLine: {
      width: "100%",
      backgroundColor: theme.colors.gray[9],
      height: 2,
      marginTop: circleWidth/2,
    }
}));
  
const DeceptiveChart = ({ scenarios }) => {
    const { classes } = useStyles();

    return(
      <div className={classes.chart}>
        <div className={classes.list}>
        {scenarios.map((e, i) => 
          <div className={classes.bullet} style={{ marginLeft: `${((e.DeceptiveScore/3.5) * 100 - 45) * 1.7}%` }}>
            <div className={classes.label} style={{ marginTop: `${ i % 2 == 0 ? -30 : -60 }px` }}>{e.Scenario}</div>
            <div className={classes.line} style={{ height: `${ i % 2 == 0 ? 30 : 60 }px` }}></div>
            <div className={classes.insideBullet}></div>
          </div>)}
        </div>
        <div className={classes.axisLine}></div> 
      </div>
    )
}

export default DeceptiveChart;