import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Box >
            <Homepage />
          </Box>
        }
      />
    </Routes>
  );
};

export default MainRoutes;
