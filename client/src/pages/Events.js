import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../theme";
import CreateIcon from "@mui/icons-material/Create";
import Header from "../components/Header";
import EventCard from "../components/EventCard";


const Events = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      {/* HEADER */}

      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="Events" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <CreateIcon sx={{ mr: "10px" }} />
            Create new Event
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Grid
        xs={12}
        sm={12}
        md={8}
        lg={8}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid xs={12} sm={12} md={6}>
          <EventCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Events;
