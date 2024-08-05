import { Box, Button, Input, Text, useMediaQuery, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoMenu } from 'react-icons/io5'
// import { useSelector } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { editTodo } from '../actions'
// import { editTodo } from '../actions'

const Edit = () => {

   const dispatch= useDispatch()
    const {id}= useParams()
    const tasks= useSelector(state=> state.tasks)
    const taskToEdit= tasks.filter((elem)=>{ 
        return elem.id== id})
    const {name}= taskToEdit[0];
    const [nameInput, setNameInput]= useState(name)
    const navigate= useNavigate()
    const toast = useToast()
    const [isSmallerThan470] = useMediaQuery('(max-width: 470px)');

    const handleSubmit=(e)=>{
        e.preventDefault();
        // console.log(typeof id)
        dispatch(editTodo(nameInput, id))
        setNameInput('')
        toast({
            title: 'Task Updated Successfully!',
            position: 'top',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          navigate('/alltask')
        
        
    }

  return (
    <Box bg={'#F0F4F3'} h={'100vh'} w={'100vw'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} position={'absolute'}>
    <Box bg={'white'} w={isSmallerThan470 && '90%'} borderRadius={'0.7rem'} boxShadow='lg' position={'absolute'}>
        <Box display={'flex'} boxShadow={'md'} p={'0.4rem'} justifyContent={'space-evenly'} alignItems={'center'} borderRadius={'0.7rem 0.7rem 0 0'}>
           <NavLink to={'/alltask'}><IoMenu style={{fontSize: '1.8rem', position: 'relative', right: isSmallerThan470 ? '1rem':'3rem'}} /></NavLink> 
            <Text fontSize={'1.8rem'} position={'relative'} right={'2rem'}>UPDATE TODO</Text>
        </Box>
        <form onSubmit={(e)=> handleSubmit(e)} style={{width: isSmallerThan470? '100%':'28rem', height: '14rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', padding: '2rem' }}>
            <Input placeholder='Enter Task Name'  size='lg' value={nameInput} onChange={(e)=> setNameInput(e.target.value)}/>
            <Button w={'100%'} type='submit' size='lg' bg={'#E27169'} colorScheme='#E27169'>UPDATE TASK</Button>
        </form>
    </Box>
    
</Box>
  )
}

export default Edit

