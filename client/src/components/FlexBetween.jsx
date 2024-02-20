// The following will act as a wrapper component 
import { Box } from "@mui/material";
import styled from "@emotion/styled";

const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})

export default FlexBetween;