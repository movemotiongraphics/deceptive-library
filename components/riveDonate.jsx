import { createStyles, Container, Text, Button, Group, Select, Stack, Image, Badge } from '@mantine/core';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { useState, useEffect } from 'react';

let CurrentDonationAmount = 0;

const RiveAnimation = ({ scenarioNumber }) => {

    const StateMachineName = "UserFlow";
    const stateMachineDonateInput = "Donate";
    const stateMachineNoDonateInput = "NoDonate";

    const allScenarios = [{
        scenario: 0,
        participationRate: 100,
        src: "../img/Scenario_0.riv",
    },
    {
        scenario: 1,
        participationRate: 33,
        src: "../img/Scenario_1.riv",
    },
    {
        scenario: 2,
        participationRate: 50,
        src: "../img/Scenario_2.riv",
    },
    {
        scenario: 3,
        participationRate: 33,
    },
    {
        scenario: 99,
        participationRate: 50,
        src: "../img/Scenario_Default.riv",
    }]

    const searchIndex = allScenarios.findIndex((element) => element.scenario == scenarioNumber);
    let currentScenario = allScenarios[searchIndex];

    const isParticipating = (percentage) => {
        const willParticipate = Math.random() > percentage ? true : false;
        return willParticipate;
    }

    const { rive, RiveComponent } = useRive({
        src: `${currentScenario.src}`,
        autoplay: true,
        stateMachines: StateMachineName,
        onLoad: (event) => {
            console.log(currentScenario);
        },
        layout: new Layout({
            fit: Fit.Cover,
            alignment: Alignment.TopCenter,
          }),
      })
    
    const userDonate = useStateMachineInput(rive, StateMachineName, stateMachineDonateInput);
    const userNoDonate = useStateMachineInput(rive, StateMachineName, stateMachineNoDonateInput);



    return (
        <>
        <RiveComponent />
        </>
    )
}

export { RiveAnimation, CurrentDonationAmount };