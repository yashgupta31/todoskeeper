import { Box, Button, CircularProgress, CircularProgressLabel, Heading, IconButton, Input, Progress, Select, Switch, Text, useMediaQuery, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { clearAllTodo, completedTodo, deleteTodo } from '../actions';
import { IoArrowBackSharp } from "react-icons/io5";
import { NavLink, useSearchParams } from 'react-router-dom';
import Edit from './Edit';

const TaskList = () => {

  const [isSmallerThan560] = useMediaQuery('(max-width: 560px)');
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks)
  // console.log(tasks)
  const toast = useToast()
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [isCompleted, setIsCompleted] = useState(searchParams.get('status') || 'all');
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    setSearchParams({ search: search, status: isCompleted })
  }, [search, isCompleted, setSearchParams])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateCompletionPercentage()
  }, [tasks]);


  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
    toast({
      title: 'Task Deleted Successfully!',
      // description: "We've created your account for you.",
      position: 'top',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleStatus = (isCompleted, id) => {
    dispatch(completedTodo(isCompleted, id))
  }

  const handleClearAll = () => {
    dispatch(clearAllTodo())
  }

  const updateCompletionPercentage = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    setCompletionPercentage(percentage);
  };

  return (
    <Box bg={'#F0F4F3'} w={'100vw'} minH={'100vh'} mt={'-2rem'} display={'flex'} justifyContent={'center'} alignItems={'start'} pt={'3rem'}>

      <Box w={isSmallerThan560 ? '85%' : '45vw'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'space-evenly'}>
        <Box  w={isSmallerThan560 ? '90%' : '33rem'} mb={'2rem'} position={'relative'}>
          <NavLink to={'/'}>
            <IconButton aria-label='Add to friends' icon={<IoArrowBackSharp style={{ fontSize: '2.3rem' }} />} />
          </NavLink>
        
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} position={'absolute'} top={'5px'} right={'15px'} w={'12rem'}>
          <Text>Completion Status</Text>
          <CircularProgress  value={completionPercentage} color='green.400'>
                <CircularProgressLabel>{`${Math.round(completionPercentage)}%`}</CircularProgressLabel>
              </CircularProgress>
    </Box>
    
          {/*-------------------- search & filters------------------- */}
          
          
          <Box display={'flex'} alignItems={'center'} mt={'1rem'} justifyContent={'space-between'} >
            
            <Input placeholder='Search Task...' w={'22.4rem'} value={search} onChange={(e) => setSearch(e.target.value)} bg={'white'} size='lg' boxShadow='md' />
            <Select w={'10rem'} bg={'lightgrey'} value={isCompleted} onChange={(e) => setIsCompleted(e.target.value)} size='lg'>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incompleted">Incompleted</option>
            </Select>

            

          </Box>
        </Box>
        {/* -----------------each task------------- */}
        {
          tasks.length > 0 ?
            <>
              <Box height={isSmallerThan560? '32rem':'32rem'} w={isSmallerThan560 ? '100%' : '33rem'} overflowY="auto" sx={{
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'gray.300',
                  borderRadius: 'full',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: 'gray.400',
                },
              }}>
                {
                  tasks
                    .filter((elem) => {
                      return elem.name.includes(search);
                    })
                    .filter((elem) => {
                      if (isCompleted == 'all') {
                        return elem;
                      }
                      else if (isCompleted == 'completed') {
                        return elem.completed;
                      }
                      else if (isCompleted == 'incompleted') {
                        return !elem.completed;
                      }



                    })
                    .map((elem, i) => (
                      <Box bg={elem.color} position={'relative'} color={elem.completed ? 'grey' : 'white'} transition={'1s'} key={i} mb={'1rem'} w={isSmallerThan560 ? '100%' : '32.5rem'} h={'7rem'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} p={'1rem'} borderRadius={8} boxShadow='md' >

                        <Box w={isSmallerThan560?'50%':'20rem'} >
                          <Text fontSize={isSmallerThan560? '1rem':'1.5rem'}
                            whiteSpace='nowrap'
                            overflow='hidden'
                            textOverflow='ellipsis'>{elem.name}</Text>
                        </Box>

                        <Box display={'flex'} fontSize={'1.8rem'} alignItems={'center'} w={'10rem'} justifyContent={'space-around'}>
                          <Switch size='md' colorScheme='teal' isChecked={elem.completed} onChange={(e) => handleStatus(e.target.checked, elem.id)} />
                          {/* isChecked={'false'}  */}
                          <NavLink to={`/edit/${elem.id}`}>
                            <IconButton aria-label='Edit' icon={<MdOutlineEdit />} />
                          </NavLink>

                          <NavLink>
                            <IconButton aria-label='Delete' icon={<MdDeleteOutline />} onClick={() => handleDelete(elem.id)} />
                          </NavLink>

                        </Box>

                        <Text color={'white'} position={'absolute'} right={'1rem'} bottom={'5px'} fontSize='xs'> {elem.date}</Text>
                      </Box>
                    ))
                }
              </Box>
              

              <Button boxShadow={'md'} colorScheme='tomato' bg={'black'} size={'lg'} color={'white'} w={isSmallerThan560? '100%': '33rem'} mt={'1rem'} onClick={handleClearAll}>CLEAR ALL</Button>
            </> : <Heading as='h8'>No Task found...</Heading>}
      </Box>

    </Box>
  )
}

export default TaskList