import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Button, Box, Card, Paper, Stack, Divider } from '@mui/material'

const ViewTasks = () => {

  const { userData } = useContext(AuthContext)

  return (<>
    <Stack mt={2}>
      <h2>Your Tasks Today</h2>
      {
        userData?.tasks?.length ? <>
          {
            userData.tasks.map((task, index) => {
              return <Paper key={index} sx={{mb:2}}>
                
                <Stack sx={{mb:1, mt:1,}} direction="row" justifyContent="space-between">
                  <b>{task.title}</b> 
                </Stack>
  
                <Box sx={{mb:1, mt:1,}}>
                  {task.description}
                </Box>

                <Box sx={{mb:1, mt:1,}}>
                  {new Date(task.taskDate).toLocaleTimeString().split(' ')[0].slice(0, -3)} &nbsp;
                  {new Date(task.taskDate).toLocaleTimeString().split(' ')[1]}
                </Box>

                <Stack sx={{mb:1, mt:1,}} direction="row"   spacing={2}
                  divider={<Divider orientation="vertical" flexItem />}>
                  <Box>
                    {task.duration} Mins 
                  </Box>
                  <Box>
                    {task.type == 'Online' ? task.type  : task.location}
                  </Box>
                </Stack>
              </Paper>
            })
          }
        </> : 
        <>
          No Tasks For Today 😊
        </>
      }
    </Stack>
  </>)
}

export default ViewTasks