import { createStyles, Container, Text, Button, Group, Select, Stack, Image, Badge } from '@mantine/core';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useState, useEffect } from 'react';

let CurrentDonationAmount = 0;

const RiveAnimation = ({ scenario }) => {

    const StateMachineName = "UserFlow";
    const stateMachineDonateInput = "Donate";
    const stateMachineNoDonateInput = "NoDonate";

    const allScenarios = [{
        scenario: 0,
        participationRate: 100,
    },
    {
        scenario: 1,
        participationRate: 33,
    },
    {
        scenario: 2,
        participationRate: 50,
    },
    {
        scenario: 3,
        participationRate: 33,
    }]

    const isParticipating = (percentage) => {
        const willParticipate = Math.random() > percentage ? true : false;
        return willParticipate;
    }

    const { rive, RiveComponent } = useRive({
        src: "../img/normal_scenario.riv",
        autoplay: true,
        stateMachines: StateMachineName,
        onLoop: (event) => {
            CurrentDonationAmount++;
            console.log("test");
        },
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