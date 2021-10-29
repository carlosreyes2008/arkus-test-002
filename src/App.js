import React from "react";
import { Typography,
      AppBar,
      Box } from "@mui/material";

import List from "./components/list";

const styles = {
  barContainer:{
    display: 'flex',
  },
  barDisplay:{
    padding: 8,
  },
  mainContainer:{

  },
}

function App() {
  return (
    <>
      <Box
        style={styles.barContainer}
      >
        <AppBar 
          position="static"
          style={styles.barDisplay}
        >
          <Typography
            variant='h4'
          >
            Contacts App
          </Typography>
        </AppBar>
      </Box>

      <Box
        style={styles.mainContainer}
      >
        <List />
      </Box>
    </>
  );
}

export default App;