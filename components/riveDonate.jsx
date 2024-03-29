import { createStyles, Container, Text, Button, Group, Select, Stack, Image, Badge } from '@mantine/core';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { useState, useEffect } from 'react';

let CurrentDonationAmount = 0;

const RiveAnimation = ({ scenarioNumber, hoverToPlay, contained }) => {

    const StateMachineName = "UserFlow";
    const stateMachineDonateInput = "Donate";
    const stateMachineNoDonateInput = "NoDonate";

    const allScenarios = [{
        scenario: 0,
        participationRate: 100,
        src: "../img/Scenario_0.riv",
        artboard: "Scenario 0",
    },
    {
        scenario: 1,
        participationRate: 33,
        src: "../img/Scenarios.riv",
        artboard: "Scenario 1",
    },
    {
        scenario: 2,
        participationRate: 50,
        src: "../img/Scenarios.riv",
        artboard: "Scenario 2",
    },
    {
        scenario: 3,
        participationRate: 33,
        src: "../img/Scenarios.riv",
        artboard: "Scenario 3",
    },
    {
        scenario: 4,
        participationRate: 16,
        src: "../img/Scenarios.riv",
        artboard: "Scenario 4",
    },
    {
        scenario: 5,
        participationRate: 100,
        src: "../img/Scenarios.riv",
        artboard: "Scenario 5",
    },
    {
        scenario: 6,
        participationRate: 100,
        src: "../img/Scenarios.riv",
        artboard: "Scenario 6",
    },
    {
        scenario: 7,
        participationRate: 10,
        src: "../img/Scenarios.riv",
        artboard: "Scenario 7",
    },
    {
        scenario: 8,
        participationRate: 100,
        src: "../img/Scenarios.riv",
        artboard: "Scenario 8",
    },
    {
        scenario: 9,
        participationRate: 100,
        src: "../img/Scenarios.riv",
        artboard: "Scenario 9",
    },
    {
        scenario: 10,
        participationRate: 10,
        src: "../img/Scenarios.riv",
        artboard: "Scenario 10",
    },
    {
        scenario: 11,
        participationRate: 10,
        src: "../img/Scenarios.riv",
        artboard: "Scenario 11",
    },
    {
        scenario: 99,
        participationRate: 50,
        src: "../img/Scenarios.riv",
        artboard: "DefaultScenario",
    }]

    const searchIndex = allScenarios.findIndex((element) => element.scenario == scenarioNumber);
    let currentScenario = allScenarios[searchIndex];


    const { rive, RiveComponent } = useRive({
        artboard: `${currentScenario.artboard}`,
        src: `${currentScenario.src}`,
        stateMachines: StateMachineName,
        autoplay: !hoverToPlay,
        layout: new Layout({
            fit:Fit.Cover,
            alignment: Alignment.TopCenter,
          }),
      })

    const userDonate = useStateMachineInput(rive, StateMachineName, stateMachineDonateInput);
    const userNoDonate = useStateMachineInput(rive, StateMachineName, stateMachineNoDonateInput);

    return (
        <>
          { hoverToPlay ? <RiveComponent       
                onMouseEnter={() => rive && rive.play()}
                onMouseLeave={() => rive && rive.pause()}
            /> : <RiveComponent /> }
        </>
    )
}

export { RiveAnimation, CurrentDonationAmount };