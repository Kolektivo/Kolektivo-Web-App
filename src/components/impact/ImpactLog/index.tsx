import LogsViewer from '@/components/common/display/LogsViewer'
import { Card, CardHeader, CardContent, CardActions, Button } from '@mui/material'
import { type ReactElement } from 'react'

const ImpactLog = (): ReactElement => {
  return (
    <Card>
      <CardHeader title="Impact Log" />
      <CardContent>
        <LogsViewer
          logs={[
            { isPrincipal: true, text: '24 May 2024' },
            { text: '70 dives completed by Hans diving' },
            { text: '10 Kilograms of food donated by Tito farm' },
            { text: '10 Corals replanted' },
            { isPrincipal: true, text: '9 May 2024' },
            { text: '20 Mangroves planted' },
            { text: '10 Kilograms of food donated by Tito farm' },
          ]}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button size="small">Load more</Button>
      </CardActions>
    </Card>
  )
}

export default ImpactLog
