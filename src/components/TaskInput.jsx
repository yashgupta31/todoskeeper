import { Box, Button, Heading, Input, Text, Toast, useMediaQuery, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoMenu } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTodo } from '../actions';
import { nanoid } from "nanoid";


const TaskInput = () => {

    // let TodoArr = JSON.parse(localStorage.getItem('todo')) || [];
    const [task, setTask] = useState('');
    const dispatch = useDispatch();
    const toast = useToast()
    const [isSmallerThan470] = useMediaQuery('(max-width: 470px)');

    // const [tasks, setTasks]= useState(TodoArr);

    // useEffect(()=>{
    //     localStorage.setItem('todo', JSON.stringify(tasks)
    //     )
    // }, [tasks])

    // const getRandomLightColor = () => {
    //     const randomChannel = () => Math.floor(Math.random() * 156) + 100; // Values between 100 and 255 for light colors
    //     const r = randomChannel();
    //     const g = randomChannel();
    //     const b = randomChannel();
    //     return `rgb(${r}, ${g}, ${b})`;
    // };

    const lightColors = [
        '#98D7E6',
        '#E46D5F',
        '#FFC900',
        '#FF1B5B',
        '#34D286',
        '#099DFE',
        'tomato',
        '#F24362',//pink
        '#92A4FF', //purple blue
        '#92A4FF', // green blue
        '#FEBA57', //yellow
        '#FDD3E7', //pink
        '#08A497',//blue green
        '#86615C' , //brown
        '#1F2D4E', //violet
        '#B0C35C', //lightgreen
        '#AD6A6C', //darkpink
        '#B58DB6', //purple
        '#A4B494', //lightgreen
        '#616283', //ultraviolete
        '#374A67'
    ];

    const getRandomLightColor = () => {
        const randomIndex = Math.floor(Math.random() * lightColors.length);
        return lightColors[randomIndex];
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        
        const calender= new Date();
       
        const hour = calender.getHours() % 12 || 12; 
const isAm = calender.getHours() >= 12 ? 'PM' : 'AM'; 
        
        
        const date= calender.getDate();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[calender.getMonth()]; 
        const year= calender.getFullYear();

        const time= `${date} ${month} ${year} ${hour}:${calender.getMinutes()} ${isAm} `
        
        if(task){
            dispatch(addTodo({ id: nanoid(), name: task, completed: false, color: getRandomLightColor(), date: time }))
        toast({
            title: 'Task Added Successfully!',
            // description: "We've created your account for you.",
            position: 'top',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        }else{
            toast({
                title: 'Input is Empty',
                // description: "We've created your account for you.",
                position: 'top',
                status: 'warning',
                duration: 3000,
                isClosable: true, 
              })
        }
        
        setTask('')
    }

    return (

        <Box  bg={'#F0F4F3'} h={'100vh'} w={'100vw'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
            <Box bg={'white'} w={isSmallerThan470 && '90%'} borderRadius={'0.7rem'} boxShadow='lg'>
                <Box display={'flex'} boxShadow={'md'} p={'0.4rem'} justifyContent={'space-evenly'} alignItems={'center'} borderRadius={'0.7rem 0.7rem 0 0'}>
                    <NavLink to={'/alltask'}><IoMenu style={{ fontSize: '1.8rem', position: 'relative', right: isSmallerThan470?'1rem':'3rem' }} /></NavLink>
                    <Text fontSize={'1.8rem'} position={'relative'} right={'2rem'}>TODO APP</Text>
                </Box>
                <form onSubmit={(e) => handleSubmit(e)} style={{ width: isSmallerThan470? '100%':'28rem', height: '14rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', padding: '2rem' }}>
                    <Input placeholder='Enter Task Name' onChange={(e) => setTask(e.target.value)} value={task} size='lg' />
                    <Button w={'100%'} type='submit' size='lg' bg={'#E27169'} colorScheme='#E27169'>ADD TASK</Button>
                </form>
            </Box>
        </Box>
    )
}

export default TaskInput