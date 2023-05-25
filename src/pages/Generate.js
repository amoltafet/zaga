import { Box, Divider, Tooltip, Typography, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import React, { useEffect } from 'react'
import pageInfo from '../context'
import { useState } from 'react'
import LinearProgress from '@mui/joy/LinearProgress'
import { Chip } from '@mui/joy'
import { getApp } from 'firebase/app'
import { getDatabase, ref, set, onValue, push } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'

export default function Generate ({ boxOne, boxTwo }) {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState('')
  const [newProjectName, setNewProjectName] = useState('')
  const [creatingProject, setCreatingProject] = useState(false)
  const [projectsLoaded, setProjectsLoaded] = useState(false)
  const [userID, setUserID] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [openCreateSnackbar, setOpenCreateSnackbar] = useState(false)
  const [selectedProjectName, setSelectedProjectName] = useState('')

  const app = getApp()
  const db = getDatabase(app)

  let BoxHeight = window.innerHeight / 3

  let [page, setPage] = useState([])
  const [chipDataBoxOne, setChipDataBoxOne] = useState([])

  let url = window.location.href
  const lastPart = url.substring(url.lastIndexOf('/') + 1)
  let pageIn = pageInfo.find(pageTemp => pageTemp.title === lastPart)

  useEffect(() => {
    console.log(projects)
  }, [projects])

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userID = user.uid
        setUserID(userID)
        console.log('User is logged in with ID:', userID)

        const projectsRef = ref(db, 'users/' + userID + '/projects')
        console.log('About to fetch projects for user:', userID)
        onValue(
          projectsRef,
          snapshot => {
            console.log('Fetched projects for user:', userID)
            const data = snapshot.val()
            setProjects(
              data ? Object.keys(data).map(key => ({ key, ...data[key] })) : []
            )
            setIsLoading(false)
            setProjectsLoaded(true)
          },
          error => {
            console.log('Error fetching projects:', error)
            setIsLoading(false)
          }
        )
      } else {
        console.log('User not logged in')
        setIsLoading(false)
      }
    })

    // Don't forget to unsubscribe when the component unmounts
    return () => unsubscribe()
  }, [])

  const handleSaveToProjects = () => {
    if (selectedProject) {
      const project = projects.find(project => project.key === selectedProject)
      const projectRef = ref(
        db,
        'users/' + userID + '/projects/' + project.key + '/data'
      )
      set(projectRef, { boxOne: boxOne, boxTwo: boxTwo })
      setSelectedProjectName(project.name)
      setOpenSnackbar(true)
    } else {
      console.error('No project selected')
    }
  }

  const handleCreateProject = () => {
    if (newProjectName.trim().length > 0) {
      const auth = getAuth(app)
      const user = auth.currentUser
      if (user) {
        const userID = user.uid
        const projectsRef = ref(db, 'users/' + userID + '/projects')
        const newProjectRef = push(projectsRef)
        set(newProjectRef, {
          name: newProjectName,
          data: { boxOne: boxOne, boxTwo: boxTwo }
        })
        setNewProjectName('')
        setOpenCreateSnackbar(true)
        setCreatingProject(false)
      } else {
        console.error('User not logged in')
      }
    } else {
      console.error('Project name cannot be empty')
    }
  }

  const handleNewProjectClick = () => {
    setCreatingProject(true)
  }

  const handleExitCreateProject = () => {
    setCreatingProject(false)
  }

  const handleProjectChange = event => {
    setSelectedProject(event.target.value)
  }

  useEffect(() => {
    setPage(pageIn)
  }, [])

  useEffect(() => {
    // - Atmospheric particles in the air \n- Presence of oxygen molecules in the atmosphere \n
    // every new line is a new item in the array
    if (chipDataBoxOne.length > 0) {
      setChipDataBoxOne([])
    }
    boxOne.array.forEach(item => {
      let temp = item.split('\n')
      temp.forEach(item => {
        // remove - from the start of the string
        item = item.replace(/-/g, '')
        setChipDataBoxOne(chipDataBoxOne => [...chipDataBoxOne, item])
      })
    })

    console.log(chipDataBoxOne)
  }, [boxOne, boxTwo])

  return (
    <Grid
      xs={4}
      sx={{
        marginTop: '6%',
        padding: '2%'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '1%' }}>
        <Typography variant='overline' component='div'>
          {page.title} Tools
        </Typography>
      </div>
      <Box
        sx={{
          border: '0.5px solid black',
          borderRadius: '5px',
          padding: '10px',
          maxHeight: BoxHeight,
          minHeight: BoxHeight
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='overline' sx={{ textAlign: 'center' }}>
            {page.boxOneTitle}{' '}
          </Typography>
          <Tooltip title={page.boxOneDescription}>
            <ErrorOutlineOutlinedIcon fontSize='small' />
          </Tooltip>
        </div>
        <Divider sx={{ marginTop: '1%' }} />
        {boxOne.loading && <LinearProgress thickness={1} />}
        <div
          style={{
            maxHeight: BoxHeight - 50,
            overflow: 'scroll',
            overflowX: 'hidden'
          }}
        >
          {chipDataBoxOne.map(data => (
            <Chip
              variant='outlined'
              sx={{
                marginTop: '1%',
                marginBottom: '1%',
                marginLeft: '2%',
                borderColor: 'gray',
                color: 'gray'
              }}
            >
              {data}
            </Chip>
          ))}
        </div>
      </Box>

      <Box
        sx={{
          border: '0.5px solid black',
          borderRadius: '5px',
          padding: '10px',
          maxHeight: BoxHeight,
          minHeight: BoxHeight,
          marginTop: '5%'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant='overline'
            sx={{ textAlign: 'center', marginTop: '1%' }}
          >
            {page.boxTwoTitle}{' '}
          </Typography>
          <Tooltip title={page.boxTwoDescription}>
            <ErrorOutlineOutlinedIcon fontSize='small' />
          </Tooltip>
        </div>
        <Divider sx={{ marginTop: '1%' }} />
        {boxTwo.loading && <LinearProgress thickness={1} />}
        <div
          style={{
            maxHeight: BoxHeight - 50,
            overflow: 'scroll',
            overflowX: 'hidden'
          }}
        >
          {boxTwo.array.map((item, index) => (
            <React.Fragment key={index}>
              <Typography
                variant='body2'
                sx={{
                  marginTop: '1%',
                  marginBottom: '1%',
                  marginLeft: '2%',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {item}
              </Typography>
            </React.Fragment>
          ))}
        </div>
      </Box>
      <Box
        sx={{
          marginTop: '5%',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {!userID ? (
          <Typography variant='overline' sx={{ textAlign: 'center' }}>
            Login to view and save projects
          </Typography>
        ) : isLoading || !projectsLoaded ? (
          <Typography variant='overline' sx={{ textAlign: 'center' }}>
            Loading Projects...
          </Typography>
        ) : (
          !creatingProject && (
            <FormControl fullWidth sx={{ marginRight: '5%' }}>
              <InputLabel id='project-select-label'>Select Project</InputLabel>
              <Select
                labelId='project-select-label'
                label='Select Project'
                id='project-select'
                value={selectedProject}
                onChange={handleProjectChange}
              >
                <MenuItem
                  value=''
                  onClick={handleNewProjectClick}
                  sx={{
                    color: '#137ebf'
                  }}
                >
                  <AddIcon />
                  Create New Project
                </MenuItem>
                {projects.map(project => (
                  <MenuItem key={project.key} value={project.key}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )
        )}

        {creatingProject && (
          <React.Fragment>
            <FormControl>
              <Select value='' label='Project'>
                <MenuItem value='' onClick={handleExitCreateProject}>
                  <ArrowBackIcon />
                  Back to Projects
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              label='New Project Name'
              value={newProjectName}
              onChange={e => setNewProjectName(e.target.value)}
              fullWidth
            />

            <Button
              variant='contained'
              color='primary'
              onClick={handleCreateProject}
            >
              Save New Project
            </Button>
          </React.Fragment>
        )}

        {!isLoading && !creatingProject && userID && selectedProject !== '' && (
          <Button
            variant='contained'
            color='secondary'
            onClick={handleSaveToProjects}
          >
            Save to Project
          </Button>
        )}
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity='success'>
          Successfully saved data to project "{selectedProjectName}"
        </Alert>
      </Snackbar>

      <Snackbar
        open={openCreateSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenCreateSnackbar(false)}
      >
        <Alert onClose={() => setOpenCreateSnackbar(false)} severity='info'>
          Successfully created project {newProjectName}
        </Alert>
      </Snackbar>
    </Grid>
  )
}
