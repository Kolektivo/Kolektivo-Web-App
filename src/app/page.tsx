import IconTwoTone from '@/components/common/display/IconTwoTone'
import AutocompletePlaces from '@/components/common/inputs/autocomplete/AutocompletePlaces'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Stack,
  Typography,
  TextField,
  OutlinedInput,
  FormControl,
  InputAdornment,
  Icon,
  Select,
  MenuItem,
} from '@mui/material'

export default function Home() {
  return (
    <Box display="flex" justifyContent="center" padding={2}>
      <Stack gap={3} justifyContent="center">
        <Typography variant="h1" color="text.primary" align="center">
          My Organization
        </Typography>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Stack direction="row" gap={2}>
              <Button variant="contained">Save</Button>
              <Button variant="contained" color="secondary">
                Delete
              </Button>
              <Button variant="contained" disabled>
                Disabled
              </Button>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              beolent
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              &quot;a benevolent smile&quot;
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Card>
          <CardContent>
            <OutlinedInput id="outlined-basic-2" placeholder="Placeholder text" />
            <Box height={10}></Box>
            <TextField placeholder="Placeholder text"></TextField>
            <Box height={10}></Box>
            <FormControl variant="standard">
              <OutlinedInput
                id="outlined-adornment-weight"
                startAdornment={
                  <InputAdornment position="end">
                    <Icon>search</Icon>
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
            <Box height={10}></Box>
            <AutocompletePlaces />
            <Box height={10}></Box>
            <Select value={10} displayEmpty>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <Box height={10}></Box>
            <Box>
              <IconTwoTone color="primary">home</IconTwoTone>
              <IconTwoTone color="primary">local_activity</IconTwoTone>
              <IconTwoTone color="primary">work</IconTwoTone>
              <Icon color="primary">home</Icon>
              <Icon color="primary">local_activity</Icon>
              <Icon color="primary">work</Icon>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}
