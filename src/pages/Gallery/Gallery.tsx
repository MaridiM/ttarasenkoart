import { ChangeEvent, FC, useState } from 'react'
import { Paper, Box, Typography } from '@material-ui/core'
import { TabsComponent } from 'components'

type TProps = {
  children?: React.ReactNode
  index: string | number
  value: string | number
}

const TabPanel: FC<TProps> = ({ children, value, index, ...other }) => {

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}    
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Gallery: FC = () => {
    const [value, setValue] = useState(0)

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }
   
    return (
        
        <div>
            <Paper>
                <TabsComponent
                    value={value}
                    onChange={handleChange}
                    logout={() => console.log('Log Out')}
                >
                </TabsComponent>
            </Paper>
            <TabPanel value={value} index={0}>
                Gallery
            </TabPanel>
            <TabPanel value={value} index={1}>
                Add Picture
            </TabPanel>
        </div>
    )
}

export default Gallery