import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "./Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../contexts/Auth";

const DashboardPage = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);

  const { user } = useContext(Auth);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchEvents = async () => {
      const response = await fetch("/api/events", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const events = await response.json();
      setEvents(events);
    };

    fetchEvents();
  }, [user]);


  const columns = [
    {
      field: "number",
      headerName: "#",
      type: "number",
      width: 50,
    },
    {
      field: "title",
      headerName: "Event title",
      cellClassName: "name-column--cell",
      width: 150,
    },
    {
      field: "date",
      headerName: "Start date",
      type: "Date",
      headerAlign: "left",
      align: "left",
      width: 150,
    },
    { field: "duration", headerName: "Duration", type: "number",align: "center", width: 100 },
    {
      field: "participants",
      headerName: "Participants",
      valueGetter: (parsedEvents) =>  events.map((event) => {
        return event.participants.map((participant) => {
          return [participant.username];
        });
      }),
      width: 200,
    },
    { field: "postedBy", headerName: "Organizer", width: 250 },
  ];

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
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} 
          />
          Download Reports
        </Button>
      </Box>

      <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={events}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(events) => events._id}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default DashboardPage;
